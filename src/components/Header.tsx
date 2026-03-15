"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");
  const [isDark, setIsDark] = useState(true);

  // Live UAE Clock
  useEffect(() => {
    const updateClock = () => {
      const uaeTime = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Dubai",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(uaeTime);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Theme Toggle Engine
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const navLinks = [
    { title: "Home", href: "/" },
    { title: "Work", href: "/work" },
    { title: "About", href: "/about" },
    { title: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* DESKTOP & MOBILE TOP BAR */}
      <header className="fixed top-0 left-0 w-full p-6 md:px-12 md:py-8 flex justify-between items-center z-[100] text-foreground transition-colors duration-500">
        
        <Link href="/" className="font-bold uppercase tracking-widest text-xl z-[100]">
          II.
        </Link>
        
        {/* DESKTOP NAV */}
        <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-10 font-mono text-xs uppercase tracking-widest">
          {navLinks.map((link) => (
            <Link key={link.title} href={link.href} className="hover:text-[var(--accent)] transition-colors">
              {link.title}
            </Link>
          ))}
        </nav>

        {/* DESKTOP WIDGETS */}
        <div className="hidden md:flex items-center gap-8 font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]">
          <button 
            onClick={() => setIsDark(!isDark)} 
            className="hover:text-foreground transition-colors border border-[var(--border)] px-4 py-2 rounded-full cursor-pointer"
          >
            {isDark ? 'Switch to Light' : 'Switch to Dark'}
          </button>

          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>DXB {time}</span>
          </div>
        </div>

        {/* MOBILE HAMBURGER BUTTON */}
        <button 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="md:hidden font-mono text-xs uppercase tracking-widest cursor-pointer z-[100]"
        >
          {menuOpen ? "Close [X]" : "Menu [=]"}
        </button>
      </header>

      {/* MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 w-full h-screen bg-background z-[90] flex flex-col justify-center px-6 md:hidden"
          >
            <div className="flex flex-col gap-6 w-full mt-20">
              {navLinks.map((link, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.76, 0, 0.24, 1] }}
                  >
                    <Link 
                      href={link.href} 
                      onClick={() => setMenuOpen(false)}
                      className="text-6xl font-black uppercase tracking-tighter text-foreground active:text-[var(--accent)] transition-colors inline-block"
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                </div>
              ))}
            </div>

            <div className="mt-auto mb-12 flex flex-col gap-6 font-mono text-xs uppercase tracking-widest text-[var(--accent)]">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span>DXB TIME: {time}</span>
              </div>
              <button onClick={() => setIsDark(!isDark)} className="text-left active:text-foreground transition-colors w-fit border-b border-[var(--border)] pb-1">
                Theme: {isDark ? "Dark Mode" : "Light Mode"}
              </button>
              
              {/* CLEAN, MINIMALIST EASTER EGG BUTTONS */}
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => {
                    window.dispatchEvent(new Event("open-terminal"));
                    setMenuOpen(false); 
                  }} 
                  className="text-left text-[10px] opacity-50 hover:opacity-100 transition-opacity w-fit cursor-pointer"
                >
                  [Tap Here] or press Ctrl+I for Terminal
                </button>
                
                <button 
                  onClick={() => {
                    window.dispatchEvent(new Event("open-diagnostics"));
                    setMenuOpen(false); 
                  }} 
                  className="text-left text-[10px] opacity-50 hover:opacity-100 transition-opacity w-fit cursor-pointer"
                >
                  [Tap Here] or press Ctrl+D for Themes
                </button>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}