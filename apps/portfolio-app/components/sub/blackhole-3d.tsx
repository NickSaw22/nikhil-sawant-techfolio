'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

interface Blackhole3DProps {
  imagesurls: string[];
  direction?: 'left' | 'right';
}

export const Blackhole3D = ({ imagesurls, direction = 'left' }: Blackhole3DProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const duration = 15;
  const isLeft = direction === 'left';

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const containerWidth = canvasRef.current.clientWidth;
    const containerHeight = 256; // h-64 in pixels
    const camera = new THREE.PerspectiveCamera(
      60,
      containerWidth / containerHeight,
      0.1,
      1000
    );
    // Position camera at a distance that allows a wide ring to fill width
    const zCam = 12;
    camera.position.z = zCam;
    camera.position.y = 0.5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(containerWidth, containerHeight);
    renderer.setClearColor(0x000000, 0);
    canvasRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create black hole sphere (event horizon) - larger for better presence
    const baseHoleRadius = 2.0;
    const blackHoleGeometry = new THREE.SphereGeometry(baseHoleRadius, 64, 64);
    const blackHoleMaterial = new THREE.MeshBasicMaterial({ 
      color: 0x000000,
      transparent: true,
      opacity: 1
    });
    const blackHole = new THREE.Mesh(blackHoleGeometry, blackHoleMaterial);
    scene.add(blackHole);

    // Create gravitational lensing rings (multiple layers)
    const lensingRings: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const ringGeometry = new THREE.TorusGeometry(0.8 + i * 0.15, 0.02, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({ 
        color: 0xff8800,
        transparent: true,
        opacity: 0.6 - i * 0.15,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.3;
      lensingRings.push(ring);
      scene.add(ring);
    }

    // Interstellar-style accretion disk particles (orange/golden glow)
    const particleCount = 400;
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const velocities: number[] = [];

    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.8 + Math.random() * 2;
      const speed = 0.001 + (1 / radius) * 0.002; // Faster closer to black hole
      
      positions[i * 3] = Math.cos(angle) * radius;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 0.2 * radius * 0.3;
      positions[i * 3 + 2] = Math.sin(angle) * radius;

      velocities.push(speed);

      // Interstellar orange/golden colors (hot accretion disk)
      const heat = 1 - (radius - 0.8) / 2; // Hotter closer to center
      colors[i * 3] = 1.0;                          // R (full red)
      colors[i * 3 + 1] = 0.4 + heat * 0.4;        // G (orange to yellow)
      colors[i * 3 + 2] = 0.05 + heat * 0.15;      // B (slight blue for realism)

      sizes[i] = Math.random() * 2 + 1;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    // Add ambient glow sphere
    const glowGeometry = new THREE.SphereGeometry(baseHoleRadius + 0.1, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xff6600,
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    scene.add(glow);

    // White light sprite (event horizon emission)
    const makeRadialTexture = (size = 128) => {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return new THREE.Texture();
      const gradient = ctx.createRadialGradient(
        size / 2,
        size / 2,
        0,
        size / 2,
        size / 2,
        size / 2
      );
      gradient.addColorStop(0, 'rgba(255,255,255,0.9)');
      gradient.addColorStop(0.3, 'rgba(255,255,255,0.6)');
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, size, size);
      const texture = new THREE.Texture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const lightTexture = makeRadialTexture();
    const lightMaterial = new THREE.SpriteMaterial({
      map: lightTexture,
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lightSprite = new THREE.Sprite(lightMaterial);
    lightSprite.scale.set(baseHoleRadius * 2.8, baseHoleRadius * 2.8, 1);
    scene.add(lightSprite);

    // Create orbiting skill icons
    const iconMeshes: THREE.Mesh[] = [];
    const iconCount = Math.max(1, imagesurls.length);
    const angleStep = (Math.PI * 2) / iconCount;
    // Compute visible width at camera Z to target 90% screen width coverage
    const aspect = containerWidth / containerHeight;
    const fovRad = (camera.fov * Math.PI) / 180;
    const visHeight = 2 * Math.tan(fovRad / 2) * zCam;
    const visWidth = visHeight * aspect;
    const coverRadius = (visWidth * 0.9) / 2; // 90% of viewport width as diameter
    // Ensure min spacing based on icon size
    const iconSize = 0.6;
    const minArc = iconSize * 1.3; // comfortable arc per icon
    const minRadiusBySpacing = (minArc * iconCount) / (2 * Math.PI);
    const iconRadius = Math.max(coverRadius, minRadiusBySpacing, 3.2);
    const loader = new THREE.TextureLoader();

    imagesurls.forEach((url, index) => {
      loader.load(
        url,
        (texture) => {
          const iconGeometry = new THREE.PlaneGeometry(0.6, 0.6);
          const iconMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
            opacity: 1
          });

          const iconMesh = new THREE.Mesh(iconGeometry, iconMaterial);
          
          // Initial position in orbit
          const angle = angleStep * index;
          iconMesh.position.x = Math.cos(angle) * iconRadius;
          iconMesh.position.z = Math.sin(angle) * iconRadius;
          // slight vertical staggering to reduce visual overlap
          iconMesh.position.y = Math.sin(angle * 2) * 0.22;
          
          // Store initial angle for animation
          (iconMesh as any).orbitAngle = angle;
          
          scene.add(iconMesh);
          iconMeshes.push(iconMesh);
        },
        undefined,
        (error) => {
          console.error('Error loading icon:', url, error);
        }
      );
    });

    // Animation
    let animationId: number;
    const orbitSpeed = direction === 'left' ? 0.01 : -0.01;
    const animate = () => {
      if (!sceneRef.current || !rendererRef.current) return;

      animationId = requestAnimationFrame(animate);

      const time = Date.now() * 0.001;

      // Rotate accretion disk (orbital motion)
      particles.rotation.y += 0.008;

      // Rotate particle positions for spiral effect
      const posArray = particlesGeometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const x = posArray[i3];
        const z = posArray[i3 + 2];
        const angle = Math.atan2(z, x) + velocities[i];
        const radius = Math.sqrt(x * x + z * z);

        posArray[i3] = Math.cos(angle) * radius;
        posArray[i3 + 2] = Math.sin(angle) * radius;
      }
      particlesGeometry.attributes.position.needsUpdate = true;

      // Animate gravitational lensing rings
      lensingRings.forEach((ring, index) => {
        ring.rotation.z += 0.003 * (index + 1);
        const scale = 1 + Math.sin(time * 2 + index) * 0.05;
        ring.scale.set(scale, scale, scale);
        if (ring.material instanceof THREE.MeshBasicMaterial) {
          ring.material.opacity = 0.5 - index * 0.1 + Math.sin(time * 3 + index) * 0.1;
        }
      });

      // Pulse black hole glow and light sprite
      const pulse = 1 + Math.sin(time * 1.5) * 0.08;
      glow.scale.set(pulse, pulse, pulse);
      lightSprite.scale.set(2.2 * pulse, 2.2 * pulse, 1);
      // keep sprite scale proportional to hole size
      lightSprite.scale.set(baseHoleRadius * 2.8 * pulse, baseHoleRadius * 2.8 * pulse, 1);
      if (lightSprite.material instanceof THREE.SpriteMaterial) {
        lightSprite.material.opacity = 0.8 + Math.sin(time * 2.0) * 0.2;
      }

      // Animate orbiting skill icons around the black hole
      iconMeshes.forEach((iconMesh) => {
        (iconMesh as any).orbitAngle = ((iconMesh as any).orbitAngle || 0) + orbitSpeed;
        const angle = (iconMesh as any).orbitAngle;

        // New position in orbit
        iconMesh.position.x = Math.cos(angle) * iconRadius;
        iconMesh.position.z = Math.sin(angle) * iconRadius;

        // Always face the camera
        iconMesh.lookAt(camera.position);

        // Scale and opacity based on Z position (depth effect)
        const normalizedZ = (iconMesh.position.z + iconRadius) / (iconRadius * 2);
        const scale = 0.8 + normalizedZ * 0.4; // more subtle size range
        iconMesh.scale.set(scale, scale, 1);

        if (iconMesh.material instanceof THREE.MeshBasicMaterial) {
          iconMesh.material.opacity = 0.6 + normalizedZ * 0.4; // keep icons readable
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const onResize = () => {
      if (!canvasRef.current || !rendererRef.current) return;
      const w = canvasRef.current.clientWidth;
      const h = containerHeight;
      rendererRef.current.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      if (canvasRef.current && rendererRef.current?.domElement) {
        canvasRef.current.removeChild(rendererRef.current.domElement);
      }
      blackHoleGeometry.dispose();
      blackHoleMaterial.dispose();
      lensingRings.forEach((ring) => {
        ring.geometry.dispose();
        if (ring.material instanceof THREE.Material) ring.material.dispose();
      });
      glowGeometry.dispose();
      glowMaterial.dispose();
      lightTexture.dispose();
      if (lightSprite.material instanceof THREE.Material) lightSprite.material.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      iconMeshes.forEach((icon) => {
        icon.geometry.dispose();
        if (icon.material instanceof THREE.Material) icon.material.dispose();
      });
      window.removeEventListener('resize', onResize);
      rendererRef.current?.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-64 flex items-center justify-center overflow-hidden">
      {/* Three.js Black Hole Canvas with orbiting icons */}
      <div 
        ref={canvasRef} 
        className="absolute z-10 pointer-events-none"
        style={{ width: '100%', height: '100%' }}
      />

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_transparent_40%,_rgba(0,0,0,0.8)_100%)] z-20 pointer-events-none" />
    </div>
  );
};

export default Blackhole3D;
