"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// The effect has to run before paint so nothing is seen at full opacity first,
// but this component is still server-rendered, where useLayoutEffect warns.
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface RevealProps {
  children: React.ReactNode;
  /**
   * Rendered tag. Pick the one the wrapped element already used, so this
   * replaces it instead of adding a level — grid and flex parents stay intact.
   */
  as?: "div" | "ul" | "ol" | "section";
  className?: string;
  /** Animate direct children in sequence instead of the wrapper itself. */
  stagger?: boolean;
  /** Travel distance in px. 0 fades without moving. */
  y?: number;
  delay?: number;
}

/**
 * Fades content up as it enters the viewport.
 *
 * The initial hidden state is set by GSAP at runtime rather than in CSS, which
 * is what keeps this safe in the two cases a stylesheet would break: with
 * JavaScript off nothing ever hides, and the `matchMedia` guard means someone
 * asking for reduced motion never has anything hidden either. The global
 * reduced-motion rule in globals.css only neuters CSS animation — it cannot
 * reach GSAP, so that guard is doing real work.
 *
 * Above-the-fold content is behind the splash curtain while this runs, so the
 * hide happens unseen.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  stagger = false,
  y = 24,
  delay = 0,
}: RevealProps) {
  const scope = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = scope.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(stagger ? Array.from(el.children) : el, {
        opacity: 0,
        y,
        duration: 0.6,
        ease: "power3.out",
        stagger: stagger ? 0.06 : 0,
        delay,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
    });

    return () => mm.revert();
  }, [stagger, y, delay]);

  return (
    <Tag ref={scope as React.Ref<never>} className={className}>
      {children}
    </Tag>
  );
}
