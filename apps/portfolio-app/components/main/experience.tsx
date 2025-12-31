"use client";

import { AnimatePresence, motion, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { EXPERIENCE, type ExperienceItem } from "../../constants/resume";
import { useEffect, useMemo, useRef, useState } from "react";

// Use resume EXPERIENCE items as scroll steps
const STEPS: ExperienceItem[] = EXPERIENCE;

export const Experience = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const railCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const progressSpring = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });
  const [activeStep, setActiveStep] = useState(0);
  const progressRef = useRef(0);
  const addPulseRef = useRef<((percent: number) => void) | null>(null);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    progressRef.current = v;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) {
          const first = visible[0];
          if (first) {
            const idx = stepRefs.current.findIndex((el) => el === first.target);
            if (idx >= 0) setActiveStep(idx);
          }
        }
      },
      { root: null, threshold: 0.4 }
    );
    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const dotPercents = useMemo(() => STEPS.map((_, i) => (i / (STEPS.length - 1)) * 100), []);

  // Trigger a pulse ring when active step changes
  useEffect(() => {
    const add = addPulseRef.current;
    if (dotPercents.length > 0 && activeStep >= 0 && activeStep < dotPercents.length) {
      const p = dotPercents[activeStep] ?? 0;
      add?.(p / 100);
    }
  }, [activeStep, dotPercents]);

  // Interstellar canvas for the left rail: stars + beam + DNA helix
  useEffect(() => {
    const canvas = railCanvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    if (!ctx || !parent) return;

    // High-DPI aware resize
    let cssW = 0;
    let cssH = 0;
    let dpr = 1;
    const resize = () => {
      const rect = parent.getBoundingClientRect();
      cssW = Math.max(1, Math.floor(rect.width));
      cssH = Math.max(1, Math.floor(rect.height));
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.floor(cssW * dpr));
      canvas.height = Math.max(1, Math.floor(cssH * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    type Star = { x: number; y: number; r: number; tw: number; phase: number };
    let stars: Star[] = [];
    const seedStars = () => {
      stars = Array.from({ length: 110 }, () => ({
        x: Math.random() * cssW,
        y: Math.random() * cssH,
        r: Math.random() * 1.2 + 0.4,
        tw: Math.random() * 0.8 + 0.4,
        phase: Math.random() * Math.PI * 2,
      }));
    };
    seedStars();

    // Soft nebula blobs for space aesthetic
    type Nebula = { x: number; y: number; r: number; hue: number; driftX: number; driftY: number; phase: number };
    let nebulae: Nebula[] = [];
    const seedNebulae = () => {
      nebulae = [
        { x: cssW * 0.3, y: cssH * 0.2, r: Math.max(cssW, cssH) * 0.35, hue: 270, driftX: 0.02, driftY: 0.01, phase: Math.random() * 6.28 },
        { x: cssW * 0.7, y: cssH * 0.65, r: Math.max(cssW, cssH) * 0.4, hue: 210, driftX: -0.015, driftY: 0.008, phase: Math.random() * 6.28 },
        { x: cssW * 0.5, y: cssH * 0.45, r: Math.max(cssW, cssH) * 0.25, hue: 295, driftX: 0.01, driftY: -0.012, phase: Math.random() * 6.28 },
      ];
    };
    seedNebulae();

    // Particle sparks for spell effect
    type Particle = { x: number; y: number; vx: number; vy: number; life: number; max: number; hue: number };
    let particles: Particle[] = [];
    const spawnParticles = (cx: number, cy: number, count: number, hue: number) => {
      for (let i = 0; i < count; i++) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 0.4 + Math.random() * 1.2;
        particles.push({
          x: cx,
          y: cy,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd,
          life: 0,
          max: 50 + Math.floor(Math.random() * 40),
          hue,
        });
      }
    };

    // Step-synced expanding pulse rings (store as percent of height)
    type Pulse = { p: number; r: number; a: number };
    let pulses: Pulse[] = [];
    const addPulse = (percent: number) => {
      pulses.push({ p: Math.max(0, Math.min(1, percent)), r: 10, a: 0.55 });
    };
    addPulseRef.current = addPulse;

    let raf = 0;
    const draw = (t: number) => {
      // Clear
      ctx.clearRect(0, 0, cssW, cssH);

      // Subtle space haze
      const haze = ctx.createLinearGradient(0, 0, 0, cssH);
      haze.addColorStop(0, "rgba(10, 10, 20, 0.35)");
      haze.addColorStop(1, "rgba(10, 10, 20, 0.1)");
      ctx.fillStyle = haze;
      ctx.fillRect(0, 0, cssW, cssH);

      // Nebula layers (very soft)
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (const n of nebulae) {
        const px = n.x + Math.sin(t * 0.00015 + n.phase) * n.driftX * 200;
        const py = n.y + Math.cos(t * 0.00012 + n.phase) * n.driftY * 200;
        const g = ctx.createRadialGradient(px, py, 0, px, py, n.r);
        g.addColorStop(0.0, `hsla(${n.hue}, 90%, 60%, 0.08)`);
        g.addColorStop(0.4, `hsla(${n.hue}, 90%, 60%, 0.05)`);
        g.addColorStop(1.0, `hsla(${n.hue}, 90%, 60%, 0.0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(px, py, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Twinkling stars
      for (const s of stars) {
        const twinkle = (Math.sin(t * 0.002 + s.phase) * 0.5 + 0.5) * s.tw;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r + twinkle * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200, 180, 255, 0.8)";
        ctx.fill();
      }

      // Vertical glow beam centered
      const beamX = cssW / 2;
      const beam = ctx.createLinearGradient(beamX, 0, beamX, cssH);
      beam.addColorStop(0, "rgba(139,92,246,0.18)");
      beam.addColorStop(0.5, "rgba(217,70,239,0.24)");
      beam.addColorStop(1, "rgba(59,130,246,0.18)");
      ctx.fillStyle = beam;
      ctx.fillRect(beamX - 2, 0, 4, cssH);

      // Soft outer beam aura
      const beamAura = ctx.createLinearGradient(beamX, 0, beamX, cssH);
      beamAura.addColorStop(0, "rgba(139,92,246,0.06)");
      beamAura.addColorStop(0.5, "rgba(217,70,239,0.08)");
      beamAura.addColorStop(1, "rgba(59,130,246,0.06)");
      ctx.fillStyle = beamAura;
      ctx.fillRect(beamX - 10, 0, 20, cssH);

      // Magical space spell rays around the progress marker
      const py = Math.min(cssH - 10, Math.max(10, progressRef.current * cssH));
      const time = t * 0.0015;

      // Progress halo at current y
      const halo = ctx.createRadialGradient(beamX, py, 0, beamX, py, 40);
      halo.addColorStop(0, "rgba(255,255,255,0.85)");
      halo.addColorStop(0.35, "rgba(255,255,255,0.30)");
      halo.addColorStop(0.75, "rgba(255,255,255,0.12)");
      halo.addColorStop(1, "rgba(255,255,255,0.0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(beamX, py, 12, 0, Math.PI * 2);
      ctx.fill();

      // Aurora veil along the beam
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      for (let y = 0; y < cssH; y += 6) {
        const alpha = 0.06 + 0.06 * (Math.sin(y * 0.06 + time * 2.2) * 0.5 + 0.5);
        ctx.fillStyle = `rgba(180, 160, 255, ${alpha})`;
        ctx.fillRect(beamX - 6, y, 12, 4);
      }
      ctx.restore();

      // Rotating spell rays (radial lines)
      ctx.save();
      ctx.globalCompositeOperation = "lighter";
      const rays = 36;
      for (let i = 0; i < rays; i++) {
        const ang = (i / rays) * Math.PI * 2 + time * 1.0;
        const wobble = Math.sin(time * 1.6 + i * 0.6) * 5;
        const len = 24 + wobble;
        const ex = beamX + Math.cos(ang) * len;
        const ey = py + Math.sin(ang) * len;
        ctx.beginPath();
        ctx.moveTo(beamX, py);
        ctx.lineTo(ex, ey);
        ctx.lineWidth = 1.2 + (Math.sin(time * 2.4 + i) * 0.5 + 0.5);
        const hueMix = 250 + Math.sin(i * 0.35 + time) * 30; // violet→cyan
        ctx.strokeStyle = `hsla(${hueMix}, 90%, 70%, ${0.2 + (Math.cos(i + time) * 0.1 + 0.1)})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(255,255,255,0.6)";
        ctx.stroke();
      }
      ctx.restore();

      // Arcane rune glyphs around the marker
      ctx.save();
      ctx.translate(beamX, py);
      ctx.rotate(time * 0.6);
      const runeR = 16;
      // Outer dashed ring
      ctx.setLineDash([4, 6]);
      ctx.lineDashOffset = (1 - (time % 1)) * 8;
      ctx.strokeStyle = "rgba(255,255,255,0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(0, 0, runeR + 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      // Tick marks
      for (let i = 0; i < 18; i++) {
        const a = (i / 18) * Math.PI * 2;
        const x1 = Math.cos(a) * (runeR + 3);
        const y1 = Math.sin(a) * (runeR + 3);
        const x2 = Math.cos(a) * (runeR + 7);
        const y2 = Math.sin(a) * (runeR + 7);
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = "rgba(255,255,255,0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      // Inner rotating diamond points
      ctx.rotate(time * -1.2);
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2;
        const rx = Math.cos(a) * runeR;
        const ry = Math.sin(a) * runeR;
        ctx.beginPath();
        ctx.moveTo(rx, ry - 2);
        ctx.lineTo(rx + 2, ry);
        ctx.lineTo(rx, ry + 2);
        ctx.lineTo(rx - 2, ry);
        ctx.closePath();
        ctx.fillStyle = "rgba(255,255,255,0.25)";
        ctx.fill();
      }
      ctx.restore();

      // Concentric pulse rings
      const ringRadii = [18, 32, 48];
      for (const r of ringRadii) {
        const pulse = (Math.sin(time * 3 + r * 0.1) * 0.5 + 0.5) * 0.5;
        const grd = ctx.createRadialGradient(beamX, py, r * 0.6, beamX, py, r);
        grd.addColorStop(0, `rgba(255,255,255,${0.12 + pulse * 0.15})`);
        grd.addColorStop(1, "rgba(255,255,255,0.0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(beamX, py, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Step pulses along the track
      const stepYs = dotPercents.map((p) => (p / 100) * cssH);
      for (const sy of stepYs) {
        const dist = Math.abs(sy - py);
        const strength = Math.max(0, 1 - dist / 160);
        if (strength > 0) {
          const flare = ctx.createRadialGradient(beamX, sy, 0, beamX, sy, 22);
          flare.addColorStop(0, `rgba(255,255,255,${0.4 * strength})`);
          flare.addColorStop(1, "rgba(255,255,255,0.0)");
          ctx.fillStyle = flare;
          ctx.beginPath();
          ctx.arc(beamX, sy, 8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Particle sparks emitted from current progress
      spawnParticles(beamX, py, 6, 260);
      particles = particles.filter((p) => p.life < p.max);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.985;
        p.vy *= 0.985;
        p.life++;
        const fade = 1 - p.life / p.max;
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.2 + (1 - fade) * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 70%, ${0.28 * fade})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(255,255,255,0.6)";
        ctx.fill();
        ctx.restore();
      }

      // Animate step-synced pulses
      pulses = pulses.filter((pl) => pl.a > 0);
      for (const pl of pulses) {
        const yy = pl.p * cssH;
        const g = ctx.createRadialGradient(beamX, yy, pl.r * 0.6, beamX, yy, pl.r);
        g.addColorStop(0, `rgba(255,255,255,${pl.a * 0.25})`);
        g.addColorStop(1, "rgba(255,255,255,0.0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(beamX, yy, pl.r, 0, Math.PI * 2);
        ctx.fill();
        pl.r += 1.4;
        pl.a -= 0.012;
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const cleanup = () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
    return cleanup;
  }, [dotPercents]);

  return (
    <section id="experience" className="relative w-full">
      <div ref={sectionRef} className="relative w-full mx-auto px-20 py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-900/20 via-black to-black" />

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300"
        >
          Experience
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mt-3 text-gray-300 max-w-2xl"
        >
          A concise view of roles, impact, and technologies — from data-heavy UIs to resilient microservices.
        </motion.p>

        {/* Vertical progress rail (left) + sticky right panel that crossfades per step */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-[90px_1fr] gap-8">
          {/* Left sticky progress rail */}
          <div className="relative md:sticky md:top-28 md:h-[60vh] shadow-[0_0_22px_rgba(217,70,239,0.35)]">
            {/* Interstellar canvas background */}
            <canvas ref={railCanvasRef} className="absolute inset-0 -z-10 opacity-80 shadow-[0_0_22px_rgba(217,70,239,0.35)]" />
            {/* Track */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-violet-500/15 via-violet-500/8 to-transparent" />
            {/* Fill (blended, feathered tail) */}
            <motion.div
              className="spell-fill pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[3px] rounded-t-full rounded-b-full bg-gradient-to-b from-fuchsia-400/60 via-violet-400/60 to-cyan-300/60 origin-top mix-blend-screen shadow-[0_0_22px_rgba(217,70,239,0.35)]"
              style={{
                scaleY: progressSpring,
                WebkitMaskImage: "linear-gradient(to bottom, rgba(255,255,255,1) 70%, rgba(255,255,255,0) 100%)",
                maskImage: "linear-gradient(to bottom, rgba(255,255,255,1) 70%, rgba(255,255,255,0) 100%)",
              }}
            />

            {/* Traveling glow sheen over the filled portion */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-0 w-5 h-9 rounded-full mix-blend-screen"
              initial={{ y: "-30%", opacity: 0.7 }}
              animate={{ y: "130%", opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3.6, ease: "easeInOut", repeat: Infinity }}
              style={{
                background: "radial-gradient(ellipse at center, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0) 70%)",
                filter: "blur(8px)",
                WebkitMaskImage: "linear-gradient(to bottom, rgba(255,255,255,1) 70%, rgba(255,255,255,0) 100%)",
                maskImage: "linear-gradient(to bottom, rgba(255,255,255,1) 70%, rgba(255,255,255,0) 100%)",
              }}
            />

            {/* Moving cursor dot removed per design — replaced by spiral rays in canvas */}

            {/* Step dots removed; step positions are emphasized as bright rungs in the canvas */}
          </div>

          {/* Right: sticky content that fades between steps, plus invisible sentinels to drive intersection */}
          <div className="relative">
            {/* Sticky content */}
            <div className="hidden md:block sticky top-24">
              <AnimatePresence mode="wait">
                {STEPS[activeStep] && (
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="pointer-events-none select-none"
                  >
                    {/* Company tenure line */}
                    <div className="mb-2 text-sm text-gray-400">GEP Worldwide · June 2022 — Present</div>
                    <h3 className="text-white font-semibold leading-[1.05] text-4xl lg:text-6xl" style={{ textShadow: "0 0 12px rgba(217,70,239,0.35)" }}>
                      {STEPS[activeStep].title}
                    </h3>
                    <div className="mt-2 text-gray-300">
                      <span className="text-fuchsia-300">{STEPS[activeStep].company}</span>
                      {STEPS[activeStep].location ? <> · {STEPS[activeStep].location}</> : null}
                      <div className="mt-1 text-sm text-gray-400">{STEPS[activeStep].period}</div>
                    </div>
                    {STEPS[activeStep].description && (
                      <p className="mt-4 text-gray-300 text-base lg:text-lg max-w-2xl">
                        {STEPS[activeStep].description}
                      </p>
                    )}
                    {STEPS[activeStep].stack && STEPS[activeStep].stack!.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {STEPS[activeStep].stack!.map((s, i) => (
                          <span key={`${s}-${i}`} className="text-xs rounded-full px-2 py-1 border border-white/10 bg-white/5 text-gray-200">
                            {s}
                          </span>
                        ))}
                      </div>
                    )}
                    {STEPS[activeStep].highlights && STEPS[activeStep].highlights!.length > 0 && (
                      <ul className="mt-5 space-y-2 text-gray-200 max-w-3xl">
                        {STEPS[activeStep].highlights!.map((h, i) => (
                          <li key={i} className="flex gap-2">
                            <span className="mt-[6px] h-[6px] w-[6px] rounded-full bg-fuchsia-400" />
                            <span className="text-sm lg:text-base">{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile fallback: stacked cards */}
            <div className="md:hidden space-y-10">
              {STEPS.map((step, idx) => (
                <div key={idx} className="rounded-xl border border-white/10 bg-white/5 p-5">
                  <h3 className="text-white font-semibold text-2xl">{step.title}</h3>
                  <div className="mt-1 text-xs text-gray-400">
                    <span className="text-fuchsia-300">{step.company}</span>
                    {step.location ? <> · {step.location}</> : null}
                    <span className="block mt-1">{step.period}</span>
                  </div>
                  {step.description && <p className="mt-2 text-gray-300 text-sm">{step.description}</p>}
                  {step.highlights && step.highlights.length > 0 && (
                    <ul className="mt-3 space-y-2 text-gray-200">
                      {step.highlights.map((h, i) => (
                        <li key={i} className="text-sm">{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Invisible sentinels control which step is active as you scroll */}
            <div className="space-y-[50vh] mt-4">
              {STEPS.map((_, idx) => (
                <div
                  key={idx}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  className="h-[40vh]"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Animated glow handled via Framer Motion to avoid styled-jsx dependency */}
    </section>
  );
};
