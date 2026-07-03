import { motion } from "motion/react";
import {
  GraduationCap,
  Calendar,
  MapPin,
  Laptop,
  Layers,
  Wrench,
  UserCheck,
} from "lucide-react";
import Avatar from "./Avatar";

interface AboutProps {
  theme?: "light" | "dark";
}

export default function About({ theme = "dark" }: AboutProps) {
  const isLight = theme === "light";

  const education = [
    {
      institution: "Central Campus of Technology, Dharan",
      degree: "Bachelor of Information Technology (BIT)",
      period: "2023 - Present",
      location: "Hattisar, Dharan, Nepal",
      details: "Pursuing solid core methodologies in Software Engineering, Database Systems, Data Structures, Algorithms, and Web Architectures.",
      active: true,
    },
    {
      institution: "Bishnu Memorial Secondary School",
      degree: "High School Certification & Schooling",
      period: "Completed Schooling",
      location: "Dharan, Sunsari, Nepal",
      details: "Developed early interest in digital logic, programming mechanics, and technology concepts, establishing a strong mathematical foundation.",
      active: false,
    },
  ];

  // Staggered variants
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
      id="about" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={containerVariants}
      className={`relative py-24 px-6 overflow-hidden transition-colors duration-500 ${
        isLight ? "bg-transparent" : "bg-neutral-950/40"
      }`}
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-2 mb-12">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
          <span className="text-[10px] font-mono text-amber-500 tracking-widest uppercase font-bold">
            Profile Overview // Backstory
          </span>
        </motion.div>

        {/* Bento/Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Avatar side */}
          <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col items-center">
            <Avatar />
            <div className="mt-6 text-center max-w-xs">
              <h3 className={`text-lg font-bold font-sans transition-colors ${isLight ? "text-stone-900" : "text-neutral-200"}`}>
                Dipjal Tamrakar
              </h3>
              <p className="text-xs text-amber-600 dark:text-amber-500 font-mono mt-1 font-semibold">
                Frontend & Backend Systems
              </p>
              <div className={`flex items-center justify-center gap-1.5 text-[11px] mt-2 font-mono transition-colors ${
                isLight ? "text-stone-400" : "text-neutral-500"
              }`}>
                <MapPin className="w-3.5 h-3.5 opacity-60" />
                <span>Dharan, Nepal</span>
              </div>
            </div>
          </motion.div>

          {/* Narrative / Qualifications side */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Bio text */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className={`text-2xl md:text-3xl font-sans font-bold tracking-tight flex items-center gap-2 transition-colors ${
                isLight ? "text-stone-900" : "text-neutral-100"
              }`}>
                <UserCheck className="w-6 h-6 text-amber-500" />
                <span>Bridging Code and User Experience</span>
              </h3>
              <p className={`font-sans text-sm md:text-base leading-relaxed transition-colors ${
                isLight ? "text-stone-700" : "text-neutral-300"
              }`}>
                I am a passionate software developer specializing in building reliable, fast web systems. Currently pursuing my Bachelor of Information Technology (BIT) in Dharan, I love translating complex requirements into highly functional, secure, and beautiful digital solutions.
              </p>
              <p className={`font-sans text-sm leading-relaxed transition-colors ${
                isLight ? "text-stone-500" : "text-neutral-400"
              }`}>
                Whether structuring scalable relational backends or engineering interactive frontends with modern code patterns, I focus on performance, accessibility, and clean architecture. I love taking on freelance challenges to bring small business products to life.
              </p>
            </motion.div>

            {/* Education Timeline */}
            <motion.div variants={itemVariants} className="space-y-4">
              <h4 className={`text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 border-b pb-2 transition-colors ${
                isLight ? "text-stone-500 border-stone-200/80" : "text-neutral-400 border-neutral-900"
              }`}>
                <GraduationCap className="w-4 h-4 text-amber-500" />
                <span>Education & Academic Timeline</span>
              </h4>
              
              <div className={`relative border-l ml-3 pl-6 space-y-8 transition-colors ${
                isLight ? "border-stone-200" : "border-neutral-800"
              }`}>
                {education.map((edu, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle Node */}
                    <div
                      className={`absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                        isLight ? "bg-white" : "bg-neutral-950"
                      } ${
                        edu.active
                          ? "border-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.4)]"
                          : isLight
                            ? "border-stone-200"
                            : "border-neutral-800"
                      }`}
                    >
                      {edu.active && <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />}
                    </div>

                    {/* Content Box */}
                    <div className={`border p-5 rounded-xl transition-all duration-300 backdrop-blur-sm ${
                      isLight
                        ? "bg-white/80 border-stone-200/80 hover:border-amber-500/20 shadow-sm"
                        : "bg-neutral-900/20 border-neutral-900 hover:border-neutral-850"
                    }`}>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <h5 className={`font-bold text-sm md:text-base group-hover:text-amber-600 dark:group-hover:text-amber-500 transition-colors duration-300 ${
                          isLight ? "text-stone-900" : "text-neutral-200"
                        }`}>
                          {edu.institution}
                        </h5>
                        <div className={`flex items-center gap-1 px-2.5 py-0.5 border rounded font-mono text-[10px] transition-colors w-max ${
                          isLight
                            ? "bg-stone-50 border-stone-200 text-stone-500"
                            : "bg-neutral-900/60 border-neutral-800 text-neutral-400"
                        }`}>
                          <Calendar className="w-3 h-3 text-amber-500/80" />
                          <span>{edu.period}</span>
                        </div>
                      </div>
                      
                      <div className="text-xs text-amber-600 dark:text-amber-500 font-mono mb-2 font-semibold">
                        {edu.degree}
                      </div>
                      <p className={`text-xs leading-relaxed font-sans transition-colors ${
                        isLight ? "text-stone-600" : "text-neutral-400"
                      }`}>{edu.details}</p>
                      
                      <div className={`flex items-center gap-1 mt-3 text-[10px] font-mono transition-colors ${
                        isLight ? "text-stone-400" : "text-neutral-500"
                      }`}>
                        <MapPin className="w-3 h-3 opacity-60" />
                        <span>{edu.location}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* General Highlights */}
            <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className={`border rounded-xl p-4 transition-all duration-300 ${
                isLight ? "bg-white/80 border-stone-200/80 shadow-sm" : "bg-neutral-900/10 border-neutral-900"
              }`}>
                <Laptop className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
                <h5 className={`text-xs font-mono font-bold uppercase mb-1 ${isLight ? "text-stone-800" : "text-neutral-300"}`}>Frontend</h5>
                <p className={`text-[10px] ${isLight ? "text-stone-500" : "text-neutral-500"}`}>HTML, CSS, JavaScript, React Interfaces</p>
              </div>
              <div className={`border rounded-xl p-4 transition-all duration-300 ${
                isLight ? "bg-white/80 border-stone-200/80 shadow-sm" : "bg-neutral-900/10 border-neutral-900"
              }`}>
                <Layers className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
                <h5 className={`text-xs font-mono font-bold uppercase mb-1 ${isLight ? "text-stone-800" : "text-neutral-300"}`}>Backend</h5>
                <p className={`text-[10px] ${isLight ? "text-stone-500" : "text-neutral-500"}`}>Node.js, Express, DB schemas, REST APIs</p>
              </div>
              <div className={`border rounded-xl p-4 transition-all duration-300 ${
                isLight ? "bg-white/80 border-stone-200/80 shadow-sm" : "bg-neutral-900/10 border-neutral-900"
              }`}>
                <Wrench className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
                <h5 className={`text-xs font-mono font-bold uppercase mb-1 ${isLight ? "text-stone-800" : "text-neutral-300"}`}>Tools</h5>
                <p className={`text-[10px] ${isLight ? "text-stone-500" : "text-neutral-500"}`}>Git/GitHub, Vercel, VS Code terminal</p>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </motion.section>
  );
}
