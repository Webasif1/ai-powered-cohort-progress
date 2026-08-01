import { toText } from "@/lib/aiText";
import {
  Bullets,
  EmptyNotice,
  Sheet,
  cleanUrl,
  contactList,
  dateRange,
  hasHeader,
  isEmpty,
  linkList,
  type TemplateProps,
} from "./shared";

/**
 * Dark full-bleed header band with the name reversed out of it.
 *
 * Still single column, so the body parses normally. The band is a
 * background colour on a block element rather than an image, which means
 * the name underneath stays real selectable text.
 */
export function BannerTemplate({ data, className }: TemplateProps) {
  if (isEmpty(data)) return <EmptyNotice />;

  const summary = toText(data.summary);
  const certifications = data.certifications.filter(Boolean);

  return (
    <Sheet className={className}>
      {hasHeader(data) && (
        <header className="print-block bg-[#141416] px-10 py-8 text-white">
          {data.personalInfo.fullName && (
            <h1 className="text-[28px] font-semibold tracking-[-0.025em]">
              {data.personalInfo.fullName}
            </h1>
          )}
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-white/70">
            {contactList(data).map((item) => (
              <span key={item}>{item}</span>
            ))}
            {linkList(data).map((link) => (
              <span key={link}>{cleanUrl(link)}</span>
            ))}
          </div>
        </header>
      )}

      <div className="px-10 py-9">
        {summary && (
          <p className="whitespace-pre-line text-[13.5px] leading-[1.7] text-[#333]">
            {summary}
          </p>
        )}

        {data.experience.length > 0 && (
          <Section title="Experience">
            <div className="space-y-4">
              {data.experience.map((item, i) => (
                <div key={item.id || i} className="print-block">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[14px] font-semibold">
                      {item.position}
                    </h3>
                    <span className="shrink-0 whitespace-nowrap text-[11.5px] text-[#888]">
                      {dateRange(item.startDate, item.endDate, item.current)}
                    </span>
                  </div>
                  {item.company && (
                    <p className="text-[12.5px] text-[#666]">{item.company}</p>
                  )}
                  <Bullets text={item.description} />
                </div>
              ))}
            </div>
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
            <div className="flex flex-wrap gap-1.5">
              {data.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-sm bg-[#f3f3f5] px-2 py-0.5 text-[11.5px] text-[#333]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </Section>
        )}

        {data.education.length > 0 && (
          <Section title="Education">
            <div className="space-y-2.5">
              {data.education.map((item, i) => (
                <div
                  key={item.id || i}
                  className="print-block flex items-baseline justify-between gap-4"
                >
                  <div>
                    <h3 className="text-[13.5px] font-semibold">
                      {item.degree}
                    </h3>
                    <p className="text-[12px] text-[#666]">
                      {item.institution}
                    </p>
                  </div>
                  <span className="shrink-0 text-[11.5px] text-[#888]">
                    {[item.startYear, item.endYear].filter(Boolean).join(" — ")}
                  </span>
                </div>
              ))}
            </div>
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

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h2 className="mb-3 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.1em]">
        {title}
        <span className="h-px flex-1 bg-[#e5e5e5]" />
      </h2>
      {children}
    </section>
  );
}
