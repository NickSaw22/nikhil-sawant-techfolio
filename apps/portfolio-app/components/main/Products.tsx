"use client";
import React, { useState } from "react";
import Image from "next/image";
import Product from "./Product";
import { motion } from "framer-motion";
import { StarsCanvas } from "./star-background";

type ProductItem = {
  title: string;
  description: string;
  live: boolean;
  case: boolean;
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
  },
  {
    title: "TTR",
    description:
      "We've created an interactive site using generative AI to allow users to engage with our thinking about Ai, industry trends and design.",
    live: true,
    case: false,
  },
  {
    title: "YIR2022",
    description:
      "Our second year was filled with great events, exciting projects, awards and amazing people - so we made another showcase to celebrate.",
    live: true,
    case: true,
  },
  {
    title: "Yahoo",
    description:
      "We enhanced the New York Fashion Week, by creating a fully digital AR fashion experience for Yahoo and Maisie Wilen, featuring holographic 3D models and an integrated web shop.",
    live: true,
    case: true,
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
  const mover = (val: number) => {
    setHoverIndex(val);
    setActive(true);
  };
  // Optionally, we could add a timeout to collapse after leave if desired.

  return (
    <div className="relative pt-12 overflow-hidden">
      <StarsCanvas />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-zinc-950 to-black" />

      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold capitalize text-white">
          {title}
        </h2>
        {products.map((elem, index) => (
          <React.Fragment key={index}>
            <Product val={elem} mover={mover} count={index} />
            {hoverIndex === index && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: active ? 1 : 0, y: active ? 0 : 12 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="mt-6 mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4"
              >
                <div className="lg:col-span-2 h-[18rem] md:h-[20rem] lg:h-[24rem] overflow-hidden rounded-xl border border-white/10 bg-white/5">
                  <video
                    src={mediaSources[index]?.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-rows-2 gap-4 h-[18rem] md:h-[20rem] lg:h-[24rem]">
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <Image
                      src={mediaSources[index]?.images?.[0] ?? "/projects/project-1.png"}
                      alt="preview-1"
                      fill
                      sizes="(min-width: 1024px) 12rem, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <Image
                      src={mediaSources[index]?.images?.[1] ?? "/projects/project-2.png"}
                      alt="preview-2"
                      fill
                      sizes="(min-width: 1024px) 12rem, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </React.Fragment>
        ))}
      </div>

    </div>
  );
};