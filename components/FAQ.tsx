const DEFAULT_ITEMS = [
  {
    id: "pressure",
    question: "How does the pressure tray actually work?",
    answer:
      "The buds sit over soft one-way silicone valves. When a paw presses or scratches, the valve chamber compresses and nudges a few pieces of kibble up through the grass. When the paw lifts, the valve closes again — kibble can come up, but nothing tumbles down or spills out.",
  },
  {
    id: "food",
    question: "What food works best in the meadow?",
    answer:
      "Small to medium kibble and freeze-dried nibbles work best. Avoid oversized or sticky treats that can clog the valves, and skip wet food. A full tray holds roughly 120 g (Mini), 250 g (Classic) or 400 g (Big Wild). Always supervise the first few sessions.",
  },
  {
    id: "safe",
    question: "Is it safe for puppies and strong chewers?",
    answer:
      "The buds are soft, food-grade silicone made for paws, not teeth. Puppies and power chewers should be supervised while they learn the difference. If your dog starts chewing the buds rather than digging, redirect to a chew toy and give the mat a rest. Replace the mat if the silicone is ever torn.",
  },
  {
    id: "clean",
    question: "How do I clean it?",
    answer:
      "Shake out loose kibble, rinse the buds with warm water and a little dish soap, then twist out the tray to wash it properly. The tray is top-rack dishwasher-safe; the mat itself is hand-rinse only. Air-dry both before refilling. No bleach or harsh cleaners.",
  },
  {
    id: "size",
    question: "Which size should I choose?",
    answer:
      "Mini (60 × 40 cm) suits toy breeds, puppies and small dens. Classic (80 × 60 cm) is the all-rounder for small-to-medium dogs who like a full-body dig. Big Wild (100 × 70 cm) gives large breeds and committed excavators room to sprawl. When in doubt, go one size up if your room allows.",
  },
  {
    id: "scratching",
    question: "Will this stop my dog scratching the door?",
    answer:
      "WILDNEST gives the digging instinct somewhere safe to land, which can reduce restlessness and doorway scratching for many dogs. Every dog is different, so pair it with scent, chews and puzzle games, and give the routine a couple of weeks. If scratching continues intensely, chat with your vet or a qualified behaviourist.",
  },
  {
    id: "shipping",
    question: "Shipping, delivery and returns",
    answer:
      "Standard shipping is $9 and free over $120; express delivery is $15. Orders are packed at our studio and leave within two working days. If the meadow isn't a fit, contact us within 30 days of delivery for the 30-day happy-dig guarantee. Keep the mat clean and include the tray when returning it.",
  },
  {
    id: "scent",
    question: "Is the scent safe and how long do pods last?",
    answer:
      "Pods are plant-derived, low-intensity and sit in a no-heat ceramic dispenser — no flame, no synthetic musk. Each pack holds three replaceable pods that last around six weeks in normal use. Prefer a neutral room? Run the mat with no pods at all; the meadow works exactly the same.",
  },
];

export function FAQ({
  items = DEFAULT_ITEMS,
  limit,
}: {
  items?: typeof DEFAULT_ITEMS;
  limit?: number;
}) {
  const visible = typeof limit === "number" ? items.slice(0, limit) : items;
  return (
    <div className="divide-y divide-forest-900/10 overflow-hidden rounded-3xl border border-forest-900/10 bg-cream-50/80">
      {visible.map((item) => (
        <details key={item.id} id={item.id} className="group px-5 py-4 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-extrabold text-forest-900 marker:hidden [&::-webkit-details-marker]:hidden">
            {item.question}
            <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-forest-900/15 bg-cream-50 text-forest-800 transition-transform duration-200 group-open:rotate-45">
              <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </span>
          </summary>
          <p className="pt-3 text-sm leading-relaxed text-forest-900/65">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
