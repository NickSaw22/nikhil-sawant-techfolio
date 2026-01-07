"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export const HeroContent = () => {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 25,
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-20 w-full z-[20] gap-8 lg:gap-16"
      >
        {/* Left content */}
        <div className="flex-1 flex flex-col gap-6 text-left max-w-2xl">
          {/* Small label */}
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 backdrop-blur-sm w-fit"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span className="text-xs md:text-sm font-medium text-white/90 tracking-wide">
              Available for new opportunities
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Building Digital Experiences That{" "}
            <span className="text-white/60">Matter</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={item}
            className="text-base md:text-lg lg:text-xl text-gray-400 leading-relaxed"
          >
            Full Stack Software Engineer specializing in scalable web applications,
            clean architecture, and seamless user experiences.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-4 mt-2"
          >
            <Link
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-white hover:bg-gray-100 px-6 py-3 text-sm font-medium text-black transition-all duration-200"
            >
              View Projects
              <span aria-hidden>→</span>
            </Link>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur px-6 py-3 text-sm font-medium text-white transition-all duration-200"
            >
              Get in Touch
            </Link>
          </motion.div>
        </div>

        {/* Right image */}
        <motion.div
          variants={item}
          className="flex-1 w-full flex justify-center items-center"
        >
          <Image
            src="/hero-bg.svg"
            alt="work icons"
            height={650}
            width={650}
            draggable={false}
            className="select-none w-full max-w-[300px] sm:max-w-md lg:max-w-lg xl:max-w-xl"
            priority
          />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-[20]"
      >
        <span className="text-xs text-white/40 uppercase tracking-widest">Scroll to explore</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border-2 border-white/20 flex items-start justify-center p-1"
        >
          <motion.div className="w-1 h-2 rounded-full bg-white/60" />
        </motion.div>
      </motion.div>
    </div>
  );
};
