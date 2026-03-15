import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google"; 
import "./globals.css";

import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import Terminal from "@/components/Terminal"; 
import Diagnostics from "@/components/Diagnostics"; 
import MiniGame from "@/components/MiniGame";

const oswald = Oswald({ subsets: ["latin"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "II | Creative Technologist", 
  description: "Portfolio of the future",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${oswald.variable} ${inter.variable} dark`}>
      <body className="antialiased md:cursor-none bg-background text-foreground transition-colors duration-500">
        <SmoothScroll>
          <Cursor />
          <MiniGame />
          <Terminal /> 
          <Diagnostics /> {/* <-- 2. Add it right below the Terminal */}
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}