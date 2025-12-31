"use client";
import React, { useState } from "react";
import Product from "./Product";
import { motion } from "framer-motion";

export const Products = () => {
  let products = [
    {
      //write a descriptions
      title: "arqitel",
      description:
        "With a continuous 3D animation, we showcase Arqitel approach and show how migration data translates into real estate.",
      live: true,
      case: false,
    },
    {
      //write a descriptions
      title: "TTR",
      description:
        "We've created an interactive site using generative AI to allow users to engage with our thinking about Ai, industry trends and design.",
      live: true,
      case: false,
    },
    {
      //write a descriptions
      title: "YIR2022",
      description:
        "Our second year was filled with great events, exciting projects, awards and amazing people - so we made another showcase to celebrate.",
      live: true,
      case: true,
    },
    {
      //write a descriptions
      title: "Yahoo",
      description:
        "We enhanced the New York Fashion Week, by creating a fully digital AR fashion experience for Yahoo and Maisie Wilen, featuring holographic 3D models and an integrated web shop.",
      live: true,
      case: true,
    },
  ];

  const [pos, setPos] = useState(0);
  const mover = (val: number) => {
    setPos(val * 23);
  };

  return (
    <div className="pt-10 bg-zinc-900 relative">
      <div className="text-6xl capitalize font-semibold ml-10">Projects</div>
      {products.map((elem, index) => (
        <Product key={index} val={elem} mover={mover} count={index} />
      ))}
      <div className="absolute top-0 w-full h-full pointer-events-none ">
        <motion.div 
          initial={{ y: pos, x: "-50%" }}
          animate={{ y: pos + `rem` }}
          transition={{ease:[0.76, 0, 0.24, 1], duration:.5}}
          className="window absolute w-[32rem] h-[23rem]   left-[45%]  overflow-hidden"
        >
          <motion.video 
          src="/videos/arqitel.webm" autoPlay loop muted
            animate={{ y: -pos + `rem` }}
            transition={{ease:[0.76, 0, 0.24, 1], duration:.5}}
            className=" w-full h-full  "
          ></motion.video>
          <motion.video 
          src="/videos/ttl.webm" muted autoPlay loop
            animate={{ y: -pos + `rem` }}
            transition={{ease:[0.76, 0, 0.24, 1], duration:.5}}
            className=" w-full h-full"
          ></motion.video>
          <motion.video muted
          src="/videos/2022.webm"
          autoPlay loop
            animate={{ y: -pos + `rem` }}
            transition={{ease:[0.76, 0, 0.24, 1], duration:.5}}
            className=" w-full h-full  "
          ></motion.video>
          <motion.video muted
          src="/videos/blackhole.webm" autoPlay loop
            animate={{ y: -pos + `rem` }}
            transition={{ease:[0.76, 0, 0.24, 1], duration:.5}}
            className=" w-full h-full   "
          ></motion.video>
        </motion.div>
       
      </div>
    </div>
  );
};