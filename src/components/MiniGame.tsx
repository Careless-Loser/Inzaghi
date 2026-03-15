"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FACE_IMAGE = "/assets/images/chars/player-face.png";

const characterAssets = {
  default: {
    dark: { 0: "/assets/images/chars/default-dark-down.png", 1: "/assets/images/chars/default-dark-left.png", 2: "/assets/images/chars/default-dark-right.png", 3: "/assets/images/chars/default-dark-up.png", map: "/assets/images/maps/map-default-dark.png" },
    light: { 0: "/assets/images/chars/default-light-down.png", 1: "/assets/images/chars/default-light-left.png", 2: "/assets/images/chars/default-light-right.png", 3: "/assets/images/chars/default-light-up.png", map: "/assets/images/maps/map-default-light.png" }
  },
  pink: {
    dark: { 0: "/assets/images/chars/pink-dark-down.png", 1: "/assets/images/chars/pink-dark-left.png", 2: "/assets/images/chars/pink-dark-right.png", 3: "/assets/images/chars/pink-dark-up.png", map: "/assets/images/maps/map-pink-dark.png" },
    light: { 0: "/assets/images/chars/pink-light-down.png", 1: "/assets/images/chars/pink-light-left.png", 2: "/assets/images/chars/pink-light-right.png", 3: "/assets/images/chars/pink-light-up.png", map: "/assets/images/maps/map-pink-light.png" }
  },
  blue: {
    dark: { 0: "/assets/images/chars/blue-dark-down.png", 1: "/assets/images/chars/blue-dark-left.png", 2: "/assets/images/chars/blue-dark-right.png", 3: "/assets/images/chars/blue-dark-up.png", map: "/assets/images/maps/map-blue-dark.png" },
    light: { 0: "/assets/images/chars/blue-light-down.png", 1: "/assets/images/chars/blue-light-left.png", 2: "/assets/images/chars/blue-light-right.png", 3: "/assets/images/chars/blue-light-up.png", map: "/assets/images/maps/map-blue-light.png" }
  },
  brown: {
    dark: { 0: "/assets/images/chars/brown-dark-down.png", 1: "/assets/images/chars/brown-dark-left.png", 2: "/assets/images/chars/brown-dark-right.png", 3: "/assets/images/chars/brown-dark-up.png", map: "/assets/images/maps/map-brown-dark.png" },
    light: { 0: "/assets/images/chars/brown-light-down.png", 1: "/assets/images/chars/brown-light-left.png", 2: "/assets/images/chars/brown-light-right.png", 3: "/assets/images/chars/brown-light-up.png", map: "/assets/images/maps/map-brown-light.png" }
  },
  xray: {
    dark: { 0: "/assets/images/chars/xray-dark-down.png", 1: "/assets/images/chars/xray-dark-left.png", 2: "/assets/images/chars/xray-dark-right.png", 3: "/assets/images/chars/xray-dark-up.png", map: "/assets/images/maps/map-xray-dark.png" },
    light: { 0: "/assets/images/chars/xray-light-down.png", 1: "/assets/images/chars/xray-light-left.png", 2: "/assets/images/chars/xray-light-right.png", 3: "/assets/images/chars/xray-light-up.png", map: "/assets/images/maps/map-xray-light.png" }
  }
};

export default function MiniGame() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isIntro, setIsIntro] = useState(false);
  const [dialogue, setDialogue] = useState<string | null>(null);
  
  const [gameTheme, setGameTheme] = useState("default");
  const [gameMode, setGameMode] = useState("dark");
  const [showMenu, setShowMenu] = useState(false);
  const [scale, setScale] = useState(1); // Responsive scale factor

  const activeSprites = (characterAssets as any)[gameTheme]?.[gameMode];
  const playerImgRef = useRef<HTMLImageElement>(null);
  
  // Ref-based controls for cross-device compatibility (keyboard + touch)
  const keysRef = useRef({ w: false, a: false, s: false, d: false, e: false });
  const interactRef = useRef<(() => void) | null>(null);
  const playerRef = useRef({ x: 352, y: 260, w: 32, h: 32, direction: 0 }); 

  // Handle Game Open & Initial Theme
  useEffect(() => {
    const handleOpenGame = () => {
      const html = document.documentElement;
      const isDark = html.classList.contains("dark") ? "dark" : "light";
      let initialTheme = "default";
      if (html.classList.contains("theme-pink")) initialTheme = "pink";
      if (html.classList.contains("theme-blue")) initialTheme = "blue";
      if (html.classList.contains("theme-brown")) initialTheme = "brown";
      if (html.classList.contains("theme-xray")) initialTheme = "xray";

      setGameMode(isDark);
      setGameTheme(initialTheme);
      setIsPlaying(true);
      setIsIntro(true);
    };
    window.addEventListener("open-minigame", handleOpenGame);
    return () => window.removeEventListener("open-minigame", handleOpenGame);
  }, []);

  // Responsive Scaling Logic
  useEffect(() => {
    if (!isPlaying) return;
    const calculateScale = () => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const paddingX = 32;
      const paddingY = screenWidth < 768 ? 240 : 120; // Extra room for mobile controls
      
      const scaleX = (screenWidth - paddingX) / 768;
      const scaleY = (screenHeight - paddingY) / 576;
      setScale(Math.min(scaleX, scaleY, 1)); // Never scale up beyond 100%
    };
    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, [isPlaying]);

  // Boot Sequence
  useEffect(() => {
    if (isPlaying && isIntro) {
      const timer = setTimeout(() => {
        setIsIntro(false);
        setDialogue("System boot complete. Welcome to my digital town. Use controls to explore and press [E] to interact.");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, isIntro]);

  // Core Game Engine Loop
  useEffect(() => {
    if (!isPlaying || isIntro || !activeSprites || !playerImgRef.current) return;

    let animationFrameId: number;
    const TILE_SIZE = 64;
    const PLAYER_SPEED = 4;
    const INTERACT_RANGE = 90;

    const map = [
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0, 2],
      [2, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0, 2],
      [2, 0, 2, 2, 2, 0, 0, 2, 2, 2, 0, 2],
      [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
      [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    ];

    const interactables = [
      { x: 8, y: 3, text: "[CODE ACADEMY] I'm a Dubai-based creative developer. I specialize in the intersection of code and aesthetics, building interactive web experiences." },
      { x: 3, y: 6, text: "[CYBERSECURITY HQ] My background includes full-stack development and cybersecurity. I believe security should be built into the UI/UX from day one." },
      { x: 8, y: 6, text: "[PORTFOLIO GALLERY] Welcome to my portfolio town! Explore the buildings to learn more about my selectively skilled frontend approach." }
    ];

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "w" || e.key === "ArrowUp") keysRef.current.w = true;
      if (key === "a" || e.key === "ArrowLeft") keysRef.current.a = true;
      if (key === "s" || e.key === "ArrowDown") keysRef.current.s = true;
      if (key === "d" || e.key === "ArrowRight") keysRef.current.d = true;
      if (key === "e" || e.key === " ") {
        keysRef.current.e = true;
        if (interactRef.current) interactRef.current(); 
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === "w" || e.key === "ArrowUp") keysRef.current.w = false;
      if (key === "a" || e.key === "ArrowLeft") keysRef.current.a = false;
      if (key === "s" || e.key === "ArrowDown") keysRef.current.s = false;
      if (key === "d" || e.key === "ArrowRight") keysRef.current.d = false;
      if (key === "e" || e.key === " ") keysRef.current.e = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    const isSolid = (x: number, y: number) => {
      const tileX = Math.floor(x / TILE_SIZE);
      const tileY = Math.floor(y / TILE_SIZE);
      if (tileY < 0 || tileY >= map.length || tileX < 0 || tileX >= map[0].length) return true;
      return map[tileY][tileX] === 2; 
    };

    interactRef.current = () => {
      setDialogue((current) => {
        if (current) return null; 
        let found = null;
        for (const item of interactables) {
          const itemX = item.x * TILE_SIZE + TILE_SIZE/2;
          const itemY = item.y * TILE_SIZE + TILE_SIZE/2;
          const dist = Math.hypot(playerRef.current.x + 16 - itemX, playerRef.current.y + 16 - itemY);
          if (dist < INTERACT_RANGE) { found = item.text; break; }
        }
        return found;
      });
    };

    const loop = () => {
      setDialogue((current) => {
        if (current) return current; 
        let nextX = playerRef.current.x;
        let nextY = playerRef.current.y;
        let moved = false;

        if (keysRef.current.w) { nextY -= PLAYER_SPEED; playerRef.current.direction = 3; moved = true; }
        else if (keysRef.current.s) { nextY += PLAYER_SPEED; playerRef.current.direction = 0; moved = true; }
        else if (keysRef.current.a) { nextX -= PLAYER_SPEED; playerRef.current.direction = 1; moved = true; }
        else if (keysRef.current.d) { nextX += PLAYER_SPEED; playerRef.current.direction = 2; moved = true; }

        if (!isSolid(nextX, nextY) && !isSolid(nextX + 32, nextY) && !isSolid(nextX, nextY + 32) && !isSolid(nextX + 32, nextY + 32)) {
          playerRef.current.x = nextX;
          playerRef.current.y = nextY;
        }

        if (playerImgRef.current) {
          if (moved) playerImgRef.current.src = activeSprites[playerRef.current.direction];
          playerImgRef.current.style.transform = `translate(${playerRef.current.x - 32}px, ${playerRef.current.y - 64}px)`; 
        }
        return current;
      });
      animationFrameId = requestAnimationFrame(loop);
    };

    if (playerImgRef.current) {
        playerImgRef.current.src = activeSprites[playerRef.current.direction];
        playerImgRef.current.style.transform = `translate(${playerRef.current.x - 32}px, ${playerRef.current.y - 64}px)`; 
    }

    loop();
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [isPlaying, isIntro, activeSprites, gameTheme, gameMode]);

  // Touch Handlers for Mobile Controls
  const handleTouchStart = (k: keyof typeof keysRef.current) => {
    keysRef.current[k] = true;
    if (k === 'e' && interactRef.current) interactRef.current();
  };
  const handleTouchEnd = (k: keyof typeof keysRef.current) => {
    keysRef.current[k] = false;
  };

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] bg-[#050505]/95 backdrop-blur-md flex flex-col items-center justify-center font-mono select-none text-foreground overflow-hidden"
        >
          {/* Header Controls */}
          <div className="absolute top-4 md:top-8 w-full max-w-4xl px-4 md:px-6 flex justify-between items-center text-[var(--accent)] z-50">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold opacity-50">Local Simulation Mode</span>
            <button onClick={() => setIsPlaying(false)} className="hover:text-red-500 transition-colors uppercase text-[10px] md:text-xs tracking-widest border border-[var(--border)] px-4 py-2 bg-background/50 backdrop-blur-sm rounded">
              [X] Exit
            </button>
          </div>

          {/* Scalable Game Container */}
          <div 
            className="relative w-[768px] h-[576px] border-2 border-[var(--border)] rounded-xl shadow-2xl bg-[var(--background)] shrink-0 transition-transform duration-200"
            style={{ transform: `scale(${scale})`, transformOrigin: "center center" }}
          >
            <AnimatePresence>
              {isIntro && (
                <motion.div 
                  initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
                  className="absolute inset-0 z-[60] bg-black flex flex-col items-center justify-center text-green-500 text-lg md:text-sm"
                >
                  <p className="animate-pulse mb-2">Connecting to Arcade Server...</p>
                  <p className="opacity-70">Loading environment assets: {gameTheme}</p>
                  <p className="opacity-70">Applying style configurations: {gameMode}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 bg-cover bg-center z-0" style={{ backgroundImage: `url(${activeSprites?.map})` }} />

            <div className="absolute top-4 right-4 z-40">
              <button onClick={() => setShowMenu(!showMenu)} className="bg-background/80 backdrop-blur-sm border border-[var(--border)] px-4 py-2 text-xs uppercase rounded">Settings</button>
              <AnimatePresence>
                {showMenu && (
                  <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}
                    className="absolute top-12 right-0 bg-background border border-[var(--border)] p-4 rounded min-w-[160px] flex flex-col gap-4 shadow-2xl"
                  >
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase opacity-50">Rendering Mode</p>
                      <div className="flex gap-2">
                        {["light", "dark"].map(m => (
                          <button key={m} onClick={() => setGameMode(m)} className={`text-xs px-2 py-2 border rounded uppercase flex-1 ${gameMode === m ? "bg-foreground text-background" : ""}`}>{m}</button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[10px] uppercase opacity-50">Theme Pack</p>
                      {["default", "pink", "blue", "brown", "xray"].map(t => (
                        <button key={t} onClick={() => setGameTheme(t)} className={`text-xs w-full text-left px-2 py-2 border rounded uppercase ${gameTheme === t ? "bg-foreground text-background" : ""}`}>{t}</button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <img ref={playerImgRef} alt="Player" className="absolute top-0 left-0 w-[96px] h-[96px] object-contain pointer-events-none z-10" style={{ transformOrigin: 'top left' }} />

            <AnimatePresence>
              {dialogue && (
                <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
                  className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] bg-foreground text-background p-6 rounded flex gap-5 items-center z-50 border-4 border-black/10"
                >
                  <img src={FACE_IMAGE} alt="Face" className="w-16 h-16 md:w-20 md:h-20 rounded border-2 border-background object-cover bg-white/10 shrink-0" />
                  <div className="flex-1">
                    <p className="text-base md:text-lg leading-relaxed mb-2">{dialogue}</p>
                    <p className="text-xs uppercase opacity-50 font-bold tracking-widest animate-pulse">Press [E] or Action to Close</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* MOBILE ARCADE CONTROLS */}
          <div className="md:hidden absolute bottom-6 w-full max-w-md px-8 flex justify-between items-end z-50 pointer-events-auto">
            
            {/* D-PAD */}
            <div className="grid grid-cols-3 gap-1 p-2 bg-background/20 backdrop-blur-md rounded-full border border-white/10">
              <div />
              <button 
                onPointerDown={() => handleTouchStart('w')} onPointerUp={() => handleTouchEnd('w')} onPointerLeave={() => handleTouchEnd('w')}
                className="w-12 h-12 bg-background border border-[var(--border)] rounded-t-lg active:bg-foreground active:text-background flex justify-center items-center text-xl touch-none"
              >↑</button>
              <div />
              <button 
                onPointerDown={() => handleTouchStart('a')} onPointerUp={() => handleTouchEnd('a')} onPointerLeave={() => handleTouchEnd('a')}
                className="w-12 h-12 bg-background border border-[var(--border)] rounded-l-lg active:bg-foreground active:text-background flex justify-center items-center text-xl touch-none"
              >←</button>
              <button 
                onPointerDown={() => handleTouchStart('s')} onPointerUp={() => handleTouchEnd('s')} onPointerLeave={() => handleTouchEnd('s')}
                className="w-12 h-12 bg-background border border-[var(--border)] rounded-b-lg active:bg-foreground active:text-background flex justify-center items-center text-xl touch-none"
              >↓</button>
              <button 
                onPointerDown={() => handleTouchStart('d')} onPointerUp={() => handleTouchEnd('d')} onPointerLeave={() => handleTouchEnd('d')}
                className="w-12 h-12 bg-background border border-[var(--border)] rounded-r-lg active:bg-foreground active:text-background flex justify-center items-center text-xl touch-none"
              >→</button>
            </div>
            
            {/* ACTION BUTTON */}
            <button 
              onPointerDown={() => handleTouchStart('e')} onPointerUp={() => handleTouchEnd('e')} onPointerLeave={() => handleTouchEnd('e')}
              className="w-16 h-16 bg-[var(--accent)] text-background rounded-full font-bold tracking-widest active:scale-95 transition-transform touch-none shadow-xl border-4 border-background flex justify-center items-center"
            >
              ACT
            </button>
          </div>
          
        </motion.div>
      )}
    </AnimatePresence>
  );
}