import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { safeRedirect } from "@/lib/safeRedirect";

export const metadata: Metadata = {
  title: "Sign in",
};

/**
 * Server component so the form is present in the HTML. Reading `next` here
 * and passing it down keeps `useSearchParams` — and the Suspense boundary it
 * requires — out of the form entirely.
 */
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return <LoginForm next={safeRedirect(next)} />;
}
