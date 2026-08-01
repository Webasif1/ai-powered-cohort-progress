import { Container } from "@/components/layout/Container";

/**
 * TODO: replace with real figures before this goes live.
 *
 * These are deliberately round placeholder numbers rather than invented
 * precise ones — "4,510,834 users" reads as a real metric and would be a
 * fabricated claim. Swap them for your own analytics.
 */
const stats = [
  { value: "6", suffix: "", label: "guided sections", note: "from contact details to certifications" },
  { value: "5", suffix: "", label: "AI writing tools", note: "summary, skills, experience, projects, rewrite" },
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
