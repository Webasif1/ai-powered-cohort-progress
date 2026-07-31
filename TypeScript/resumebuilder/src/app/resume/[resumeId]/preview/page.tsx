"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { ArrowLeft, Printer } from "lucide-react";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import ResumePreview from "@/components/resume/ResumePreview";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Skeleton } from "@/components/ui/Skeleton";
import { getResumeById } from "@/apis/resume.api";
import { EMPTY_RESUME, type ResumeData } from "@/types/resume.types";

/**
 * This route did not exist. The editor's "Preview" link and "Download PDF"
 * button both pointed here and both 404'd, so PDF export was unreachable.
 *
 * Export goes through the browser's own print-to-PDF: the print stylesheet in
 * globals.css strips the chrome and lays the sheet out at A4, which keeps the
 * output selectable text (and ATS-readable) instead of a rasterised image.
 */
export default function ResumePreviewPage() {
  return (
    <ProtectedRoute>
      {/* useSearchParams needs a Suspense boundary above it. */}
      <Suspense
        fallback={
          <div className="min-h-screen bg-surface px-4 py-10">
            <Skeleton className="mx-auto h-[900px] w-full max-w-[760px] rounded-lg" />
          </div>
        }
      >
        <PreviewContent />
      </Suspense>
    </ProtectedRoute>
  );
}

function PreviewContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const resumeId = typeof params?.resumeId === "string" ? params.resumeId : "";
  const autoDownload = searchParams.get("download") === "1";

  const [data, setData] = useState<ResumeData | null>(null);
  const [isLoading, setIsLoading] = useState(() => Boolean(resumeId));
  const hasPrinted = useRef(false);

  useEffect(() => {
    if (!resumeId) return;

    let cancelled = false;

    getResumeById(resumeId)
      .then((res) => {
        if (cancelled) return;

        setData({
          ...EMPTY_RESUME,
          _id: res._id || resumeId,
          title: res.title || "Untitled Resume",
          personalInfo: { ...EMPTY_RESUME.personalInfo, ...res.personalInfo },
          summary: res.summary ?? res.summery ?? "",
          experience: res.experience ?? res.workExperience ?? [],
          projects: res.projects ?? [],
          skills: res.skills ?? [],
          education: res.education ?? [],
          certifications: res.certifications ?? [],
        });
      })
      .catch(() => {
        if (!cancelled) toast.error("Could not load that resume");
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [resumeId]);

  // Opened with ?download=1 from the editor — go straight to the print dialog
  // once the sheet has actually rendered.
  useEffect(() => {
    if (!autoDownload || !data || hasPrinted.current) return;

    hasPrinted.current = true;
    const timer = setTimeout(() => window.print(), 400);
    return () => clearTimeout(timer);
  }, [autoDownload, data]);

  useEffect(() => {
    if (data?.title) document.title = data.title;
  }, [data?.title]);

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-xl print-hide">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between gap-3 px-4 sm:px-5">
          <Link
            href={`/resume/${resumeId}`}
            className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-[13px] font-medium text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to editor
          </Link>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="primary"
              size="sm"
              onClick={() => window.print()}
              disabled={!data}
            >
              <Printer className="h-4 w-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </header>

      <main className="px-4 py-8 sm:px-5 sm:py-10">
        {isLoading ? (
          <Skeleton className="mx-auto h-[900px] w-full max-w-[760px] rounded-lg" />
        ) : data ? (
          <>
            <ResumePreview data={data} />
            <p className="mx-auto mt-6 max-w-[760px] text-center text-xs text-fg-subtle print-hide">
              Choose “Save as PDF” as the destination in the print dialog.
            </p>
          </>
        ) : (
          <p className="text-center text-sm text-fg-muted">
            That resume could not be loaded.
          </p>
        )}
      </main>
    </div>
  );
}
