"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export const About = () => {
  const container = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 110, damping: 30, staggerChildren: 0.08 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 110, damping: 30 } },
  };
  // Typewriter effect for heading only - renders each character with animation
  const typeChars = (text: string, startDelay = 0.08, charDelay = 0.045) =>
    text.split("").map((ch, i) => {
      if (ch === " ") {
        return <span key={`space-${i}`}> </span>;
      }
      return (
        <motion.span
          key={`${ch}-${i}`}
          initial={{ opacity: 0, y: 4 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 130, damping: 26, delay: startDelay + i * charDelay }}
          className="inline-block"
        >
          {ch}
        </motion.span>
      );
    });
  const Caret = () => (
    <motion.span
      aria-hidden
      className="inline-block align-[-0.1em] ml-1 w-[2px] h-[1em] bg-black"
      animate={{ opacity: [1, 0.2, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
    />
  );
  const skills = ["React", "Next.js", "TypeScript", "Node.js", "Tailwind", "Framer Motion"];
  const aboutCopy = "Building scalable, production-ready applications with a strong focus on clean code, performance, and reliability. Experienced across backend and frontend systems using .NET, Angular, and React, with ownership from development to production deployments.";

  // Scroll-linked motion setup
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const yCopy = useTransform(scrollYProgress, [0, 1], [0, -12]);

  return (
    <section id="about-me" className="relative w-full">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="relative w-screen mx-[calc(50%-50vw)] px-6 py-24 bg-white"
        ref={sectionRef}
      >
        {/* Section label */}
        <motion.h3
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 110, damping: 30 }}
          className="text-xs md:text-sm font-medium tracking-wider uppercase text-gray-500 mb-12 text-center"
        >
          About Me
        </motion.h3>
        
        <div className="w-screen mx-[calc(50%-50vw)] px-6 md:px-10">
          <div className="grid grid-cols-12 gap-6 md:gap-10 items-start">
            <div className="col-span-12 md:col-span-7">
              <div className="w-fit">
                {/* Heading with typewriter effect */}
                <motion.h2
                  variants={item}
                  className="text-[clamp(2rem,3vw,3rem)] font-bold tracking-[-0.02em] text-black leading-[1.1]"
                  style={{ y: yTitle }}
                >
                  {typeChars("Senior Software Engineer | 3.5+ YoE", 0.1, 0.04)}
                  <Caret />
                </motion.h2>
                {/* Underline matches heading width */}
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  whileInView={{ scaleX: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ type: "spring", stiffness: 140, damping: 26, delay: 0.3 }}
                  className="mt-6 h-[1px] origin-left w-full bg-black/15"
                />
              </div>
            </div>
            <div className="col-span-12 md:col-span-5">
              {/* Copy on the right */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ type: "spring", stiffness: 110, damping: 30, delay: 0.2 }}
                className="text-sm md:text-base lg:text-lg text-gray-700 leading-relaxed md:text-right"
                style={{ y: yCopy }}
              >
                {aboutCopy}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Skill chips */}
        <div className="mt-8 flex flex-wrap gap-3">
          {skills.map((s, i) => (
            <motion.span
              key={s}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 130, damping: 26, delay: 0.08 + i * 0.04 }}
              whileHover={{ scale: 1.04 }}
              className="select-none rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs md:text-sm text-gray-800"
            >
              {s}
            </motion.span>
          ))}
        </div>

        {/* CTA Buttons */}
        <motion.div variants={item} className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/resume"
            className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-gray-50 border border-black/20 px-6 py-2.5 text-sm font-medium text-black transition"
          >
            View Resume
            <span aria-hidden>↗</span>
          </Link>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-black hover:bg-black/90 px-6 py-2.5 text-sm font-medium text-white transition"
          >
            Get in Touch
            <span aria-hidden>→</span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};
