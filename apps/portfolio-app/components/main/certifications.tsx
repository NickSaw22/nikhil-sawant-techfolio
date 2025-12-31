"use client";

import { motion } from "framer-motion";

type CertItem = {
  name: string;
  issuer: string;
  date: string;
};

const CERTS: CertItem[] = [
  { name: "Next.js Advanced", issuer: "Vercel Academy", date: "2024" },
  { name: "TypeScript Pro", issuer: "Microsoft", date: "2023" },
  { name: "Cloud Fundamentals", issuer: "AWS", date: "2023" },
  { name: "UI Motion Design", issuer: "Framer", date: "2022" },
];

export const Certifications = () => {
  return (
    <section id="certifications" className="relative w-full">
      <div className="relative max-w-screen-xl mx-auto px-6 py-24">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-black to-black" />
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-300 to-pink-300"
        >
          Certifications
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CERTS.map((c, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4"
            >
              <div className="absolute -z-10 inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-fuchsia-600/30 via-violet-600/20 to-transparent" />
              <div className="text-white">
                <h3 className="text-base font-semibold">{c.name}</h3>
                <p className="mt-1 text-sm text-gray-300">{c.issuer}</p>
                <p className="mt-1 text-xs text-gray-400">Issued {c.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
