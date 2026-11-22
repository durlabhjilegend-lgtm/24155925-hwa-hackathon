export type ProductKind = "mat" | "chew" | "puzzle" | "scent";

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  kind: ProductKind;
  art: string;
  accent: string;
  badge?: string;
  features: string[];
  dims?: string;
}

export const KIND_LABELS: Record<ProductKind, string> = {
  mat: "Dig mats",
  chew: "Chew toys",
  puzzle: "Puzzle games",
  scent: "Outdoor scent",
};

export const PRODUCTS: Product[] = [
  {
    id: "mat-mini",
    name: "WILDNEST Mini Meadow",
    tagline: "A pocket of wild for small dens.",
    description:
      "A compact pressure-activated dig mat with soft grass buds on top and a sealed kibble tray underneath. Every scratch releases a little reward, so the hallway finally gets a break.",
    price: 7900,
    kind: "mat",
    art: "mat-mini",
    accent: "#2C6E49",
    features: ["60 × 40 cm footprint", "18 mm grass buds", "Holds 120 g of kibble"],
    dims: "60 × 40 × 4 cm",
  },
  {
    id: "mat-classic",
    name: "WILDNEST Classic Wild",
    tagline: "The everyday indoor meadow.",
    description:
      "Our signature size: enough room for a full-body dig, a slow sniff and a good sprawl afterwards. Spill-proof base, dishwasher-safe tray, easy rinse-and-go cleanup.",
    price: 10900,
    kind: "mat",
    art: "mat-classic",
    accent: "#1E4D35",
    badge: "Best seller",
    features: ["80 × 60 cm footprint", "18 mm grass buds", "Holds 250 g of kibble"],
    dims: "80 × 60 × 5 cm",
  },
  {
    id: "mat-xl",
    name: "WILDNEST Big Wild",
    tagline: "For diggers who commit.",
    description:
      "A generous meadow for large breeds and enthusiastic excavators. Deeper bud field, wider catch tray, same calm forest palette that disappears into your living room.",
    price: 14900,
    kind: "mat",
    art: "mat-xl",
    accent: "#163D2A",
    features: ["100 × 70 cm footprint", "20 mm grass buds", "Holds 400 g of kibble"],
    dims: "100 × 70 × 6 cm",
  },
  {
    id: "chew-antler",
    name: "Alpine Antler",
    tagline: "The slow-gnaw that outlasts the evening.",
    description:
      "A ridged, splinter-free antler-style chew with a natural matte finish. Tough enough for power chewers, gentle on teeth, endlessly interesting.",
    price: 1400,
    kind: "chew",
    art: "antler",
    accent: "#C96F4A",
    features: ["Splinter-free", "Medium–heavy chewers", "14 cm long"],
  },
  {
    id: "chew-rope",
    name: "Forest Rope Tug",
    tagline: "Tug, toss, shake, repeat.",
    description:
      "Chunky braided cotton rope with a hidden squeaker at the core. Soak it, freeze it, or use it to lure your dog away from the sofa cushions.",
    price: 1200,
    kind: "chew",
    art: "rope",
    accent: "#7A9A3A",
    features: ["Braided cotton", "Hidden squeaker", "32 cm long"],
  },
  {
    id: "chew-pinecone",
    name: "Pinecone Crunch",
    tagline: "A crunchy little forest floor.",
    description:
      "A textured rubber pinecone that traps a smear of peanut butter or paste between its scales. Slow, satisfying, and suspiciously quiet.",
    price: 1600,
    kind: "chew",
    art: "pinecone",
    accent: "#8C4229",
    features: ["Food-safe rubber", "Paste-friendly grooves", "Dishwasher-safe"],
  },
  {
    id: "chew-boulder",
    name: "Riverstone Chew",
    tagline: "Skip it across the kitchen floor.",
    description:
      "A smooth, weighted river stone with a bouncy hidden core. Rolls unpredictably, wobbles back upright, and keeps the chase going.",
    price: 1800,
    kind: "chew",
    art: "boulder",
    accent: "#619A52",
    features: ["Weighted bounce", "Erratic roll", "Floats for water play"],
  },
  {
    id: "chew-stick",
    name: "Bamboo Snack Stick",
    tagline: "The stick that stays inside.",
    description:
      "A bendy bamboo-style chew with a hollow centre for a treat paste refill. It feels like a found stick and never leaves mud on the rug.",
    price: 1100,
    kind: "chew",
    art: "stick",
    accent: "#AECB69",
    features: ["Refillable core", "Bendy bounce", "21 cm long"],
  },
  {
    id: "puzzle-maze",
    name: "Sniff Maze Board",
    tagline: "A puzzle with a nose-first approach.",
    description:
      "Slide the wooden pegs, lift the felt flaps, and let your dog work a maze of scent trails to the centre. Four difficulty levels hide in one board.",
    price: 3200,
    kind: "puzzle",
    art: "maze",
    accent: "#C96F4A",
    badge: "Staff pick",
    features: ["4 difficulty levels", "FSC wood + felt", "Non-slip base"],
  },
  {
    id: "puzzle-tower",
    name: "Treat Tower",
    tagline: "Tip it. Spin it. Earn it.",
    description:
      "A wobbly tower with three spinning discs that drop treats at unpredictable angles. The wobble is the fun part; the slow feed is the bonus.",
    price: 2800,
    kind: "puzzle",
    art: "tower",
    accent: "#2C6E49",
    features: ["3 spinning discs", "Weighted wobble base", "Top-rack dishwasher-safe"],
  },
  {
    id: "puzzle-log",
    name: "Log Roll",
    tagline: "Roll the log, free the feast.",
    description:
      "A hollow bark-textured log with adjustable openings. Roll it across the floor and treats tumble out in a satisfying scatter.",
    price: 2600,
    kind: "puzzle",
    art: "log",
    accent: "#8C4229",
    features: ["Adjustable openings", "Quiet rubber rim", "Great for meals"],
  },
  {
    id: "puzzle-forage",
    name: "Forage Field",
    tagline: "Hide, sniff, discover, repeat.",
    description:
      "A felt meadow with pockets, flaps and crinkly leaves. Hide a handful of kibble and let your dog harvest the whole field.",
    price: 3400,
    kind: "puzzle",
    art: "forage",
    accent: "#7A9A3A",
    features: ["12 hidden pockets", "Crinkle leaves", "Machine-washable felt"],
  },
  {
    id: "scent-rain",
    name: "Rain on Cedar Pods",
    tagline: "Petrichor, bottled for the hallway.",
    description:
      "Three replaceable scent pods for the WILDNEST breeze dispenser. Cedar bark, wet stone and that just-after-rain hush.",
    price: 1900,
    kind: "scent",
    art: "pod-rain",
    accent: "#619A52",
    features: ["3 pods per pack", "Lasts ~6 weeks", "No synthetic musk"],
  },
  {
    id: "scent-pine",
    name: "Pine Needle Air Pods",
    tagline: "A window cracked open to the pines.",
    description:
      "Sharp green pine, a little resin, a little sunlight. The scent that makes a carpeted room feel like a trailhead.",
    price: 1900,
    kind: "scent",
    art: "pod-pine",
    accent: "#2C6E49",
    features: ["3 pods per pack", "Lasts ~6 weeks", "No synthetic musk"],
  },
  {
    id: "scent-forest",
    name: "Forest Floor Pods",
    tagline: "Moss, leaf litter, quiet ground.",
    description:
      "Damp moss and cool earth with a whisper of clover. The deepest, calmest scent in the collection — den mode, in one breath.",
    price: 1900,
    kind: "scent",
    art: "pod-forest",
    accent: "#5A4632",
    features: ["3 pods per pack", "Lasts ~6 weeks", "No synthetic musk"],
  },
  {
    id: "dispenser",
    name: "Breeze Pod Dispenser",
    tagline: "The breeze your room was missing.",
    description:
      "A ceramic, no-heat diffuser that carries a whisper of forest air across the room. Pairs with any WILDNEST scent pod pack.",
    price: 3900,
    kind: "scent",
    art: "dispenser",
    accent: "#EDAE8C",
    features: ["No heat, no flame", "Whisper-quiet fan", "USB-C rechargeable"],
  },
];

export const PRODUCT_MAP: Record<string, Product> = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, p])
);

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}

/* ---------------------------------- custom mat ---------------------------------- */

export type MatSize = "mini" | "classic" | "xl";
export type MatPattern = "meadow" | "trail" | "wild";
export type MatColor = "moss" | "sand" | "clay";
export type MatScent = "none" | "rain" | "pine" | "forest";

export interface CustomMatConfig {
  size: MatSize;
  pattern: MatPattern;
  color: MatColor;
  scent: MatScent;
  chewKit: boolean;
  puzzleKit: boolean;
}

export const MAT_SIZES: Record<
  MatSize,
  { label: string; dims: string; price: number; capacity: string; blurb: string }
> = {
  mini: {
    label: "Mini Meadow",
    dims: "60 × 40 × 4 cm",
    price: 7900,
    capacity: "120 g kibble",
    blurb: "Small dens, toy breeds, cosy corners.",
  },
  classic: {
    label: "Classic Wild",
    dims: "80 × 60 × 5 cm",
    price: 10900,
    capacity: "250 g kibble",
    blurb: "The all-day favourite for medium digs.",
  },
  xl: {
    label: "Big Wild",
    dims: "100 × 70 × 6 cm",
    price: 14900,
    capacity: "400 g kibble",
    blurb: "Large breeds and serious excavators.",
  },
};

export const MAT_PATTERNS: Record<
  MatPattern,
  { label: string; price: number; blurb: string }
> = {
  meadow: {
    label: "Even Meadow",
    price: 0,
    blurb: "An even field of buds — steady pressure, steady rewards.",
  },
  trail: {
    label: "Worn Trail",
    price: 900,
    blurb: "A winding bare path between tufts; extra payout along the trail.",
  },
  wild: {
    label: "Tall Wild",
    price: 1400,
    blurb: "Taller, tousled clumps for diggers who like a challenge.",
  },
};

export const MAT_COLORS: Record<
  MatColor,
  {
    label: string;
    swatch: string;
    base: string;
    tip: string;
    deep: string;
    soil: string;
  }
> = {
  moss: {
    label: "Forest Moss",
    swatch: "#2C6E49",
    base: "#2C6E49",
    tip: "#8AB97B",
    deep: "#1E4D35",
    soil: "#3A2E22",
  },
  sand: {
    label: "River Sand",
    swatch: "#C4AE7E",
    base: "#A98F60",
    tip: "#D9C89A",
    deep: "#8A7146",
    soil: "#4A3B2A",
  },
  clay: {
    label: "Burnt Clay",
    swatch: "#AD5636",
    base: "#AD5636",
    tip: "#EDAE8C",
    deep: "#8C4229",
    soil: "#3A2E22",
  },
};

export const MAT_SCENTS: Record<
  MatScent,
  { label: string; price: number; blurb: string }
> = {
  none: { label: "No scent packs", price: 0, blurb: "Just the mat — add scent pods any time." },
  rain: { label: "Rain on Cedar", price: 1900, blurb: "Cedar bark and wet stone." },
  pine: { label: "Pine Needle Air", price: 1900, blurb: "Green pine and sunlight." },
  forest: { label: "Forest Floor", price: 1900, blurb: "Damp moss and leaf litter." },
};

export const MAT_ADDONS: Record<
  "chewKit" | "puzzleKit",
  { label: string; price: number; contents: string }
> = {
  chewKit: {
    label: "Trail Treat Kit",
    price: 3500,
    contents: "Alpine Antler · Forest Rope Tug · Pinecone Crunch",
  },
  puzzleKit: {
    label: "Puzzle Wild Pack",
    price: 5500,
    contents: "Sniff Maze Board · Treat Tower",
  },
};

export const CUSTOM_MAT_ID = "custom-mat";

export const DEFAULT_CUSTOM_MAT: CustomMatConfig = {
  size: "classic",
  pattern: "meadow",
  color: "moss",
  scent: "rain",
  chewKit: false,
  puzzleKit: false,
};

export function priceCustomMat(config: CustomMatConfig): number {
  return (
    MAT_SIZES[config.size].price +
    MAT_PATTERNS[config.pattern].price +
    MAT_SCENTS[config.scent].price +
    (config.chewKit ? MAT_ADDONS.chewKit.price : 0) +
    (config.puzzleKit ? MAT_ADDONS.puzzleKit.price : 0)
  );
}

export function customMatName(config: CustomMatConfig): string {
  return `WILDNEST ${MAT_SIZES[config.size].label} · ${MAT_PATTERNS[config.pattern].label}`;
}

export function customMatDetail(config: CustomMatConfig): string {
  const parts = [
    `${MAT_COLORS[config.color].label} buds`,
    `${MAT_SIZES[config.size].dims}`,
  ];
  if (config.scent !== "none") parts.push(`${MAT_SCENTS[config.scent].label} pods`);
  if (config.chewKit) parts.push(MAT_ADDONS.chewKit.label);
  if (config.puzzleKit) parts.push(MAT_ADDONS.puzzleKit.label);
  return parts.join(" · ");
}

export function isCustomMatConfig(value: unknown): value is CustomMatConfig {
  if (!value || typeof value !== "object") return false;
  const c = value as Record<string, unknown>;
  return (
    typeof c.size === "string" &&
    c.size in MAT_SIZES &&
    typeof c.pattern === "string" &&
    c.pattern in MAT_PATTERNS &&
    typeof c.color === "string" &&
    c.color in MAT_COLORS &&
    typeof c.scent === "string" &&
    c.scent in MAT_SCENTS &&
    typeof c.chewKit === "boolean" &&
    typeof c.puzzleKit === "boolean"
  );
}

/* ---------------------------------- shipping ---------------------------------- */

export const FREE_SHIPPING_THRESHOLD = 12000;
export const STANDARD_SHIPPING = 900;
export const EXPRESS_SHIPPING = 1500;

export type DeliveryMethod = "standard" | "express";

export function shippingFor(subtotal: number, method: DeliveryMethod): number {
  if (method === "express") return EXPRESS_SHIPPING;
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
}
