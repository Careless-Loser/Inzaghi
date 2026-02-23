import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustonCursor";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Creative Developer | Portfolio",
  description: "Full-stack digital experiences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black text-white cursor-none">
      <body className={inter.className}>
        <CustomCursor />
        {/* Drop your SystemBoot Framer Motion component here to conditionally render before the children */}
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}