"use client";
import { motion, AnimatePresence, animate, useMotionValue, useMotionValueEvent } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export const EntryLoader = () => {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<number | null>(null);
  const mv = useMotionValue(0);
  const [smoothProgress, setSmoothProgress] = useState(0);
  useMotionValueEvent(mv, "change", (latest) => {
    setSmoothProgress(Math.round(latest as number));
  });

  useEffect(() => {
    const step = () => {
      setProgress((p) => {
        const inc = Math.max(1, Math.round(Math.random() * 8));
        const next = Math.min(99, p + inc);
        return next;
      });
    };

    // Start ticking until window load completes
    timerRef.current = window.setInterval(step, 90);

    const onLoad = () => {
      // Finish to 100, then fade out
      if (timerRef.current) window.clearInterval(timerRef.current);
      setProgress(100);
      // small delay to let 100% show
      setTimeout(() => setVisible(false), 300);
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad, { once: true });
    }

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  useEffect(() => {
    // Animate motion value to sync number animation with bar width
    animate(mv, progress, {
      duration: 0.15,
      ease: [0.25, 0.1, 0.25, 1],
    });
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-black"
        >
          <motion.div
            initial={{ scale: 0.98, opacity: 0.7 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="relative w-full h-full"
          >
            {/* Percent value below top-right, very large */}
            <div className="absolute top-16 right-6 md:top-20 md:right-8 text-[25vw] leading-none font-semibold tracking-tight text-white/20">
              {smoothProgress}%
            </div>
            {/* Full-width thin progress bar stuck to top */}
            <div className="absolute top-0 left-0 w-full h-[15px] bg-white/10 overflow-hidden">
              <motion.div
                aria-hidden
                className="h-full"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
                style={{ backgroundColor: "#8b5cf6" }}
              />
            </div>
            
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/60 text-sm">
              Loading experience…
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EntryLoader;