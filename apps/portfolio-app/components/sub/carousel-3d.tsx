'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Carousel3DProps {
  imagesurls: string[];
  direction?: 'left' | 'right';
  transitionProgress?: number; // 0 = 3D carousel, 1 = 2D flat
}

export const Carousel3D = ({ imagesurls, direction = 'left', transitionProgress = 0 }: Carousel3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const meshesRef = useRef<THREE.Mesh[]>([]);
  const rotationSpeedRef = useRef(direction === 'left' ? 0.005 : -0.005);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / 200,
      0.1,
      1000
    );
    camera.position.z = 15;
    camera.position.y = 0;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(containerRef.current.clientWidth, 200);
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create carousel items
    const radius = 12;
    const angleStep = (Math.PI * 2) / imagesurls.length;
    const loader = new THREE.TextureLoader();
    const meshes: THREE.Mesh[] = [];

    imagesurls.forEach((url, index) => {
      const angle = angleStep * index;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;

      // Load texture
      loader.load(
        url,
        (texture) => {
          const geometry = new THREE.PlaneGeometry(3, 3);
          const material = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
            side: THREE.DoubleSide,
          });

          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.set(x, 0, z);
          mesh.lookAt(0, 0, 0); // Face the center

          scene.add(mesh);
          meshes.push(mesh);
        },
        undefined,
        (error) => {
          console.error('Error loading texture:', url, error);
        }
      );
    });

    meshesRef.current = meshes;

    // Animation loop
    let animationId: number;
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

      animationId = requestAnimationFrame(animate);

      // Rotate all meshes around the center
      meshesRef.current.forEach((mesh, index) => {
        const currentAngle = Math.atan2(mesh.position.z, mesh.position.x);
        const newAngle = currentAngle + rotationSpeedRef.current;
        
        // 3D circular position
        const circleX = Math.cos(newAngle) * radius;
        const circleZ = Math.sin(newAngle) * radius;
        
        // 2D flat horizontal position
        const spacing = 4;
        const flatX = (index - imagesurls.length / 2) * spacing;
        const flatZ = 0;
        
        // Interpolate between 3D and 2D based on transitionProgress
        mesh.position.x = circleX * (1 - transitionProgress) + flatX * transitionProgress;
        mesh.position.z = circleZ * (1 - transitionProgress) + flatZ * transitionProgress;
        
        // Gradually face forward as it flattens
        const lookAtX = 0;
        const lookAtZ = transitionProgress * -10; // Look toward camera
        mesh.lookAt(lookAtX, 0, lookAtZ);

        // Scale based on Z position (depth effect) - reduce effect as it flattens
        const distanceFromCamera = mesh.position.z + 15;
        const depthScale = Math.max(0.5, Math.min(1.5, distanceFromCamera / 15));
        const finalScale = depthScale * (1 - transitionProgress) + 1 * transitionProgress;
        mesh.scale.set(finalScale, finalScale, 1);

        // Opacity based on depth - full opacity when flat
        if (mesh.material instanceof THREE.MeshBasicMaterial) {
          const depthOpacity = Math.max(0.3, Math.min(1, depthScale));
          mesh.material.opacity = depthOpacity * (1 - transitionProgress) + 1 * transitionProgress;
        }
      });

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current || !camera || !renderer) return;
      
      const width = containerRef.current.clientWidth;
      camera.aspect = width / 200;
      camera.updateProjectionMatrix();
      renderer.setSize(width, 200);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && rendererRef.current?.domElement) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      meshesRef.current.forEach((mesh) => {
        mesh.geometry.dispose();
        if (mesh.material instanceof THREE.Material) {
          mesh.material.dispose();
        }
      });
      rendererRef.current?.dispose();
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
    };
  }, [imagesurls, direction]);

  return <div ref={containerRef} className="w-full h-[200px]" />;
};

export default Carousel3D;
