"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import Header from "@/components/Header";

export default function WorkPage() {
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const projects = Object.entries(projectsData);

  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-foreground selection:text-background transition-colors duration-500">
      <Header />

      <div className="fixed inset-0 z-0 pointer-events-none bg-background transition-colors duration-500">
        <AnimatePresence>
          {activeProject && (
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.4, scale: 1 }} 
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 w-full h-full origin-center"
            >
              {projectsData[activeProject].isVideo ? (
                <video 
                  src={projectsData[activeProject].media} 
                  autoPlay loop muted playsInline 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <img 
                  src={projectsData[activeProject].media} 
                  alt="Project Media" 
                  className="w-full h-full object-cover" 
                />
              )}
              {/* Uses CSS variables to fade into the background dynamically */}
              <div className="absolute inset-0 opacity-90 transition-colors duration-500" 
                   style={{ background: "linear-gradient(to bottom, var(--background), transparent, var(--background))" }} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <section className="relative z-10 w-full pt-48 pb-32 px-6 md:px-12 flex flex-col justify-center min-h-screen">
        
        <div className="mb-20 font-mono text-xs uppercase tracking-widest text-[var(--accent)] border-b border-[var(--border)] pb-6 flex justify-between transition-colors duration-500">
          <span>Index</span>
          <span>{projects.length} Works</span>
        </div>

        <div className="flex flex-col">
          {projects.map(([id, project]) => {
            const isActive = activeProject === id;
            const isHoveringAny = activeProject !== null;

            return (
              <Link href={`/work/${id}`} key={id}>
                <motion.div
                  onMouseEnter={() => setActiveProject(id)}
                  onMouseLeave={() => setActiveProject(null)}
                  className="group flex flex-col md:flex-row justify-between items-start md:items-center py-6 md:py-8 border-b border-[var(--border)] cursor-pointer transition-colors duration-500"
                >
                  <motion.h2
                    animate={{
                      x: isActive ? 40 : 0,
                      opacity: isActive ? 1 : isHoveringAny ? 0.2 : 1,
                    }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className="text-[12vw] md:text-[8vw] font-black uppercase tracking-tighter leading-none text-foreground"
                  >
                    {project.title}
                  </motion.h2>

                  <motion.div
                    animate={{
                      opacity: isActive ? 1 : isHoveringAny ? 0.2 : 1,
                      x: isActive ? -20 : 0,
                    }}
                    transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                    className="font-mono text-xs uppercase tracking-widest text-left md:text-right mt-4 md:mt-0 flex flex-col md:items-end gap-1"
                  >
                    <span className="text-foreground hidden group-hover:block transition-all duration-300">
                      View Case Study ↗
                    </span>
                    <span className="text-[var(--accent)] group-hover:text-foreground transition-colors">
                      {project.tags}
                    </span>
                  </motion.div>

                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}