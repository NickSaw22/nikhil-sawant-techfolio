"use client";

import { motion } from "framer-motion";
import Link from "next/link";

type Publication = {
  title: string;
  journal: string;
  date: string;
  description: string;
  link?: string;
};

const PUBLICATIONS: Publication[] = [
  {
    title: "Web-based 3D Visualization Tools to Demonstrate the Working of Sorting and Pathfinding Algorithm",
    journal: "International Journal of Computer Applications (IJCA – May 2022 Edition)",
    date: "May 2022",
    description: "This paper focuses on introducing web-based visualization tools that demonstrates the working of famous sorting and pathfinding algorithms. These tools aim toward providing abstract thinking to different algorithms by making use of animations and 3D models which will stimulate the working of each separate algorithm in a unique way using React, React Three Fiber and TweenJs.",
    link: "https://www.ijcaonline.org/archives/volume184/number12/32375-2022922096/", // Replace with actual paper link
  },
];

export const Publications = () => {
  return (
    <section id="publications" className="relative w-full bg-white">
      <div className="relative w-screen mx-[calc(50%-50vw)] px-6 md:px-10 py-24">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black mb-12"
        >
          Publications
        </motion.h2>

        <div className="grid gap-8">
          {PUBLICATIONS.map((pub, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ type: "spring", stiffness: 100, damping: 25, delay: idx * 0.1 }}
              className="relative rounded-2xl border border-black/10 bg-black/5 p-6 md:p-8 hover:border-black/20 hover:bg-black/[0.08] transition-all duration-300"
            >
              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold text-black leading-tight">
                {pub.title}
              </h3>

              {/* Journal & Date */}
              <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">{pub.journal}</span>
                <span className="text-gray-400">•</span>
                <span>{pub.date}</span>
              </div>

              {/* Description */}
              <p className="mt-4 text-base text-gray-700 leading-relaxed">
                {pub.description}
              </p>

              {/* Read Paper Link */}
              {pub.link && (
                <div className="mt-6">
                  <Link
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-black hover:bg-black/90 px-6 py-2.5 text-sm font-medium text-white transition-all duration-200"
                  >
                    <span>📖</span>
                    Read Paper
                  </Link>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
