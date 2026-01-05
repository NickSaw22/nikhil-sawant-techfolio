"use client";
import React, { useState } from "react";
import Image from "next/image";
import Product from "./Product";
import { motion } from "framer-motion";

type ProductItem = {
  title: string;
  description: string;
  live: boolean;
  case: boolean;
  tags?: string[];
};

type ProductsProps = {
  items?: ProductItem[];
  videos?: string[];
  media?: { video?: string; images?: string[] }[];
  title?: string;
};

const defaultItems: ProductItem[] = [
  {
    title: "arqitel",
    description:
      "With a continuous 3D animation, we showcase Arqitel approach and show how migration data translates into real estate.",
    live: true,
    case: false,
    tags: ["Next.js", "Three.js", "Framer Motion"],
  },
  {
    title: "TTR",
    description:
      "We've created an interactive site using generative AI to allow users to engage with our thinking about Ai, industry trends and design.",
    live: true,
    case: false,
    tags: ["React", "Tailwind", "AI"],
  },
  {
    title: "YIR2022",
    description:
      "Our second year was filled with great events, exciting projects, awards and amazing people - so we made another showcase to celebrate.",
    live: true,
    case: true,
    tags: ["Next.js", "Edge Runtime"],
  },
  {
    title: "Yahoo",
    description:
      "We enhanced the New York Fashion Week, by creating a fully digital AR fashion experience for Yahoo and Maisie Wilen, featuring holographic 3D models and an integrated web shop.",
    live: true,
    case: true,
    tags: ["WebGL", "AR", "E-commerce"],
  },
];

const defaultVideos = [
  "/videos/arqitel.webm",
  "/videos/ttl.webm",
  "/videos/2022.webm",
  "/videos/blackhole.webm",
];

const defaultImages: string[][] = [
  ["/projects/project-1.png", "/projects/project-2.png"],
  ["/projects/project-2.png", "/projects/project-3.png"],
  ["/projects/project-3.png", "/projects/project-1.png"],
  ["/projects/project-2.png", "/projects/project-1.png"],
];

export const Products = ({ items, videos, media, title = "Projects" }: ProductsProps) => {
  const products = items && items.length ? items : defaultItems;
  const videoSources = videos && videos.length ? videos : defaultVideos;
  const mediaSources = media && media.length
    ? media
    : products.map((_, i) => ({ video: videoSources[i % videoSources.length], images: defaultImages[i % defaultImages.length] }));

  const [active, setActive] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const COLORS = ["#f75d00", "#4a576b", "#20275d", "#ec4899", "#f59e0b", "#06b6d4"];
  const [accentColor, setAccentColor] = useState<string>(COLORS[0] ?? "#3b82f6");
  const mover = (val: number) => {
    setHoverIndex(val);
    setActive(true);
    const next = COLORS[Math.floor(Math.random() * COLORS.length)] ?? accentColor;
    setAccentColor(next);
  };
  const handleLeave = () => {
    setActive(false);
    setHoverIndex(null);
  };
  // Optionally, we could add a timeout to collapse after leave if desired.

  return (
    <div id="projects" className="relative pt-12 overflow-hidden bg-black">

      <div className="w-full px-6 lg:px-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold capitalize text-white">
          {title}
        </h2>
      </div>
      <div className="relative w-screen mx-[calc(50%-50vw)]">
        {products.map((elem, index) => (
          <div
            key={index}
            className="relative w-full isolate"
            onMouseEnter={() => mover(index)}
            onMouseLeave={handleLeave}
          >
            <motion.div
              key={`${accentColor}-${index}`}
              initial={{ opacity: 0, y: -20, scaleY: 0 }}
              animate={{ opacity: hoverIndex === index && active ? 1 : 0, y: 0, scaleY: hoverIndex === index && active ? 1 : 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 24 }}
              className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
              style={{ backgroundColor: accentColor, transformOrigin: "top" }}
            />

            <div className="relative z-10">
              <Product val={elem} mover={mover} count={index} />
            </div>

            {hoverIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: active ? 1 : 0, y: active ? 0 : 12 }}
                transition={{ type: "spring", stiffness: 140, damping: 26, delay: 0.04 }}
                className="relative z-10 mt-6 pb-10 px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-3 gap-6"
              >
                <motion.div
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", stiffness: 130, damping: 26, delay: 0.08 }}
                  className="lg:col-span-2 h-[18rem] md:h-[20rem] lg:h-[24rem] overflow-hidden rounded-xl border border-white/10 shadow-2xl shadow-black/40 bg-transparent"
                >
                  <video
                    src={mediaSources[index]?.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="grid grid-rows-2 gap-6 h-[18rem] md:h-[20rem] lg:h-[24rem]">
                  <motion.div
                    initial={{ opacity: 0, y: 16, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 130, damping: 26, delay: 0.12 }}
                    className="relative overflow-hidden rounded-xl border border-white/10 shadow-xl shadow-black/40 bg-transparent"
                  >
                    <Image
                      src={mediaSources[index]?.images?.[0] ?? "/projects/project-1.png"}
                      alt="preview-1"
                      fill
                      sizes="(min-width: 1024px) 12rem, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 18, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", stiffness: 130, damping: 26, delay: 0.16 }}
                    className="relative overflow-hidden rounded-xl border border-white/10 shadow-xl shadow-black/40 bg-transparent"
                  >
                    <Image
                      src={mediaSources[index]?.images?.[1] ?? "/projects/project-2.png"}
                      alt="preview-2"
                      fill
                      sizes="(min-width: 1024px) 12rem, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};