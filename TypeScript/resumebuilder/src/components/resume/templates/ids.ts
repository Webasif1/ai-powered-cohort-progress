/**
 * Template identity and tier, with no component imports.
 *
 * The API needs to know which layouts are free, but importing `registry.ts`
 * would pull six React template components into a route bundle that never
 * renders one. `registry.ts` builds on this, so there is still one list.
 */

export type TemplateId =
  | "classic"
  | "minimal"
  | "compact"
  | "banner"
  | "sidebar"
  | "timeline";

export type TemplateTier = "free" | "premium";

export const TEMPLATE_TIERS: Record<TemplateId, TemplateTier> = {
  classic: "free",
  minimal: "free",
  compact: "free",
  banner: "premium",
  sidebar: "premium",
  timeline: "premium",
};

export const DEFAULT_TEMPLATE: TemplateId = "classic";

/**
 * There is no billing, so a premium id arriving at the API means the request
 * was crafted by hand. Anything unrecognised falls back to the default.
 */
export const FREE_TEMPLATE_IDS: string[] = Object.entries(TEMPLATE_TIERS)
  .filter(([, tier]) => tier === "free")
  .map(([id]) => id);
