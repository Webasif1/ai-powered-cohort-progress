/**
 * A non-secret "this browser had a signed-in user" flag.
 *
 * The session itself lives in an httpOnly cookie, so the client cannot read
 * it — which means the header would otherwise have to paint signed-out chrome,
 * wait for `/api/auth/check`, then swap. This hint is stamped onto <html> by a
 * blocking script before first paint, exactly like the theme, so a returning
 * user sees the right header immediately.
 *
 * It stores the string "1" and nothing else — never a user id, never a token.
 * The server check remains the only authority; the hint is only ever an
 * optimistic guess about what to paint first, and is corrected on every load.
 *
 * `localStorage`, not `sessionStorage`: the cookie outlives the tab, so a
 * per-tab store would guarantee a wrong first paint in every new tab.
 */

export const SESSION_HINT_KEY = "resumeai-session";

export function readSessionHint(): boolean {
  try {
    return localStorage.getItem(SESSION_HINT_KEY) === "1";
  } catch {
    return false;
  }
}

export function setSessionHint(): void {
  if (typeof document === "undefined") return;

  document.documentElement.dataset.session = "in";

  try {
    localStorage.setItem(SESSION_HINT_KEY, "1");
  } catch {
    /* private mode — the attribute on <html> still holds for this page */
  }
}

export function clearSessionHint(): void {
  if (typeof document === "undefined") return;

  delete document.documentElement.dataset.session;

  try {
    localStorage.removeItem(SESSION_HINT_KEY);
  } catch {
    /* nothing to clear */
  }
}

/**
 * Runs before first paint so `data-session` is on <html> before any pixels
 * are drawn. Inlined in <head> — must stay dependency-free and tiny.
 */
export const sessionInitScript = `
(function(){
  try {
    if (localStorage.getItem("${SESSION_HINT_KEY}") === "1")
      document.documentElement.dataset.session = "in";
  } catch (e) {}
})();
`.trim();
