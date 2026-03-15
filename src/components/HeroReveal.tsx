"use client";
import { motion } from "framer-motion";

export default function HeroReveal({ isLoaded }: { isLoaded: boolean }) {
  // The physics of the animation
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      // 0.6s delay waits exactly for the preloader curtain to start lifting
      transition: { staggerChildren: 0.15, delayChildren: 0.6 }, 
    },
  };

  const item = {
    hidden: { y: "100%", opacity: 0, rotate: 2 }, // Slight rotation for tension
    show: { 
      y: "0%", 
      opacity: 1, 
      rotate: 0,
      transition: { duration: 1, ease: [0.19, 1.0, 0.22, 1.0] } // Custom cubic-bezier snap
    },
  };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      // This is the trigger: it stays hidden until isLoaded is true
      animate={isLoaded ? "show" : "hidden"} 
      className="w-full flex flex-col uppercase tracking-tighter leading-[0.85] mt-20"
    >
      <div className="overflow-hidden">
        <motion.h1 variants={item} className="text-[11.5vw] font-bold origin-bottom-left">
          Creative
        </motion.h1>
      </div>
      
      <div className="overflow-hidden">
        {/* Keeping the stroke effect for the second word to maintain the aesthetic */}
        <motion.h1 variants={item} className="text-[11.5vw] font-bold stroke-text origin-bottom-left">
          Technologist
        </motion.h1>
      </div>
    </motion.div>
  );
}