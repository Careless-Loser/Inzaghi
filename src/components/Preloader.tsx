"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const words = [
  "إفراح",      // Arabic
  "イフラ",      // Japanese
  "이프라",      // Korean
  "इफ़रा",      // Hindi
  "Ифра",       // Russian
  "伊弗拉",     // Chinese
  "Ιφρά",       // Greek
  "อิฟราห์",      // Thai
  "ইফরাহ",      // Bengali
  "இஃப்ரா",     // Tamil
  "იფრა",       // Georgian
  "Իֆրահ",      // Armenian
  "ኢፍራ",       // Amharic
  "افراح",      // Urdu
  "ඉෆ්රා",      // Sinhala
  "អ៊ីហ្វ្រា",      // Khmer
  "ອີຟຣາ",      // Lao
  "IFRAH"       // Final landing
];

// 1. UPDATED TO .GIF FORMAT
const customImages = [
  "/assets/images/preloader-1.gif",
  "/assets/images/preloader-2.gif",
  "/assets/images/preloader-3.gif",
  "/assets/images/preloader-4.gif",
  "/assets/images/preloader-5.gif",
  "/assets/images/preloader-6.gif",
  "/assets/images/preloader-7.gif",
];

const backgroundImages = [
  { src: customImages[0], top: "15%", left: "15%", rotation: -10 },
  { src: customImages[1], top: "65%", left: "80%", rotation: 15 },
  { src: customImages[2], top: "75%", left: "20%", rotation: -5 },
  { src: customImages[3], top: "25%", left: "75%", rotation: 10 },
  { src: customImages[4], top: "45%", left: "10%", rotation: -15 },
  { src: customImages[5], top: "85%", left: "55%", rotation: 5 },
  { src: customImages[6], top: "20%", left: "45%", rotation: -8 },
];

export default function Preloader() {
  const [index, setIndex] = useState(0);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  useEffect(() => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
    
    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", resize);

    if (index === words.length - 1) return;
    
    // 2. SLOWED DOWN THE SPEED HERE (300ms for first word, 180ms for the rest)
    const timeout = setTimeout(() => {
      setIndex(index + 1);
    }, index === 0 ? 300 : 180); 
    
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", resize);
    };
  }, [index]);

  const initialCurve = `M0 0 L${dimension.width} 0 Q${dimension.width / 2} 300 0 0`;
  const targetCurve = `M0 0 L${dimension.width} 0 Q${dimension.width / 2} 0 0 0`;

  const curveVariants = {
    initial: { d: initialCurve, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] } },
    exit: { d: targetCurve, transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1], delay: 0.3 } },
  };

  return (
    <motion.div
      variants={{
        initial: { y: "0%" },
        exit: { y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 } },
      }}
      initial="initial"
      exit="exit"
      className="fixed top-0 left-0 w-full h-[100vh] z-[999] pointer-events-none"
    >
      <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
        {backgroundImages.map((img, i) => (
          img.src && (
            <motion.img
              key={i}
              src={img.src}
              alt="Preloader Background"
              className="absolute w-[120px] md:w-[250px] aspect-[3/4] object-cover rounded-lg z-0 opacity-50 pointer-events-none"
              style={{ top: img.top, left: img.left, x: "-50%", y: "-50%" }}
              initial={{ opacity: 0, scale: 0.5, rotate: 0, filter: "blur(10px)" }}
              animate={{
                opacity: index >= i ? 0.3 : 0, 
                scale: index >= i ? 1 : 0.5,
                rotate: index >= i ? img.rotation : 0,
                filter: index >= i ? "blur(0px)" : "blur(10px)",
              }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )
        ))}

        <motion.p
          className="text-5xl md:text-8xl font-bold flex items-center absolute z-10 mix-blend-difference text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {words[index]}
        </motion.p>
      </div>

      {dimension.width > 0 && (
        <svg 
           viewBox={`0 0 ${dimension.width} 300`}
           className="absolute top-[100%] left-0 w-full h-[300px] fill-black pointer-events-none"
        >
          <motion.path variants={curveVariants} initial="initial" exit="exit" />
        </svg>
      )}
    </motion.div>
  );
}