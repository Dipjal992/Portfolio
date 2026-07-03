/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import ProjectAALU from "./components/ProjectAALU";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import MatrixBackground from "./components/MatrixBackground";

export default function App() {
  // Default to 'dark' mode as requested to change the default background theme
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [scrollProgress, setScrollProgress] = useState(0);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Keep HTML root node in sync for global CSS selectors or extensions
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.remove("dark");
      root.classList.add("light");
    } else {
      root.classList.remove("light");
      root.classList.add("dark");
    }
  }, [theme]);

  // Track window scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={`relative min-h-screen font-sans selection:bg-amber-500 selection:text-neutral-950 overflow-x-hidden transition-colors duration-500 ${
      theme === "light" 
        ? "bg-[#fafaf9] text-stone-900" 
        : "bg-neutral-950 text-neutral-200"
    }`}>
      {/* Sleek top-of-viewport glowing scroll progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[9999] pointer-events-none bg-stone-100/10 dark:bg-neutral-900/10 backdrop-blur-[1px]">
        <motion.div
          id="scroll-progress-indicator"
          className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 shadow-[0_0_10px_rgba(245,158,11,0.65)] origin-left"
          style={{ width: `${scrollProgress}%` }}
          layout
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 15,
            restDelta: 0.01
          }}
        />
      </div>

      {/* Interactive Matrix Rain Layer & 3D Plexus background */}
      <MatrixBackground 
        opacity={theme === "light" ? 0.35 : 0.22} 
        theme={theme === "light" ? "amber" : "green"} 
        globalThemeMode={theme}
        onThemeToggle={toggleTheme}
      />

      {/* Vignette radial mask to preserve supreme text contrast and legibility */}
      <div className={`absolute inset-0 pointer-events-none z-[1] transition-all duration-500 ${
        theme === "light"
          ? "bg-[radial-gradient(circle_at_center,rgba(250,250,249,0.08)_0%,rgba(250,250,249,0.7)_80%)]"
          : "bg-[radial-gradient(circle_at_center,rgba(10,10,10,0.1)_0%,rgba(10,10,10,0.85)_80%)]"
      }`} />

      {/* Floating Header Navigation */}
      <Navbar theme={theme} onThemeToggle={toggleTheme} />

      {/* Page Sections Layout */}
      <main className="relative z-10">
        <Hero theme={theme} />
        <About theme={theme} />
        <ProjectAALU theme={theme} />
        <Skills theme={theme} />
        <Contact theme={theme} />
      </main>
    </div>
  );
}
