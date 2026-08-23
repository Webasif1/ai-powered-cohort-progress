import { Container } from "@/components/layout/Container";

/**
 * Product facts, not growth metrics — every number here is checkable against
 * the app, which is why there are no user or download counts.
 *
 * Keep them in step with the code: `sections` is what the editor renders,
 * `AI writing tools` is what `apis/ai.api.ts` exposes, and `templates` is the
 * free tier of the template registry.
 */
const stats = [
  { value: "7", suffix: "", label: "guided sections", note: "from contact details to certifications" },
  { value: "6", suffix: "", label: "AI writing tools", note: "summary, skills, experience, projects, rewrite, ATS score" },
  { value: "A4", suffix: "", label: "print-ready export", note: "selectable text, not a flattened image" },
  { value: "0", suffix: "", label: "cost to start", note: "no card required" },
];

/** Product facts rather than growth metrics, so nothing here is invented. */
export function StatsBand() {
  return (
    <section className="border-y border-line bg-elevated py-12 sm:py-14">
      <Container>
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <dt className="text-3xl font-semibold tracking-[-0.03em] tabular-nums text-fg">
                {stat.value}
                <span className="text-accent">{stat.suffix}</span>
              </dt>
              <dd className="mt-1.5 text-[13px] font-medium text-fg">
                {stat.label}
              </dd>
              <dd className="mt-1 text-xs leading-relaxed text-fg-subtle">
                {stat.note}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
