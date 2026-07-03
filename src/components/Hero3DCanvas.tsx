import { useEffect, useRef, useState } from "react";
import { Move3d, Compass } from "lucide-react";

interface Hero3DCanvasProps {
  theme?: "light" | "dark";
}

export default function Hero3DCanvas({ theme = "dark" }: Hero3DCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shape, setShape] = useState<"sphere" | "torus" | "cube">("sphere");
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, isHovered: false });

  const isLight = theme === "light";

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);
    let animationFrameId: number;

    // 3D Point Interface
    interface Point3D {
      x: number;
      y: number;
      z: number;
      ox: number; // original coordinates for pulsing
      oy: number;
      oz: number;
      color: string;
    }

    let points: Point3D[] = [];
    const maxPoints = shape === "cube" ? 64 : shape === "torus" ? 120 : 100;

    // Generate shapes in 3D
    const generateShape = () => {
      points = [];
      const goldColor = "rgba(245, 158, 11, 0.8)"; // amber-500
      
      if (shape === "sphere") {
        // Geodesic / Fibonacci Sphere
        const phi = Math.PI * (3 - Math.sqrt(5)); // golden angle
        for (let i = 0; i < maxPoints; i++) {
          const y = 1 - (i / (maxPoints - 1)) * 2; // y goes from 1 to -1
          const radius = Math.sqrt(1 - y * y); // radius at y
          const theta = phi * i; // golden angle increment

          const x = Math.cos(theta) * radius;
          const z = Math.sin(theta) * radius;

          // Scale factor
          const s = 130;
          points.push({
            x: x * s,
            y: y * s,
            z: z * s,
            ox: x * s,
            oy: y * s,
            oz: z * s,
            color: goldColor,
          });
        }
      } else if (shape === "torus") {
        // Torus / Donut shape
        const R = 100; // outer radius
        const r = 40;  // inner radius
        const ringSegments = 12;
        const tubeSegments = 10;

        for (let j = 0; j < ringSegments; j++) {
          const theta = (j / ringSegments) * Math.PI * 2;
          for (let k = 0; k < tubeSegments; k++) {
            const phi = (k / tubeSegments) * Math.PI * 2;
            const x = (R + r * Math.cos(phi)) * Math.cos(theta);
            const y = (R + r * Math.cos(phi)) * Math.sin(theta);
            const z = r * Math.sin(phi);

            points.push({
              x,
              y,
              z,
              ox: x,
              oy: y,
              oz: z,
              color: goldColor,
            });
          }
        }
      } else if (shape === "cube") {
        // Nested cubic grid
        const size = 150;
        const steps = 4;
        for (let x = 0; x < steps; x++) {
          for (let y = 0; y < steps; y++) {
            for (let z = 0; z < steps; z++) {
              if (
                x === 0 ||
                x === steps - 1 ||
                y === 0 ||
                y === steps - 1 ||
                z === 0 ||
                z === steps - 1
              ) {
                const px = (x / (steps - 1) - 0.5) * size;
                const py = (y / (steps - 1) - 0.5) * size;
                const pz = (z / (steps - 1) - 0.5) * size;
                points.push({
                  x: px,
                  y: py,
                  z: pz,
                  ox: px,
                  oy: py,
                  oz: pz,
                  color: goldColor,
                });
              }
            }
          }
        }
      }
    };

    generateShape();

    // Rotations variables
    let angleX = 0.003;
    let angleY = 0.005;
    let angleZ = 0.002;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      // Normalised coordinates (-1 to 1)
      mouseRef.current.targetX = (e.clientX - cx) / (rect.width / 2);
      mouseRef.current.targetY = (e.clientY - cy) / (rect.height / 2);
      mouseRef.current.isHovered = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
      mouseRef.current.isHovered = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const handleResize = () => {
      if (!canvas || !container) return;
      width = canvas.width = container.clientWidth;
      height = canvas.height = container.clientHeight;
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Dampened mouse tracking
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.1;
      mouse.y += (mouse.targetY - mouse.y) * 0.1;

      // Dynamic rotation offsets based on mouse positions
      const dynamicAngleY = angleY + mouse.x * 0.015;
      const dynamicAngleX = angleX - mouse.y * 0.015;

      const cosX = Math.cos(dynamicAngleX);
      const sinX = Math.sin(dynamicAngleX);
      const cosY = Math.cos(dynamicAngleY);
      const sinY = Math.sin(dynamicAngleY);
      const cosZ = Math.cos(angleZ);
      const sinZ = Math.sin(angleZ);

      // Perspective projection params
      const fov = 350; // field of view
      const cx = width / 2;
      const cy = height / 2;

      // Project points
      interface ProjectedPoint {
        x: number;
        y: number;
        z: number;
        scale: number;
        color: string;
      }
      const projected: ProjectedPoint[] = [];

      for (let i = 0; i < points.length; i++) {
        const p = points[i];

        // Pulsing animation over time
        const pulse = 1 + Math.sin(Date.now() * 0.0015 + i * 0.1) * 0.03;
        let x = p.ox * pulse;
        let y = p.oy * pulse;
        let z = p.oz * pulse;

        // 3D Rotations
        // Rotate X
        let y1 = y * cosX - z * sinX;
        let z1 = z * cosX + y * sinX;

        // Rotate Y
        let x2 = x * cosY + z1 * sinY;
        let z2 = z1 * cosY - x * sinY;

        // Rotate Z
        let x3 = x2 * cosZ - y1 * sinZ;
        let y3 = y1 * cosZ + x2 * sinZ;

        // Update working position
        p.x = x3;
        p.y = y3;
        p.z = z2;

        // Perspective division
        const distance = 300;
        const scale = fov / (fov + z2 + distance);
        const projX = x3 * scale + cx;
        const projY = y3 * scale + cy;

        projected.push({
          x: projX,
          y: projY,
          z: z2,
          scale,
          color: p.color,
        });
      }

      // Draw connections / filaments
      ctx.lineWidth = 0.65;
      const maxDistance = shape === "cube" ? 60 : shape === "torus" ? 45 : 75;

      for (let i = 0; i < projected.length; i++) {
        for (let j = i + 1; j < projected.length; j++) {
          const pi = projected[i];
          const pj = projected[j];

          const dx = pi.x - pj.x;
          const dy = pi.y - pj.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          // Only connect if actual 3D points are close to each other
          const dist3D = Math.sqrt(
            Math.pow(points[i].x - points[j].x, 2) +
            Math.pow(points[i].y - points[j].y, 2) +
            Math.pow(points[i].z - points[j].z, 2)
          );

          if (dist3D < maxDistance) {
            // Draw filament with depth-based opacity
            const midZ = (pi.z + pj.z) / 2;
            const opacity = Math.max(0.05, Math.min(0.5, (150 - midZ) / 300)) * (1 - dist / (maxDistance * 2));
            ctx.strokeStyle = `rgba(245, 158, 11, ${opacity})`;
            ctx.beginPath();
            ctx.moveTo(pi.x, pi.y);
            ctx.lineTo(pj.x, pj.y);
            ctx.stroke();
          }
        }
      }

      // Draw projected nodes
      for (let i = 0; i < projected.length; i++) {
        const p = projected[i];
        if (p.x < 0 || p.x > width || p.y < 0 || p.y > height) continue;

        const baseSize = 2;
        const radius = Math.max(0.5, baseSize * p.scale);
        const depthOpacity = Math.max(0.1, Math.min(1.0, (180 - p.z) / 300));

        // Draw outer glow for a subset of prominent points
        if (i % 6 === 0) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, radius * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(245, 158, 11, ${depthOpacity * 0.18})`;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${depthOpacity})`;
        ctx.fill();
      }

      // Slowly increment base angles for idle rotation
      angleX += 0.001;
      angleY += 0.0015;
      angleZ += 0.0005;

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      resizeObserver.disconnect();
    };
  }, [shape]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[300px] flex items-center justify-center"
      id="hero-3d-visualizer"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing z-10"
      />

      {/* Floating UI controls for shape switching */}
      <div className={`absolute top-4 right-4 z-20 flex gap-1.5 p-1.5 rounded-lg border shadow-md transition-colors ${
        isLight
          ? "bg-white/90 border-stone-200"
          : "bg-neutral-950/80 border-neutral-800"
      }`}>
        {(["sphere", "torus", "cube"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setShape(s)}
            className={`px-2.5 py-1 text-[11px] rounded font-mono uppercase font-semibold transition-all ${
              shape === s
                ? isLight
                  ? "bg-amber-500/15 text-amber-600 border border-amber-500/30"
                  : "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                : isLight
                  ? "text-stone-400 border border-transparent hover:text-stone-700"
                  : "text-neutral-500 border border-transparent hover:text-neutral-300"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Center ambient glow behind shape */}
      <div className={`absolute w-36 h-36 blur-3xl rounded-full -z-10 animate-pulse pointer-events-none transition-colors ${
        isLight ? "bg-amber-500/5" : "bg-amber-500/10"
      }`} />

      {/* Indicator */}
      <div className={`absolute bottom-4 left-4 z-20 flex items-center gap-1.5 text-[10px] font-mono pointer-events-none transition-colors ${
        isLight ? "text-stone-400" : "text-neutral-500"
      }`}>
        <Compass className="w-3 h-3 text-amber-500/60 animate-spin-slow" />
        <span>3D Projection Mode • Drag mouse to rotate</span>
      </div>
    </div>
  );
}
