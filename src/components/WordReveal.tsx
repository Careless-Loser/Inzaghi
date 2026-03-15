"use client";
import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function WordReveal({ paragraph }: { paragraph: string }) {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"],
  });

  const words = paragraph.split(" ");

  return (
    <p ref={container} className="flex flex-wrap text-2xl md:text-4xl leading-snug font-light max-w-4xl mix-blend-difference">
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        return (
          <span key={i} className="mr-[8px] relative">
            <span className="absolute opacity-20">{word}</span>
            <motion.span style={{ opacity }}>{word}</motion.span>
          </span>
        );
      })}
    </p>
  );
}