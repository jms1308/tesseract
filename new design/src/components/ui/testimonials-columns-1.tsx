"use client";
import React from "react";
import { motion } from "motion/react";

export const TestimonialsColumn = (props: {
  className?: string;
  images: string[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-4 pb-4 md:gap-6 md:pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.images.map((src, i) => (
                <img 
                  src={src}
                  alt="Loyiha"
                  className="rounded-3xl border border-white/5 bg-[#090611]/70 backdrop-blur-md shadow-xl max-w-[320px] sm:max-w-[280px] md:max-w-[300px] w-full h-auto transition-all duration-300 hover:border-orange-500/20 hover:scale-[1.02]" 
                  key={i}
                />
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
