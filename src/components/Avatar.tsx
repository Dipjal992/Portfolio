import { motion } from "motion/react";
import { Glasses, Sparkles, Terminal } from "lucide-react";
// @ts-ignore
import portfolioPhoto from "../assets/images/portfolio.jpg";

export default function Avatar() {
  return (
    <div className="relative group w-64 h-64 md:w-72 md:h-72 mx-auto flex items-center justify-center">
      {/* Dynamic Backlight Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-600/30 to-amber-400/10 rounded-3xl blur-2xl group-hover:blur-3xl group-hover:from-amber-500/40 group-hover:to-amber-300/20 transition-all duration-700 pointer-events-none" />

      {/* Decorative Outer Coding Ring */}
      <svg
        className="absolute w-full h-full animate-spin-slow text-amber-500/30 group-hover:text-amber-500/50 transition-colors duration-500 pointer-events-none"
        viewBox="0 0 100 100"
      >
        <circle
          cx="50"
          cy="50"
          r="47"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.75"
          strokeDasharray="4 6"
        />
        <circle
          cx="50"
          cy="50"
          r="43"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.5"
          strokeDasharray="24 12 8 12"
        />
      </svg>

      {/* Inner Rotating Tech Rings */}
      <div className="absolute w-[84%] h-[84%] border border-dashed border-amber-500/20 rounded-full animate-spin-reverse pointer-events-none" />
      <div className="absolute w-[78%] h-[78%] border border-neutral-800 rounded-full pointer-events-none" />

      {/* Main Avatar Container */}
      <div className="relative w-[72%] h-[72%] bg-neutral-950 border-2 border-amber-500/30 rounded-2xl overflow-hidden group-hover:border-amber-500 group-hover:shadow-[0_0_24px_rgba(245,158,11,0.25)] transition-all duration-500 flex items-center justify-center">
        
        {/* Real photo of Dipjal Tamrakar with custom filters */}
        <img
          src={portfolioPhoto}
          alt="Dipjal Tamrakar"
          className="w-full h-full object-cover object-center relative z-0 filter contrast-[1.05] brightness-[0.95]"
          referrerPolicy="no-referrer"
        />

        {/* Subtle Canvas/Matrix Grid Overlay (on top of image for cybernetic grid) */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(245,158,11,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.15)_1px,transparent_1px)] bg-[size:10px_10px] pointer-events-none z-10" />
        
        {/* Code watermarks overlaying image elegantly */}
        <div className="absolute top-2 left-3 text-[7.5px] font-mono text-amber-500/40 select-none pointer-events-none leading-none z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
          <div>import &#123; Developer &#125; from "dipjal";</div>
          <div className="mt-1">const me = new Developer(&#123;</div>
          <div className="ml-2">role: "Fullstack",</div>
          <div className="ml-2">focus: "React & Node"</div>
          <div>&#125;);</div>
        </div>

        {/* Ambient Overlay Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent opacity-80 z-10 pointer-events-none" />

        {/* Bottom banner for active role indicator */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-amber-500/15 border border-amber-500/30 rounded font-mono text-[9px] font-bold text-amber-500 flex items-center gap-1 backdrop-blur-sm z-10">
          <Terminal className="w-2.5 h-2.5" />
          <span>PORTFOLIO // DT</span>
        </div>
      </div>

      {/* Interactive Micro elements */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 right-6 bg-neutral-900 border border-neutral-800 p-1 rounded-md shadow-lg text-[9px] font-mono text-amber-500 z-20 flex items-center gap-1"
      >
        <Sparkles className="w-2.5 h-2.5 text-amber-500" />
        <span>BIT Dharan</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute bottom-10 left-4 bg-neutral-900 border border-neutral-800 p-1.5 rounded-md shadow-lg text-[9px] font-mono text-neutral-400 z-20 flex items-center gap-1"
      >
        <Glasses className="w-3 h-3 text-amber-500" />
        <span>Full Stack Developer</span>
      </motion.div>
    </div>
  );
}
