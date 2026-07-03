import { useEffect, useRef, useState } from "react";
import { Sparkles, Settings, X, Sun, Moon, Compass, Paintbrush } from "lucide-react";

interface MatrixBackgroundProps {
  opacity?: number;
  theme?: "light" | "dark" | "green" | "amber";
  globalThemeMode?: "light" | "dark";
  onThemeToggle?: () => void;
}

interface Star {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  alpha: number;
  sparkleSpeed: number;
  phase: number;
  color: string;
}

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  color: string;
}

export default function MatrixBackground({
  opacity = 0.3,
  theme: initialTheme = "amber",
  globalThemeMode = "light",
  onThemeToggle,
}: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Aesthetic Controls
  const [colorTheme, setColorTheme] = useState<"cosmic" | "rainbow" | "amber" | "green">(
    initialTheme === "amber" || initialTheme === "green" ? initialTheme : "cosmic"
  );
  const [speed, setSpeed] = useState<number>(1.0);
  const [density, setDensity] = useState<number>(1.2); // Density of stardust
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [interactiveForce, setInteractiveForce] = useState(true);

  const isLight = globalThemeMode === "light";

  // Keep color theme in sync with initialTheme changes
  useEffect(() => {
    if (initialTheme === "amber" || initialTheme === "green") {
      setColorTheme(initialTheme);
    }
  }, [initialTheme]);

  // Mouse tracking
  const mouseRef = useRef({
    x: -1000,
    y: -1000,
    targetX: -1000,
    targetY: -1000,
    radius: 140,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);
    let animationFrameId: number;

    // Set up particles
    const stars: Star[] = [];
    const sparkles: Sparkle[] = [];

    // Helper for theme-based colors
    const getStarColor = (themeName: string, pIndex: number) => {
      if (themeName === "amber") {
        return `hsla(${35 + Math.random() * 15}, 90%, ${70 + Math.random() * 15}%, 0.8)`;
      } else if (themeName === "green") {
        return `hsla(${140 + Math.random() * 20}, 85%, ${65 + Math.random() * 15}%, 0.8)`;
      } else if (themeName === "cosmic") {
        const hues = [280, 320, 340, 240];
        const hue = hues[pIndex % hues.length];
        return `hsla(${hue}, 90%, ${70 + Math.random() * 15}%, 0.85)`;
      } else {
        // Rainbow aurora
        return `hsla(${(pIndex * 24) % 360}, 95%, 70%, 0.85)`;
      }
    };

    // Initialize stars
    const initStars = () => {
      stars.length = 0;
      const count = Math.floor(((width * height) / 8000) * density);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 2.2 + 0.6,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15 - 0.08, // Drift upwards slightly
          alpha: Math.random() * 0.7 + 0.2,
          sparkleSpeed: 0.015 + Math.random() * 0.02,
          phase: Math.random() * Math.PI * 2,
          color: getStarColor(colorTheme, i),
        });
      }
    };

    initStars();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = -1000;
      mouseRef.current.targetY = -1000;
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Burst of beautiful sparkles
      const burstCount = 18;
      for (let i = 0; i < burstCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const velocity = Math.random() * 2.5 + 0.8;
        sparkles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * velocity,
          vy: Math.sin(angle) * velocity,
          size: Math.random() * 3 + 1,
          alpha: 1.0,
          decay: 0.015 + Math.random() * 0.02,
          color: getStarColor(colorTheme, i),
        });
      }
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleCanvasClick);

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        width = canvas.width = newWidth;
        height = canvas.height = newHeight;
        initStars();
      }
    });
    resizeObserver.observe(container);

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampen mouse coords for smooth inertia drift
      const m = mouseRef.current;
      if (m.targetX !== -1000) {
        if (m.x === -1000) {
          m.x = m.targetX;
          m.y = m.targetY;
        } else {
          m.x += (m.targetX - m.x) * 0.08;
          m.y += (m.targetY - m.y) * 0.08;
        }
      } else {
        m.x = -1000;
        m.y = -1000;
      }

      // Draw active click sparkles
      for (let i = sparkles.length - 1; i >= 0; i--) {
        const sp = sparkles[i];
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.alpha -= sp.decay;

        if (sp.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fillStyle = sp.color.replace(/[\d.]+\)$/, `${sp.alpha})`);
        ctx.shadowBlur = 12;
        ctx.shadowColor = sp.color;
        ctx.fill();
      }
      ctx.shadowBlur = 0; // reset shadow

      // Draw drifting stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];

        // Animate drift
        s.x += s.vx * speed;
        s.y += s.vy * speed;

        // Wrap boundaries
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;

        // Interactive gravity/repulsion effect with mouse
        if (interactiveForce && m.x !== -1000) {
          const dx = s.x - m.x;
          const dy = s.y - m.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < m.radius) {
            const force = (m.radius - dist) / m.radius;
            // Push stars gently away
            s.x += (dx / dist) * force * 1.8;
            s.y += (dy / dist) * force * 1.8;
          }
        }

        // Star twinkling phase
        s.phase += s.sparkleSpeed;
        const currentAlpha = Math.max(0.1, s.alpha * (0.4 + Math.sin(s.phase) * 0.6));

        // Draw star
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        
        // Star color with custom twinkling opacity
        ctx.fillStyle = s.color.replace(/[\d.]+\)$/, `${currentAlpha})`);
        ctx.fill();

        // High quality glow for larger stars
        if (s.size > 1.6) {
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = s.color.replace(/[\d.]+\)$/, `${currentAlpha * 0.15})`);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleCanvasClick);
      resizeObserver.disconnect();
    };
  }, [colorTheme, speed, density, interactiveForce]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full -z-10 overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full pointer-events-auto cursor-crosshair relative z-10"
        style={{ opacity: opacity }}
      />

      {/* Dynamic Animated Colorful Auroras / Mesh Gradients in Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-20">
        {/* Neon Blob 1 - Top Left */}
        <div className={`absolute w-[500px] md:w-[700px] h-[500px] md:h-[700px] rounded-full blur-[140px] mix-blend-screen transition-all duration-[12s] ease-in-out ${
          isLight 
            ? "bg-rose-200/20 -top-40 -left-20" 
            : colorTheme === "rainbow"
              ? "bg-purple-600/15 -top-40 -left-20 animate-pulse"
              : colorTheme === "cosmic"
                ? "bg-fuchsia-600/20 -top-40 -left-20 animate-pulse"
                : colorTheme === "amber"
                  ? "bg-amber-600/10 -top-40 -left-20"
                  : "bg-emerald-600/10 -top-40 -left-20"
        }`} />
        
        {/* Neon Blob 2 - Bottom Right */}
        <div className={`absolute w-[550px] md:w-[800px] h-[550px] md:h-[800px] rounded-full blur-[160px] mix-blend-screen transition-all duration-[15s] ease-in-out ${
          isLight 
            ? "bg-sky-200/20 -bottom-40 -right-20" 
            : colorTheme === "rainbow"
              ? "bg-cyan-600/12 -bottom-40 -right-20 animate-pulse"
              : colorTheme === "cosmic"
                ? "bg-indigo-600/20 -bottom-40 -right-20 animate-pulse"
                : colorTheme === "amber"
                  ? "bg-yellow-600/10 -bottom-40 -right-20"
                  : "bg-teal-600/10 -bottom-40 -right-20"
        }`} />

        {/* Neon Blob 3 - Center (For rich modes) */}
        {(colorTheme === "rainbow" || colorTheme === "cosmic") && (
          <div className={`absolute w-[450px] md:w-[600px] h-[450px] md:h-[600px] rounded-full blur-[130px] mix-blend-screen top-1/4 left-1/3 transition-all duration-[10s] ${
            isLight
              ? "bg-amber-100/10"
              : colorTheme === "rainbow"
                ? "bg-rose-500/10 animate-pulse"
                : "bg-violet-600/15 animate-pulse"
          }`} />
        )}
      </div>

      {/* Dynamic Theme configuration widget */}
      <div className="fixed bottom-6 left-6 z-40 pointer-events-auto">
        {isCollapsed ? (
          <button
            onClick={() => setIsCollapsed(false)}
            className={`flex items-center gap-2 bg-white/95 dark:bg-neutral-900/90 hover:bg-stone-100 dark:hover:bg-neutral-800/90 backdrop-blur-md border border-stone-200 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 shadow-xl text-xs ${
              colorTheme === "amber"
                ? "text-amber-600 dark:text-amber-500"
                : colorTheme === "cosmic"
                  ? "text-pink-600 dark:text-pink-400"
                  : colorTheme === "rainbow"
                    ? "text-indigo-600 dark:text-cyan-400"
                    : "text-emerald-600 dark:text-green-400"
            } transition-all duration-300 hover:scale-105 active:scale-95 group font-mono`}
            title="Configure atmospheric backdrop"
          >
            <Settings className="w-4 h-4 animate-spin-slow group-hover:rotate-45" />
            <span className="text-[10px] tracking-wider uppercase font-bold">Aesthetic Backdrop</span>
          </button>
        ) : (
          <div className="bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border border-stone-200 dark:border-neutral-800 rounded-2xl p-4 flex flex-col gap-3 shadow-2xl text-xs text-stone-600 dark:text-neutral-400 w-[240px] transition-all duration-300 animate-in fade-in slide-in-from-bottom-2">
            
            {/* Header */}
            <div className="flex items-center justify-between font-bold text-stone-800 dark:text-neutral-200">
              <div className="flex items-center gap-2">
                <Paintbrush className={`w-4 h-4 ${
                  colorTheme === "amber"
                    ? "text-amber-500"
                    : colorTheme === "cosmic"
                      ? "text-pink-500"
                      : colorTheme === "rainbow"
                        ? "text-cyan-400"
                        : "text-green-400"
                }`} />
                <span className="font-sans text-xs tracking-tight">Backdrop Ambient</span>
              </div>
              <button
                onClick={() => setIsCollapsed(true)}
                className="p-1 hover:bg-stone-100 dark:hover:bg-neutral-800 text-stone-400 hover:text-stone-700 dark:hover:text-neutral-200 rounded-md transition-colors"
                title="Collapse Panel"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <p className="text-[9.5px] leading-relaxed text-stone-400 dark:text-neutral-500 font-sans">
              A serene, organic atmosphere. Click the backdrop to ripple glowing stardust.
            </p>
            
            <div className="h-[1px] bg-stone-200/60 dark:bg-neutral-800/80" />

            {/* Global Light/Dark Theme Switcher in Widget */}
            {onThemeToggle && (
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px]">Site Mode:</span>
                <button
                  onClick={onThemeToggle}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 dark:border-neutral-800 hover:bg-stone-50 dark:hover:bg-neutral-800 text-stone-700 dark:text-neutral-300 transition-all font-mono text-[10px] cursor-pointer"
                >
                  {globalThemeMode === "light" ? (
                    <>
                      <Moon className="w-3 h-3 text-sky-600" />
                      <span>Dark</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-3 h-3 text-amber-500" />
                      <span>Light</span>
                    </>
                  )}
                </button>
              </div>
            )}
            
            {/* Theme select */}
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px]">Ambient Glow Theme:</span>
              <div className="grid grid-cols-4 gap-1">
                <button
                  onClick={() => setColorTheme("green")}
                  className={`py-1 rounded text-[9px] font-mono font-bold border transition-all cursor-pointer ${
                    colorTheme === "green"
                      ? "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/40"
                      : "bg-stone-50 dark:bg-neutral-850 text-stone-400 dark:text-neutral-550 border-transparent hover:bg-stone-100 dark:hover:bg-neutral-800"
                  }`}
                  title="Celestial Emerald"
                >
                  MINT
                </button>
                <button
                  onClick={() => setColorTheme("amber")}
                  className={`py-1 rounded text-[9px] font-mono font-bold border transition-all cursor-pointer ${
                    colorTheme === "amber"
                      ? "bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-500/40"
                      : "bg-stone-50 dark:bg-neutral-850 text-stone-400 dark:text-neutral-550 border-transparent hover:bg-stone-100 dark:hover:bg-neutral-800"
                  }`}
                  title="Golden Sunset"
                >
                  GOLD
                </button>
                <button
                  onClick={() => setColorTheme("cosmic")}
                  className={`py-1 rounded text-[9px] font-mono font-bold border transition-all cursor-pointer ${
                    colorTheme === "cosmic"
                      ? "bg-pink-500/15 text-pink-600 dark:text-fuchsia-400 border-pink-500/40"
                      : "bg-stone-50 dark:bg-neutral-850 text-stone-400 dark:text-neutral-550 border-transparent hover:bg-stone-100 dark:hover:bg-neutral-800"
                  }`}
                  title="Cosmic Nebula"
                >
                  NEBULA
                </button>
                <button
                  onClick={() => setColorTheme("rainbow")}
                  className={`py-1 rounded text-[9px] font-mono font-bold border transition-all cursor-pointer ${
                    colorTheme === "rainbow"
                      ? "bg-gradient-to-r from-red-500/10 via-green-500/10 to-blue-500/10 text-rose-500 dark:text-cyan-400 border-rose-500/40"
                      : "bg-stone-50 dark:bg-neutral-850 text-stone-400 dark:text-neutral-550 border-transparent hover:bg-stone-100 dark:hover:bg-neutral-800"
                  }`}
                  title="Aurora Borealis"
                >
                  AURORA
                </button>
              </div>
            </div>

            {/* Toggle Interactivity */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px]">Stardust Ripple:</span>
              <button
                onClick={() => setInteractiveForce(!interactiveForce)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all uppercase cursor-pointer ${
                  interactiveForce
                    ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20"
                    : "bg-stone-100 dark:bg-neutral-800 text-stone-400 dark:text-neutral-650 border-transparent"
                }`}
              >
                {interactiveForce ? "Active" : "Static"}
              </button>
            </div>

            {/* Float velocity */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span>Drift Speed:</span>
                <span className={
                  colorTheme === "amber"
                    ? "text-amber-500"
                    : colorTheme === "cosmic"
                      ? "text-pink-500"
                      : colorTheme === "rainbow"
                        ? "text-cyan-400"
                        : "text-green-500"
                }>
                  {speed.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min="0.2"
                max="2.5"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className={`w-full h-1 bg-stone-200 dark:bg-neutral-850 rounded-lg appearance-none cursor-pointer ${
                  colorTheme === "amber"
                    ? "accent-amber-500"
                    : colorTheme === "cosmic"
                      ? "accent-pink-500"
                      : colorTheme === "rainbow"
                        ? "accent-cyan-400"
                        : "accent-green-500"
                }`}
              />
            </div>

            {/* Stardust density */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[10px] font-mono">
                <span>Stardust Density:</span>
                <span className={
                  colorTheme === "amber"
                    ? "text-amber-500"
                    : colorTheme === "cosmic"
                      ? "text-pink-500"
                      : colorTheme === "rainbow"
                        ? "text-cyan-400"
                        : "text-green-500"
                }>
                  {density.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min="0.4"
                max="2.0"
                step="0.2"
                value={density}
                onChange={(e) => setDensity(parseFloat(e.target.value))}
                className={`w-full h-1 bg-stone-200 dark:bg-neutral-850 rounded-lg appearance-none cursor-pointer ${
                  colorTheme === "amber"
                    ? "accent-amber-500"
                    : colorTheme === "cosmic"
                      ? "accent-pink-500"
                      : colorTheme === "rainbow"
                        ? "accent-cyan-400"
                        : "accent-green-500"
                }`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
