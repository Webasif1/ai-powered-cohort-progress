import type { Metadata } from "next";
import { RedirectIfSignedIn } from "@/components/auth/RedirectIfSignedIn";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { safeRedirect } from "@/lib/safeRedirect";

export const metadata: Metadata = {
  title: "Create an account",
  robots: { index: false, follow: false },
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const destination = safeRedirect(next);

  return (
    <>
      <RedirectIfSignedIn next={destination} />
      <RegisterForm next={destination} />
    </>
  );
}
