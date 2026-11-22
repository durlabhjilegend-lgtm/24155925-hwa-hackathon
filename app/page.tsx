import Link from "next/link";
import { Dog } from "@/components/art/Dog";
import { ProductArt } from "@/components/art/ProductArt";
import { FAQ } from "@/components/FAQ";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { DigDemo } from "@/components/home/DigDemo";
import { Hero } from "@/components/home/Hero";
import { StoryMode } from "@/components/home/StoryMode";
import { ValueStrip } from "@/components/home/ValueStrip";
import { PlayzoneCustomizer } from "@/components/customizer/PlayzoneCustomizer";
import { ProductCard } from "@/components/shop/ProductCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PRODUCTS } from "@/lib/catalog";

const FEATURED = ["mat-classic", "puzzle-maze", "scent-rain"].map(
  (id) => PRODUCTS.find((product) => product.id === id)!
);

const PROBLEMS = [
  {
    title: "Unspent paws",
    body: "A dog who would walk a trail all day is suddenly asked to hold it in. The digging instinct doesn't disappear — it just looks for a door.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <path d="M4 19c4-1 7-4 9-9M8 20c3-1 5-3 6-6M13 4l1.5 5.5M17.5 5l-1 5.5M21 8l-3 4.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Bored noses",
    body: "A nose that has nothing to do will find something to do. Cushions, skirting boards and the one rug you actually like.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <path d="M5 14c0-4 3-6 6-6 2 0 4 1 5 3 2 0 4 2 4 4s-2 4-5 4c-4 0-5-2-7-2-2 0-3-1-3-3Z" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="10" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Doorway archaeology",
    body: "Scratches at the door aren't mischief. They're a dog trying to get to the outside world with the only tool they have.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <path d="M6 21V4h10v17M6 21h12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="13.5" cy="12" r="1" fill="currentColor" />
        <path d="M3 9l2-2M3 14l3-2M3 19l2-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
];

const SCENT_NOTES = [
  "Cedar bark, pine needles, damp moss and rain — three pod blends, no synthetic musk.",
  "A no-heat ceramic dispenser carries the scent low across the room, where a nose lives.",
  "The pods are optional. The meadow works just as well with a neutral room.",
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <ValueStrip />

      {/* The problem */}
      <section className="relative py-16 sm:py-24">
        <div className="container-x">
          <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <Reveal>
              <SectionHeading
                eyebrow="The indoor dog problem"
                title={
                  <>
                    Dogs don&apos;t stop needing the wild. They just stop fitting into it.
                  </>
                }
                description="No yard means no digging. No digging means restlessness, scratched doors and a nose with nothing to do. The answer isn't more discipline — it's a better den."
              />
              <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-forest-900/10 bg-cream-50/80 px-4 py-3">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-moss-200 text-forest-800">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                    <path d="M4 8c4-3 6 3 10 0s6 3 6 3M4 14c4-3 6 3 10 0s6 3 6 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <p className="text-sm font-extrabold text-forest-900">
                  So we brought the meadow inside.
                </p>
              </div>
            </Reveal>

            <div className="grid gap-3 sm:grid-cols-2">
              {PROBLEMS.map((problem, index) => (
                <Reveal key={problem.title} delay={index * 0.07} className={index === 2 ? "sm:col-span-2" : ""}>
                  <div className="card flex h-full gap-4 p-5">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cream-200 text-forest-800">
                      {problem.icon}
                    </span>
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-forest-900/35">
                        0{index + 1}
                      </p>
                      <h3 className="mt-0.5 font-display text-lg font-extrabold">{problem.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-forest-900/62">{problem.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="scroll-mt-24 border-y border-forest-900/10 bg-cream-200/50 py-16 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Pressure activated"
              title="Paw in. Kibble up. No mess."
              description="WILDNEST is a soft silicone meadow with a sealed kibble tray underneath. Try the demo — press and scratch the grass like a very determined dog."
            />
          </Reveal>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[0.92fr_1.08fr]">
            <div className="space-y-3">
              {[
                {
                  step: "01",
                  title: "Fill the sealed tray",
                  body: "Twist out the tray, add a day's worth of kibble, twist it back. The tray is the only place kibble lives — not your floor.",
                },
                {
                  step: "02",
                  title: "Set the meadow down",
                  body: "Buds up, tray locked, mat flat. The non-slip base keeps it in place through even the most committed excavating.",
                },
                {
                  step: "03",
                  title: "Let the paw work",
                  body: "Pressure flexes the buds, one-way valves open, and a few pieces rise into the grass. Dig, snack, flop, repeat.",
                },
              ].map((item, index) => (
                <Reveal key={item.step} delay={index * 0.06}>
                  <div className="flex gap-4 rounded-3xl border border-forest-900/10 bg-cream-50/80 p-5">
                    <span className="font-display text-2xl font-extrabold text-clay-500">{item.step}</span>
                    <div>
                      <h3 className="font-display text-xl font-extrabold">{item.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-forest-900/62">{item.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}

              <Reveal delay={0.1}>
                <div className="flex items-start gap-3 rounded-2xl bg-forest-900 px-5 py-4 text-cream-100">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-clay-500">
                    <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                      <path d="M10 3v14M3 10h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                  <p className="text-xs leading-relaxed text-cream-200/85">
                    <strong className="text-cream-50">The placebo effect of outdoors:</strong>{" "}
                    scent pods carry forest air into the room, so the den smells like somewhere
                    worth exploring. The nose believes it; the paws follow.
                  </p>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.08}>
              <DigDemo />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="scroll-mt-24 py-16 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Story mode"
              title="One day, told from 18 cm off the floor."
              description="Tap through a day in the life of an indoor dog with a meadow: the smells, the digs, the slow feast and the evening flop."
            />
          </Reveal>
          <Reveal delay={0.08} className="mt-9">
            <StoryMode />
          </Reveal>
          <div className="mt-5 flex justify-end">
            <Link href="/story" className="text-sm font-extrabold text-forest-700 underline underline-offset-4 hover:text-forest-900">
              Read the whole dog-height log
            </Link>
          </div>
        </div>
      </section>

      {/* Product angles */}
      <section id="product" className="scroll-mt-24 border-y border-forest-900/10 bg-cream-200/40 py-16 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="The product, up close"
              title="Every angle of the meadow."
              description="Top-down it's a rug. From the side it's a pressure system. From underneath it's a sealed promise that nothing spills. All views are estimates of the final design."
            />
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <ProductShowcase />
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/product" className="btn-primary">
              Explore the full product
            </Link>
            <Link href="/customize" className="btn-ghost">
              Make it yours
            </Link>
          </div>
        </div>
      </section>

      {/* Scent */}
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-900 px-6 py-10 text-cream-50 shadow-lift sm:px-12 sm:py-14">
            <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-moss-500/20 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-20 right-0 h-72 w-72 rounded-full bg-clay-500/10 blur-3xl" aria-hidden="true" />
            <div className="relative grid items-center gap-10 lg:grid-cols-[1.02fr_0.98fr]">
              <div>
                <p className="eyebrow text-moss-300">
                  <span className="inline-block h-2 w-2 rounded-full bg-clay-400" aria-hidden="true" />
                  Forest air, indoors
                </p>
                <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.05] text-cream-50 sm:text-4xl lg:text-[2.85rem]">
                  The room smells like outside. That&apos;s the point.
                </h2>
                <p className="mt-4 max-w-xl text-cream-200/75">
                  Scent is the fastest shortcut to a place. A few pods in the ceramic breeze
                  dispenser turn a carpeted room into a trailhead — no candles, no flame,
                  no synthetic fog.
                </p>
                <ul className="mt-6 space-y-3">
                  {SCENT_NOTES.map((note) => (
                    <li key={note} className="flex items-start gap-3 text-sm text-cream-100/85">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-moss-300/20 text-moss-300">
                        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none" aria-hidden="true">
                          <path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {note}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href="/shop?kind=scent" className="btn-light">
                    Shop forest scent
                  </Link>
                  <Link href="/customize" className="btn border-2 border-cream-100/25 text-cream-50 hover:bg-cream-100/10">
                    Add pods to a playzone
                  </Link>
                </div>
              </div>

              <div className="relative mx-auto w-full max-w-sm">
                <div className="rounded-[46%_54%_42%_58%/53%_46%_54%_47%] bg-cream-100/10 p-6 backdrop-blur-sm">
                  <div className="rounded-[2rem] bg-cream-50 p-4 shadow-lift">
                    <ProductArt art="dispenser" accent="#EDAE8C" label="WILDNEST breeze scent pod dispenser" className="w-full" />
                  </div>
                </div>
                {[
                  { art: "pod-rain", label: "Rain on Cedar pods", className: "-left-2 top-2", delay: "0s" },
                  { art: "pod-pine", label: "Pine Needle Air pods", className: "-right-3 top-1/3", delay: "1.2s" },
                  { art: "pod-forest", label: "Forest Floor pods", className: "bottom-0 left-6", delay: "2.1s" },
                ].map((pod) => (
                  <div
                    key={pod.art}
                    className={`absolute ${pod.className} animate-floaty rounded-2xl border border-cream-100/20 bg-cream-50 p-1.5 shadow-lift`}
                    style={{ animationDelay: pod.delay }}
                  >
                    <ProductArt art={pod.art} accent="#2C6E49" label={pod.label} className="h-16 w-16 sm:h-20 sm:w-20" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customizer */}
      <section id="customize" className="scroll-mt-24 border-y border-forest-900/10 bg-cream-200/50 py-16 sm:py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Customize your playzone"
              title="Your room. Your dog. Your meadow."
              description="Pick the footprint, the bud pattern and the colour palette, then add forest air and a couple of toys. The preview changes as you go — the price stays honest."
            />
          </Reveal>
          <Reveal delay={0.08} className="mt-10">
            <PlayzoneCustomizer />
          </Reveal>
        </div>
      </section>

      {/* Shop preview */}
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <Reveal>
              <SectionHeading
                eyebrow="The meadow shop"
                title="Everything else a wild den needs."
                description="Chew toys, puzzle games, scent pods and the mats themselves. Add pieces to your nest or build a whole kit."
              />
            </Reveal>
            <Reveal delay={0.06}>
              <Link href="/shop" className="btn-ghost">
                Shop everything
              </Link>
            </Reveal>
          </div>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED.map((product, index) => (
              <Reveal key={product.id} delay={index * 0.06}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Builder teaser */}
      <section className="pb-16 sm:pb-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-forest-900/10 bg-gradient-to-br from-cream-50 via-cream-100 to-moss-100 p-6 sm:p-10">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
              <div>
                <p className="eyebrow">Build a kit</p>
                <h2 className="mt-3 font-display text-3xl font-extrabold leading-tight sm:text-4xl">
                  One nest, filled your way.
                </h2>
                <p className="mt-3 max-w-lg text-forest-900/65">
                  Start with a meadow, then add the chew toys, puzzle games and scent pods
                  your dog actually uses. Everything lands in one cart, and you can still
                  swap pieces before checkout.
                </p>
                <ul className="mt-5 grid gap-2 text-sm font-bold text-forest-900/70 sm:grid-cols-2">
                  {["Pick a mat size", "Add 5 chew toys", "Add 4 puzzle games", "Layer in forest air"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="grid h-5 w-5 place-items-center rounded-full bg-forest-800 text-cream-50">
                        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" aria-hidden="true">
                          <path d="M2.5 6.2l2.3 2.3 4.7-5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/build" className="btn-primary mt-7">
                  Build your kit
                  <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
                    <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>

              <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-3">
                {[
                  { art: "mat-classic", accent: "#2C6E49", label: "Classic Wild mat" },
                  { art: "antler", accent: "#C96F4A", label: "Alpine Antler" },
                  { art: "maze", accent: "#C96F4A", label: "Sniff Maze" },
                  { art: "pod-rain", accent: "#619A52", label: "Rain on Cedar pods" },
                ].map((item, index) => (
                  <div
                    key={item.art}
                    className={`rounded-3xl border border-forest-900/10 bg-cream-50 p-2 shadow-soft ${
                      index % 2 === 1 ? "translate-y-3" : ""
                    }`}
                  >
                    <ProductArt art={item.art} accent={item.accent} label={item.label} className="w-full" />
                  </div>
                ))}
                <div className="absolute -right-2 -top-4 rotate-6 rounded-2xl bg-forest-900 px-4 py-2.5 text-cream-50 shadow-lift">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-moss-300">Kit total</p>
                  <p className="font-display text-xl font-extrabold">$187</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="scroll-mt-24 border-t border-forest-900/10 bg-cream-200/40 py-16 sm:py-24">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Good questions"
              title="The things humans ask."
              description="Food, cleaning, safety, sizing and the honest limits of an indoor meadow."
            />
            <Link href="/product#faq" className="mt-6 inline-flex text-sm font-extrabold text-forest-700 underline underline-offset-4 hover:text-forest-900">
              Read every answer
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <FAQ limit={5} />
          </Reveal>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-24">
        <div className="container-x">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-forest-900 px-6 py-12 text-center text-cream-50 shadow-lift sm:px-12 sm:py-16">
            <div className="pointer-events-none absolute -left-10 -top-10 h-52 w-52 rounded-full bg-moss-500/20 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-clay-500/15 blur-3xl" aria-hidden="true" />
            <Dog pose="sleep" className="mx-auto -mb-4 w-36 sm:w-44" />
            <h2 className="mx-auto mt-2 max-w-2xl font-display text-3xl font-extrabold leading-[1.05] text-cream-50 sm:text-5xl">
              Give your dog a patch of wild.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-cream-200/75">
              No yard required. No door scratched. Just a meadow on the floor, a nose full
              of forest air and a very good place to dig.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/customize" className="btn-light h-14 px-7 text-base">
                Build your meadow
              </Link>
              <Link href="/shop" className="btn border-2 border-cream-100/25 text-cream-50 hover:bg-cream-100/10">
                Shop the collection
              </Link>
            </div>
            <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.16em] text-cream-200/45">
              Free shipping over $120 · 30-day happy-dig guarantee · Pay on delivery
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
