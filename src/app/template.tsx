"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }, []);

  // SVG Path animation (Curtain sweeping UP)
  const initialPath = `M0 300 Q${dimension.width / 2} 0 ${dimension.width} 300 L${dimension.width} ${dimension.height + 300} L0 ${dimension.height + 300} Z`;
  const targetPath = `M0 300 Q${dimension.width / 2} 300 ${dimension.width} 300 L${dimension.width} ${dimension.height + 300} L0 ${dimension.height + 300} Z`;

  return (
    <div className="relative w-full">
      {/* The revealing curtain */}
      {dimension.width > 0 && (
        <motion.svg
          className="fixed inset-0 w-full h-[150vh] pointer-events-none z-[999] fill-[#050505]"
          initial={{ top: "-300px" }}
          animate={{ top: "-150vh" }}
          transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.path 
            initial={{ d: initialPath }} 
            animate={{ d: targetPath }} 
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }} 
          />
        </motion.svg>
      )}
      
      {/* The actual page content sliding up gently */}
      <motion.div
        initial={{ y: 50, opacity: 0, filter: "blur(10px)" }}
        animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}