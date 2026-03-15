"use client";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import Magnetic from "@/components/Magnetic";
import Link from "next/link";
import WordReveal from "@/components/WordReveal";

export default function AboutPage() {
  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-foreground selection:text-background transition-colors duration-500">
      <Header />

      <section className="pt-40 md:pt-56 pb-20 px-6 md:px-12 max-w-screen-2xl mx-auto border-b border-[var(--border)] transition-colors duration-500">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="md:col-span-8"
          >
            <h1 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none mb-6">
              Ifrah Imtiaz
            </h1>
            <p className="text-xl md:text-3xl font-bold uppercase tracking-tighter text-[var(--accent)] transition-colors duration-500">
              Creative Technologist & Frontend Engineer
            </p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="md:col-span-4 font-mono text-xs text-[var(--accent)] uppercase tracking-widest pb-4 md:text-right transition-colors duration-500"
          >
            ( Based in Dubai, UAE ) <br />
            Operating Worldwide
          </motion.div>
        </div>
      </section>

      <section className="px-6 md:px-12 py-32 max-w-screen-2xl mx-auto border-b border-[var(--border)] transition-colors duration-500">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">
          
          <div className="md:col-span-2 font-mono text-xs text-[var(--accent)] uppercase tracking-widest transition-colors duration-500">
            (001) <br/> The Core
          </div>

          <div className="md:col-span-6 flex flex-col gap-12">
            <WordReveal paragraph="My journey into creative computing is unconventional. Transitioning from a background in law to the precision of software engineering, I treat code not just as logic, but as a structural material." />
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg md:text-xl leading-relaxed text-[var(--accent)] space-y-6 transition-colors duration-500"
            >
              <p>
                I operate at the intersection of brutalist digital aesthetics and high-performance architecture. From engineering full-stack corporate portals to experimenting with Arduino hardware and mapping spatial data in Python, my work spans the entire digital spectrum.
              </p>
              <p>
                Driven by a "Techno-Poet" philosophy, I believe that technical precision and artistic vision—much like the composition and lighting in my photography—are two sides of the same coin. I build digital products, brands, and experiences that are built to scale and designed to be remembered.
              </p>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            className="md:col-span-4 w-full aspect-[3/4] bg-[var(--border)] rounded-xl overflow-hidden border border-[var(--border)] transition-colors duration-500"
          >
            <img 
              src="/assets/images/my-picture.jpg" 
              alt="II - Creative Technologist" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

        </div>
      </section>

      <section className="px-6 md:px-12 py-32 max-w-screen-2xl mx-auto border-b border-[var(--border)] transition-colors duration-500">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          <div className="md:col-span-2 font-mono text-xs text-[var(--accent)] uppercase tracking-widest transition-colors duration-500">
            (002) <br/> Arsenal
          </div>

          <div className="md:col-span-10 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 pb-4 border-b border-[var(--border)] transition-colors duration-500">Capabilities</h3>
              <ul className="flex flex-col gap-6 text-lg md:text-xl text-[var(--accent)] uppercase tracking-tight font-bold">
                <li className="flex justify-between items-center group cursor-default">
                  <span className="group-hover:translate-x-2 group-hover:text-foreground transition-all duration-300">Frontend Engineering</span>
                  <span className="font-mono text-xs opacity-50">01</span>
                </li>
                <li className="flex justify-between items-center group cursor-default">
                  <span className="group-hover:translate-x-2 group-hover:text-foreground transition-all duration-300">UI/UX System Design</span>
                  <span className="font-mono text-xs opacity-50">02</span>
                </li>
                <li className="flex justify-between items-center group cursor-default">
                  <span className="group-hover:translate-x-2 group-hover:text-foreground transition-all duration-300">Full-Stack Architecture</span>
                  <span className="font-mono text-xs opacity-50">03</span>
                </li>
                <li className="flex justify-between items-center group cursor-default">
                  <span className="group-hover:translate-x-2 group-hover:text-foreground transition-all duration-300">Creative Computing</span>
                  <span className="font-mono text-xs opacity-50">04</span>
                </li>
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-8 pb-4 border-b border-[var(--border)] transition-colors duration-500">Technologies</h3>
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 font-mono text-sm uppercase tracking-widest text-[var(--accent)] transition-colors duration-500">
                <div className="flex flex-col gap-2">
                  <span className="text-foreground font-bold">Core Web</span>
                  <span>React / Next.js</span>
                  <span>TypeScript</span>
                  <span>Tailwind CSS</span>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-foreground font-bold">Backend & Data</span>
                  <span>Node.js / Express</span>
                  <span>PHP / MySQL</span>
                  <span>Python / Data Sci</span>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <span className="text-foreground font-bold">Design</span>
                  <span>Figma</span>
                  <span>Creative Direction</span>
                  <span>Photography</span>
                </div>
                <div className="flex flex-col gap-2 mt-4">
                  <span className="text-foreground font-bold">Hardware & Other</span>
                  <span>Arduino</span>
                  <span>C++ / Java</span>
                  <span>Roblox / Lua</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <footer className="relative h-[60vh] flex flex-col justify-center items-center text-center overflow-hidden">
        <Magnetic>
          <Link href="/contact" className="relative z-10 w-48 h-48 md:w-64 md:h-64 bg-foreground text-background rounded-full flex flex-col justify-center items-center hover:scale-95 transition-transform duration-500 cursor-pointer">
            <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Start A</span>
            <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter">Project</span>
          </Link>
        </Magnetic>

        <div className="absolute bottom-12 font-mono uppercase text-xs text-[var(--accent)] tracking-widest flex flex-col gap-2 z-10 transition-colors duration-500">
          <span>ifrah.imtiaz2612@gmail.com</span>
          <span>Dubai, UAE</span>
        </div>
      </footer>
    </main>
  );
}