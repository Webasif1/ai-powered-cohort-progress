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

/** Centred header, single column, rule under each section heading. */
export function ClassicTemplate({ data, className }: TemplateProps) {
  if (isEmpty(data)) return <EmptyNotice />;

  const summary = toText(data.summary);
  const certifications = data.certifications.filter(Boolean);

  return (
    <Sheet className={className}>
      <div className="px-10 py-11">
        {hasHeader(data) && (
          <header className="print-block border-b border-[#e5e5e5] pb-4 text-center">
            {data.personalInfo.fullName && (
              <h1 className="text-[26px] font-semibold tracking-[-0.02em]">
                {data.personalInfo.fullName}
              </h1>
            )}
            {contactList(data).length > 0 && (
              <p className="mt-2 text-[12.5px] text-[#444]">
                {contactList(data).join("  ·  ")}
              </p>
            )}
            {linkList(data).length > 0 && (
              <p className="mt-1.5 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[12px]">
                {linkList(data).map((link) => (
                  <LinkText key={link} url={link} />
                ))}
              </p>
            )}
          </header>
        )}

        {summary && (
          <Section title="Summary">
            <p className="whitespace-pre-line text-[#333]">{summary}</p>
          </Section>
        )}

        {data.experience.length > 0 && (
          <Section title="Experience">
            <div className="space-y-4">
              {data.experience.map((item, i) => (
                <div key={item.id || i} className="print-block">
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="text-[14px] font-semibold">
                        {item.position}
                      </h3>
                      <p className="text-[12.5px] text-[#666]">
                        {item.company}
                      </p>
                    </div>
                    <p className="shrink-0 whitespace-nowrap text-[11.5px] text-[#888]">
                      {dateRange(item.startDate, item.endDate, item.current)}
                    </p>
                  </div>
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
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className="text-[14px] font-semibold">{item.title}</h3>
                    <span className="flex shrink-0 gap-3 text-[11.5px]">
                      {item.githubUrl && <LinkText url={item.githubUrl} />}
                      {item.liveUrl && <LinkText url={item.liveUrl} />}
                    </span>
                  </div>
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

        {data.education.length > 0 && (
          <Section title="Education">
            <div className="space-y-3">
              {data.education.map((item, i) => (
                <div
                  key={item.id || i}
                  className="print-block flex items-baseline justify-between gap-4"
                >
                  <div>
                    <h3 className="text-[14px] font-semibold">{item.degree}</h3>
                    <p className="text-[12.5px] text-[#666]">
                      {item.institution}
                    </p>
                  </div>
                  <p className="shrink-0 text-[11.5px] text-[#888]">
                    {[item.startYear, item.endYear].filter(Boolean).join(" — ")}
                  </p>
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
      <h2 className="mb-2.5 border-b border-[#e5e5e5] pb-1.5 text-[11px] font-bold uppercase tracking-[0.09em]">
        {title}
      </h2>
      {children}
    </section>
  );
}
