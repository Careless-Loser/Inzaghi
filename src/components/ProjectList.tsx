"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { projectsData } from "@/data/projects";

const scrambleChars = '!<>-_\\/[]{}—=+*^?#________';

function ScrambleText({ text, isHovered }: { text: string, isHovered: boolean }) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (!isHovered) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText((prev) =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
          })
          .join("")
      );
      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 2; 
    }, 30);

    return () => clearInterval(interval);
  }, [isHovered, text]);

  return <span>{displayText}</span>;
}

export default function ProjectList() {
  const [hoveredRow, setHoveredRow] = useState<string | null>(null);
  const projects = Object.entries(projectsData).slice(0, 4);

  return (
    <div className="relative w-full flex flex-col border-t border-[var(--border)] transition-colors duration-500">
      
      {projects.map(([id, project]) => (
        <Link 
          href={`/work/${id}`} 
          key={id}
          onMouseEnter={() => setHoveredRow(id)}
          onMouseLeave={() => setHoveredRow(null)}
          className="group w-full flex flex-col md:flex-row justify-between items-start md:items-center py-10 md:py-16 border-b border-[var(--border)] hover:bg-[var(--foreground)]/5 transition-colors duration-500 cursor-pointer px-2 md:px-4 z-10"
        >
          {/* TITLES NOW USE THE THEME'S FOREGROUND COLOR SO THEY ARE VIBRANT! */}
          <h3 className="text-4xl md:text-7xl uppercase font-bold tracking-tighter text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-300">
            <ScrambleText text={project.title} isHovered={hoveredRow === id} />
          </h3>
          
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <p className="text-xs md:text-sm text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors duration-500 uppercase tracking-widest font-mono">
              {project.tags}
            </p>
            <span className="text-[var(--foreground)] group-hover:text-[var(--accent)] transition-all transform group-hover:translate-x-3 duration-300 hidden md:block text-2xl">
              →
            </span>
          </div>
        </Link>
      ))}

      <div className="mt-12 flex justify-center md:justify-end">
        <Link href="/work" className="inline-block border border-[var(--border)] px-8 py-4 rounded-full uppercase text-xs tracking-widest font-mono text-[var(--foreground)] hover:bg-[var(--foreground)] hover:text-[var(--background)] transition-colors duration-500">
          View All Projects ↗
        </Link>
      </div>

    </div>
  );
}