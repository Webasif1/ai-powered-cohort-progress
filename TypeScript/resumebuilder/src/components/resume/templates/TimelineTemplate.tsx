import { toText } from "@/lib/aiText";
import {
  Bullets,
  EmptyNotice,
  LinkText,
  Sheet,
  contactList,
  dateRange,
  hasHeader,
  isEmpty,
  linkList,
  type TemplateProps,
} from "./shared";

/**
 * Dates in a left rail with a connecting rule, so a long career reads as a
 * sequence. Single column, and the rail is drawn with borders rather than
 * graphics so nothing is lost when the page is parsed as text.
 */
export function TimelineTemplate({ data, className }: TemplateProps) {
  if (isEmpty(data)) return <EmptyNotice />;

  const summary = toText(data.summary);
  const certifications = data.certifications.filter(Boolean);

  return (
    <Sheet className={className}>
      <div className="px-10 py-10">
        {hasHeader(data) && (
          <header className="print-block">
            {data.personalInfo.fullName && (
              <h1 className="text-[27px] font-semibold tracking-[-0.025em]">
                {data.personalInfo.fullName}
              </h1>
            )}
            <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1 text-[12px] text-[#555]">
              {contactList(data).map((item) => (
                <span key={item}>{item}</span>
              ))}
              {linkList(data).map((link) => (
                <LinkText key={link} url={link} />
              ))}
            </div>
          </header>
        )}

        {summary && (
          <p className="mt-6 whitespace-pre-line text-[13.5px] leading-[1.7] text-[#333]">
            {summary}
          </p>
        )}

        {data.experience.length > 0 && (
          <Section title="Experience">
            {data.experience.map((item, i) => (
              <TimelineRow
                key={item.id || i}
                meta={dateRange(item.startDate, item.endDate, item.current)}
                last={i === data.experience.length - 1}
              >
                <h3 className="text-[14px] font-semibold leading-tight">
                  {item.position}
                </h3>
                {item.company && (
                  <p className="text-[12.5px] text-[#666]">{item.company}</p>
                )}
                <Bullets text={item.description} />
              </TimelineRow>
            ))}
          </Section>
        )}

        {data.education.length > 0 && (
          <Section title="Education">
            {data.education.map((item, i) => (
              <TimelineRow
                key={item.id || i}
                meta={[item.startYear, item.endYear]
                  .filter(Boolean)
                  .join(" — ")}
                last={i === data.education.length - 1}
              >
                <h3 className="text-[13.5px] font-semibold leading-tight">
                  {item.degree}
                </h3>
                <p className="text-[12px] text-[#666]">{item.institution}</p>
              </TimelineRow>
            ))}
          </Section>
        )}

        {data.projects.length > 0 && (
          <Section title="Projects">
            <div className="space-y-4">
              {data.projects.map((item, i) => (
                <div key={item.id || i} className="print-block">
                  <h3 className="text-[14px] font-semibold">{item.title}</h3>
                  <Bullets text={item.description} />
                  {item.techStack.length > 0 && (
                    <p className="mt-1.5 text-[11.5px] text-[#666]">
                      {item.techStack.join(" · ")}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {data.skills.length > 0 && (
          <Section title="Skills">
            <p className="text-[#333]">{data.skills.join("  ·  ")}</p>
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title="Certifications">
            <ul className="list-disc space-y-1 pl-5 text-[#444] marker:text-[#999]">
              {certifications.map((cert, i) => (
                <li key={i}>{cert}</li>
              ))}
            </ul>
          </Section>
        )}
      </div>
    </Sheet>
  );
}

function TimelineRow({
  meta,
  last,
  children,
}: {
  meta: string;
  last: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="print-block grid grid-cols-[92px_minmax(0,1fr)] gap-4">
      <p className="pt-0.5 text-right text-[11px] leading-snug text-[#888]">
        {meta}
      </p>
      <div
        className={`relative border-l border-[#e0e0e4] pb-5 pl-5 ${
          last ? "border-transparent pb-0" : ""
        }`}
      >
        <span className="absolute -left-[3.5px] top-1.5 h-[7px] w-[7px] rounded-full bg-[#111]" />
        {children}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-7">
      <h2 className="mb-4 text-[11px] font-bold uppercase tracking-[0.1em]">
        {title}
      </h2>
      {children}
    </section>
  );
}
