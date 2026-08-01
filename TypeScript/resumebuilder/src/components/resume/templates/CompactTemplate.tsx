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
 * Tighter type and spacing, and section labels sit in a left gutter rather
 * than above the content. Built to keep a long history on one page.
 */
export function CompactTemplate({ data, className }: TemplateProps) {
  if (isEmpty(data)) return <EmptyNotice />;

  const summary = toText(data.summary);
  const certifications = data.certifications.filter(Boolean);

  return (
    <Sheet className={className}>
      <div className="px-10 py-9 text-[12.5px] leading-[1.55]">
        {hasHeader(data) && (
          <header className="print-block flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-[#111] pb-3">
            {data.personalInfo.fullName && (
              <h1 className="text-[22px] font-bold tracking-[-0.02em]">
                {data.personalInfo.fullName}
              </h1>
            )}
            <div className="flex flex-wrap gap-x-3 text-[11px] text-[#555]">
              {[...contactList(data)].map((item) => (
                <span key={item}>{item}</span>
              ))}
              {linkList(data).map((link) => (
                <LinkText key={link} url={link} />
              ))}
            </div>
          </header>
        )}

        {summary && (
          <Row label="Profile">
            <p className="whitespace-pre-line text-[#333]">{summary}</p>
          </Row>
        )}

        {data.experience.length > 0 && (
          <Row label="Experience">
            <div className="space-y-3">
              {data.experience.map((item, i) => (
                <div key={item.id || i} className="print-block">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="text-[13px] font-semibold">
                      {item.position}
                      {item.company && (
                        <span className="font-normal text-[#666]">
                          , {item.company}
                        </span>
                      )}
                    </h3>
                    <span className="shrink-0 whitespace-nowrap text-[11px] text-[#888]">
                      {dateRange(item.startDate, item.endDate, item.current)}
                    </span>
                  </div>
                  <Bullets text={item.description} />
                </div>
              ))}
            </div>
          </Row>
        )}

        {data.projects.length > 0 && (
          <Row label="Projects">
            <div className="space-y-3">
              {data.projects.map((item, i) => (
                <div key={item.id || i} className="print-block">
                  <h3 className="text-[13px] font-semibold">
                    {item.title}
                    {item.techStack.length > 0 && (
                      <span className="font-normal text-[#666]">
                        {" — "}
                        {item.techStack.join(", ")}
                      </span>
                    )}
                  </h3>
                  <Bullets text={item.description} />
                </div>
              ))}
            </div>
          </Row>
        )}

        {data.skills.length > 0 && (
          <Row label="Skills">
            <p className="text-[#333]">{data.skills.join(" · ")}</p>
          </Row>
        )}

        {data.education.length > 0 && (
          <Row label="Education">
            <div className="space-y-1.5">
              {data.education.map((item, i) => (
                <div
                  key={item.id || i}
                  className="print-block flex items-baseline justify-between gap-3"
                >
                  <span>
                    <span className="font-semibold">{item.degree}</span>
                    {item.institution && (
                      <span className="text-[#666]">, {item.institution}</span>
                    )}
                  </span>
                  <span className="shrink-0 text-[11px] text-[#888]">
                    {[item.startYear, item.endYear].filter(Boolean).join(" — ")}
                  </span>
                </div>
              ))}
            </div>
          </Row>
        )}

        {certifications.length > 0 && (
          <Row label="Certifications">
            <p className="text-[#444]">{certifications.join(" · ")}</p>
          </Row>
        )}
      </div>
    </Sheet>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-4 grid grid-cols-[86px_minmax(0,1fr)] gap-4 border-t border-[#eee] pt-3">
      <h2 className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#888]">
        {label}
      </h2>
      <div>{children}</div>
    </section>
  );
}
