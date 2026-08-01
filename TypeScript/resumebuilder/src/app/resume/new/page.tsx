"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import { PageLoader } from "@/components/ui/Skeleton";
import { Button, ButtonLink } from "@/components/ui/Button";
import { createResume } from "@/apis/resume.api";

/**
 * Hand-off between picking a template and editing one.
 *
 * "Use it" on the template gallery points here rather than at the sign-up
 * page, so the chosen layout is part of the URL. If the visitor is signed
 * out, `ProtectedRoute` bounces them to login with this whole location as
 * `next` — which means the template survives the round trip through auth
 * and they land in the editor with it applied, instead of on the dashboard
 * having lost the choice.
 */
export default function NewResumePage() {
  return (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader label="Preparing your resume" />}>
        <CreateAndRedirect />
      </Suspense>
    </ProtectedRoute>
  );
}

function CreateAndRedirect() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const template = searchParams.get("template") ?? undefined;

  const [failed, setFailed] = useState(false);
  // React runs effects twice in development; without this the user would
  // get two blank resumes for one click.
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    createResume(template)
      .then((created) => {
        if (!created?._id) throw new Error("No id returned");
        router.replace(`/resume/${created._id}`);
      })
      .catch(() => {
        toast.error("Could not start a new resume");
        setFailed(true);
      });
  }, [router, template]);

  if (failed) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-lg font-semibold text-fg">
          That didn&apos;t work
        </h1>
        <p className="max-w-sm text-[13px] leading-relaxed text-fg-muted">
          We couldn&apos;t create the resume. Your existing ones are safe.
        </p>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Try again
          </Button>
          <ButtonLink href="/resume" variant="primary">
            Go to your resumes
          </ButtonLink>
        </div>
      </div>
    );
  }

  return <PageLoader label="Setting up your resume" />;
}
