"use client";

import { LINKS } from "../../constants";
import { motion } from "framer-motion";

export const SourceCode = () => {
  return (
    <section id="source-code" className="relative w-full">
      <div className="relative max-w-screen-xl mx-auto px-6 py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-300 to-fuchsia-300"
        >
          Source Code
        </motion.h2>
        <motion.a
          href={LINKS.sourceCode}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="inline-block mt-6 px-5 py-2 rounded-md border border-white/15 bg-white/5 text-white hover:bg-white/10 backdrop-blur-sm"
        >
          View on GitHub
        </motion.a>
      </div>
    </section>
  );
};
