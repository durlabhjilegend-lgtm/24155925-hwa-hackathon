"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Dog, type DogPose } from "@/components/art/Dog";
import { GrassMat } from "@/components/art/GrassMat";
import { ProductArt } from "@/components/art/ProductArt";

const SCENES = [
  {
    time: "6:40 am",
    title: "The nose knows",
    quote: "The floor smells like the trail today. I check twice just to be sure.",
    human:
      "The breeze dispenser carries cedar bark and wet stone across the room. Long before breakfast, the den already smells like somewhere worth exploring.",
    dog: "look" as DogPose,
    background: "linear-gradient(135deg,#F8E8C4 0%,#F4EDDA 52%,#DCE9BC 100%)",
    dark: false,
  },
  {
    time: "11:15 am",
    title: "The great dig",
    quote: "I dug. A snack appeared. So obviously, I dug harder.",
    human:
      "Buds flex under a paw and the one-way valves underneath release a few pieces of kibble. The sealed tray keeps the rest contained — all dig, no crumb trail.",
    dog: "dig" as DogPose,
    background: "linear-gradient(135deg,#EAF3D8 0%,#D9E9D4 55%,#B5D4AB 100%)",
    dark: false,
  },
  {
    time: "3:30 pm",
    title: "The slow feast",
    quote: "The humans call it a puzzle. I call it a very slow breakfast.",
    human:
      "A handful of kibble goes into the Sniff Maze or a chew gets tucked into the grass. The nose stays busy, the paws stay happy, and the sofa stays un-dug.",
    dog: "cheer" as DogPose,
    background: "linear-gradient(135deg,#F7EBD4 0%,#EADFC4 55%,#C7DD93 100%)",
    dark: false,
  },
  {
    time: "8:00 pm",
    title: "Den mode",
    quote: "No door to scratch. Just a soft place to be wild.",
    human:
      "The meadow flattens into a den. Forest air, a full belly, a warm chin on soft buds. The living room is quiet, and the evening belongs to the dog.",
    dog: "sleep" as DogPose,
    background: "linear-gradient(135deg,#245B3E 0%,#163D2A 55%,#0E2A1D 100%)",
    dark: true,
  },
];

export function StoryMode() {
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const scene = SCENES[index];
  const total = SCENES.length;

  const go = (next: number) => setIndex((next + total) % total);

  return (
    <div className="card overflow-hidden">
      <div className="grid lg:grid-cols-[1.13fr_0.87fr]">
        <div className="relative min-h-[340px] overflow-hidden sm:min-h-[430px]" style={{ background: scene.background }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`art-${index}`}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              {!scene.dark && (
                <>
                  <div
                    className="absolute left-8 top-8 h-24 w-24 rounded-full sm:h-32 sm:w-32"
                    style={{
                      background:
                        index === 2
                          ? "radial-gradient(circle at 35% 35%,#F6D9A0,#E8B96A)"
                          : "radial-gradient(circle at 35% 35%,#FFF2C9,#F2C879)",
                      boxShadow: "0 0 70px rgba(242,200,121,0.55)",
                    }}
                    aria-hidden="true"
                  />
                  <svg className="absolute right-6 top-10 w-40 text-forest-800/35 sm:w-56" viewBox="0 0 220 60" fill="none" aria-hidden="true">
                    <path d="M6 42c34-22 66-22 98 0M60 28c26-16 50-16 76 0" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                </>
              )}
              {scene.dark && (
                <div aria-hidden="true">
                  <div className="absolute right-10 top-10 h-20 w-20 rounded-full bg-cream-100/90 shadow-[0_0_80px_rgba(250,246,233,0.5)]" />
                  <div className="absolute right-[86px] top-8 h-20 w-20 rounded-full bg-[#163D2A]" />
                  {[
                    [12, 22],
                    [28, 12],
                    [46, 26],
                    [64, 10],
                    [80, 30],
                    [22, 46],
                    [58, 44],
                    [88, 52],
                  ].map(([left, top], i) => (
                    <span
                      key={i}
                      className="absolute h-1.5 w-1.5 rounded-full bg-cream-100/70 animate-floaty"
                      style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${i * 0.4}s` }}
                    />
                  ))}
                </div>
              )}

              <div className="absolute bottom-4 left-1/2 w-[78%] -translate-x-1/2 rotate-[-2deg] sm:bottom-8">
                <GrassMat
                  color={scene.dark ? "moss" : index === 2 ? "sand" : "moss"}
                  pattern={index === 1 ? "wild" : "meadow"}
                  seed={7}
                  className="w-full"
                  showKibble={index !== 0}
                />
              </div>

              <Dog
                pose={scene.dog}
                className={`absolute drop-shadow-xl ${
                  index === 3
                    ? "bottom-2 right-6 w-44 sm:w-56"
                    : index === 1
                      ? "bottom-0 right-2 w-40 sm:right-8 sm:w-52"
                      : "bottom-1 right-4 w-36 sm:right-10 sm:w-48"
                }`}
              />

              {index === 0 && (
                <div className="absolute right-5 top-1/2 w-16 sm:w-20">
                  <ProductArt art="dispenser" accent="#EDAE8C" className="w-full" label="Breeze scent pod dispenser" />
                </div>
              )}
              {index === 2 && (
                <div className="absolute left-5 top-10 flex w-24 flex-col gap-2 sm:left-10 sm:w-28">
                  <ProductArt art="maze" accent="#C96F4A" className="w-full" label="Sniff maze puzzle board" />
                  <ProductArt art="antler" accent="#C96F4A" className="w-16 self-end" label="Alpine antler chew" />
                </div>
              )}
              {index === 1 && (
                <div aria-hidden="true">
                  {[
                    [58, 58],
                    [68, 46],
                    [50, 40],
                    [74, 66],
                    [42, 62],
                  ].map(([left, top], i) => (
                    <span
                      key={i}
                      className="absolute h-2.5 w-3 rounded-[45%] bg-[#C98B4F] shadow-sm animate-floaty"
                      style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                </div>
              )}

              <div
                className={`absolute left-4 top-4 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em] shadow-sm sm:left-6 sm:top-6 ${
                  scene.dark ? "bg-cream-100/15 text-cream-100 backdrop-blur" : "bg-cream-50/85 text-forest-800 backdrop-blur"
                }`}
              >
                {scene.time}
              </div>
              <div
                className={`absolute bottom-4 left-4 hidden rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] sm:block ${
                  scene.dark ? "bg-cream-100/10 text-cream-100/70" : "bg-forest-900/10 text-forest-900/60"
                }`}
              >
                Seen from 18 cm off the floor
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col justify-between bg-cream-50 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`copy-${index}`}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-center justify-between">
                <p className="eyebrow">Scene {index + 1} of {total}</p>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-forest-900/40">
                  Dog-height log
                </p>
              </div>
              <h3 className="mt-3 font-display text-3xl font-extrabold sm:text-4xl">{scene.title}</h3>
              <blockquote className="mt-5">
                <p className="font-display text-xl font-bold leading-snug text-forest-800 sm:text-2xl">
                  “{scene.quote}”
                </p>
                <footer className="mt-2 text-xs font-bold uppercase tracking-[0.14em] text-forest-900/40">
                  — the dog, probably
                </footer>
              </blockquote>
              <div className="mt-5 rounded-2xl border border-forest-900/10 bg-cream-100/70 p-4">
                <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-clay-600">
                  Human translation
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-forest-900/70">{scene.human}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-7">
            <div className="mb-4 h-1.5 overflow-hidden rounded-full bg-forest-900/10">
              <motion.div
                className="h-full rounded-full bg-forest-700"
                animate={{ width: `${((index + 1) / total) * 100}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5">
                {SCENES.map((item, i) => (
                  <button
                    key={item.time}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Go to scene ${i + 1}: ${item.title}`}
                    aria-current={i === index}
                    className={`h-2.5 rounded-full transition-all ${
                      i === index ? "w-7 bg-forest-800" : "w-2.5 bg-forest-900/20 hover:bg-forest-900/40"
                    }`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(index - 1)}
                  className="grid h-10 w-10 place-items-center rounded-full border-2 border-forest-900/15 text-forest-900 transition-colors hover:bg-cream-200"
                  aria-label="Previous scene"
                >
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => go(index + 1)}
                  className="btn-primary h-10 px-5 py-0 text-xs"
                >
                  {index === total - 1 ? "Back to dawn" : "Next scene"}
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
            {index === total - 1 && (
              <Link href="/customize" className="mt-4 inline-flex text-xs font-extrabold text-forest-700 underline underline-offset-4 hover:text-forest-900">
                Build the meadow your dog keeps dreaming about
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
