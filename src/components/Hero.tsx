import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Github, Compass, Sparkles, Terminal, ChevronDown } from "lucide-react";
import Hero3DCanvas from "./Hero3DCanvas";

interface HeroProps {
  theme?: "light" | "dark";
}

export default function Hero({ theme = "dark" }: HeroProps) {
  const roles = ["Frontend Developer", "Backend Developer", "Full-Stack Developer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const isLight = theme === "light";

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const fullText = roles[currentRoleIndex];

    const typingSpeed = 90;
    const deletingSpeed = 40;
    const pauseDuration = 2000;

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setCurrentText(fullText.slice(0, currentText.length + 1));
      }, typingSpeed);
    }

    if (!isDeleting && currentText === fullText) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex]);

  const handleScrollToContact = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      window.scrollTo({
        top: contactSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  const handleScrollToAbout = () => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      window.scrollTo({
        top: aboutSection.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden transition-colors duration-500"
    >
      {/* Background Radial Glow */}
      <div className={`absolute top-1/4 left-10 w-96 h-96 blur-[120px] rounded-full pointer-events-none transition-colors duration-500 ${
        isLight ? "bg-amber-500/3" : "bg-amber-500/5"
      }`} />
      <div className={`absolute bottom-1/4 right-10 w-[450px] h-[450px] blur-[140px] rounded-full pointer-events-none transition-colors duration-500 ${
        isLight ? "bg-amber-500/2" : "bg-amber-500/3"
      }`} />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Title Typography and CTAs */}
        <div className="lg:col-span-7 text-left space-y-6 md:space-y-8 order-2 lg:order-1">
          
          {/* Tagline Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono transition-colors ${
            isLight
              ? "bg-amber-500/5 border border-amber-500/20 text-amber-600"
              : "bg-amber-500/10 border border-amber-500/20 text-amber-500"
          }`}>
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-500" />
            <span>AVAILABLE FOR FREELANCE & SYSTEM ROLES</span>
          </div>

          {/* Heading block */}
          <div className="space-y-3">
            <h1 className={`text-4xl sm:text-5xl md:text-6xl font-sans font-extrabold tracking-tight leading-tight transition-colors ${
              isLight ? "text-stone-900" : "text-neutral-100"
            }`}>
              Dipjal Tamrakar
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 mt-1 h-[1.25em] md:h-[1.2em] overflow-hidden">
                {currentText}
                <span className="inline-block w-[3px] h-[0.85em] bg-amber-500 ml-1.5 animate-pulse align-middle" />
              </span>
            </h1>
            
            <p className={`text-sm md:text-base max-w-xl leading-relaxed font-sans transition-colors ${
              isLight ? "text-stone-600" : "text-neutral-400"
            }`}>
              Currently pursuing a Bachelor of Information Technology (BIT) at the Central Campus of Technology. Engineering modular front-ends paired with secure Node back-ends.
            </p>
          </div>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            <div className={`flex items-center gap-2 px-3.5 py-1.5 border rounded-lg transition-colors ${
              isLight
                ? "bg-white border-stone-200/80 text-stone-700 shadow-sm"
                : "bg-neutral-900/60 border-neutral-900 text-neutral-300"
            }`}>
              <Terminal className="w-4 h-4 text-amber-500" />
              <span>Full Stack Focus</span>
            </div>
            <div className={`flex items-center gap-2 px-3.5 py-1.5 border rounded-lg transition-colors ${
              isLight
                ? "bg-white border-stone-200/80 text-stone-700 shadow-sm"
                : "bg-neutral-900/60 border-neutral-900 text-neutral-300"
            }`}>
              <Compass className="w-4 h-4 text-amber-500 animate-spin-slow" />
              <span>BIT Dharan • 2023-Present</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Primary Email CTA */}
            <button
              onClick={handleScrollToContact}
              className="flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 rounded-xl font-mono text-sm font-bold transition-all duration-300 shadow-[0_4px_20px_rgba(245,158,11,0.15)] hover:shadow-[0_4px_32px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 cursor-pointer"
            >
              <Mail className="w-4.5 h-4.5" />
              <span>Email Me</span>
            </button>

            {/* Secondary GitHub link */}
            <a
              href="https://github.com/Dipjal992"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center justify-center gap-2 px-6 py-4 border rounded-xl font-mono text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
                isLight
                  ? "bg-white hover:bg-stone-50 border-stone-200 hover:border-amber-500/30 text-stone-700 hover:text-stone-900 shadow-sm"
                  : "bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 hover:border-amber-500/30 text-neutral-300 hover:text-neutral-100"
              }`}
            >
              <Github className="w-4.5 h-4.5 text-neutral-400" />
              <span>Explore GitHub</span>
            </a>
          </div>

        </div>

        {/* Right Column: Mathematical 3D Projection Canvas */}
        <div className={`lg:col-span-5 w-full h-[320px] sm:h-[380px] lg:h-[450px] flex items-center justify-center order-1 lg:order-2 border rounded-3xl backdrop-blur-sm shadow-inner relative overflow-hidden group transition-all duration-500 ${
          isLight
            ? "bg-white/60 border-stone-200/80 shadow-sm"
            : "bg-neutral-900/10 border-neutral-900/60"
        }`}>
          {/* Interactive glow border element */}
          <div className="absolute inset-0 border border-amber-500/5 group-hover:border-amber-500/15 transition-colors duration-500 rounded-3xl pointer-events-none" />
          <Hero3DCanvas theme={theme} />
        </div>

      </div>

      {/* Down arrow link indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <span className={`text-[10px] font-mono tracking-widest uppercase ${isLight ? "text-stone-400" : "text-neutral-500"}`}>
          Explore Backstory
        </span>
        <button
          onClick={handleScrollToAbout}
          className={`p-1.5 rounded-full border transition-all hover:translate-y-1 animate-bounce ${
            isLight
              ? "border-stone-200 hover:border-amber-500 text-stone-400 hover:text-amber-600 bg-white shadow-sm"
              : "border-neutral-800 hover:border-amber-500 text-neutral-500 hover:text-amber-500 bg-neutral-950/60"
          }`}
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
