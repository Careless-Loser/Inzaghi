"use client";
import { motion } from "framer-motion";

export default function Marquee() {
  return (
    <div className="w-full overflow-hidden bg-white text-black py-3 border-y border-black flex items-center">
      <motion.div
        className="whitespace-nowrap flex text-xl md:text-2xl font-bold uppercase tracking-widest"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
      >
        {/* Change this text below to anything you want! */}
        {Array(10).fill("Creative Technologist @ Dubai — Frontend Developer — UI/UX Engineer — ").map((item, i) => (
          <span key={i} className="mx-4">{item}</span>
        ))}
      </motion.div>
    </div>
  );
}