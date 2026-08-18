"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  SESSION_HINT_KEY,
  clearSessionHint,
  setSessionHint,
} from "@/lib/sessionHint";

/**
 * Shares one answer to "is anyone signed in?" across the whole app.
 *
 * Before this existed every protected page fetched `/api/auth/check` on mount
 * and kept the answer to itself, so navigating dashboard → editor → preview
 * cost three identical requests and three full-page loaders, while the header
 * — which is not a protected page — had no way to know at all.
 *
 * Deliberately client-side. Reading the cookie server-side would drag the
 * prerendered marketing pages and the six static template pages into dynamic
 * rendering, and the header's auth state is decoration: the real gates are
 * `ProtectedRoute` and the `getCurrentUser()` check inside every API route.
 */

export type SessionStatus = "loading" | "authenticated" | "unauthenticated";

export interface SessionValue {
  status: SessionStatus;
  /** True while `status` comes from the stored hint and not yet the server. */
  isOptimistic: boolean;
  userId: string | null;
  /** Re-asks the server. Call after signing in or registering. */
  refresh: () => Promise<void>;
  signOut: () => Promise<void>;
}

/* ------------------------------------------------------------------ */
/* The optimistic hint, read straight off <html>                       */
/* ------------------------------------------------------------------ */

const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  // Signing out in one tab should update the header in the others.
  const onStorage = (e: StorageEvent) => {
    if (e.key !== SESSION_HINT_KEY) return;

    if (e.newValue === "1") document.documentElement.dataset.session = "in";
    else delete document.documentElement.dataset.session;

    emit();
  };

  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getHintSnapshot(): boolean {
  return document.documentElement.dataset.session === "in";
}

function getServerHintSnapshot(): boolean {
  // The server HTML is the signed-out one, so the prerendered marketing pages
  // keep their "Sign in / Get started" markup and stay cacheable.
  return false;
}

/* ------------------------------------------------------------------ */

type Confirmed = {
  status: Exclude<SessionStatus, "loading">;
  userId: string | null;
};

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();

  const hinted = useSyncExternalStore(
    subscribe,
    getHintSnapshot,
    getServerHintSnapshot,
  );

  // `null` means the server has not answered yet, so the hint is in charge.
  const [confirmed, setConfirmed] = useState<Confirmed | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const refresh = useCallback(async () => {
    const response = await fetch("/api/auth/check", {
      method: "GET",
      credentials: "include",
    }).catch(() => null);

    if (!isMounted.current) return;

    if (!response?.ok) {
      // A network failure is not proof of being signed out, but the app can
      // do nothing useful either way — treat it as signed out and let the
      // next navigation re-check.
      clearSessionHint();
      emit();
      setConfirmed({ status: "unauthenticated", userId: null });
      return;
    }

    const body = await response.json().catch(() => null);
    if (!isMounted.current) return;

    setSessionHint();
    emit();
    setConfirmed({
      status: "authenticated",
      userId: body?.data?.userID ?? null,
    });
  }, []);

  useEffect(() => {
    // Deferred a frame so the first paint uses the hint and the confirmation
    // lands as a follow-up rather than a cascading render.
    const raf = requestAnimationFrame(() => {
      refresh();
    });
    return () => cancelAnimationFrame(raf);
  }, [refresh]);

  const signOut = useCallback(async () => {
    // The cookie is httpOnly, so only the server can expire it.
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => null);

    clearSessionHint();
    emit();
    setConfirmed({ status: "unauthenticated", userId: null });

    toast.success("Signed out");
    router.replace("/auth/login");
    router.refresh();
  }, [router]);

  const value = useMemo<SessionValue>(() => {
    const status: SessionStatus = confirmed
      ? confirmed.status
      : hinted
        ? "authenticated"
        : "loading";

    return {
      status,
      isOptimistic: !confirmed,
      userId: confirmed?.userId ?? null,
      refresh,
      signOut,
    };
  }, [confirmed, hinted, refresh, signOut]);

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession() {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside <SessionProvider>");
  return ctx;
}
