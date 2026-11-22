"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { GrassMat } from "@/components/art/GrassMat";

type Kibble = {
  id: number;
  x: number;
  y: number;
  dx: number;
  rot: number;
  tone: number;
};

export function DigDemo() {
  const areaRef = useRef<HTMLDivElement>(null);
  const counter = useRef(0);
  const lastSpawn = useRef(0);
  const [kibbles, setKibbles] = useState<Kibble[]>([]);
  const [found, setFound] = useState(0);
  const [pressing, setPressing] = useState(false);
  const [paw, setPaw] = useState<{ x: number; y: number } | null>(null);
  const reduce = useReducedMotion();

  const spawn = useCallback((clientX: number, clientY: number, count: number) => {
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setPaw({ x, y });
    const fresh: Kibble[] = Array.from({ length: count }, () => {
      counter.current += 1;
      return {
        id: counter.current,
        x: x + (Math.random() - 0.5) * 7,
        y,
        dx: (Math.random() - 0.5) * 60,
        rot: (Math.random() - 0.5) * 220,
        tone: Math.floor(Math.random() * 3),
      };
    });
    setKibbles((prev) => [...prev.slice(-16), ...fresh]);
    setFound((value) => value + count);
    window.setTimeout(() => {
      setKibbles((prev) => prev.filter((item) => !fresh.some((f) => f.id === item.id)));
    }, 1400);
  }, []);

  const updatePaw = (clientX: number, clientY: number) => {
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPaw({
      x: ((clientX - rect.left) / rect.width) * 100,
      y: ((clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div>
      <div
        ref={areaRef}
        role="button"
        tabIndex={0}
        aria-label="Interactive pressure demo. Press and scratch the grass to release kibble."
        className="relative touch-none select-none overflow-hidden rounded-[2rem] border border-forest-900/10 bg-cream-50 shadow-soft"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture?.(event.pointerId);
          setPressing(true);
          lastSpawn.current = performance.now();
          spawn(event.clientX, event.clientY, 3);
        }}
        onPointerMove={(event) => {
          if (!pressing) return;
          updatePaw(event.clientX, event.clientY);
          const now = performance.now();
          if (now - lastSpawn.current > 120) {
            lastSpawn.current = now;
            spawn(event.clientX, event.clientY, 1);
          }
        }}
        onPointerUp={() => setPressing(false)}
        onPointerCancel={() => setPressing(false)}
        onPointerLeave={() => setPressing(false)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            const rect = areaRef.current?.getBoundingClientRect();
            if (rect) {
              spawn(
                rect.left + rect.width * (0.3 + Math.random() * 0.4),
                rect.top + rect.height * (0.35 + Math.random() * 0.4),
                2
              );
            }
          }
        }}
      >
        <GrassMat color="moss" pattern="meadow" seed={23} className="pointer-events-none w-full" showKibble={false} />

        <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-cream-50/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-forest-800 shadow-sm backdrop-blur">
          Press &amp; scratch the meadow
        </div>
        <div className="pointer-events-none absolute right-4 top-4 rounded-full bg-forest-900/90 px-3.5 py-1.5 text-xs font-extrabold text-cream-50 shadow-sm backdrop-blur">
          Kibble found: <span aria-live="polite">{found}</span>
        </div>

        <AnimatePresence>
          {kibbles.map((k) => (
            <motion.div
              key={k.id}
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-[45%] shadow-sm"
              style={{
                left: `${k.x}%`,
                top: `${k.y}%`,
                width: 15,
                height: 11,
                background:
                  k.tone === 0
                    ? "linear-gradient(145deg,#E7B273,#A06A38)"
                    : k.tone === 1
                      ? "linear-gradient(145deg,#D8A067,#8C5A2E)"
                      : "linear-gradient(145deg,#C98B4F,#7A4A26)",
              }}
              initial={{ opacity: 1, scale: 0.5, y: 0, x: 0, rotate: 0 }}
              animate={
                reduce
                  ? { opacity: 0, y: -20 }
                  : { opacity: 0, y: -80, x: k.dx, scale: 1.1, rotate: k.rot }
              }
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0.4 : 1.2, ease: "easeOut" }}
            >
              <span className="absolute left-[4px] top-[2px] h-1 w-1.5 rounded-full bg-[#F6DDB4]/80" />
            </motion.div>
          ))}
        </AnimatePresence>

        {paw && (
          <div
            className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${paw.x}%`, top: `${paw.y}%` }}
          >
            <div
              className={`grid h-16 w-16 place-items-center rounded-full border-2 border-cream-50/70 bg-clay-500/30 transition-transform duration-150 ${
                pressing ? "scale-90" : "scale-100"
              }`}
            >
              <svg viewBox="0 0 24 24" className="h-7 w-7 text-cream-50/90" fill="currentColor" aria-hidden="true">
                <ellipse cx="12" cy="16" rx="6" ry="4.6" />
                <ellipse cx="5.2" cy="10.5" rx="2.2" ry="2.8" />
                <ellipse cx="9.4" cy="7.6" rx="2.2" ry="3" />
                <ellipse cx="14.6" cy="7.6" rx="2.2" ry="3" />
                <ellipse cx="18.8" cy="10.5" rx="2.2" ry="2.8" />
              </svg>
            </div>
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-3 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-cream-50/70">
          18 mm buds · sealed tray · zero spills
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-md text-xs leading-relaxed text-forest-900/60">
          Every press flexes a bud. The one-way valves underneath open just enough to
          nudge a few pieces of kibble up through the grass.
        </p>
        <button
          type="button"
          onClick={() => {
            setFound(0);
            setKibbles([]);
          }}
          className="rounded-full border border-forest-900/15 bg-cream-50 px-4 py-2 text-xs font-extrabold text-forest-800 transition-colors hover:bg-cream-200"
        >
          Reset the meadow
        </button>
      </div>
    </div>
  );
}
