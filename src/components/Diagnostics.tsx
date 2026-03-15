"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Diagnostics() {
  const [isActive, setIsActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    // 1. Keyboard shortcut for Desktop
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "d") {
        e.preventDefault();
        setIsActive((prev) => !prev);
      }
    };
    
    // 2. Custom event listener specifically for the Mobile Menu Button!
    const handleMobileOpen = () => setIsActive((prev) => !prev);

    window.addEventListener("keydown", handleKeyDown);
    // This exact event matches the button in your Header.tsx
    window.addEventListener("open-diagnostics", handleMobileOpen);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-diagnostics", handleMobileOpen);
    };
  }, []);

  useEffect(() => {
    if (!isActive) return;
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    const handleScroll = () => setScrollPos(window.scrollY);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isActive]);

  const injectTheme = (themeName: string) => {
    document.documentElement.classList.remove("theme-pink", "theme-blue", "theme-brown", "theme-xray");
    if (themeName !== "default") {
      document.documentElement.classList.add(themeName);
    }
    window.dispatchEvent(new CustomEvent("theme-changed", { detail: themeName }));
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          // MOBILE: Top-center drop down (Exactly like Terminal). DESKTOP: Bottom-right fixed.
          className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] md:w-[350px] md:top-auto md:bottom-6 md:left-auto md:right-6 md:translate-x-0 z-[9999] bg-[#050505]/95 backdrop-blur-md border border-[#222] text-gray-400 font-mono text-[10px] uppercase tracking-widest p-5 rounded-lg flex flex-col gap-4 shadow-2xl"
        >
          <div className="border-b border-[#333] pb-2 font-bold flex justify-between items-center text-white">
            <span className="animate-pulse">System Diagnostics</span>
            <button onClick={() => setIsActive(false)} className="text-gray-500 hover:text-white transition-colors cursor-pointer text-sm">[X]</button>
          </div>
          
          <div className="flex flex-col gap-2 pointer-events-none">
            <div className="flex justify-between gap-8 text-gray-300"><span>Mouse X/Y:</span> <span>[{mousePos.x}, {mousePos.y}]</span></div>
            <div className="flex justify-between gap-8 text-gray-300"><span>Scroll Y:</span> <span>{Math.round(scrollPos)}px</span></div>
          </div>

          <div className="mt-2 border-t border-[#333] pt-4 flex flex-col gap-3">
            <span className="text-gray-500 mb-1">Theme Override Protocols:</span>
            
            <button onClick={() => injectTheme("default")} className="text-left text-gray-400 hover:text-white transition-colors cursor-pointer border-l-2 border-transparent hover:border-gray-400 pl-2 py-1">
              &gt; Init: SYSTEM DEFAULT
            </button>
            <button onClick={() => injectTheme("theme-pink")} className="text-left text-pink-500 hover:text-pink-300 transition-colors cursor-pointer border-l-2 border-transparent hover:border-pink-500 pl-2 py-1">
              &gt; Init: KAWAII PINK
            </button>
            <button onClick={() => injectTheme("theme-blue")} className="text-left text-blue-500 hover:text-blue-300 transition-colors cursor-pointer border-l-2 border-transparent hover:border-blue-500 pl-2 py-1">
              &gt; Init: CORPORATE NAVY
            </button>
            <button onClick={() => injectTheme("theme-brown")} className="text-left text-orange-500 hover:text-orange-300 transition-colors cursor-pointer border-l-2 border-transparent hover:border-orange-500 pl-2 py-1">
              &gt; Init: RETRO BROWN
            </button>
            <button onClick={() => injectTheme("theme-xray")} className="text-left text-red-500 hover:text-red-300 transition-colors cursor-pointer border-l-2 border-transparent hover:border-red-500 pl-2 mt-2 py-1">
              &gt; EXECUTE: SAFE X-RAY
            </button>
            
            <span className="text-[#555] mt-2 text-[8px]">*Use Header Toggle for Light/Dark variants</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}