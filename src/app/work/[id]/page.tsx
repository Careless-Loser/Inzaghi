"use client";
import { use } from "react";
import { projectsData } from "@/data/projects";
import Link from "next/link";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import WordReveal from "@/components/WordReveal";
import Magnetic from "@/components/Magnetic";

export function generateStaticParams() {
  return Object.keys(projectsData).map((key) => ({
    id: key,
  }));
}

// Shrunk the sizes by ~25% for a more subtle background effect
const scatteredBlocks = [
  { top: "15%", left: "10%", width: "w-[60px] md:w-[90px]", rotate: "-rotate-12" },
  { top: "60%", left: "85%", width: "w-[80px] md:w-[110px]", rotate: "rotate-6" },
  { top: "75%", left: "15%", width: "w-[70px] md:w-[100px]", rotate: "-rotate-6" },
  { top: "25%", left: "75%", width: "w-[50px] md:w-[80px]", rotate: "rotate-12" },
  { top: "45%", left: "5%", width: "w-[85px] md:w-[120px]", rotate: "-rotate-[15deg]" },
];

export default function ProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const project = projectsData[id as keyof typeof projectsData];

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center transition-colors duration-500">
        <Header />
        <h1 className="text-4xl uppercase tracking-tighter">Project not found.</h1>
      </div>
    );
  }

  const mobileMockups = project.mockups?.mobile || [];
  const hasMockups = mobileMockups.length > 0;

  return (
    <main className="bg-background min-h-screen text-foreground font-sans selection:bg-foreground selection:text-background overflow-hidden transition-colors duration-500">
      <Header />
      
      {/* =========================================
          SLIDE 1: HERO & SCATTERED MOCKUPS
      ========================================= */}
      <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-32 pb-20">
        <nav className="absolute top-32 left-6 md:left-12 uppercase tracking-widest text-xs font-mono z-20">
          <Link href="/work" className="hover:text-[var(--accent)] border-b border-[var(--border)] pb-1 transition-colors duration-500">
            ← Back to Works
          </Link>
        </nav>

        {scatteredBlocks.map((block, i) => {
          if (hasMockups) {
            const imgSrc = mobileMockups[i % mobileMockups.length];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                className={`absolute ${block.width} z-0 pointer-events-none transition-all duration-500 ${block.rotate}`}
                style={{ top: block.top, left: block.left }}
              >
                {/* Wrapper to hold the image and the black overlay together */}
                <div className="relative rounded-xl overflow-hidden shadow-2xl border border-[var(--border)]">
                  {/* The Black Opacity Overlay */}
                  <div className="absolute inset-0 bg-black/60 z-10 transition-colors duration-500"></div>
                  <img src={imgSrc} alt="" className="w-full h-auto block object-cover" />
                </div>
              </motion.div>
            );
          }
          
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
              className={`absolute ${block.width} aspect-[9/16] bg-[var(--border)] rounded-xl z-0 pointer-events-none transition-colors duration-500 ${block.rotate}`}
              style={{ top: block.top, left: block.left }}
            />
          );
        })}

        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="relative z-10 w-full flex flex-col items-center text-center mt-20"
        >
          <h1 className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none mb-6 text-foreground transition-colors duration-500">
            {project.title}
          </h1>
          <p className="text-sm md:text-base font-mono uppercase tracking-widest text-[var(--accent)] max-w-xl transition-colors duration-500">
            {project.tags}
          </p>
        </motion.div>
      </section>

      {/* =========================================
          SLIDE 3: PROJECT SUMMARY & GOALS
      ========================================= */}
      <section className="px-6 md:px-12 py-32 border-t border-[var(--border)] transition-colors duration-500">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-3 text-xs font-mono text-[var(--accent)] uppercase tracking-widest transition-colors duration-500">
            (001) <br/> Project Overview
          </div>
          <div className="md:col-span-9">
            <div className="mb-12">
               <WordReveal paragraph={project.description || "Detailed overview goes here."} />
            </div>
            <div className="text-lg md:text-xl leading-relaxed text-[var(--accent)] space-y-8 max-w-4xl transition-colors duration-500">
              {project.details?.split('\n\n').map((paragraph: string, index: number) => (
                <p key={index}>{paragraph}</p>
              )) || <p>Additional project details and challenges overcome.</p>}
            </div>
            <div className="mt-12">
              <a href={project.link || "#"} target="_blank" rel="noopener noreferrer" className="inline-block border border-[var(--border)] px-8 py-4 rounded-full uppercase text-xs tracking-widest hover:bg-foreground hover:text-background transition-colors duration-500">
                Visit Live Project ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          SLIDE 4: DESIGN PROCESS TIMELINE
      ========================================= */}
      <section className="px-6 md:px-12 py-32 bg-foreground/5 border-y border-[var(--border)] transition-colors duration-500">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
          <div className="md:col-span-3 text-xs font-mono text-[var(--accent)] uppercase tracking-widest transition-colors duration-500">
            (002) <br/> Design Process
          </div>
          <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-8">
            {project.process?.map((step: any, i: number) => (
              <div key={i} className="border-l-2 border-[var(--border)] pl-8 py-2 relative transition-colors duration-500">
                <div className="absolute -left-[9px] top-4 w-4 h-4 bg-foreground rounded-full transition-colors duration-500"></div>
                <h4 className="text-2xl font-bold uppercase tracking-tighter mb-2 text-foreground transition-colors duration-500">
                  0{i + 1} — {step.title}
                </h4>
                <p className="text-[var(--accent)] leading-relaxed transition-colors duration-500">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          SLIDE 8 & 10: STYLE GUIDE (COLOR & TYPOGRAPHY)
      ========================================= */}
      {project.typography && project.palette && (
        <section className="px-6 md:px-12 py-32 transition-colors duration-500">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-3 text-xs font-mono text-[var(--accent)] uppercase tracking-widest transition-colors duration-500">
              (003) <br/> System Aesthetics
            </div>
            
            <div className="md:col-span-9 grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="border border-[var(--border)] bg-foreground/5 p-12 flex flex-col justify-center items-start rounded-lg transition-colors duration-500">
                <h4 className="text-[15vw] md:text-[8vw] font-black tracking-tighter leading-none mb-4 text-foreground" style={{ fontFamily: project.typography.font }}>Aa</h4>
                <p className="font-mono uppercase tracking-widest text-xs text-[var(--accent)] transition-colors duration-500">
                  Primary Font: {project.typography.font} <br/> {project.typography.desc}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="uppercase font-bold tracking-tighter text-2xl mb-4 text-foreground transition-colors duration-500">Approved Palette</h4>
                <div className="grid grid-cols-3 gap-4 h-full">
                  <div className="rounded-lg p-4 flex items-end" style={{ backgroundColor: project.palette[0] }}>
                    <span className="text-white text-xs font-mono ">{project.palette[0]}</span>
                  </div>
                  <div className="rounded-lg p-4 flex items-end" style={{ backgroundColor: project.palette[1] }}>
                    <span className="text-white text-xs font-mono ">{project.palette[1]}</span>
                  </div>
                  <div className="rounded-lg p-4 flex items-end border border-[var(--border)]" style={{ backgroundColor: project.palette[2] }}>
                    <span className="text-white text-xs font-mono">{project.palette[2]}</span>
                  </div>
                  <div className="rounded-lg p-4 flex items-end border border-[var(--border)] col-span-3" style={{ backgroundColor: project.palette[3] }}>
                    <span className="text-gray-500 text-xs font-mono ">Base: {project.palette[3]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================
          SLIDE 11-14: TABLET & MOBILE MOCKUPS
      ========================================= */}
      {(project.mockups?.tablet || hasMockups) && (
        <section className="px-6 md:px-12 py-32 bg-foreground/5 border-y border-[var(--border)] transition-colors duration-500">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
            <div className="md:col-span-3 text-xs font-mono text-[var(--accent)] uppercase tracking-widest transition-colors duration-500">
              (004) <br/> Responsive Mockups
            </div>
            
            <div className="md:col-span-9 flex flex-col gap-12">
              
              {/* Tablet Mockup (Edge-to-Edge Container) */}
              {project.mockups?.tablet && (
                <div className="w-full bg-background rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl transition-colors duration-500">
                  <video 
                    src={project.mockups.tablet} 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-auto block object-contain" 
                  />
                </div>
              )}

              {/* Mobile Mockups */}
              {hasMockups && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {mobileMockups.map((img: string, i: number) => (
                    <div 
                      key={i} 
                      className="w-full bg-background rounded-2xl overflow-hidden border border-[var(--border)] shadow-2xl transition-colors duration-500"
                    >
                      <img 
                        src={img} 
                        alt={`Mobile Interface ${i+1}`} 
                        className="w-full h-auto block object-contain" 
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* =========================================
          SLIDE 15: FINAL OUTPUT MEDIA
       ========================================= */}
      <section className="px-6 md:px-12 py-32 transition-colors duration-500">
        <div className="mb-20 text-xs font-mono text-[var(--accent)] uppercase tracking-widest transition-colors duration-500">
            (005) <br/> Final Output
        </div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} 
          whileInView={{ opacity: 1, scale: 1 }} 
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
          // Added aspect-video back to create a bounding box for object-contain
          className="w-full aspect-video bg-[var(--border)] rounded-xl overflow-hidden shadow-2xl transition-colors duration-500 flex justify-center items-center"
        >
          {project.isVideo ? (
            // Stripped down to just w-full h-full object-contain
            <video src={project.media} autoPlay loop muted playsInline className="w-full h-full object-contain" />
          ) : (
            <img src={project.media} alt={project.title} className="w-full h-full object-contain" />
          )}
        </motion.div>
      </section>

      {/* =========================================
          SLIDE 16: CLOSE / LET'S TALK
      ========================================= */}
      <footer className="relative h-[80vh] flex flex-col justify-center items-center text-center overflow-hidden border-t border-[var(--border)] mt-32 transition-colors duration-500">
        <Magnetic>
          <Link href="/contact" className="relative z-10 w-64 h-64 md:w-96 md:h-96 bg-foreground text-background rounded-full flex flex-col justify-center items-center hover:scale-95 transition-all duration-500 cursor-pointer shadow-2xl">
            <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Let's Work</span>
            <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Together</span>
          </Link>
        </Magnetic>

        <div className="absolute bottom-12 font-mono uppercase text-xs text-[var(--accent)] tracking-widest flex flex-col gap-2 z-10 transition-colors duration-500">
          <span>ifrah.imtiaz2612@gmail.com</span>
          <span>Dubai, UAE</span>
        </div>

        {scatteredBlocks.slice(0, 3).map((block, i) => {
           if (hasMockups) {
             const imgSrc = mobileMockups[i % mobileMockups.length];
             return (
               <div
                 key={`footer-${i}`}
                 className={`absolute ${block.width} z-0 pointer-events-none transition-all duration-500 ${block.rotate}`}
                 style={{ top: block.top, left: block.left }}
               >
                 <div className="relative rounded-xl overflow-hidden shadow-2xl border border-[var(--border)]">
                   <div className="absolute inset-0 bg-black/60 z-10 transition-colors duration-500"></div>
                   <img src={imgSrc} alt="" className="w-full h-auto block object-cover" />
                 </div>
               </div>
             );
           }
           
           return (
             <div
               key={`footer-${i}`}
               className={`absolute ${block.width} aspect-[9/16] bg-[var(--border)] rounded-xl z-0 pointer-events-none transition-colors duration-500 ${block.rotate}`}
               style={{ top: block.top, left: block.left }}
             />
           );
        })}
      </footer>

    </main>
  );
}