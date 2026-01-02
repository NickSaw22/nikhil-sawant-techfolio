import React from "react";
import Button from "./Button";

interface ProductProps {
  val: {
    title: string;
    description: string;
    live: boolean;
    case: boolean;
  };
  mover: (count: number) => void;
  count: number;
  onLeave?: () => void;
}

export const Product = ({val, mover, count, onLeave}: ProductProps) => {
  return (
    <div className="w-full py-12 text-white">
      <div
        onMouseEnter={() => {
          mover(count);
        }}
        onMouseLeave={onLeave}
        className="max-w-screen-xl mx-auto px-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
      >
        <h1 className="text-3xl md:text-5xl lg:text-6xl capitalize font-semibold">
          {val.title}
        </h1>
        <div className="dets w-full md:w-1/2 lg:w-1/3">
          <p className="mb-6 max-w-md text-base md:text-lg leading-relaxed text-gray-200">
            {val.description}
          </p>
          <div className="flex gap-3">
            {val.live && <Button />}
            {val.case && <Button title="Case Study" />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;