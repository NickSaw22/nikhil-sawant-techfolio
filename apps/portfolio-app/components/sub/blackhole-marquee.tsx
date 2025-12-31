'use client';

import { motion } from "framer-motion";

interface BlackholeMarqueeProps {
  imagesurls: string[];
  direction?: 'left' | 'right';
}

export const BlackholeMarquee = ({ imagesurls, direction = 'left' }: BlackholeMarqueeProps) => {
  const duration = 15;
  const isLeft = direction === 'left';

  return (
    <div className="relative w-full h-32 flex items-center justify-center overflow-hidden">
      {/* Black hole center effect */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <div className="relative w-32 h-32">
          {/* Outer glow rings */}
          <motion.div
            className="absolute inset-0 rounded-full bg-purple-600/20 blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute inset-2 rounded-full bg-purple-500/30 blur-lg"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.3
            }}
          />
          {/* Core black hole */}
          <div className="absolute inset-6 rounded-full bg-black border-2 border-purple-400/50 shadow-[0_0_30px_rgba(168,85,247,0.6)]" />
          <div className="absolute inset-8 rounded-full bg-gradient-radial from-transparent to-black" />
        </div>
      </div>

      {/* Marquee content - emerging from center */}
      <div className="absolute inset-0 flex items-center">
        <motion.div
          initial={{ x: isLeft ? '50%' : '-50%' }}
          animate={{ x: isLeft ? '-100%' : '100%' }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex items-center gap-16 px-8"
          style={{
            transformOrigin: 'center'
          }}
        >
          {imagesurls.map((url, index) => (
            <motion.div
              key={index}
              className="relative flex-shrink-0"
              style={{
                willChange: 'transform, opacity'
              }}
            >
              <img 
                src={url} 
                className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                alt=""
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Duplicate for seamless loop */}
        <motion.div
          initial={{ x: isLeft ? '50%' : '-50%' }}
          animate={{ x: isLeft ? '-100%' : '100%' }}
          transition={{
            duration: duration,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex items-center gap-16 px-8"
        >
          {imagesurls.map((url, index) => (
            <motion.div
              key={`dup-${index}`}
              className="relative flex-shrink-0"
            >
              <img 
                src={url} 
                className="w-16 h-16 object-contain drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]"
                alt=""
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Gradient masks for fade effect on edges */}
      <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-black via-black/50 to-transparent z-20 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black via-black/50 to-transparent z-20 pointer-events-none" />
    </div>
  );
};

export default BlackholeMarquee;
