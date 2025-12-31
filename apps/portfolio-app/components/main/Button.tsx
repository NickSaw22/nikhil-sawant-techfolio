import React from "react";
import { IoIosReturnRight } from "react-icons/io";

export const Button = ({ title = "Get Started" }) => {
  return (
    <div className="min-w-40 px-3 py-2 bg-zinc-100 text-black rounded-full flex items-center justify-between gap-2 cursor-pointer hover:shadow-[0_0_15px_#00FF19] transition-shadow duration-300">
        <span className="text-sm font-medium">{title}</span>
        <IoIosReturnRight />
    </div>
  );
}

export default Button;