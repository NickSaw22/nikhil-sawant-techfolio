import { motion } from "framer-motion";
import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
const Card = ({ width, start, para ,hover="false",title,tagline}) => {
  
  return (
    <motion.div whileHover={{backgroundColor:hover==="true" && "#7443ff",padding:"25px"}} className={`w-1/2 bg-zinc-800 p-5 rounded-xl ${width} min-h-[30rem] flex flex-col justify-between`}>
      <div className="w-full">
        <div className="w-full flex justify-between items-center text-sm">
          <h3>{title}</h3>
          <IoIosArrowRoundForward />
        </div>

        <h1 className="text-3xl font-light mt-5 ">{tagline}</h1>
      </div>
      <div className="down w-full ">
        {start === true && (
          <>
            <h1 className="text-9xl  font-semibold tracking-tight leading-none">
              {" "}
              Start a Project
            </h1>
            <button className="rounded-full mt-5 py-2 px-3 border-[1px] border-zinc-50">
              Contact Us
            </button>
          </>
        )}
        {para && (
          <p className="text-sm text-zinc-500 font-medium">
           Explore what driven our team
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default Card;
