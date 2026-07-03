import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Github,
  ExternalLink,
  ShieldAlert,
  Sliders,
  CheckCircle2,
  Database,
  Terminal,
  FileCode,
  Smartphone,
  CreditCard,
  ChefHat,
  MonitorCheck,
  ChevronRight,
} from "lucide-react";

interface ProjectAALUProps {
  theme?: "light" | "dark";
}

export default function ProjectAALU({ theme = "dark" }: ProjectAALUProps) {
  const [activeTab, setActiveTab] = useState<"problem" | "process" | "result">("problem");
  const [terminalFile, setTerminalFile] = useState<"server" | "frontend" | "routes">("server");

  const isLight = theme === "light";

  // Dynamic 3D tilt hover state for the Bento cards
  const [leftTilt, setLeftTilt] = useState({ rx: 0, ry: 0 });
  const [rightTilt, setRightTilt] = useState({ rx: 0, ry: 0 });

  // Dynamic box-shadow & spotlight coordinates
  const [leftGlow, setLeftGlow] = useState({ ox: 0, oy: 0, x: 0, y: 0, active: false });
  const [rightGlow, setRightGlow] = useState({ ox: 0, oy: 0, x: 0, y: 0, active: false });

  const handleMouseMoveLeft = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    // Compute small rotational degrees
    const rx = -((y - yc) / yc) * 4.5;
    const ry = ((x - xc) / xc) * 4.5;
    setLeftTilt({ rx, ry });
    setLeftGlow({
      ox: (x - xc) / xc,
      oy: (y - yc) / yc,
      x,
      y,
      active: true,
    });
  };

  const handleMouseLeaveLeft = () => {
    setLeftTilt({ rx: 0, ry: 0 });
    setLeftGlow({ ox: 0, oy: 0, x: 0, y: 0, active: false });
  };

  const handleMouseMoveRight = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rx = -((y - yc) / yc) * 4.5;
    const ry = ((x - xc) / xc) * 4.5;
    setRightTilt({ rx, ry });
    setRightGlow({
      ox: (x - xc) / xc,
      oy: (y - yc) / yc,
      x,
      y,
      active: true,
    });
  };

  const handleMouseLeaveRight = () => {
    setRightTilt({ rx: 0, ry: 0 });
    setRightGlow({ ox: 0, oy: 0, x: 0, y: 0, active: false });
  };

  // Simulated code files for AALU to show real engineering depth
  const codeFiles = {
    server: `// AALU Restaurant - Backend Server Engine
const express = require('express');
const cors = require('cors');
const paymentGateway = require('./gateways/khalti');
const app = express();

app.use(express.json());
app.use(cors());

// Create Order Route
app.post('/api/orders', async (req, res) => {
  const { cart, customer, totalAmount } = req.body;
  try {
    const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
    const order = await db.orders.create({
      id: orderId,
      items: cart,
      customer,
      total: totalAmount,
      status: 'pending'
    });
    
    // Initiate secure payment token
    const paymentSession = await paymentGateway.initiate({
      amount: totalAmount * 100, // in paisa
      purchase_order_id: orderId,
      purchase_order_name: "AALU Cafe Meal"
    });
    
    res.json({ success: true, order, paymentSession });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});`,
    frontend: `// AALU Front-End Order Cart Manager
export function useCart() {
  const [cart, setCart] = useState([]);
  
  const addToCart = (item) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) {
        return prev.map(i => i.id === item.id 
          ? { ...i, qty: i.qty + 1 } 
          : i
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  };

  return { cart, addToCart, calculateTotal };
}`,
    routes: `// Payment integration (Khalti/eSewa Integration)
const axios = require('axios');

async function initiateKhaltiPayment(amount, orderId) {
  const payload = {
    "return_url": "https://aalu-cafe.vercel.app/verify",
    "website_url": "https://aalu-cafe.vercel.app",
    "amount": amount,
    "purchase_order_id": orderId,
    "purchase_order_name": "AALU Order #" + orderId
  };
  
  const headers = {
    'Authorization': \`Key \${process.env.KHALTI_SECRET_KEY}\`,
    'Content-Type': 'application/json'
  };

  const response = await axios.post(
    'https://khalti.com/api/v2/epayment/initiate/', 
    payload, 
    { headers }
  );
  return response.data;
}`,
  };

  return (
    <section 
      id="project" 
      className={`relative py-24 px-6 overflow-hidden transition-colors duration-500 ${
        isLight ? "bg-transparent" : "bg-neutral-950"
      }`}
    >
      {/* Structural Accent Lines */}
      <div className={`absolute top-0 left-0 w-full h-[1px] transition-colors duration-500 ${
        isLight ? "bg-stone-200/60" : "bg-gradient-to-r from-transparent via-neutral-850 to-transparent"
      }`} />
      <div className={`absolute bottom-0 left-0 w-full h-[1px] transition-colors duration-500 ${
        isLight ? "bg-stone-200/60" : "bg-gradient-to-r from-transparent via-neutral-850 to-transparent"
      }`} />

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
              <span className="text-[10px] font-mono text-amber-500 tracking-widest uppercase font-bold">
                Case Study // Active Work
              </span>
            </div>
            <h2 className={`text-3xl md:text-4xl font-sans font-bold tracking-tight transition-colors ${
              isLight ? "text-stone-900" : "text-neutral-100"
            }`}>
              Featured Project: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700">AALU</span>
            </h2>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href="https://github.com/Dipjal992/AALU"
              target="_blank"
              rel="noreferrer"
              className={`flex items-center gap-2 px-4 py-2 border hover:border-amber-500/30 rounded-lg text-xs font-mono transition-all duration-300 ${
                isLight
                  ? "bg-white border-stone-200 text-stone-600 hover:text-stone-900 shadow-sm"
                  : "bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-neutral-100"
              }`}
            >
              <Github className="w-4 h-4 text-amber-500" />
              <span>GitHub Repo</span>
            </a>
            <a
              href="https://github.com/Dipjal992/AALU"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-600 dark:text-amber-500 rounded-lg text-xs font-mono transition-all duration-300 font-semibold"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live System</span>
            </a>
          </div>
        </div>

        {/* Case Study Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
           {/* Left Column: Interactive Tabbed Documentation */}
          <motion.div
            style={{
              rotateX: leftTilt.rx,
              rotateY: leftTilt.ry,
              transformStyle: "preserve-3d",
              perspective: 1000,
              boxShadow: leftGlow.active
                ? `${-leftGlow.ox * 15}px ${-leftGlow.oy * 15}px 30px -10px rgba(245, 158, 11, 0.28), 0 25px 50px -12px rgba(0, 0, 0, 0.4)`
                : undefined,
            }}
            onMouseMove={handleMouseMoveLeft}
            onMouseLeave={handleMouseLeaveLeft}
            whileHover={{
              scale: 1.018,
              y: -5,
              borderColor: "rgba(245, 158, 11, 0.45)",
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
            className={`lg:col-span-7 flex flex-col justify-between border p-6 md:p-8 rounded-2xl backdrop-blur-sm shadow-xl transition-all duration-500 relative overflow-hidden ${
              isLight
                ? "bg-white/80 border-stone-200/85 shadow-sm text-stone-700 hover:shadow-amber-500/10"
                : "bg-neutral-900/40 border-neutral-800 text-neutral-300 hover:shadow-amber-500/10"
            }`}
          >
            {/* Spotlight overlay effect */}
            {leftGlow.active && (
              <div
                className="absolute inset-0 pointer-events-none z-0 rounded-2xl transition-opacity duration-300"
                style={{
                  background: `radial-gradient(400px circle at ${leftGlow.x}px ${leftGlow.y}px, rgba(245, 158, 11, 0.1), transparent 85%)`,
                }}
              />
            )}

            <div className="relative z-10">
              {/* Tabs selector */}
              <div className={`flex border-b pb-2 mb-6 gap-2 transition-colors ${
                isLight ? "border-stone-200" : "border-neutral-800"
              }`}>
                {(["problem", "process", "result"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`relative px-4 py-2.5 rounded-lg text-xs font-mono uppercase font-semibold transition-all cursor-pointer ${
                      activeTab === tab
                        ? isLight
                          ? "text-amber-700 bg-amber-500/5 border border-amber-500/20"
                          : "text-amber-500 bg-amber-500/10 border border-amber-500/20"
                        : "text-stone-400 dark:text-neutral-500 hover:text-stone-600 dark:hover:text-neutral-300"
                    }`}
                  >
                    <span>{tab} Phase</span>
                    {activeTab === tab && (
                      <motion.div
                        layoutId="activeTabUnderline"
                        className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-amber-500"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Tab Content Panels */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="min-h-[260px]"
                >
                  {activeTab === "problem" && (
                    <div>
                      <div className={`flex items-center gap-2 mb-4 px-3 py-1.5 border rounded-lg w-max transition-colors ${
                        isLight
                          ? "text-red-700 bg-red-500/5 border-red-500/20"
                          : "text-red-500 bg-red-950/20 border-red-900/30"
                      }`}>
                        <ShieldAlert className="w-4 h-4" />
                        <span className="text-[10px] font-mono font-bold uppercase">The Friction Point</span>
                      </div>
                      <p className={`text-base leading-relaxed mb-4 font-sans transition-colors ${
                        isLight ? "text-stone-800" : "text-neutral-300"
                      }`}>
                        Local cafés and fast-food restaurants in Dharan struggled with heavy phone-order congestion, order inaccuracies, manual billing delays, and lack of real-time status tracking during peak hours.
                      </p>
                      <p className={`text-sm leading-relaxed font-sans mb-6 transition-colors ${
                        isLight ? "text-stone-500" : "text-neutral-400"
                      }`}>
                        Without an automated digital interface, waiters and cashiers manually handled receipts, leading to order mix-ups, delayed chef dispatches, and friction when handling digital wallet receipts (Khalti, eSewa) on personal phones.
                      </p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className={`border p-3 rounded-lg transition-colors ${
                          isLight ? "bg-stone-50/50 border-stone-200" : "bg-neutral-950/40 border-neutral-800/80"
                        }`}>
                          <span className={`text-[10px] font-mono block mb-1 ${isLight ? "text-stone-400" : "text-neutral-500"}`}>BOTTLENECK A</span>
                          <span className={`text-xs font-semibold font-sans ${isLight ? "text-stone-700" : "text-neutral-300"}`}>Wait times over 25+ minutes</span>
                        </div>
                        <div className={`border p-3 rounded-lg transition-colors ${
                          isLight ? "bg-stone-50/50 border-stone-200" : "bg-neutral-950/40 border-neutral-800/80"
                        }`}>
                          <span className={`text-[10px] font-mono block mb-1 ${isLight ? "text-stone-400" : "text-neutral-500"}`}>BOTTLENECK B</span>
                          <span className={`text-xs font-semibold font-sans ${isLight ? "text-stone-700" : "text-neutral-300"}`}>Manual slip/receipt tracking</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "process" && (
                    <div>
                      <div className="flex items-center gap-2 mb-4 text-amber-600 dark:text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg w-max">
                        <Sliders className="w-4 h-4" />
                        <span className="text-[10px] font-mono font-bold uppercase">Architectural Build</span>
                      </div>
                      <p className={`text-base leading-relaxed mb-4 font-sans transition-colors ${
                        isLight ? "text-stone-800" : "text-neutral-300"
                      }`}>
                        Developed a responsive full-stack system starting from database structures and backend order queues to an intuitive web client that simplifies interactions.
                      </p>
                      <ul className={`space-y-2.5 mb-6 text-sm transition-colors ${isLight ? "text-stone-600" : "text-neutral-400"}`}>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>Structured database schemas for real-time inventory management and dynamic pricing tables.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>Built an administrative control panel for kitchen dispatches, letting chefs change stock and update food status instantly.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          <span>Integrated direct sandbox checkout systems for secure online payments, completing order state transitions automatically.</span>
                        </li>
                      </ul>
                    </div>
                  )}

                  {activeTab === "result" && (
                    <div>
                      <div className={`flex items-center gap-2 mb-4 px-3 py-1.5 border rounded-lg w-max transition-colors ${
                        isLight
                          ? "text-emerald-700 bg-emerald-500/5 border-emerald-500/20"
                          : "text-emerald-500 bg-emerald-950/20 border-emerald-900/30"
                      }`}>
                        <CheckCircle2 className="w-4 h-4" />
                        <span className="text-[10px] font-mono font-bold uppercase">Production Metrics</span>
                      </div>
                      <p className={`text-base leading-relaxed mb-4 font-sans transition-colors ${
                        isLight ? "text-stone-800" : "text-neutral-300"
                      }`}>
                        Deployed a production-ready ordering framework that successfully coordinates front-of-house requests with administrative kitchen dispatches.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className={`border p-4 rounded-xl text-center transition-colors ${
                          isLight ? "bg-stone-50 border-stone-200" : "bg-neutral-950/50 border-neutral-800/60"
                        }`}>
                          <ChefHat className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
                          <div className={`text-lg font-mono font-extrabold ${isLight ? "text-stone-900" : "text-neutral-100"}`}>0%</div>
                          <div className="text-[10px] font-mono text-stone-400 dark:text-neutral-500">Order Mixups</div>
                        </div>
                        <div className={`border p-4 rounded-xl text-center transition-colors ${
                          isLight ? "bg-stone-50 border-stone-200" : "bg-neutral-950/50 border-neutral-800/60"
                        }`}>
                          <CreditCard className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
                          <div className={`text-lg font-mono font-extrabold ${isLight ? "text-stone-900" : "text-neutral-100"}`}>Instant</div>
                          <div className="text-[10px] font-mono text-stone-400 dark:text-neutral-500">Payment Sync</div>
                        </div>
                        <div className={`border p-4 rounded-xl text-center transition-colors ${
                          isLight ? "bg-stone-50 border-stone-200" : "bg-neutral-950/50 border-neutral-800/60"
                        }`}>
                          <MonitorCheck className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
                          <div className={`text-lg font-mono font-extrabold ${isLight ? "text-stone-900" : "text-neutral-100"}`}>2x</div>
                          <div className="text-[10px] font-mono text-stone-400 dark:text-neutral-500">Staff Speedup</div>
                        </div>
                      </div>

                      <p className={`text-xs font-mono leading-relaxed transition-colors ${
                        isLight ? "text-stone-400" : "text-neutral-500"
                      }`}>
                        Features fully responsive client views optimized for smartphones, enabling orders straight from café tables via QR codes, reducing workforce requirements.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Quick Tech Badges */}
            <div className={`relative z-10 border-t pt-6 mt-6 transition-colors ${isLight ? "border-stone-200/80" : "border-neutral-800/60"}`}>
              <span className={`text-[9px] font-mono uppercase block mb-2 ${isLight ? "text-stone-400" : "text-neutral-500"}`}>INTEGRATED STACK</span>
              <div className="flex flex-wrap gap-2 text-[10px] font-mono">
                {["HTML5 / CSS3", "Modern JavaScript", "NodeJS / Express", "Khalti Gateway API", "Kitchen Admin Dashboard", "JSON DB Store"].map((tech) => (
                  <span
                    key={tech}
                    className={`px-2.5 py-1 border rounded transition-colors ${
                      isLight
                        ? "bg-stone-50 border-stone-200/80 text-stone-600"
                        : "bg-neutral-950 border border-neutral-800/80 text-neutral-400"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right Column: Code Terminal Mockup (Remains a super high contrast dark panel for pro developer look) */}
          <motion.div
            style={{
              rotateX: rightTilt.rx,
              rotateY: rightTilt.ry,
              transformStyle: "preserve-3d",
              perspective: 1000,
              boxShadow: rightGlow.active
                ? `${-rightGlow.ox * 15}px ${-rightGlow.oy * 15}px 30px -10px rgba(245, 158, 11, 0.28), 0 25px 50px -12px rgba(0, 0, 0, 0.4)`
                : undefined,
            }}
            onMouseMove={handleMouseMoveRight}
            onMouseLeave={handleMouseLeaveRight}
            whileHover={{
              scale: 1.018,
              y: -5,
              borderColor: "rgba(245, 158, 11, 0.45)",
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 22,
            }}
            className="lg:col-span-5 bg-[#080808] border border-neutral-800/90 dark:border-neutral-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl h-[450px] lg:h-auto min-h-[400px] relative"
          >
            {/* Spotlight overlay effect */}
            {rightGlow.active && (
              <div
                className="absolute inset-0 pointer-events-none z-0 rounded-2xl transition-opacity duration-300"
                style={{
                  background: `radial-gradient(400px circle at ${rightGlow.x}px ${rightGlow.y}px, rgba(245, 158, 11, 0.12), transparent 85%)`,
                }}
              />
            )}

            <div className="relative z-10 flex flex-col h-full flex-1">
              {/* Terminal Tab Bar */}
              <div className="bg-neutral-900/85 border-b border-neutral-850 px-4 py-2.5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-500/60" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <span className="w-3 h-3 rounded-full bg-green-500/60" />
                <span className="text-[11px] font-mono text-neutral-400 ml-2 flex items-center gap-1">
                  <Terminal className="w-3.5 h-3.5 text-amber-500" />
                  <span>aalu-project / core_logic</span>
                </span>
              </div>
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            </div>

            {/* Active file switcher */}
            <div className="bg-[#050505] px-3 py-1.5 border-b border-neutral-850/60 flex gap-2 shrink-0 overflow-x-auto text-[10px] font-mono">
              {[
                { id: "server", name: "server.js", icon: Database },
                { id: "frontend", name: "cart.js", icon: FileCode },
                { id: "routes", name: "payment.js", icon: CreditCard },
              ].map((file) => {
                const IconComp = file.icon;
                return (
                  <button
                    key={file.id}
                    onClick={() => setTerminalFile(file.id as any)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded transition-colors ${
                      terminalFile === file.id
                        ? "bg-neutral-900 border border-neutral-800 text-amber-500"
                        : "text-neutral-500 hover:text-neutral-300"
                    }`}
                  >
                    <IconComp className="w-3 h-3" />
                    <span>{file.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Code editor pane */}
            <div className="flex-1 p-4 overflow-y-auto font-mono text-[11px] leading-relaxed text-neutral-400 bg-[#050505]/90 select-text select-all">
              <pre className="whitespace-pre scrollbar-thin">
                <code>{codeFiles[terminalFile]}</code>
              </pre>
            </div>

            {/* Terminal bottom bar */}
            <div className="bg-neutral-900/60 border-t border-neutral-850 px-4 py-2 flex items-center justify-between text-[10px] font-mono text-neutral-500 shrink-0">
              <span className="flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-neutral-500" />
                <span>Branch: main • UTF-8</span>
              </span>
              <span>Lines: {codeFiles[terminalFile].split("\n").length}</span>
            </div>

            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
}
