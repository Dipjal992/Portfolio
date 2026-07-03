import { useState } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Copy,
  Check,
  Github,
  Laptop,
  ArrowUpRight,
  Copyright,
  Linkedin,
  Facebook,
  Instagram,
} from "lucide-react";

interface ContactProps {
  theme?: "light" | "dark";
}

export default function Contact({ theme = "dark" }: ContactProps) {
  const email = "dipjal.tamrakar1234@gmail.com";
  const [copied, setCopied] = useState(false);

  const isLight = theme === "light";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

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
      id="contact" 
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      variants={containerVariants}
      className={`relative pt-24 pb-12 px-6 overflow-hidden transition-colors duration-500 ${
        isLight ? "bg-transparent" : "bg-neutral-950"
      }`}
    >
      {/* Decorative Top Separator */}
      <div className={`absolute top-0 left-0 w-full h-[1px] transition-colors duration-500 ${
        isLight ? "bg-gradient-to-r from-transparent via-stone-200 to-transparent" : "bg-gradient-to-r from-transparent via-neutral-800 to-transparent"
      }`} />

      {/* Decorative Ambient Background Orb */}
      <div className={`absolute bottom-[-100px] right-[-100px] w-96 h-96 blur-[100px] rounded-full pointer-events-none transition-colors duration-500 ${
        isLight ? "bg-amber-500/2" : "bg-amber-500/5"
      }`} />

      <div className="max-w-4xl mx-auto">
        
        {/* Contact Block Header */}
        <motion.div variants={itemVariants} className="text-center space-y-4 mb-16">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono transition-colors ${
            isLight
              ? "bg-amber-500/5 border border-amber-500/20 text-amber-600 font-semibold"
              : "bg-amber-500/10 border border-amber-500/20 text-amber-500"
          }`}>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span>Accepting Freelance Work</span>
          </div>
          <h2 className={`text-3xl md:text-5xl font-sans font-bold tracking-tight transition-colors ${
            isLight ? "text-stone-900" : "text-neutral-100"
          }`}>
            Let’s Build Something <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">Exceptional</span>
          </h2>
          <p className={`text-sm md:text-base max-w-xl mx-auto leading-relaxed transition-colors ${
            isLight ? "text-stone-600" : "text-neutral-400"
          }`}>
            Have an application idea, a website requirement, or need developer reinforcement on a system project? Drop me a line, and let's coordinate.
          </p>
        </motion.div>

        {/* Dynamic Contact Card */}
        <motion.div variants={itemVariants} className={`border-2 p-8 md:p-12 rounded-3xl backdrop-blur-md relative group transition-all duration-500 text-center ${
          isLight
            ? "bg-white/80 border-stone-200 hover:border-amber-500/30 shadow-md"
            : "bg-neutral-900/30 border-2 border-neutral-800/80 hover:border-amber-500/40 shadow-2xl"
        }`}>
          
          {/* Subtle Hover border glow */}
          <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Email Icon Sphere */}
            <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:border-amber-500 group-hover:bg-amber-500/20 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.05)]">
              <Mail className="w-7 h-7 text-amber-500" />
            </div>

            <span className={`text-[10px] font-mono uppercase tracking-widest mb-2 block transition-colors ${
              isLight ? "text-stone-400" : "text-neutral-500"
            }`}>
              PRIMARY CALL TO ACTION // EMAIL OUTLET
            </span>

            {/* Email Address Display */}
            <div className={`text-lg md:text-2xl font-mono font-bold tracking-tight select-all mb-8 transition-colors ${
              isLight 
                ? "text-stone-900 selection:bg-amber-100 selection:text-amber-950" 
                : "text-neutral-200 selection:bg-amber-500 selection:text-neutral-950"
            }`}>
              {email}
            </div>

            {/* Action Buttons Group */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full max-w-md">
              
              {/* Direct Mail Link Button */}
              <a
                href={`mailto:${email}`}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-neutral-950 rounded-xl font-mono text-xs font-bold transition-all duration-300 shadow-[0_4px_16px_rgba(245,158,11,0.15)] hover:shadow-[0_4px_24px_rgba(245,158,11,0.35)] hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Write Mail Message</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              {/* Copy Clipboard Button */}
              <button
                onClick={handleCopy}
                className={`w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 border rounded-xl font-mono text-xs font-semibold transition-all duration-300 hover:-translate-y-0.5 cursor-pointer ${
                  isLight
                    ? "bg-stone-50 hover:bg-stone-100 border-stone-200 text-stone-700 shadow-sm"
                    : "bg-neutral-900 hover:bg-neutral-850 border-neutral-850 hover:border-neutral-700 text-neutral-300"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500 animate-scale-up" />
                    <span className="text-emerald-500">Address Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-400 dark:text-neutral-500" />
                    <span>Copy to Clipboard</span>
                  </>
                )}
              </button>

            </div>

            {/* Social Media Grid */}
            <div className="mt-10 pt-8 border-t border-stone-200/60 dark:border-neutral-800/60 w-full">
              <span className={`text-[10px] font-mono uppercase tracking-widest mb-4 block transition-colors ${
                isLight ? "text-stone-400" : "text-neutral-500"
              }`}>
                Connect on Social Networks
              </span>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  {
                    name: "GitHub",
                    url: "https://github.com/Dipjal992",
                    icon: Github,
                    color: isLight
                      ? "hover:text-stone-900 hover:bg-stone-100 hover:border-stone-300"
                      : "hover:text-neutral-100 hover:bg-neutral-800 hover:border-neutral-700",
                  },
                  {
                    name: "LinkedIn",
                    url: "https://www.linkedin.com/in/dipjal-tamrakar",
                    icon: Linkedin,
                    color: isLight
                      ? "hover:text-sky-600 hover:bg-sky-50 hover:border-sky-200"
                      : "hover:text-sky-400 hover:bg-sky-950/20 hover:border-sky-900/30",
                  },
                  {
                    name: "Instagram",
                    url: "https://www.instagram.com/dipjal_tamrakar",
                    icon: Instagram,
                    color: isLight
                      ? "hover:text-pink-600 hover:bg-pink-50 hover:border-pink-200"
                      : "hover:text-pink-400 hover:bg-pink-950/20 hover:border-pink-900/30",
                  },
                  {
                    name: "Facebook",
                    url: "https://www.facebook.com/dipjal.tamrakar",
                    icon: Facebook,
                    color: isLight
                      ? "hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200"
                      : "hover:text-blue-400 hover:bg-blue-950/20 hover:border-blue-900/30",
                  },
                ].map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noreferrer"
                      className={`flex items-center gap-2 px-4 py-2.5 border rounded-xl font-mono text-xs transition-all duration-300 hover:-translate-y-1 ${
                        isLight
                          ? "bg-white border-stone-200 text-stone-600 shadow-sm"
                          : "bg-neutral-950 border border-neutral-850 text-neutral-400"
                      } ${social.color}`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{social.name}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Resume Placeholder statement */}
            <p className={`text-[10px] font-mono mt-6 block transition-colors ${isLight ? "text-stone-400" : "text-neutral-500"}`}>
              Resume credentials / download feature will be integrated during next maintenance cycle.
            </p>
          </div>

        </motion.div>

        {/* Footer block */}
        <motion.div variants={itemVariants} className={`border-t mt-24 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono transition-colors ${
          isLight ? "border-stone-200 text-stone-400" : "border-neutral-900 text-neutral-500"
        }`}>
          
          <div className="flex items-center gap-1.5">
            <Copyright className={`w-3.5 h-3.5 ${isLight ? "text-stone-300" : "text-neutral-600"}`} />
            <span>{new Date().getFullYear()} Dipjal Tamrakar. All rights reserved.</span>
          </div>

          {/* Social icons */}
          <div className="flex items-center gap-3 flex-wrap justify-center">
            <a
              href="https://github.com/Dipjal992"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1 transition-colors py-1 px-2 rounded ${
                isLight ? "hover:text-stone-900 hover:bg-stone-100" : "hover:text-amber-500 hover:bg-neutral-900"
              }`}
              title="GitHub Profile"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/dipjal-tamrakar"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1 transition-colors py-1 px-2 rounded ${
                isLight ? "hover:text-sky-600 hover:bg-stone-100" : "hover:text-sky-400 hover:bg-neutral-900"
              }`}
              title="LinkedIn Profile"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://www.instagram.com/dipjal_tamrakar"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1 transition-colors py-1 px-2 rounded ${
                isLight ? "hover:text-pink-600 hover:bg-stone-100" : "hover:text-pink-400 hover:bg-neutral-900"
              }`}
              title="Instagram Profile"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
            <a
              href="https://www.facebook.com/dipjal.tamrakar"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-1 transition-colors py-1 px-2 rounded ${
                isLight ? "hover:text-blue-600 hover:bg-stone-100" : "hover:text-blue-400 hover:bg-neutral-900"
              }`}
              title="Facebook Profile"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
            </a>
            <span className={`hidden sm:inline transition-colors ${isLight ? "text-stone-200" : "text-neutral-800"}`}>|</span>
            <div className={`flex items-center gap-1 py-1 px-2 transition-colors ${isLight ? "text-stone-300" : "text-neutral-600"}`}>
              <Laptop className="w-4 h-4" />
              <span>Dharan, Nepal</span>
            </div>
          </div>

        </motion.div>

      </div>
    </motion.section>
  );
}
