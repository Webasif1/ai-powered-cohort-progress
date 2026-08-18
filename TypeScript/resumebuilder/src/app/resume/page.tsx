"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FileText, Plus } from "lucide-react";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/layout/Container";
import { ResumeCardSkeleton } from "@/components/SkeletonLoader";
import { DashboardStats } from "@/components/resume/DashboardStats";
import { ResumeCard, type ResumeSummary } from "@/components/resume/ResumeCard";
import { TemplatePickerDialog } from "@/components/resume/TemplatePickerDialog";
import type { TemplateId } from "@/components/resume/templates/registry";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { EmptyState } from "@/components/ui/EmptyState";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  createResume,
  deleteResume,
  duplicateResume,
  getAllResumes,
} from "@/apis/resume.api";

export default function ResumeDashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const router = useRouter();
  const [resumes, setResumes] = useState<ResumeSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [duplicatingId, setDuplicatingId] = useState<string | null>(null);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchResumes = useCallback(async () => {
    // `isLoading` already starts true — setting it here again would be a
    // synchronous setState inside the effect for no benefit.
    try {
      setResumes(await getAllResumes());
    } catch {
      toast.error("Could not load your resumes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchResumes();
  }, [fetchResumes]);

  // Creating from here used to skip the layout choice entirely and always
  // produce a Classic resume; now the same picker the gallery offers runs
  // first.
  const handleSelectTemplate = async (templateId: TemplateId) => {
    try {
      setIsCreating(true);
      const created = await createResume(templateId);
      router.push(`/resume/${created._id}`);
    } catch {
      toast.error("Could not create a resume");
      setIsCreating(false);
      setPickerOpen(false);
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      setDuplicatingId(id);
      const copy = await duplicateResume(id);
      // The server sorts newest-first and the copy is the newest thing there
      // is, so prepending matches what a refetch would return.
      setResumes((prev) => [copy, ...prev]);
      toast.success("Duplicated");
    } catch {
      toast.error("Could not duplicate that resume");
    } finally {
      setDuplicatingId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (!pendingDelete) return;

    try {
      setIsDeleting(true);
      await deleteResume(pendingDelete);
      setResumes((prev) => prev.filter((r) => r._id !== pendingDelete));
      toast.success("Resume deleted");
      setPendingDelete(null);
    } catch {
      toast.error("Could not delete that resume");
    } finally {
      setIsDeleting(false);
    }
  };

  const deletingTitle =
    resumes.find((r) => r._id === pendingDelete)?.title?.trim() ||
    "Untitled Resume";

  return (
    <div className="min-h-screen bg-bg">
      <SiteHeader solid />

      <Container className="py-10 sm:py-12">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-[-0.025em] text-fg sm:text-3xl">
              Your resumes
            </h1>
            <p className="mt-1.5 text-[13px] text-fg-muted">
              {isLoading
                ? "Loading…"
                : resumes.length === 0
                  ? "Nothing here yet."
                  : `${resumes.length} resume${resumes.length === 1 ? "" : "s"}`}
            </p>
          </div>

          <Button
            variant="primary"
            onClick={() => setPickerOpen(true)}
            isLoading={isCreating}
            loadingText="Creating"
          >
            <Plus className="h-4 w-4" />
            New resume
          </Button>
        </div>

        {isLoading ? (
          <Skeleton className="mt-8 h-23 w-full rounded-xl" />
        ) : (
          <div className="mt-8 empty:mt-0">
            <DashboardStats resumes={resumes} />
          </div>
        )}

        <div className="mt-8">
          {isLoading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <ResumeCardSkeleton key={i} />
              ))}
            </div>
          ) : resumes.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No resumes yet"
              description="Create your first one and let the AI handle the writing. It takes about twenty minutes."
              action={
                <Button
                  variant="primary"
                  onClick={() => setPickerOpen(true)}
                  isLoading={isCreating}
                  loadingText="Creating"
                >
                  <Plus className="h-4 w-4" />
                  Create your first resume
                </Button>
              }
            />
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {resumes.map((resume, index) => (
                <li
                  key={resume._id}
                  className="animate-[rise_0.32s_cubic-bezier(0.22,1,0.36,1)_both]"
                  style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
                >
                  <ResumeCard
                    resume={resume}
                    onDelete={setPendingDelete}
                    onDuplicate={handleDuplicate}
                    isDuplicating={duplicatingId === resume._id}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>

      <TemplatePickerDialog
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={handleSelectTemplate}
        isCreating={isCreating}
      />

      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete this resume?"
        description={`“${deletingTitle}” will be permanently removed. This cannot be undone.`}
        confirmLabel="Delete"
        isBusy={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
