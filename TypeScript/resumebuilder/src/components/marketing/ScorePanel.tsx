import { cn } from "@/lib/cn";

const categories = [
  { label: "Keywords", score: 82 },
  { label: "Formatting", score: 95 },
  { label: "Action verbs", score: 74 },
  { label: "Contact info", score: 100 },
  { label: "Clarity", score: 80 },
];

const OVERALL = 86;

/** Illustrative ATS readout for the marketing page. */
export function ScorePanel() {
  return (
    <div className="rounded-xl border border-line bg-elevated p-6 shadow-sm">
      <div className="flex items-center gap-5">
        <ScoreRing value={OVERALL} />
        <div>
          <p className="text-sm font-semibold text-fg">ATS readiness</p>
          <p className="mt-1 text-[13px] leading-relaxed text-fg-muted">
            Scored against the filters most applicant tracking systems apply
            before a human ever opens the file.
          </p>
        </div>
      </div>

      <dl className="mt-6 space-y-3.5">
        {categories.map((category) => (
          <div key={category.label}>
            <div className="mb-1.5 flex items-baseline justify-between">
              <dt className="text-[13px] text-fg-muted">{category.label}</dt>
              <dd className="text-[13px] font-medium tabular-nums text-fg">
                {category.score}
              </dd>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-surface-2">
              <div
                className={cn(
                  "h-full rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  category.score >= 90
                    ? "bg-success"
                    : category.score >= 78
                      ? "bg-accent"
                      : "bg-warning",
                )}
                style={{ width: `${category.score}%` }}
              />
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}

function ScoreRing({ value }: { value: number }) {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  return (
    <div className="relative h-[76px] w-[76px] shrink-0">
      <svg viewBox="0 0 76 76" className="h-full w-full -rotate-90">
        <circle
          cx="38"
          cy="38"
          r={radius}
          fill="none"
          strokeWidth="6"
          className="stroke-surface-2"
        />
        <circle
          cx="38"
          cy="38"
          r={radius}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="stroke-accent"
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-semibold tabular-nums text-fg">
        {value}
      </span>
    </div>
  );
}
