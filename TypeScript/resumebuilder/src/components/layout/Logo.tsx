import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Wordmark. The glyph is a plain rounded square with a cut corner rather than
 * the previous violet→cyan gradient — it reads the same at 20px and prints.
 */
export function Logo({
  href = "/",
  className,
}: {
  href?: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-md text-fg transition-opacity hover:opacity-75",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
    >
      <span
        aria-hidden
        className="flex h-6 w-6 items-center justify-center rounded-[7px] bg-accent"
      >
        <span className="h-2 w-2 rounded-[2px] bg-accent-fg" />
      </span>
      <span className="text-[15px] font-semibold tracking-[-0.02em]">
        ResumeAI
      </span>
    </Link>
  );
}
