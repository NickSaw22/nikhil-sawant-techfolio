"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { PROJECTS } from "../../constants";

export const Projects = () => {
  return (
    <section id="projects" className="relative w-full">
      <div className="relative max-w-screen-xl mx-auto px-6 py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black" />
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-300"
        >
          Projects
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PROJECTS.map((p, idx) => (
            <motion.a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 backdrop-blur-sm"
            >
              <div className="relative w-full h-44">
                <Image src={p.image} alt={p.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                <p className="mt-2 text-sm text-gray-300 line-clamp-3">{p.description}</p>
              </div>
              <div className="absolute -z-10 inset-0 opacity-30 group-hover:opacity-60 transition-opacity bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-600/30 via-violet-600/20 to-transparent" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};
