"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Download, Eye, PanelsTopLeft } from "lucide-react";
import toast from "react-hot-toast";
import ProtectedRoute from "@/components/ProtectedRoute";
import { ResumeEditorSkeleton } from "@/components/SkeletonLoader";
import PersonalInformation from "@/components/resume/PersonalInformation";
import ProfessionalSummary from "@/components/resume/Summary";
import Experience from "@/components/resume/Experience";
import Projects from "@/components/resume/Projects";
import Skills from "@/components/resume/Skills";
import Education from "@/components/resume/Education";
import Certifications from "@/components/resume/Certifications";
import ResumePreview from "@/components/resume/ResumePreview";
import { AtsPanel } from "@/components/resume/AtsPanel";
import { TemplatePicker } from "@/components/resume/TemplatePicker";
import { CompletionBar, SaveStatus, type SaveState } from "@/components/resume/SaveStatus";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { EMPTY_RESUME, type ResumeData } from "@/types/resume.types";
import { getResumeById, updateResume } from "@/apis/resume.api";
import { completionPercent } from "@/lib/completion";
import { normalizeResume } from "@/lib/resumeData";
import { cn } from "@/lib/cn";

export default function ResumeEditorPage() {
  return (
    <ProtectedRoute>
      <ResumeEditorContent />
    </ProtectedRoute>
  );
}

const AUTOSAVE_DELAY = 1200;

function ResumeEditorContent() {
  const params = useParams();
  const resumeId = typeof params?.resumeId === "string" ? params.resumeId : "";

  const [data, setData] = useState<ResumeData>(EMPTY_RESUME);
  const [title, setTitle] = useState("Untitled Resume");
  // Derived from the route param at first render, so the missing-id case
  // never has to flip loading off from inside an effect.
  const [isLoading, setIsLoading] = useState(() => Boolean(resumeId));
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [pane, setPane] = useState<"edit" | "preview">("edit");
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  // Guards against the autosave firing on the initial hydration, and against
  // two saves overlapping.
  const hasFetched = useRef(false);
  const canSave = useRef(false);
  const isSaving = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Kept in a ref so the debounced callback always saves the newest values.
  const latest = useRef({ data: EMPTY_RESUME, title: "Untitled Resume" });

  /* ---------------------------------------------------------------- */
  /* Load                                                              */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    if (hasFetched.current || !resumeId) return;
    hasFetched.current = true;

    const load = async () => {
      try {
        const res = await getResumeById(resumeId);
        const loaded = normalizeResume(res, resumeId);

        setData(loaded);
        setTitle(loaded.title);
        latest.current = { data: loaded, title: loaded.title };
      } catch {
        toast.error("Could not load that resume");
        setData({ ...EMPTY_RESUME, _id: resumeId });
      } finally {
        setIsLoading(false);
        canSave.current = true;
      }
    };

    load();

    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [resumeId]);

  /* ---------------------------------------------------------------- */
  /* Save                                                              */
  /* ---------------------------------------------------------------- */
  const performSave = useCallback(async () => {
    if (!resumeId || !canSave.current || isSaving.current) return;

    isSaving.current = true;
    setSaveState("saving");

    const { data: current, title: currentTitle } = latest.current;

    try {
      await updateResume(resumeId, {
        title: currentTitle,
        template: current.template,
        personalInfo: current.personalInfo,
        summary: current.summary,
        experience: current.experience,
        projects: current.projects,
        skills: current.skills,
        education: current.education,
        certifications: current.certifications,
      });

      setSaveState("saved");
      setTimeout(
        () => setSaveState((s) => (s === "saved" ? "idle" : s)),
        1800,
      );
    } catch {
      setSaveState("error");
    } finally {
      isSaving.current = false;
    }
  }, [resumeId]);

  const scheduleSave = useCallback(() => {
    if (!canSave.current) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(performSave, AUTOSAVE_DELAY);
  }, [performSave]);

  const updateField = useCallback(
    <K extends keyof ResumeData>(field: K, value: ResumeData[K]) => {
      setData((prev) => {
        const next = { ...prev, [field]: value };
        latest.current = { ...latest.current, data: next };
        return next;
      });
      scheduleSave();
    },
    [scheduleSave],
  );

  const commitTitle = () => {
    setIsEditingTitle(false);
    const clean = title.trim() || "Untitled Resume";
    setTitle(clean);
    latest.current = { ...latest.current, title: clean };
    scheduleSave();
  };

  // Ctrl/Cmd+S flushes the pending autosave instead of opening the browser's
  // save dialog.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (saveTimer.current) clearTimeout(saveTimer.current);
        performSave();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [performSave]);

  /* ---------------------------------------------------------------- */
  /* Derived                                                           */
  /* ---------------------------------------------------------------- */

  // Gives the AI a role to write for, instead of the old `${fullName}'s Resume`.
  const jobTitle = useMemo(
    () => data.experience.find((e) => e.position)?.position ?? "",
    [data.experience],
  );

  // Shared with the dashboard cards, so the same resume cannot read 60% here
  // and 50% there.
  const completion = useMemo(() => completionPercent(data), [data]);

  if (isLoading) return <ResumeEditorSkeleton />;

  if (!resumeId) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-lg font-semibold text-fg">Resume not found</h1>
        <ButtonLink href="/resume" variant="primary">
          Back to your resumes
        </ButtonLink>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /* Render                                                            */
  /* ---------------------------------------------------------------- */
  return (
    <div className="min-h-screen bg-bg">
      {/* ================= HEADER ================= */}
      <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-xl">
        <div className="flex h-14 items-center gap-3 px-4 sm:px-5">
          <Link
            href="/resume"
            aria-label="Back to your resumes"
            className="inline-flex h-8 items-center gap-1.5 rounded-md px-2 text-[13px] font-medium text-fg-muted transition-colors hover:bg-surface-2 hover:text-fg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Resumes</span>
          </Link>

          <div className="mx-auto flex min-w-0 items-center gap-3">
            {isEditingTitle ? (
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onBlur={commitTitle}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitTitle();
                  if (e.key === "Escape") setIsEditingTitle(false);
                }}
                autoFocus
                aria-label="Resume title"
                className="h-8 min-w-[180px] rounded-md border border-accent bg-elevated px-2.5 text-sm font-semibold text-fg outline-none ring-[3px] ring-[var(--accent-ring)]"
              />
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingTitle(true)}
                title="Rename"
                className="max-w-[38vw] truncate rounded-md px-2 py-1 text-sm font-semibold text-fg transition-colors hover:bg-surface-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {title}
              </button>
            )}

            <SaveStatus state={saveState} onRetry={performSave} />
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <CompletionBar percent={completion} />
            </div>
            <ThemeToggle />
            <ButtonLink
              href={`/resume/${resumeId}/preview`}
              variant="secondary"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <Eye className="h-4 w-4" />
              Preview
            </ButtonLink>
            <Button
              variant="primary"
              size="sm"
              onClick={() =>
                window.open(
                  `/resume/${resumeId}/preview?download=1`,
                  "_blank",
                  "noopener",
                )
              }
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </div>
        </div>

        {/* Mobile pane switch */}
        <div className="border-t border-line px-4 py-2 lg:hidden">
          <Tabs
            aria-label="Editor view"
            value={pane}
            onChange={setPane}
            className="w-full"
            options={[
              { value: "edit", label: "Edit", icon: PanelsTopLeft },
              { value: "preview", label: "Preview", icon: Eye },
            ]}
          />
        </div>
      </header>

      {/* ================= BODY ================= */}
      <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        {/* Form */}
        <div
          className={cn(
            "px-4 py-5 sm:px-5 lg:h-[calc(100vh-3.5rem)] lg:overflow-y-auto lg:border-r lg:border-line",
            pane === "edit" ? "block" : "hidden lg:block",
          )}
        >
          <div className="mx-auto flex max-w-2xl flex-col gap-3 pb-16">
            <TemplatePicker
              value={data.template}
              onChange={(v) => updateField("template", v)}
            />
            <AtsPanel data={data} />
            <PersonalInformation
              data={data.personalInfo}
              onChange={(v) => updateField("personalInfo", v)}
            />
            <ProfessionalSummary
              summary={data.summary}
              onChange={(v) => updateField("summary", v)}
              jobTitle={jobTitle}
              skills={data.skills}
            />
            <Experience
              experience={data.experience}
              onChange={(v) => updateField("experience", v)}
              skills={data.skills}
            />
            <Projects
              projects={data.projects}
              onChange={(v) => updateField("projects", v)}
            />
            <Skills
              skills={data.skills}
              onChange={(v) => updateField("skills", v)}
              jobTitle={jobTitle}
            />
            <Education
              education={data.education}
              onChange={(v) => updateField("education", v)}
            />
            <Certifications
              certifications={data.certifications}
              onChange={(v) => updateField("certifications", v)}
            />
          </div>
        </div>

        {/* Preview */}
        <div
          className={cn(
            "bg-surface px-4 py-5 sm:px-5 lg:h-[calc(100vh-3.5rem)] lg:overflow-y-auto",
            pane === "preview" ? "block" : "hidden lg:block",
          )}
        >
          <p className="mb-4 text-center text-[11px] font-medium uppercase tracking-[0.09em] text-fg-subtle">
            Live preview
          </p>
          <ResumePreview data={data} />
        </div>
      </div>
    </div>
  );
}
