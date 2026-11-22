import Link from "next/link";
import { Dog } from "@/components/art/Dog";
import { GrassMat } from "@/components/art/GrassMat";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-16 pt-8 sm:pt-12 lg:pb-24">
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-moss-200/40 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-0 top-0 h-[420px] w-[420px] rounded-full bg-forest-100/70 blur-2xl" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
        <div className="relative z-10">
          <p className="chip bg-cream-50/90 py-2 pl-2.5 pr-4">
            <span className="grid h-6 w-6 place-items-center rounded-full bg-forest-700 text-cream-50">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path d="M6 18c0-5 2-8 6-11M12 18c0-5 2-8 6-11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
                <path d="M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
              </svg>
            </span>
            The indoor garden for dogs
          </p>

          <h1 className="mt-6 font-display text-[2.75rem] font-extrabold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.4rem]">
            Turn the living room into a{" "}
            <span className="relative inline-block whitespace-nowrap text-forest-600">
              wild
              <svg
                className="absolute -bottom-2 left-0 w-full text-clay-400"
                viewBox="0 0 200 18"
                fill="none"
                aria-hidden="true"
                preserveAspectRatio="none"
              >
                <path d="M4 12C42 4 92 4 126 9c22 3 44 3 70-2" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
              </svg>
            </span>{" "}
            little meadow.
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-forest-900/70 sm:text-lg">
            WILDNEST is a pressure-activated silicone dig mat with soft grass buds. Paw at
            the meadow and kibble rises from the sealed tray below — so the digging never
            has to stop at the door.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/customize" className="btn-primary h-14 px-7 text-base">
              Build your meadow
              <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
                <path d="M4 10h12M11 5l5 5-5 5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link href="/story" className="btn-ghost h-14 px-6 text-base">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-forest-900 text-cream-50">
                <svg viewBox="0 0 20 20" className="ml-0.5 h-3 w-3" fill="currentColor" aria-hidden="true">
                  <path d="M6 4l10 6-10 6V4Z" />
                </svg>
              </span>
              A day in the wild
            </Link>
          </div>

          <ul className="mt-9 grid max-w-xl grid-cols-1 gap-2.5 text-sm font-bold text-forest-900/70 sm:grid-cols-3">
            {["Sealed spill-lock tray", "Soft, washable buds", "Forest scent included"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0 text-forest-600" fill="none" aria-hidden="true">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M6.5 10.5l2.2 2.2 4.8-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]">
          <div
            className="absolute inset-x-4 bottom-8 top-6 rotate-2 rounded-[46%_54%_43%_57%/52%_46%_54%_48%] bg-gradient-to-br from-moss-200 to-forest-100"
            aria-hidden="true"
          />
          <div
            className="absolute inset-x-10 bottom-2 top-14 -rotate-3 rounded-full border-2 border-dashed border-forest-800/15"
            aria-hidden="true"
          />

          <div className="relative -rotate-1 overflow-hidden rounded-[2.25rem] border border-forest-900/10 bg-cream-50/90 p-3 shadow-lift backdrop-blur-sm sm:p-4">
            <GrassMat color="moss" pattern="meadow" seed={7} className="w-full" showKibble />
          </div>

          <Dog pose="sniff" className="pointer-events-none absolute -bottom-10 -right-4 w-40 drop-shadow-xl sm:-right-6 sm:w-52" />

          <div className="absolute -left-2 top-2 animate-floaty rounded-2xl border border-forest-900/10 bg-cream-50/95 px-3.5 py-2.5 shadow-soft sm:-left-6">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-forest-600">Pressure activated</p>
            <p className="text-sm font-extrabold text-forest-900">Paw in, kibble up</p>
          </div>

          <div className="absolute -right-1 top-1/3 animate-floaty-slow rounded-2xl border border-forest-900/10 bg-forest-900 px-3.5 py-2.5 text-cream-50 shadow-soft sm:-right-5">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-moss-300">Spill-proof</p>
            <p className="text-sm font-extrabold">Sealed tray below</p>
          </div>

          <div className="absolute -bottom-4 left-2 flex items-center gap-2 rounded-full border border-forest-900/10 bg-cream-50/95 px-3.5 py-2 shadow-soft sm:left-0">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-moss-200 text-forest-800">
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                <path d="M4 8c4-3 6 3 10 0s6 3 6 3M4 14c4-3 6 3 10 0s6 3 6 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
            <p className="text-xs font-extrabold text-forest-900">
              Forest air <span className="font-semibold text-forest-900/60">from the scent pods</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
