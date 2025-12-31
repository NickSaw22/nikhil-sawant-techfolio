"use client";

import { motion } from "framer-motion";

export const About = () => {
  return (
    <section id="about-me" className="relative w-full">
      <div className="relative max-w-screen-xl mx-auto px-6 py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-violet-300 to-cyan-300"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mt-6 max-w-3xl text-sm md:text-base text-gray-300"
        >
          I build immersive, performant web experiences with a focus on clean UI, robust engineering, and delightful interactions. My toolkit spans modern frontend & backend technologies, and I enjoy crafting space-inspired visuals—galaxies, black holes, and interstellar vibes—while keeping interfaces professional and readable.
        </motion.p>
      </div>
    </section>
  );
};
