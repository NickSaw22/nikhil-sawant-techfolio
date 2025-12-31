'use client';

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MY_SKILLS } from "../../constants";

export const Skills = () => {
  const RING_RADIUS_PERCENT = 40;
  const RING_PADDING_PX = 16;
  const ICON_SIZE_PX = 80; // matches w-20
  const SPACING_FACTOR = 1.25; // desired arc spacing multiplier per icon
  const TILT_DEG = 20; // slightly flatter tilt for cleaner ellipse
  const Z_RANGE_PX = 160; // depth range for translateZ
  const MAX_BLUR_PX = 2; // subtle blur for far icons
  const VERTICAL_COMPRESSION = 0.35; // reduce vertical radius to trim top/bottom space

  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [ringGeom, setRingGeom] = useState({
    cx: 50,
    cy: 50,
    rxPercent: RING_RADIUS_PERCENT,
    ryPercent: RING_RADIUS_PERCENT,
  });

  // Deduplicate skills by image to avoid repeated icons
  const uniqueSkills = Array.from(
    new Map(MY_SKILLS.map((skill) => [skill.image, skill])).values()
  );

  const generatePositions = (
    count: number,
    angleOffset: number = 0,
    cx: number = 50,
    cy: number = 50,
    rxPercent: number = 22,
    ryPercent: number = 22
  ) => {
    const positions: { top: number; left: number }[] = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + angleOffset;
      const left = cx + rxPercent * Math.cos(angle);
      const top = cy + ryPercent * Math.sin(angle);
      positions.push({ top, left });
    }
    return positions;
  };

  const initialPositions = generatePositions(
    uniqueSkills.length,
    0,
    ringGeom.cx,
    ringGeom.cy,
    ringGeom.rxPercent,
    ringGeom.ryPercent
  );

  const [images, setImages] = useState(
    uniqueSkills.map((skill, index) => ({
      url: `/skills/${skill.image}`,
      top: `${initialPositions[index]?.top ?? 50}%`,
      left: `${initialPositions[index]?.left ?? 50}%`,
      isActive: true,
    }))
  );

  // Measure video and container to center ring around the video element
  useEffect(() => {
    const measure = () => {
      const container = containerRef.current;
      const video = videoRef.current;
      if (!container || !video) return;

      const containerRect = container.getBoundingClientRect();
      const videoRect = video.getBoundingClientRect();
      if (containerRect.width === 0 || containerRect.height === 0) return;

      const cx =
        ((videoRect.left - containerRect.left) + videoRect.width / 2) /
        containerRect.width * 100;
      const cy =
        ((videoRect.top - containerRect.top) + videoRect.height / 2) /
        containerRect.height * 100;

      // Compute desired radius based on icon count to avoid crowding
      const desiredArcSegmentPx = ICON_SIZE_PX * SPACING_FACTOR;
      const desiredRadiusPx = (desiredArcSegmentPx * uniqueSkills.length) / (2 * Math.PI);

      const minRxPx = (videoRect.width / 2) + RING_PADDING_PX;
      const minRyPx = (videoRect.height / 2) + RING_PADDING_PX;
      let rxPercent = Math.max(minRxPx, desiredRadiusPx) / containerRect.width * 100;
      let ryPercent = (Math.max(minRyPx, desiredRadiusPx) * VERTICAL_COMPRESSION) / containerRect.height * 100;

      // Clamp radius so icons stay within container bounds
      const margin = 2; // percent
      const iconHalfX = (ICON_SIZE_PX / 2) / containerRect.width * 100;
      const iconHalfY = (ICON_SIZE_PX / 2) / containerRect.height * 100;
      const maxRx = Math.max(0, Math.min(cx - margin - iconHalfX, 100 - cx - margin - iconHalfX));
      const maxRy = Math.max(0, Math.min(cy - margin - iconHalfY, 100 - cy - margin - iconHalfY));
      rxPercent = Math.min(rxPercent, maxRx);
      ryPercent = Math.min(ryPercent, maxRy);

      setRingGeom({
        cx,
        cy,
        rxPercent: rxPercent || RING_RADIUS_PERCENT,
        ryPercent: ryPercent || RING_RADIUS_PERCENT,
      });

      const newPositions = generatePositions(
        uniqueSkills.length,
        0,
        cx,
        cy,
        rxPercent || RING_RADIUS_PERCENT,
        ryPercent || RING_RADIUS_PERCENT
      );
      setImages((prev) =>
        prev.map((item, index) => ({
          ...item,
          top: `${newPositions[index]?.top ?? 50}%`,
          left: `${newPositions[index]?.left ?? 50}%`,
        }))
      );
    };

    const raf = requestAnimationFrame(measure);
    window.addEventListener('resize', measure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', measure);
    };
  }, [uniqueSkills.length]);

  const [angleOffset, setAngleOffset] = useState(0);
  const angleRef = useRef(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Continuous rotation loop (keeps all icons visible and revolving)
  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    const baseSpeed = 0.6; // radians per second

    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      angleRef.current += baseSpeed * dt;
      const angle = angleRef.current;
      setAngleOffset(angle);

      const newPositions = generatePositions(
        uniqueSkills.length,
        angle,
        ringGeom.cx,
        ringGeom.cy,
        ringGeom.rxPercent,
        ringGeom.ryPercent
      );
      setImages((prev) =>
        prev.map((item, index) => ({
          ...item,
          top: `${newPositions[index]?.top ?? 50}%`,
          left: `${newPositions[index]?.left ?? 50}%`,
          isActive: true,
        }))
      );

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ringGeom, uniqueSkills.length]);

  return (
    <div>
      <div className="w-full">
        <div ref={containerRef} className="relative max-w-screen-xl mx-auto text-center">
          <div className="w-full h-full">
            <div className="w-full h-full z-[-10] opacity-20 flex items-center justify-center bg-cover">
              <video
                ref={videoRef}
                className="w-full h-auto"
                preload="false"
                playsInline
                loop
                muted
                autoPlay
              >
                <source src="/videos/skills-bg.webm" type="video/webm" />
              </video>
            </div>
          </div>
          {/* 3D perspective wrapper */}
          <div className="absolute top-0 w-full h-full overflow-visible" style={{ perspective: "1000px" }}>
            <div style={{ transform: `rotateX(${TILT_DEG}deg)`, transformStyle: "preserve-3d" }} className="w-full h-full">
              {images.map((elem, index) => {
                if (!elem.isActive) return null;
                const total = images.length;
                const angle = (index / total) * Math.PI * 2 + angleOffset;
                const depth = Math.sin(angle);
                const z = depth * Z_RANGE_PX;
                const baseScale = 0.85 + 0.35 * ((depth + 1) / 2); // 0.85..1.2
                const baseOpacity = 0.55 + 0.45 * ((depth + 1) / 2); // 0.55..1
                const blurPx = (1 - ((depth + 1) / 2)) * MAX_BLUR_PX; // blur further when at back
                const zBoost = hoveredIndex === index ? 40 : 0;
                const counterTilt = hoveredIndex === index ? ` rotateX(${-TILT_DEG}deg)` : "";

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: baseScale * 0.85 }}
                    animate={{ opacity: baseOpacity, scale: baseScale }}
                    whileHover={{ scale: baseScale * 1.2 }}
                    transition={{ duration: 0.8, delay: index * 0.05, ease: "easeOut" }}
                    className="absolute hover:z-50 will-change-transform"
                    style={{ top: elem.top, left: elem.left, zIndex: Math.round(1000 + z), filter: `blur(${blurPx}px)`, borderRadius: "0.5rem" }}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    transformTemplate={(transform) => `translate(-50%, -50%) ${transform}${counterTilt} translateZ(${z + zBoost}px)`}
                  >
                    <Image
                      src={elem.url}
                      alt={uniqueSkills[index]?.skill_name || "Skill icon"}
                      width={80}
                      height={80}
                      quality={95}
                      sizes="80px"
                      style={{ objectFit: "contain", display: "block", backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
                    />
                  </motion.div>
                );
              })}
              <AnimatePresence>
                {hoveredIndex !== null && images[hoveredIndex] && (
                  <motion.div
                    key="tooltip"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute pointer-events-none select-none rounded-md bg-black/70 text-white text-xs px-3 py-2 shadow-lg backdrop-blur-sm border border-white/10"
                    style={{ top: images[hoveredIndex].top, left: images[hoveredIndex].left, transform: "translate(-50%, calc(-50% - 70px))" }}
                  >
                    {uniqueSkills[hoveredIndex]?.skill_name || "Skill"}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}