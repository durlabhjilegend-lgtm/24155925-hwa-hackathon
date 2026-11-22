import { GrassMat } from "@/components/art/GrassMat";
import { ProductArt } from "@/components/art/ProductArt";
import type { CartLine } from "./CartProvider";

export function CartThumb({ line, className = "" }: { line: CartLine; className?: string }) {
  if (line.config) {
    return (
      <div className={`overflow-hidden rounded-2xl bg-forest-50 ${className}`}>
        <GrassMat
          color={line.config.color}
          pattern={line.config.pattern}
          seed={13}
          showKibble={false}
          className="h-full w-full object-cover"
          label={`${line.name} thumbnail`}
        />
      </div>
    );
  }
  return (
    <div className={`overflow-hidden rounded-2xl bg-forest-50 ${className}`}>
      <ProductArt art={line.art} accent={line.accent} className="h-full w-full" label={`${line.name} thumbnail`} />
    </div>
  );
}
