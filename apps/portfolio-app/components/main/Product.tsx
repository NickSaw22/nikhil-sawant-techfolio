import React from "react";
import Button from "./Button";

interface ProductProps {
  val: {
    title: string;
    description: string;
    live: boolean;
    case: boolean;
    tags?: string[];
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
        className="w-full px-6 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
      >
        <div className="flex-1">
          <h1 className="text-3xl md:text-5xl lg:text-6xl capitalize font-semibold">
            {val.title}
          </h1>
          {val.tags && val.tags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {val.tags.map((t, i) => (
                <span
                  key={i}
                  className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
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