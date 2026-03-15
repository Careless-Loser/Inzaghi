"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import Header from "@/components/Header";
import Marquee from "@/components/Marquee";
import HeroReveal from "@/components/HeroReveal";
import ProjectList from "@/components/ProjectList";
import Preloader from "@/components/Preloader";
import Magnetic from "@/components/Magnetic";

const InteractiveBackground = () => {
  const [theme, setTheme] = useState("default");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleThemeChange = (e: any) => setTheme(e.detail);
    window.addEventListener("theme-changed", handleThemeChange);

    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("theme-changed", handleThemeChange);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden transition-colors duration-500">
      
      {(theme === "default" || theme === "theme-xray") && (
        <div 
          className="absolute inset-0 opacity-40 transition-opacity duration-300"
          style={{ background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, var(--border), transparent 40%)` }}
        />
      )}

      {(theme === "theme-pink" || theme === "theme-blue" || theme === "theme-brown") && (
        <div className="absolute inset-0 opacity-60">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 2]} />
            
            <Float speed={2} rotationIntensity={1} floatIntensity={2}>
              {theme === "theme-pink" && (
                <mesh scale={1.5}>
                  <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                  <meshStandardMaterial color="#ff69b4" roughness={0.2} metalness={0.8} />
                </mesh>
              )}
              
              {theme === "theme-blue" && (
                <mesh scale={2}>
                  <icosahedronGeometry args={[1, 1]} />
                  <meshBasicMaterial color="#38bdf8" wireframe />
                </mesh>
              )}
              
              {theme === "theme-brown" && (
                <mesh scale={1.8}>
                  <sphereGeometry args={[1, 64, 64]} />
                  <MeshDistortMaterial color="#d97706" distort={0.4} speed={2} roughness={0.8} />
                </mesh>
              )}
            </Float>
          </Canvas>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  
  const { scrollYProgress } = useScroll();
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(springX, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="bg-background text-foreground min-h-screen overflow-x-hidden relative transition-colors duration-500">
      <InteractiveBackground />
      <AnimatePresence>
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>
      <Header />
      <section className="relative min-h-[100vh] w-full pt-24 md:pt-32 pb-12 px-4 md:px-12 flex flex-col justify-between overflow-hidden">
        <div onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} className="absolute inset-0 z-0 flex items-center justify-center pointer-events-auto">
          <motion.div style={{ y: imageY, rotateX, rotateY, transformPerspective: 1000 }} className="w-[60%] md:w-[25%] aspect-[3/4] opacity-100 pointer-events-none rounded-xl overflow-hidden shadow-2xl">
             <img 
               src="/assets/images/my-picture.jpg" 
               alt="Ifrah" 
               className="w-full h-full object-cover scale-110 transition-all duration-700" 
               style={{ filter: "var(--img-filter)" }} 
             />
          </motion.div>
        </div>
        <div className="relative z-10 w-full flex justify-end pointer-events-none">
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: isLoading ? 0 : 1, x: 0 }} transition={{ duration: 1, delay: 3 }} className="w-full md:w-1/3 mt-8 md:mt-0">
            <p className="text-sm leading-tight font-medium tracking-tight text-[var(--accent)] transition-colors duration-500">
               Dubai based Creative Technologist. <br /> Building digital products, brands, and experiences.
            </p>
          </motion.div>
        </div>
        <motion.div style={{ y: textY }} className="relative z-10 flex flex-col items-center md:items-start pointer-events-none">
          <HeroReveal isLoaded={!isLoading} />
          <motion.div style={{ opacity: opacityFade }} className="absolute -bottom-24 left-1/2 md:left-12 -translate-x-1/2 md:translate-x-0 flex flex-col items-center gap-4">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--accent)] transition-colors duration-500">Scroll</span>
            <div className="w-[1px] h-12 bg-[var(--border)] relative overflow-hidden transition-colors duration-500">
              <motion.div className="w-full h-full bg-foreground origin-top" initial={{ scaleY: 0 }} animate={{ scaleY: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
            </div>
          </motion.div>
        </motion.div>
      </section>
      <div className="relative z-20"><Marquee /></div>
      <section id="about" className="py-20 md:py-32 px-4 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 relative z-20">
        <div className="col-span-1 md:col-span-2 text-sm font-mono text-[var(--accent)] uppercase transition-colors duration-500">
           (001) <br/> About Me
        </div>
        <div className="col-span-1 md:col-span-10 text-3xl md:text-5xl font-bold uppercase tracking-tighter leading-[1.1] text-foreground">
           <div className="overflow-hidden pb-2"><motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}>I am a selectively skilled frontend</motion.div></div>
           <div className="overflow-hidden pb-2"><motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}>developer with a strong focus on</motion.div></div>
           <div className="overflow-hidden pb-2 text-[var(--accent)] transition-colors duration-500"><motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}>producing high quality & impactful</motion.div></div>
           <div className="overflow-hidden pb-2 text-[var(--accent)] transition-colors duration-500"><motion.div initial={{ y: "100%" }} whileInView={{ y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.4 }}>digital experiences.</motion.div></div>
        </div>
      </section>
      <section id="projects" className="w-full py-16 md:py-24 px-4 md:px-12 relative z-20">
        <motion.div 
          initial={{ opacity: 0, borderBottomColor: "transparent" }}
          whileInView={{ opacity: 1, borderBottomColor: "var(--border)" }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="flex justify-between items-center border-b pb-8 mb-12 uppercase text-xs tracking-widest font-mono border-[var(--border)] transition-colors duration-500"
        >
          {/* Explicitly tied to the theme's bright foreground color */}
          <h2 className="text-[var(--foreground)] font-bold">Selected Works</h2>
          {/* Tied to the theme's secondary accent color */}
          <span className="text-[var(--accent)]">(2023 - 2026)</span>
        </motion.div>
        
        <ProjectList />
      </section>
      <footer id="contact" className="h-[50vh] flex flex-col justify-center items-center text-center mt-12 md:mt-24 relative overflow-hidden z-20">
         <motion.div className="absolute inset-0 z-0 opacity-50 transition-colors duration-500" style={{ background: "linear-gradient(to top, var(--border), transparent)", y: useTransform(scrollYProgress, [0.8, 1], ["-20%", "0%"]) }} />
         <div className="relative z-10">
           <Magnetic><h2 onClick={scrollToContact} className="text-[15vw] md:text-[10vw] font-bold uppercase leading-none mb-8 tracking-tighter cursor-pointer hover:text-[var(--accent)] text-foreground transition-colors">Let's Talk</h2></Magnetic>
           <a href="mailto:ifrah.imtiaz2612@gmail.com" className="text-lg md:text-xl border-b border-foreground pb-1 hover:text-[var(--accent)] transition-colors relative z-10">ifrah.imtiaz2612@gmail.com</a>
         </div>
      </footer>
    </main>
  );
}