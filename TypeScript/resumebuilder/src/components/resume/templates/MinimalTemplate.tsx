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
 * Left-aligned, no rules, headings carried by weight and space alone.
 * The quietest of the free set.
 */
export function MinimalTemplate({ data, className }: TemplateProps) {
  if (isEmpty(data)) return <EmptyNotice />;

  const summary = toText(data.summary);
  const certifications = data.certifications.filter(Boolean);

  return (
    <Sheet className={className}>
      <div className="px-11 py-12">
        {hasHeader(data) && (
          <header className="print-block">
            {data.personalInfo.fullName && (
              <h1 className="text-[30px] font-light tracking-[-0.03em]">
                {data.personalInfo.fullName}
              </h1>
            )}
            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[12px] text-[#666]">
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
          <p className="mt-7 max-w-[62ch] whitespace-pre-line text-[13.5px] leading-[1.75] text-[#333]">
            {summary}
          </p>
        )}

        {data.experience.length > 0 && (
          <Section title="Experience">
            <div className="space-y-5">
              {data.experience.map((item, i) => (
                <div key={item.id || i} className="print-block">
                  <h3 className="text-[14px] font-semibold">
                    {item.position}
                    {item.company && (
                      <span className="font-normal text-[#666]">
                        {" "}
                        · {item.company}
                      </span>
                    )}
                  </h3>
                  <p className="mt-0.5 text-[11.5px] uppercase tracking-[0.06em] text-[#999]">
                    {dateRange(item.startDate, item.endDate, item.current)}
                  </p>
                  <Bullets text={item.description} />
                </div>
              ))}
            </div>
          </Section>
        )}

        {data.projects.length > 0 && (
          <Section title="Projects">
            <div className="space-y-5">
              {data.projects.map((item, i) => (
                <div key={item.id || i} className="print-block">
                  <h3 className="text-[14px] font-semibold">{item.title}</h3>
                  <Bullets text={item.description} />
                  <p className="mt-1.5 flex flex-wrap gap-x-4 text-[11.5px] text-[#666]">
                    {item.techStack.length > 0 && (
                      <span>{item.techStack.join(" · ")}</span>
                    )}
                    {item.githubUrl && <LinkText url={item.githubUrl} />}
                    {item.liveUrl && <LinkText url={item.liveUrl} />}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {data.skills.length > 0 && (
          <Section title="Skills">
            <p className="text-[#444]">{data.skills.join(", ")}</p>
          </Section>
        )}

        {data.education.length > 0 && (
          <Section title="Education">
            <div className="space-y-2.5">
              {data.education.map((item, i) => (
                <div key={item.id || i} className="print-block">
                  <h3 className="text-[13.5px] font-semibold">{item.degree}</h3>
                  <p className="text-[12px] text-[#666]">
                    {item.institution}
                    {(item.startYear || item.endYear) && (
                      <span className="text-[#999]">
                        {"  ·  "}
                        {[item.startYear, item.endYear]
                          .filter(Boolean)
                          .join(" — ")}
                      </span>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {certifications.length > 0 && (
          <Section title="Certifications">
            <div className="space-y-1 text-[#444]">
              {certifications.map((cert, i) => (
                <p key={i}>{cert}</p>
              ))}
            </div>
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
    <section className="mt-8">
      <h2 className="mb-3 text-[10.5px] font-semibold uppercase tracking-[0.16em] text-[#999]">
        {title}
      </h2>
      {children}
    </section>
  );
}
