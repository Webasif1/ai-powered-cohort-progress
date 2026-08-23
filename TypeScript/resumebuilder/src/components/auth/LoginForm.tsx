"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, Mail } from "lucide-react";
import toast from "react-hot-toast";
import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { useSession } from "@/components/providers/SessionProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { loginUser } from "@/apis/auth.api";
import { setSessionHint } from "@/lib/sessionHint";

/**
 * `next` arrives as a prop from the server page rather than through
 * `useSearchParams`. Reading it on the client would have forced this whole
 * form behind a Suspense boundary, which left the login page blank in the
 * server HTML until JavaScript hydrated.
 */
export function LoginForm({ next }: { next: string }) {
  const router = useRouter();
  const { refresh } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await loginUser(formData);

      // The provider already answered "signed out" while this page loaded,
      // so it has to be told the answer changed — otherwise `ProtectedRoute`
      // would bounce the user straight back here. `setSessionHint` covers the
      // next cold load; `refresh` covers this one.
      setSessionHint();
      await refresh();

      toast.success("Welcome back");
      router.push(next);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Invalid email or password";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to pick up where you left off."
      footer={
        <>
          New here?{" "}
          <Link
            // Carry the destination across, or switching to register would
            // lose the template the user picked.
            href={`/auth/register?next=${encodeURIComponent(next)}`}
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-danger/25 bg-danger-soft px-3 py-2.5 text-[13px] text-danger animate-fade-in"
          >
            <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <Input
          label="Email"
          name="email"
          type="email"
          icon={Mail}
          autoComplete="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <PasswordInput
          label="Password"
          name="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full"
          isLoading={isLoading}
          loadingText="Signing in"
        >
          Sign in
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </AuthShell>
  );
}
