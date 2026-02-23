"use client";
import { motion } from "framer-motion";

export default function Home() {
  const revealVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  };

  return (
    <main className="w-full min-h-screen px-4 md:px-12 pt-32 pb-12 flex flex-col items-center uppercase tracking-tighter">
      {/* Hero Section */}
      <section className="h-[80vh] flex flex-col justify-center items-start w-full">
        <div className="overflow-hidden">
          <motion.h1 
            variants={revealVariants} 
            initial="hidden" 
            animate="visible" 
            className="text-6xl md:text-9xl font-bold leading-[0.85]"
          >
            Renowned
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1 
            variants={revealVariants} 
            initial="hidden" 
            animate="visible" 
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-bold leading-[0.85] text-gray-400"
          >
            Creative Engineer
          </motion.h1>
        </div>
      </section>

      {/* Selected Works - Hover reveals and parralax would go here */}
      <section className="w-full py-32 border-t border-gray-800">
        <h2 className="text-2xl mb-12">Selected Works</h2>
        {/* Map through your projects here */}
      </section>

      {/* Footer */}
      <footer className="w-full py-12 flex justify-between items-end border-t border-gray-800 text-sm font-mono">
        <div>
          <p>SOURCE: CARELESSLOSER LAB, JAPAN [EST. 1998]</p>
        </div>
        <div className="flex gap-4">
          <a className="hover:text-gray-400 transition-colors">GitHub</a>
          <a className="hover:text-gray-400 transition-colors">LinkedIn</a>
        </div>
      </footer>
    </main>
  );
}