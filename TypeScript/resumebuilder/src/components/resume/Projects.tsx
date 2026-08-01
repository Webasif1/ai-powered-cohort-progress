"use client";

import { useState } from "react";
import { FolderGit2, X } from "lucide-react";
import toast from "react-hot-toast";
import { AddItemButton, ItemCard, SectionShell } from "./SectionShell";
import { AIActionButton, useTypewriter, type AIStatus } from "./AIActionButton";
import { Input, Label, Textarea } from "@/components/ui/Field";
import { generateProjectDescription } from "@/apis/ai.api";
import { toText } from "@/lib/aiText";
import { makeId } from "@/lib/cn";
import type { IProject } from "@/types/resume.types";

interface ProjectsProps {
  projects: IProject[];
  onChange: (projects: IProject[]) => void;
}

export default function Projects({ projects, onChange }: ProjectsProps) {
  const [status, setStatus] = useState<Record<string, AIStatus>>({});
  const [tagDraft, setTagDraft] = useState<Record<string, string>>({});
  const { type } = useTypewriter();

  const setItemStatus = (id: string, next: AIStatus) =>
    setStatus((prev) => ({ ...prev, [id]: next }));

  const addItem = () =>
    onChange([
      ...projects,
      {
        id: makeId(),
        title: "",
        description: "",
        githubUrl: "",
        liveUrl: "",
        techStack: [],
      },
    ]);

  const removeItem = (id: string) =>
    onChange(projects.filter((item) => item.id !== id));

  const updateItem = <K extends keyof IProject>(
    id: string,
    field: K,
    value: IProject[K],
  ) =>
    onChange(
      projects.map((item) =>
        item.id === id ? { ...item, [field]: value } : item,
      ),
    );

  const addTag = (project: IProject) => {
    const tag = tagDraft[project.id]?.trim();
    if (!tag) return;

    if (!project.techStack.includes(tag)) {
      updateItem(project.id, "techStack", [...project.techStack, tag]);
    }
    setTagDraft((prev) => ({ ...prev, [project.id]: "" }));
  };

  const removeTag = (project: IProject, tag: string) =>
    updateItem(
      project.id,
      "techStack",
      project.techStack.filter((t) => t !== tag),
    );

  const handleGenerate = async (item: IProject) => {
    setItemStatus(item.id, "loading");

    try {
      const response = await generateProjectDescription({
        experienceLevel: "mid",
        jobTitle: item.title || "Web application",
        techStack: item.techStack.length ? item.techStack : ["React", "Node.js"],
      });

      const text = toText(response, "projectDescription", "description");
      if (!text) throw new Error("Empty response");

      type(
        text,
        (partial) => updateItem(item.id, "description", partial),
        () => {
          setItemStatus(item.id, "success");
          setTimeout(() => setItemStatus(item.id, "idle"), 1800);
        },
      );
    } catch {
      setItemStatus(item.id, "idle");
      toast.error("Could not generate that description");
    }
  };

  return (
    <SectionShell
      icon={FolderGit2}
      title="Projects"
      count={projects.length}
      description="Things you built that are worth showing"
    >
      <div className="space-y-3">
          {projects.map((item, index) => (
            <ItemCard
              key={item.id}
              index={index}
              label="Project"
              onRemove={() => removeItem(item.id)}
            >
              <Input
                label="Title"
                placeholder="Realtime collaboration editor"
                value={item.title}
                onChange={(e) => updateItem(item.id, "title", e.target.value)}
              />

              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <Input
                  label="Repository"
                  type="url"
                  placeholder="github.com/you/project"
                  value={item.githubUrl}
                  onChange={(e) =>
                    updateItem(item.id, "githubUrl", e.target.value)
                  }
                />
                <Input
                  label="Live URL"
                  type="url"
                  placeholder="project.vercel.app"
                  value={item.liveUrl}
                  onChange={(e) =>
                    updateItem(item.id, "liveUrl", e.target.value)
                  }
                />
              </div>

              {/* Tech stack */}
              <div className="mt-3">
                <Label htmlFor={`tech-${item.id}`}>Tech stack</Label>

                {item.techStack.length > 0 && (
                  <ul className="mb-2 flex flex-wrap gap-1.5">
                    {item.techStack.map((tag) => (
                      <li key={tag}>
                        <span className="inline-flex items-center gap-1 rounded-full border border-line bg-elevated py-0.5 pl-2.5 pr-1 text-xs text-fg-muted">
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(item, tag)}
                            aria-label={`Remove ${tag}`}
                            className="inline-flex h-4 w-4 items-center justify-center rounded-full text-fg-subtle transition-colors hover:bg-danger-soft hover:text-danger focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-accent"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                <input
                  id={`tech-${item.id}`}
                  value={tagDraft[item.id] ?? ""}
                  onChange={(e) =>
                    setTagDraft((prev) => ({
                      ...prev,
                      [item.id]: e.target.value,
                    }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === ",") {
                      e.preventDefault();
                      addTag(item);
                    }
                  }}
                  onBlur={() => addTag(item)}
                  placeholder="Type a technology and press Enter"
                  className="h-9.5 w-full rounded-md border border-line bg-elevated px-3 text-sm text-fg placeholder:text-fg-subtle transition-[border-color,box-shadow] hover:border-line-strong focus:border-accent focus:outline-none focus:ring-[3px] focus:ring-[var(--accent-ring)]"
                />
              </div>

              <div className="mt-3">
                <Textarea
                  label="Description"
                  rows={4}
                  placeholder="What it does, who it is for, and what was hard about building it."
                  value={item.description}
                  onChange={(e) =>
                    updateItem(item.id, "description", e.target.value)
                  }
                />
              </div>

              <div className="mt-3">
                <AIActionButton
                  status={status[item.id] ?? "idle"}
                  onClick={() => handleGenerate(item)}
                  label="Write this for me"
                  successLabel="Written"
                />
              </div>
            </ItemCard>
          ))}

        <AddItemButton onClick={addItem} label="Add a project" />
      </div>
    </SectionShell>
  );
}
