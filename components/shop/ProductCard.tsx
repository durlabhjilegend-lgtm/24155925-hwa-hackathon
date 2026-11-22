import { ProductArt } from "@/components/art/ProductArt";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { KIND_LABELS, formatPrice, type Product } from "@/lib/catalog";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group card flex flex-col">
      <div
        className="relative aspect-[5/4] overflow-hidden"
        style={{
          background: `linear-gradient(155deg, ${product.accent}26 0%, #FAF6E9 58%, #EDF3DD 100%)`,
        }}
      >
        <ProductArt
          art={product.art}
          accent={product.accent}
          label={product.name}
          className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.045]"
        />
        {product.badge && (
          <span className="absolute left-3.5 top-3.5 rounded-full bg-clay-500 px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-cream-50 shadow-sm">
            {product.badge}
          </span>
        )}
        <span className="absolute bottom-3 right-3.5 rounded-full bg-cream-50/85 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-[0.14em] text-forest-800 backdrop-blur">
          {KIND_LABELS[product.kind]}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-extrabold leading-tight">{product.name}</h3>
          <p className="shrink-0 font-display text-lg font-extrabold text-forest-800">
            {formatPrice(product.price)}
          </p>
        </div>
        <p className="mt-1 text-[11px] font-extrabold uppercase tracking-[0.08em] text-forest-700/70">
          {product.tagline}
        </p>
        <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-forest-900/60">
          {product.description}
        </p>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {product.features.slice(0, 2).map((feature) => (
            <li key={feature} className="chip px-2.5 py-1 text-[10px]">
              {feature}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-4">
          <AddToCartButton
            product={product}
            label="Add to nest"
            className="btn-primary h-11 w-full px-4 py-0 text-xs"
          />
        </div>
      </div>
    </article>
  );
}
