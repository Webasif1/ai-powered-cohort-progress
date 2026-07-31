import { cn } from "@/lib/cn";

/**
 * Three fanned resume sheets under the hero — the reference image's fanned
 * cards, restated as the thing this product actually makes.
 *
 * Built from divs rather than an image so it stays crisp at any size, weighs
 * nothing, and recolours with the theme.
 */
export function HeroShowcase() {
  return (
    <div
      aria-hidden
      className="relative mx-auto flex h-[280px] w-full max-w-4xl items-end justify-center sm:h-[360px]"
    >
      {/* Hatched plate the sheets sit on. */}
      <div className="absolute inset-x-0 bottom-0 top-8 rounded-t-xl bg-[repeating-linear-gradient(-45deg,transparent,transparent_7px,var(--border)_7px,var(--border)_8px)] opacity-40" />

      <Sheet
        className="-translate-x-[38%] rotate-[-13deg] sm:-translate-x-[46%]"
        tone="muted"
        lines={5}
      />
      <Sheet
        className="translate-x-[38%] rotate-[13deg] sm:translate-x-[46%]"
        tone="muted"
        lines={5}
      />
      <Sheet className="z-10 shadow-lg" tone="accent" lines={7} featured />
    </div>
  );
}

function Sheet({
  className,
  tone,
  lines,
  featured = false,
}: {
  className?: string;
  tone: "accent" | "muted";
  lines: number;
  featured?: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute bottom-0 w-[190px] origin-bottom rounded-t-lg border border-line bg-elevated p-4 shadow-md sm:w-[240px]",
        "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
        featured ? "h-[240px] sm:h-[310px]" : "h-[210px] sm:h-[270px]",
        className,
      )}
    >
      {/* Name block */}
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "h-6 w-6 rounded-full",
            tone === "accent" ? "bg-accent" : "bg-surface-2",
          )}
        />
        <span className="flex-1 space-y-1.5">
          <span className="block h-2 w-3/5 rounded-full bg-line-strong" />
          <span className="block h-1.5 w-2/5 rounded-full bg-line" />
        </span>
      </div>

      {/* Section heading + body lines */}
      <div className="mt-4 space-y-3">
        {Array.from({ length: Math.ceil(lines / 3) }).map((_, block) => (
          <div key={block} className="space-y-1.5">
            <span
              className={cn(
                "block h-1.5 w-1/3 rounded-full",
                tone === "accent" && block === 0 ? "bg-accent/60" : "bg-line-strong",
              )}
            />
            {Array.from({ length: 3 }).map((_, line) => (
              <span
                key={line}
                className="block h-1.5 rounded-full bg-line"
                style={{ width: `${94 - line * 13}%` }}
              />
            ))}
          </div>
        ))}
      </div>

      {featured && (
        <div className="mt-4 flex flex-wrap gap-1">
          {[38, 26, 44, 30].map((w, i) => (
            <span
              key={i}
              className="h-3.5 rounded-full bg-accent-soft"
              style={{ width: w }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
