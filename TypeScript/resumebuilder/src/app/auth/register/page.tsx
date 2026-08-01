import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { safeRedirect } from "@/lib/safeRedirect";

export const metadata: Metadata = {
  title: "Create an account",
};

export default async function RegisterPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return <RegisterForm next={safeRedirect(next)} />;
}
