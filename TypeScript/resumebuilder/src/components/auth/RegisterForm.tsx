"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AlertCircle, ArrowRight, Mail, Phone, User } from "lucide-react";
import toast from "react-hot-toast";
import { AuthShell } from "@/components/auth/AuthShell";
import { PasswordInput } from "@/components/auth/PasswordInput";
import { useSession } from "@/components/providers/SessionProvider";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { registerUser } from "@/apis/auth.api";
import { setSessionHint } from "@/lib/sessionHint";

/** See the note in LoginForm: `next` is a prop so the form stays in the HTML. */
export function RegisterForm({ next }: { next: string }) {
  const router = useRouter();
  const { refresh } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await registerUser(formData);

      // See LoginForm — the provider's cached "signed out" answer has to be
      // replaced before navigating into a protected route.
      setSessionHint();
      await refresh();

      toast.success("Account created");
      router.push(next);
    } catch (err: unknown) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message ?? "Registration failed. Please try again.";
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start your first resume in under a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href={`/auth/login?next=${encodeURIComponent(next)}`}
            className="font-medium text-accent underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2 rounded-md border border-danger/25 bg-danger-soft px-3 py-2.5 text-[13px] text-danger animate-[fade-in_0.2s_ease-out_both]"
          >
            <AlertCircle aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <Input
          label="Full name"
          name="name"
          icon={User}
          autoComplete="name"
          placeholder="Jane Doe"
          value={formData.name}
          onChange={handleChange}
          required
        />

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

        <Input
          label="Mobile"
          name="mobile"
          type="tel"
          icon={Phone}
          autoComplete="tel"
          placeholder="+1 555 000 0000"
          value={formData.mobile}
          onChange={handleChange}
          required
        />

        <PasswordInput
          label="Password"
          name="password"
          autoComplete="new-password"
          placeholder="At least 8 characters"
          hint="Use 8 or more characters."
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
          loadingText="Creating account"
        >
          Create account
          <ArrowRight className="h-4 w-4" />
        </Button>
      </form>
    </AuthShell>
  );
}
