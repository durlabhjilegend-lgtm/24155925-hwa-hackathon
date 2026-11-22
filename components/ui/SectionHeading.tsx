import type { ReactNode } from "react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"} ${className}`}
    >
      {eyebrow && (
        <p className={`eyebrow flex items-center gap-2 ${align === "center" ? "justify-center" : ""}`}>
          <span className="inline-block h-2 w-2 rounded-full bg-clay-500" aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 font-display text-3xl font-extrabold leading-[1.05] sm:text-4xl lg:text-[2.9rem]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-relaxed text-forest-900/70 sm:text-lg">{description}</p>
      )}
      {children}
    </div>
  );
}
