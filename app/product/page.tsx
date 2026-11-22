import type { Metadata } from "next";
import Link from "next/link";
import { GrassMat } from "@/components/art/GrassMat";
import { ProductArt } from "@/components/art/ProductArt";
import { FAQ } from "@/components/FAQ";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { BuyBox } from "@/components/product/BuyBox";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "The WILDNEST mat",
  description:
    "The pressure-activated silicone dig mat with soft grass buds, a sealed kibble tray and three sizes. Explore every angle, dimensions and care.",
};

const FEATURES = [
  {
    title: "One-way pressure valves",
    body: "Soft buds sit over silicone valves that open under paw pressure and close the moment the paw lifts. Rewards rise; kibble never falls out.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <circle cx="12" cy="13" r="6" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 9v-5M9.5 6.5L12 4l2.5 2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M7 20h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Spill-lock tray",
    body: "The kibble lives in a 5 cm sealed tray that twists out for refills. Even a full-body dig can't tip it open.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <rect x="4" y="8" width="16" height="11" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M7 8V6a5 5 0 0 1 10 0v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M9 13h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Soft on paws",
    body: "18 mm food-grade silicone buds flex instead of resisting. The mat gives a dog the feel of digging without the mud or the splinters.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <ellipse cx="12" cy="16" rx="5.5" ry="4" stroke="currentColor" strokeWidth="1.8" />
        <ellipse cx="5.2" cy="10.5" rx="2" ry="2.6" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="9.3" cy="7.8" rx="2" ry="2.7" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="14.7" cy="7.8" rx="2" ry="2.7" stroke="currentColor" strokeWidth="1.6" />
        <ellipse cx="18.8" cy="10.5" rx="2" ry="2.6" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    ),
  },
  {
    title: "Forest air pods",
    body: "A starter pod pack carries cedar, pine or moss through the room. Scent does the work of an open window without the weather.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <path d="M3 9c4-3 6 3 10 0s6 3 6 3M3 15c4-3 6 3 10 0s6 3 6 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Grip that stays put",
    body: "Moulded grip feet and a 2.1 kg base keep the meadow where you left it, even mid-excavation.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M12 4v3M12 17v3M4 12h3M17 12h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "A calmer den",
    body: "Digging is a need, not a naughty habit. Give it a place to land and the door, the rug and the sofa get a break.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
        <path d="M12 20s-7-4.3-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.7-7 9-7 9Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const CARE_STEPS = [
  {
    title: "Empty & shake",
    body: "Tip leftover kibble back into the bag. Give the buds a shake outside or over the bin.",
  },
  {
    title: "Rinse the buds",
    body: "Warm water and a little mild dish soap, then a soft brush between the blades. No bleach, no harsh cleaners.",
  },
  {
    title: "Twist out the tray",
    body: "Rinse the sealed tray and let it dry. The tray is top-rack dishwasher-safe; the mat is hand-rinse only.",
  },
  {
    title: "Air-dry fully",
    body: "Leave both parts apart until completely dry, then refill and lock the tray back into place.",
  },
];

export default function ProductPage() {
  return (
    <>
      <section className="pb-12 pt-8 sm:pt-10">
        <div className="container-x">
          <nav className="flex items-center gap-2 text-xs font-bold text-forest-900/45" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-forest-900">Home</Link>
            <span aria-hidden="true">/</span>
            <Link href="/shop" className="hover:text-forest-900">Shop</Link>
            <span aria-hidden="true">/</span>
            <span className="text-forest-900/70">The mat</span>
          </nav>

          <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:gap-14">
            <div className="relative">
              <div className="card p-2.5 sm:p-3">
                <div className="overflow-hidden rounded-[1.7rem] bg-gradient-to-br from-moss-100 via-cream-100 to-forest-100 p-2 sm:p-4">
                  <GrassMat color="moss" pattern="meadow" seed={7} className="w-full" />
                </div>
              </div>
              <div className="absolute left-5 top-5 rounded-full bg-cream-50/90 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.16em] text-forest-800 shadow-sm backdrop-blur">
                Classic Wild · 80 × 60 cm
              </div>
              <div className="absolute -bottom-3 right-5 flex items-center gap-2 rounded-full border border-forest-900/10 bg-cream-50 px-3 py-2 shadow-soft">
                <ProductArt art="pod-rain" accent="#619A52" className="h-7 w-7" label="Starter scent pods" />
                <span className="text-[11px] font-extrabold text-forest-900">Starter pods included</span>
              </div>
            </div>

            <BuyBox />
          </div>
        </div>
      </section>

      <section id="dimensions" className="scroll-mt-24 border-y border-forest-900/10 bg-cream-200/40 py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Every angle"
              title="A product you can understand with your hands."
              description="Top, side, paw-level and underneath. The measurements below are estimates for the current prototype."
            />
          </Reveal>
          <Reveal delay={0.06} className="mt-9">
            <ProductShowcase />
          </Reveal>
        </div>
      </section>

      <section id="how" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Why it works"
              title="Built around the way dogs actually dig."
              description="Not a toy that happens to be green. A small pressure system, a sealed tray and a scent cue, all designed to let a dog be a dog indoors."
            />
          </Reveal>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature, index) => (
              <Reveal key={feature.title} delay={index * 0.04}>
                <div className="card h-full p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cream-200 text-forest-800">
                    {feature.icon}
                  </span>
                  <h3 className="mt-4 font-display text-xl font-extrabold">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-forest-900/62">{feature.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-x">
          <div className="grid items-center gap-8 rounded-[2.5rem] bg-forest-900 p-6 text-cream-50 sm:p-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="flex justify-center">
              <div className="w-full max-w-xs rounded-[2rem] bg-cream-50 p-4 shadow-lift">
                <ProductArt art="dispenser" accent="#EDAE8C" label="Breeze scent dispenser" className="w-full" />
              </div>
            </div>
            <div>
              <p className="eyebrow text-moss-300">The outdoor placebo</p>
              <h2 className="mt-2 font-display text-3xl font-extrabold text-cream-50 sm:text-4xl">
                A room can feel like a trailhead.
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-cream-200/75 sm:text-base">
                Scent is your dog&apos;s first map of a place. Three forest blends drift
                from a no-heat ceramic dispenser, so the den smells like cedar, pine or
                moss before the paws even find the grass.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/shop?kind=scent" className="btn-light">
                  Shop scent pods
                </Link>
                <Link href="/customize" className="btn border-2 border-cream-100/25 text-cream-50 hover:bg-cream-100/10">
                  Add scent to a playzone
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="care" className="scroll-mt-24 border-y border-forest-900/10 bg-cream-200/40 py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Cleaning & care"
              title="A meadow that cleans up after itself."
              description="Kibble stays in the tray, mud never comes inside, and the whole thing rinses clean in a few minutes."
            />
            <div className="mt-6 rounded-2xl border border-clay-500/20 bg-clay-300/10 p-4 text-xs leading-relaxed text-clay-700">
              <p className="font-extrabold uppercase tracking-[0.12em]">Please note</p>
              <p className="mt-1">
                The bud mat is hand-rinse only — never put the full mat in a dishwasher or
                washing machine. Supervise dogs who like to chew the buds, and replace the
                mat if the silicone is torn.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {CARE_STEPS.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.05}>
                <div className="card h-full p-5">
                  <p className="font-display text-2xl font-extrabold text-clay-500">0{index + 1}</p>
                  <h3 className="mt-1 font-display text-lg font-extrabold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-forest-900/62">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 py-16 sm:py-20">
        <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Questions"
              title="Everything you might ask before the first dig."
            />
            <Link href="/story" className="mt-5 inline-flex text-sm font-extrabold text-forest-700 underline underline-offset-4 hover:text-forest-900">
              Or read a day in the life
            </Link>
          </Reveal>
          <Reveal delay={0.06}>
            <FAQ />
          </Reveal>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-x flex flex-col items-center justify-between gap-5 rounded-[2.5rem] border border-forest-900/10 bg-cream-50 px-6 py-8 sm:flex-row sm:px-10">
          <div>
            <h2 className="font-display text-2xl font-extrabold sm:text-3xl">Make the meadow yours.</h2>
            <p className="mt-1 text-sm text-forest-900/60">
              Choose the size, pattern, colour and scent of your own WILDNEST playzone.
            </p>
          </div>
          <Link href="/customize" className="btn-primary shrink-0">
            Customize your playzone
          </Link>
        </div>
      </section>
    </>
  );
}
