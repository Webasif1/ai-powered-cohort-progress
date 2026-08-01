import { cn } from "@/lib/cn";

type Layout = "single" | "split" | "header";

interface Template {
  name: string;
  description: string;
  layout: Layout;
  available: boolean;
}

/**
 * The app currently renders one layout. The other two are marked
 * "Coming soon" rather than shown as if they were selectable — offering
 * templates that do not exist would be a false claim on the landing page.
 */
const templates: Template[] = [
  {
    name: "Classic",
    description:
      "Single column, centred header. The layout every ATS parses cleanly.",
    layout: "single",
    available: true,
  },
  {
    name: "Split",
    description:
      "Skills and contact details in a sidebar, history in the main column.",
    layout: "split",
    available: false,
  },
  {
    name: "Banner",
    description: "Full-width name block with a rule under the contact row.",
    layout: "header",
    available: false,
  },
];

export function TemplateGallery() {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <li key={template.name}>
          <article
            className={cn(
              "group h-full overflow-hidden rounded-xl border border-line bg-elevated shadow-xs",
              "transition-[border-color,box-shadow,transform] duration-200",
              template.available &&
                "hover:-translate-y-0.5 hover:border-line-strong hover:shadow-md",
            )}
          >
            <div className="border-b border-line bg-surface p-6">
              <TemplateThumb layout={template.layout} muted={!template.available} />
            </div>

            <div className="flex items-start justify-between gap-3 p-4">
              <div>
                <h3 className="text-sm font-semibold text-fg">
                  {template.name}
                </h3>
                <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">
                  {template.description}
                </p>
              </div>

              {!template.available && (
                <span className="shrink-0 rounded-full border border-line bg-surface px-2 py-0.5 text-[11px] font-medium text-fg-subtle">
                  Soon
                </span>
              )}
            </div>
          </article>
        </li>
      ))}
    </ul>
  );
}

/** CSS-drawn page preview. No image assets, and it recolours with the theme. */
function TemplateThumb({ layout, muted }: { layout: Layout; muted: boolean }) {
  const line = cn("rounded-full", muted ? "bg-line" : "bg-line-strong");
  const body = "rounded-full bg-line";

  return (
    <div
      aria-hidden
      className="mx-auto aspect-[1/1.3] w-full max-w-[168px] rounded-md border border-line bg-elevated p-3.5 shadow-xs"
    >
      {layout === "header" && (
        <>
          <div className={cn(line, "h-2.5 w-3/5")} />
          <div className="mt-1.5 flex gap-1">
            {[22, 16, 20].map((w, i) => (
              <span key={i} className={cn(body, "h-1")} style={{ width: w }} />
            ))}
          </div>
          <div className="mt-2 h-px bg-line-strong" />
          <Block className="mt-2.5" accent={!muted} />
          <Block className="mt-2.5" />
        </>
      )}

      {layout === "single" && (
        <>
          <div className={cn(line, "mx-auto h-2.5 w-1/2")} />
          <div className={cn(body, "mx-auto mt-1.5 h-1 w-2/3")} />
          <Block className="mt-3" accent={!muted} />
          <Block className="mt-2.5" />
          <Block className="mt-2.5" />
        </>
      )}

      {layout === "split" && (
        <div className="flex h-full gap-2">
          <div className="w-1/3 border-r border-line pr-2">
            <div className={cn(line, "h-2 w-full")} />
            <div className="mt-2 space-y-1">
              {[80, 60, 70, 50].map((w, i) => (
                <span
                  key={i}
                  className={cn(body, "block h-1")}
                  style={{ width: `${w}%` }}
                />
              ))}
            </div>
          </div>
          <div className="flex-1">
            <div className={cn(line, "h-2.5 w-4/5")} />
            <Block className="mt-2.5" accent={!muted} />
            <Block className="mt-2.5" />
          </div>
        </div>
      )}
    </div>
  );
}

function Block({
  className,
  accent = false,
}: {
  className?: string;
  accent?: boolean;
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <span
        className={cn(
          "block h-1 w-1/3 rounded-full",
          accent ? "bg-accent/60" : "bg-line-strong",
        )}
      />
      {[96, 88, 72].map((w, i) => (
        <span
          key={i}
          className="block h-1 rounded-full bg-line"
          style={{ width: `${w}%` }}
        />
      ))}
    </div>
  );
}
