"use client";
import React from "react";
import { motion } from "motion/react";
import { ChevronLeft, Bell, MoreHorizontal } from "lucide-react";

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Array<{
    username: string;
    name: string;
    image: string;
    posts: string;
    followers: string;
    following: string;
    category: string;
  }>;
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
        className="flex flex-col gap-6 pb-6"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ username, name, image, posts, followers, following, category }, i) => (
                <div 
                  className="p-6 rounded-3xl border border-white/5 bg-[#090611]/70 backdrop-blur-md shadow-xl text-white max-w-xs w-full font-sans text-xs flex flex-col gap-4 transition-all duration-300 hover:border-orange-500/20" 
                  key={i}
                >
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-neutral-400">
                    <div className="flex items-center gap-1.5">
                      <ChevronLeft className="w-4 h-4 text-neutral-300" />
                      <span className="font-semibold text-neutral-200 tracking-tight">{username}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bell className="w-3.5 h-3.5" />
                      <MoreHorizontal className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Profile info row */}
                  <div className="flex items-center gap-4">
                    <img
                      width={48}
                      height={48}
                      src={image}
                      alt={name}
                      className="h-12 w-12 rounded-full object-cover border border-white/10 p-0.5"
                    />
                    <div className="flex flex-col gap-0.5">
                      <div className="font-bold text-[13px] tracking-tight leading-snug text-white line-clamp-1">{name}</div>
                      <div className="text-[10px] text-neutral-500 font-medium">{category}</div>
                    </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-3 gap-2 py-2.5 border-y border-white/5 text-center bg-white/[0.01] rounded-2xl">
                    <div>
                      <div className="font-bold text-white text-xs">{posts}</div>
                      <div className="text-[9px] text-neutral-500 font-medium uppercase tracking-wider">posts</div>
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">{followers}</div>
                      <div className="text-[9px] text-neutral-500 font-medium uppercase tracking-wider">followers</div>
                    </div>
                    <div>
                      <div className="font-bold text-white text-xs">{following}</div>
                      <div className="text-[9px] text-neutral-500 font-medium uppercase tracking-wider">following</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
