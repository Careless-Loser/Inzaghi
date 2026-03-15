"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation"; 

export default function Terminal() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ cmd: string; res: string; isError?: boolean }[]>([
    { cmd: "", res: "SYSTEM ONLINE. Type 'help' to see available commands." },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter(); 

  useEffect(() => {
    // 1. Keyboard Shortcut Listener (Desktop) - Ctrl+I
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "i") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    
    // 2. Custom Event Listener (Mobile)
    const handleCustomOpen = () => setIsOpen((prev) => !prev);
    
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("open-terminal", handleCustomOpen);
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("open-terminal", handleCustomOpen);
    };
  }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && input.trim()) {
      const cmdRaw = input.trim();
      const cmdArgs = cmdRaw.toLowerCase().split(" ");
      const mainCmd = cmdArgs[0];
      let res = "";
      let isError = false;

      switch (mainCmd) {
        case "help":
          res = "COMMANDS: \n" +
                "> whoami   : View identity \n" +
                "> stack    : View technologies \n" +
                "> cd [dir] : Navigate (e.g., cd /work) \n" +
                "> theme    : Options -> default, pink, blue, brown, xray \n" +
                "> play     : Launch Interactive 2D Town Simulation \n" +
                "TIP: Press Ctrl+D to open the visual Diagnostics HUD.";
          break;
          
        case "whoami":
          res = "Ifrah Imtiaz. Creative Technologist. Cybersecurity trained. Bridging logic and brutalist aesthetics.";
          break;
          
        case "stack":
          res = "React, Next.js, Node.js, Python, C++, Cybersecurity Ops, Figma.";
          break;
          
        case "contact":
          res = "Initializing contact sequence... email: ifrah.imtiaz2612@gmail.com";
          break;
          
        case "clear":
          setHistory([]);
          setInput("");
          return;
          
        case "exit":
        case "close":
          setIsOpen(false);
          setInput("");
          return;
          
        case "sudo":
          res = "ACCESS DENIED. This incident has been logged and reported to the administrator.";
          isError = true;
          break;

        // --- PLAY MINIGAME COMMAND ---
        case "play":
        case "arcade":
          res = "INITIALIZING ARCADE PROTOCOL... Launching minigame.";
          setTimeout(() => {
             window.dispatchEvent(new CustomEvent("open-minigame"));
             setIsOpen(false); // Close terminal so they can see the game
          }, 800);
          break;
        
        // --- UPGRADED THEME COMMAND ---
        case "theme": {
          const targetTheme = cmdArgs[1];
          const validThemes: Record<string, string> = {
            "default": "default",
            "pink": "theme-pink",
            "blue": "theme-blue",
            "brown": "theme-brown",
            "xray": "theme-xray"
          };

          if (validThemes[targetTheme]) {
            // Remove all custom theme classes first
            document.documentElement.classList.remove("theme-pink", "theme-blue", "theme-brown", "theme-xray");
            
            // Add the new theme class if it's not the default
            if (targetTheme !== "default") {
              document.documentElement.classList.add(validThemes[targetTheme]);
            }
            
            // Tell the Homepage to update the Three.js background
            window.dispatchEvent(new CustomEvent("theme-changed", { detail: validThemes[targetTheme] }));
            res = `Theme protocol accepted: ${targetTheme.toUpperCase()} MODE engaged.`;
          } else {
            res = "Usage: theme [default | pink | blue | brown | xray]";
            isError = true;
          }
          break;
        }

        // --- DIRECTORY NAVIGATION ---
        case "cd": {
          const targetDir = cmdArgs[1];
          if (targetDir === "/" || targetDir === "/home" || targetDir === "home") {
            router.push("/");
            res = "Navigating to root directory...";
            setTimeout(() => setIsOpen(false), 1000);
          } else if (targetDir === "/work" || targetDir === "work") {
            router.push("/work");
            res = "Navigating to /work...";
            setTimeout(() => setIsOpen(false), 1000);
          } else if (targetDir === "/about" || targetDir === "about") {
            router.push("/about");
            res = "Navigating to /about...";
            setTimeout(() => setIsOpen(false), 1000);
          } else if (targetDir === "/contact" || targetDir === "contact") {
            router.push("/contact");
            res = "Navigating to /contact...";
            setTimeout(() => setIsOpen(false), 1000);
          } else {
            res = `cd: no such file or directory: ${targetDir || ''}`;
            isError = true;
          }
          break;
        }

        default:
          res = `Command not found: ${mainCmd}. Type 'help' for options.`;
          isError = true;
      }

      setHistory((prev) => [...prev, { cmd: cmdRaw, res, isError }]);
      setInput("");
      
      // Auto-scroll to bottom of terminal
      setTimeout(() => {
        const terminalDiv = document.getElementById("terminal-scroll");
        if (terminalDiv) terminalDiv.scrollTop = terminalDiv.scrollHeight;
      }, 50);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
          className="fixed top-24 left-1/2 -translate-x-1/2 w-[90%] md:w-[600px] z-[9999] bg-[#0a0a0a]/90 backdrop-blur-xl border border-[var(--border)] rounded-xl overflow-hidden shadow-2xl font-mono text-xs md:text-sm text-green-500 p-6"
        >
          <div className="flex justify-between items-center border-b border-[var(--border)] pb-4 mb-4">
            <span className="text-[var(--accent)] uppercase tracking-widest text-[10px]">Guest@User-Terminal ~ %</span>
            <button onClick={() => setIsOpen(false)} className="text-[var(--accent)] hover:text-foreground transition-colors cursor-pointer">ESC / CLOSE</button>
          </div>
          
          <div id="terminal-scroll" className="max-h-[300px] overflow-y-auto flex flex-col gap-2 scroll-smooth pr-2">
            {history.map((line, i) => (
              <div key={i}>
                {line.cmd && <div><span className="text-[var(--accent)]">&gt; </span><span className="text-white">{line.cmd}</span></div>}
                {/* whitespace-pre-wrap allows the \n formatting in the help command to work perfectly */}
                <div className={`${line.isError ? "text-red-500" : "text-green-400"} opacity-80 whitespace-pre-wrap`}>{line.res}</div>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[var(--accent)]">&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                className="bg-transparent outline-none flex-grow text-white placeholder-[var(--accent)]"
                placeholder="Type a command..."
                spellCheck={false}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}