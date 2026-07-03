import { useState } from "react";
import { motion } from "motion/react";
import {
  Code,
  Database,
  Cpu,
  CheckCircle2,
  Terminal,
  Activity,
} from "lucide-react";

interface SkillsProps {
  theme?: "light" | "dark";
}

export default function Skills({ theme = "dark" }: SkillsProps) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const isLight = theme === "light";

  const categories = [
    {
      title: "Front-End Developer Core",
      icon: Code,
      description: "Developing robust, cross-device, highly responsive client-side interfaces using structured semantic standard languages.",
      skills: [
        { name: "HTML5 & Semantic Markup", rating: 95, icon: "🌐" },
        { name: "CSS3 & Advanced Layouts (Grid/Flexbox)", rating: 92, icon: "🎨" },
        { name: "Vanilla JavaScript (ES6+)", rating: 88, icon: "⚡" },
        { name: "Tailwind CSS Utility Design", rating: 90, icon: "🌀" },
        { name: "React Components & State Management", rating: 85, icon: "⚛️" },
      ],
    },
    {
      title: "Back-End Engineering",
      icon: Database,
      description: "Implementing server architectures, API routers, database managers, security models, and system integrations.",
      skills: [
        { name: "NodeJS Server-Side Logic", rating: 82, icon: "🟢" },
        { name: "Express API Controllers & Routing", rating: 85, icon: "🚀" },
        { name: "Database Schemas & Data Stores", rating: 78, icon: "🗄️" },
        { name: "RESTful Service Architectures", rating: 84, icon: "🔗" },
        { name: "Payment Gateway APIs (Khalti/eSewa)", rating: 80, icon: "💳" },
      ],
    },
    {
      title: "Systems, Tooling & Workflows",
      icon: Cpu,
      description: "Managing deployments, local server environments, code version control platforms, and optimization utilities.",
      skills: [
        { name: "Git Version Control", rating: 85, icon: "📂" },
        { name: "GitHub Collaborative Workflows", rating: 88, icon: "🐙" },
        { name: "Vercel Static & Dynamic Deployment", rating: 85, icon: "▲" },
        { name: "VS Code Terminal & Debugging Tools", rating: 90, icon: "💻" },
        { name: "JSON Data Formats & Fetch API", rating: 92, icon: "📄" },
      ],
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 28, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 85,
        damping: 14,
      },
    },
  };

  return (
    <motion.section 
      id="skills" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={containerVariants}
      className={`relative py-24 px-6 overflow-hidden transition-colors duration-500 ${
        isLight ? "bg-transparent" : "bg-transparent"
      }`}
    >
      {/* Background visual styling */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] blur-[120px] rounded-full pointer-events-none transition-colors duration-500 ${
        isLight ? "bg-amber-500/2" : "bg-amber-500/5"
      }`} />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-12">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] font-mono text-amber-500 tracking-widest uppercase font-bold">
            Technical Stack // Skills Matrix
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Summary Block */}
          <motion.div variants={itemVariants} className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            <h3 className={`text-2xl md:text-3xl font-sans font-bold tracking-tight transition-colors ${
              isLight ? "text-stone-900" : "text-neutral-100"
            }`}>
              A Diverse & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-750">Structured</span> Set of Capabilities.
            </h3>
            <p className={`text-sm leading-relaxed font-sans transition-colors ${
              isLight ? "text-stone-600" : "text-neutral-400"
            }`}>
              I specialize in writing lean, standards-compliant source code. Moving seamlessly between modular client frameworks and server routers, I prioritize the performance and scalability of the product.
            </p>
            <div className={`border p-4 rounded-xl space-y-3 transition-colors ${
              isLight
                ? "bg-white border-stone-200/80 shadow-sm"
                : "bg-neutral-900/40 border-neutral-900"
            }`}>
              <div className={`flex items-center gap-2 text-xs font-mono font-bold ${
                isLight ? "text-stone-700" : "text-neutral-300"
              }`}>
                <Activity className="w-4 h-4 text-amber-500" />
                <span>Active Specializations</span>
              </div>
              <div className="space-y-2">
                {[
                  "Mobile-First Responsive Layouts",
                  "API Design & Gateway Implementations",
                  "Performance Tuning & Clean Markups",
                ].map((spec) => (
                  <div key={spec} className={`flex items-center gap-2 text-xs transition-colors ${
                    isLight ? "text-stone-600" : "text-neutral-400"
                  }`}>
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Live Terminal Easter Egg */}
            <div className={`border rounded-lg text-[9px] font-mono flex justify-between items-center shadow-inner transition-colors ${
              isLight
                ? "bg-stone-100 border-stone-200 text-stone-500"
                : "bg-[#0a0a0a] border border-neutral-850 text-neutral-500"
            }`}>
              <span className="flex items-center gap-1.5 p-2">
                <Terminal className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                <span>$ npx dipjal-stack --verify</span>
              </span>
              <span className="text-emerald-600 dark:text-emerald-500/80 font-bold pr-2.5">PASSING 100%</span>
            </div>
          </motion.div>

          {/* Right Skills Category Blocks */}
          <div className="lg:col-span-8 space-y-8">
            {categories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <motion.div
                  variants={itemVariants}
                  key={idx}
                  className={`border p-6 md:p-8 rounded-2xl transition-all duration-300 backdrop-blur-sm ${
                    isLight
                      ? "bg-white/80 border-stone-200 hover:border-amber-500/20 shadow-sm"
                      : "bg-neutral-900/20 border-neutral-900 hover:border-neutral-850"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                      <IconComp className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className={`font-sans font-bold text-base md:text-lg transition-colors ${
                        isLight ? "text-stone-900" : "text-neutral-200"
                      }`}>
                        {cat.title}
                      </h4>
                      <p className={`text-xs leading-relaxed font-sans mt-1 transition-colors ${
                        isLight ? "text-stone-500" : "text-neutral-400"
                      }`}>
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="relative group"
                        onMouseEnter={() => setHoveredSkill(skill.name)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                          <span className={`flex items-center gap-2 group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors duration-300 ${
                            isLight ? "text-stone-700" : "text-neutral-300"
                          }`}>
                            <span>{skill.icon}</span>
                            <span className="font-semibold">{skill.name}</span>
                          </span>
                          <span className={`font-bold transition-colors ${isLight ? "text-stone-400" : "text-neutral-500"}`}>{skill.rating}%</span>
                        </div>
                        
                        {/* Custom Progress Bar */}
                        <div className={`h-2 w-full rounded-full overflow-hidden border transition-colors ${
                          isLight
                            ? "bg-stone-100 border-stone-200/50"
                            : "bg-neutral-950 border border-neutral-900"
                        }`}>
                          <div
                            className="h-full bg-gradient-to-r from-amber-600 to-amber-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_8px_rgba(245,158,11,0.2)]"
                            style={{ width: `${skill.rating}%` }}
                          />
                        </div>

                        {/* Interactive floating indicator */}
                        {hoveredSkill === skill.name && (
                          <div className="absolute right-0 top-[-24px] bg-amber-500 text-neutral-950 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded shadow-lg pointer-events-none z-10 animate-fade-in">
                            {skill.rating >= 90 ? "ADVANCED" : skill.rating >= 80 ? "PRO" : "INTERMEDIATE"}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </motion.section>
  );
}
