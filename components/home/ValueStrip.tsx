const ITEMS = [
  "Pressure-activated kibble",
  "Spill-proof by design",
  "Soft silicone buds",
  "Forest scent pods",
  "Dishwasher-safe tray",
  "Built for indoor dens",
  "No mud. All dig.",
];

export function ValueStrip() {
  return (
    <div className="relative overflow-hidden border-y border-forest-900/10 bg-forest-900 py-3.5 text-cream-50">
      <div className="flex w-max animate-marquee gap-0 hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {ITEMS.map((item) => (
              <span key={`${copy}-${item}`} className="flex items-center gap-4 px-6 text-sm font-extrabold tracking-wide">
                <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 text-moss-300" fill="currentColor" aria-hidden="true">
                  <path d="M10 1.5c3.6 2.3 5.4 5.3 5.4 9 0 1.4-.2 2.6-.7 3.8-1.5-2.6-3-4.3-4.7-5.2 1.2 1.9 1.9 4.2 2 6.9-1 .5-2 .7-3 .7-4.3 0-7.2-3.5-7.2-8.8C5.5 4.2 7.4 2.4 10 1.5Z" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
