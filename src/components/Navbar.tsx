import { useState, useEffect } from "react";
import { Terminal, Menu, X, Mail, Github, Compass, Sun, Moon } from "lucide-react";

interface NavbarProps {
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
}

export default function Navbar({ theme = "dark", onThemeToggle }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const isLight = theme === "light";

  // Scroll detection to highlight active sections and style navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ["home", "about", "project", "skills", "contact"];
      const scrollPos = window.scrollY + 120; // offset

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "project", label: "Featured Project" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  const scrollTo = (id: string) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? isLight
            ? "bg-white/85 backdrop-blur-md border-b border-stone-200 shadow-sm py-3"
            : "bg-neutral-950/85 backdrop-blur-md border-b border-neutral-900 shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
      id="main-navigation-header"
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo/Brand */}
        <button
          onClick={() => scrollTo("home")}
          className="flex items-center gap-2 group text-left cursor-pointer"
        >
          <div className={`w-8 h-8 rounded border flex items-center justify-center transition-all duration-300 shadow-[0_0_12px_rgba(245,158,11,0.05)] ${
            isLight
              ? "bg-amber-500/5 border-amber-500/20 group-hover:border-amber-500 group-hover:bg-amber-500/10"
              : "bg-amber-500/10 border-amber-500/30 group-hover:border-amber-500 group-hover:bg-amber-500/20"
          }`}>
            <Terminal className="w-4.5 h-4.5 text-amber-500 animate-pulse" />
          </div>
          <div>
            <span className={`font-mono font-bold tracking-tight text-sm group-hover:text-amber-500 transition-colors duration-300 ${
              isLight ? "text-stone-900" : "text-neutral-200"
            }`}>
              DIPJAL
            </span>
            <span className="text-[10px] text-amber-500 font-mono block tracking-widest leading-none">
              TAMRAKAR
            </span>
          </div>
        </button>

        {/* Desktop Links */}
        <nav className={`hidden md:flex items-center gap-1 border px-2 py-1 rounded-full backdrop-blur-sm transition-colors duration-300 ${
          isLight
            ? "bg-white/60 border-stone-200/80"
            : "bg-neutral-950/45 border-neutral-800/40"
        }`}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all duration-300 cursor-pointer ${
                activeSection === item.id
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-500 border border-amber-500/20 font-semibold shadow-[0_0_10px_rgba(245,158,11,0.03)]"
                  : isLight
                    ? "text-stone-500 hover:text-stone-900"
                    : "text-neutral-400 hover:text-neutral-200"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA and Links */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Switcher Button */}
          {onThemeToggle && (
            <button
              onClick={onThemeToggle}
              className={`p-2 rounded-lg border transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer ${
                isLight
                  ? "bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200"
                  : "bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800"
              }`}
              title={isLight ? "Activate Dark Cyberpunk Mode" : "Activate Clean Warm Light Mode"}
            >
              {isLight ? <Moon className="w-4.5 h-4.5 text-sky-600" /> : <Sun className="w-4.5 h-4.5 text-amber-500 animate-spin-slow" />}
            </button>
          )}

          <a
            href="https://github.com/Dipjal992"
            target="_blank"
            rel="noreferrer"
            className={`transition-colors ${
              isLight ? "text-stone-500 hover:text-stone-900" : "text-neutral-400 hover:text-neutral-100"
            }`}
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <button
            onClick={() => scrollTo("contact")}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 rounded font-mono text-xs font-bold transition-all duration-300 shadow-[0_4px_16px_rgba(245,158,11,0.15)] hover:shadow-[0_4px_24px_rgba(245,158,11,0.3)] hover:-translate-y-0.5 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Me</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center gap-3">
          {onThemeToggle && (
            <button
              onClick={onThemeToggle}
              className={`p-2 rounded border transition-colors ${
                isLight
                  ? "bg-stone-100 border-stone-200 text-stone-700"
                  : "bg-neutral-900 border-neutral-800 text-neutral-400"
              }`}
              title="Toggle Theme"
            >
              {isLight ? <Moon className="w-4 h-4 text-sky-600" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </button>
          )}
          <button
            onClick={() => scrollTo("contact")}
            className="p-2 bg-amber-500/10 border border-amber-500/20 rounded text-amber-500 hover:bg-amber-500/20"
          >
            <Mail className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 border rounded transition-all ${
              isLight
                ? "border-stone-200 bg-stone-100 text-stone-700 hover:bg-stone-200"
                : "border-neutral-800 bg-neutral-900/60 text-neutral-300 hover:bg-neutral-800/80"
            }`}
            id="mobile-menu-hamburger"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-[57px] left-0 w-full h-[calc(100vh-57px)] backdrop-blur-md border-t z-40 transition-all duration-300 md:hidden flex flex-col justify-between ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        } ${
          isLight ? "bg-white/95 border-stone-200" : "bg-neutral-950/98 border-neutral-900"
        }`}
        id="mobile-navigation-drawer"
      >
        <div className="flex flex-col gap-1 p-6">
          <span className="text-[10px] font-mono tracking-wider text-amber-500/60 uppercase mb-4 block">
            Navigation Menu
          </span>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`w-full text-left py-3.5 px-4 rounded-lg font-mono text-sm transition-all flex justify-between items-center ${
                activeSection === item.id
                  ? "bg-amber-500/10 text-amber-600 dark:text-amber-500 font-bold border-l-2 border-amber-500"
                  : isLight
                    ? "text-stone-600 hover:bg-stone-100/50 hover:text-stone-900"
                    : "text-neutral-400 hover:bg-neutral-900/40 hover:text-neutral-200"
              }`}
            >
              <span>{item.label}</span>
              {activeSection === item.id && <Compass className="w-4 h-4 animate-spin-slow" />}
            </button>
          ))}
        </div>

        <div className={`p-6 border-t flex flex-col gap-4 ${
          isLight ? "border-stone-200 bg-stone-50/50" : "border-neutral-900 bg-neutral-950/40"
        }`}>
          <div className="flex justify-between items-center">
            <span className={`text-xs font-mono ${isLight ? "text-stone-400" : "text-neutral-500"}`}>DIPJAL TAMRAKAR</span>
            <div className="flex gap-4">
              <a
                href="https://github.com/Dipjal992"
                target="_blank"
                rel="noreferrer"
                className={`transition-colors ${isLight ? "text-stone-500 hover:text-stone-900" : "text-neutral-400 hover:text-white"}`}
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          <a
            href="mailto:dipjal.tamrakar1234@gmail.com"
            className="w-full text-center py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 font-bold rounded font-mono text-sm shadow-md transition-all block"
          >
            dipjal.tamrakar1234@gmail.com
          </a>
        </div>
      </div>
    </header>
  );
}
