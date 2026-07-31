import { cn } from "@/lib/cn";

/**
 * The faint dashed rules and corner crosshairs that run down the page.
 * Purely decorative, so it is hidden from assistive tech and skipped in print.
 */
export function GuideFrame({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 print-hide overflow-hidden",
        className,
      )}
    >
      {/* Vertical rules aligned to the container edges. */}
      <div className="mx-auto h-full w-full max-w-6xl px-5 sm:px-8">
        <div className="relative h-full">
          <span className="absolute inset-y-0 left-0 w-px border-l border-dashed border-line" />
          <span className="absolute inset-y-0 right-0 w-px border-l border-dashed border-line" />
        </div>
      </div>
    </div>
  );
}

/** Horizontal dashed divider with the reference image's tick marks. */
export function GuideRule({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("relative print-hide", className)}>
      <div className="border-t border-dashed border-line" />
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="relative">
          <Tick className="-left-[3px]" />
          <Tick className="-right-[3px]" />
        </div>
      </div>
    </div>
  );
}

function Tick({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "absolute -top-[3.5px] block h-[7px] w-[7px] rounded-[1px] border border-line-strong bg-bg",
        className,
      )}
    />
  );
}
