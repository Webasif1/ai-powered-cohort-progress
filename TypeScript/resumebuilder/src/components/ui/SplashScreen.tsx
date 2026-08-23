"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";

const HOLD_MS = 480; // minimum visible time, so it never flickers
const EXIT_MS = 620; // must match the transition duration below

/**
 * First-paint splash. Covers the viewport, then slides up and off the top
 * of the screen to reveal the page underneath.
 *
 * Rendered above the app rather than in place of it, so the real content is
 * already mounted and laid out behind the curtain — the reveal shows a
 * finished page, not an empty one that then fills in.
 */
export function SplashScreen() {
  const [phase, setPhase] = useState<"visible" | "leaving" | "gone">("visible");

  useEffect(() => {
    // Wait for the browser to finish its own loading before starting the
    // exit, so the curtain never lifts on a half-painted page.
    let exitTimer: ReturnType<typeof setTimeout>;
    let doneTimer: ReturnType<typeof setTimeout>;

    const begin = () => {
      exitTimer = setTimeout(() => {
        setPhase("leaving");
        doneTimer = setTimeout(() => setPhase("gone"), EXIT_MS);
      }, HOLD_MS);
    };

    if (document.readyState === "complete") {
      begin();
    } else {
      window.addEventListener("load", begin, { once: true });
    }

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
      window.removeEventListener("load", begin);
    };
  }, []);

  // Unmounted once the animation has finished, so it never traps clicks.
  if (phase === "gone") return null;

  const leaving = phase === "leaving";

  return (
    <div
      id="splash"
      aria-hidden
      className={cn(
        "fixed inset-0 z-200 flex flex-col items-center justify-center bg-bg print-hide",
        "transition-transform duration-[620ms] ease-[cubic-bezier(0.76,0,0.24,1)]",
        "motion-reduce:transition-opacity motion-reduce:duration-200",
        leaving && "-translate-y-full motion-reduce:translate-y-0 motion-reduce:opacity-0",
      )}
    >
      <div
        className={cn(
          "flex flex-col items-center gap-5 transition-all duration-300 ease-out",
          // The mark fades a beat before the curtain moves, so the two
          // motions read as one gesture instead of the logo riding up.
          leaving ? "-translate-y-2 opacity-0" : "opacity-100",
        )}
      >
        <span className="relative flex h-11 w-11 items-center justify-center rounded-[13px] bg-accent">
          <span className="h-3.5 w-3.5 rounded-[4px] bg-accent-fg" />
          <span className="absolute inset-0 rounded-[13px] bg-accent opacity-40 animate-halo" />
        </span>

        <span className="text-[15px] font-semibold tracking-[-0.02em] text-fg">
          ResumeAI
        </span>

        <span className="h-0.5 w-28 overflow-hidden rounded-full bg-surface-2">
          <span className="block h-full w-1/3 rounded-full bg-accent animate-sweep" />
        </span>
      </div>
    </div>
  );
}
