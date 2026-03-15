"use client";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";

export default function ContactPage() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-foreground selection:text-background flex flex-col justify-between transition-colors duration-500">
      <Header />

      <section className="pt-40 md:pt-56 px-6 md:px-12 max-w-screen-2xl mx-auto w-full">
        <div className="border-b border-[var(--border)] pb-12 md:pb-20 transition-colors duration-500">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none"
          >
            Let's Start <br /> A Project
          </motion.h1>
        </div>
      </section>

      <section className="px-6 md:px-12 py-12 md:py-20 max-w-screen-2xl mx-auto w-full flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-2 font-mono text-xs text-[var(--accent)] uppercase tracking-widest transition-colors duration-500">
            (001) <br/> Connect
          </div>

          <div className="md:col-span-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 font-mono uppercase tracking-widest text-sm">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col gap-4"
            >
              <span className="text-[var(--accent)] transition-colors duration-500">Direct Details</span>
              <a href="mailto:ifrah.imtiaz2612@gmail.com" className="text-foreground hover:opacity-70 transition-opacity border-b border-transparent hover:border-foreground w-fit">
                ifrah.imtiaz2612@gmail.com
              </a>
              <a href="tel:+971554665779" className="text-foreground hover:opacity-70 transition-opacity border-b border-transparent hover:border-foreground w-fit">
                +971 55 466 5779
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col gap-4"
            >
              <span className="text-[var(--accent)] transition-colors duration-500">Socials & Networks</span>
              <a href="https://github.com/Careless-Loser" target="_blank" rel="noreferrer" className="text-foreground hover:opacity-70 transition-opacity border-b border-transparent hover:border-foreground w-fit">
                GitHub ↗
              </a>
              <a href="https://www.instagram.com/iamaddictedtoblackcoffee" target="_blank" rel="noreferrer" className="text-foreground hover:opacity-70 transition-opacity border-b border-transparent hover:border-foreground w-fit">
                Instagram ↗
              </a>
              <a href="#" className="text-foreground hover:opacity-70 transition-opacity border-b border-transparent hover:border-foreground w-fit">
                LinkedIn ↗
              </a>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col gap-4"
            >
              <span className="text-[var(--accent)] transition-colors duration-500">Operating From</span>
              <span className="text-foreground">Ajman / Dubai</span>
              <span className="text-foreground">United Arab Emirates</span>
              <span className="text-[var(--accent)] mt-4 transition-colors duration-500">Local Time: GMT+4</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col gap-4 items-start"
            >
              <span className="text-[var(--accent)] transition-colors duration-500">Documents</span>
              <Magnetic>
                <a 
                  href="/assets/Ifrah Imtiaz CV.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-block border border-[var(--border)] px-6 py-3 rounded-full uppercase text-xs tracking-widest font-mono text-foreground hover:bg-foreground hover:text-background transition-colors duration-500"
                >
                  Download CV ↓
                </a>
              </Magnetic>
            </motion.div>

          </div>
        </div>
      </section>

      <footer className="w-full pb-12 pt-20 px-6 md:px-12 flex justify-center overflow-hidden">
        <Magnetic>
          <a href="mailto:ifrah.imtiaz2612@gmail.com" className="cursor-pointer inline-block">
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="text-[9vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none hover:text-[var(--accent)] transition-colors text-center"
            >
              IFRAH.IMTIAZ2612@GMAIL.COM
            </motion.h2>
          </a>
        </Magnetic>
      </footer>

    </main>
  );
}