import { toText } from "@/lib/aiText";
import {
  Bullets,
  EmptyNotice,
  Sheet,
  cleanUrl,
  dateRange,
  hasHeader,
  isEmpty,
  linkList,
  type TemplateProps,
} from "./shared";

/**
 * Two column: contact, skills, education and certifications in a tinted
 * sidebar; history in the main column.
 *
 * Note the ATS caveat surfaced in the gallery — some older parsers read a
 * two-column page in visual order and interleave the columns. It is the
 * riskiest layout here, which is why the single-column ones are the free
 * default rather than this.
 */
export function SidebarTemplate({ data, className }: TemplateProps) {
  if (isEmpty(data)) return <EmptyNotice />;

  const summary = toText(data.summary);
  const certifications = data.certifications.filter(Boolean);

  return (
    <Sheet className={className}>
      <div className="grid grid-cols-[210px_minmax(0,1fr)]">
        {/* Sidebar */}
        <aside className="bg-[#f5f5f7] px-6 py-9">
          {hasHeader(data) && data.personalInfo.fullName && (
            <h1 className="text-[19px] font-semibold leading-tight tracking-[-0.02em]">
              {data.personalInfo.fullName}
            </h1>
          )}

          <SideSection title="Contact">
            <ul className="space-y-1 break-words text-[11.5px] text-[#555]">
              {data.personalInfo.email && <li>{data.personalInfo.email}</li>}
              {data.personalInfo.phone && <li>{data.personalInfo.phone}</li>}
              {data.personalInfo.location && (
                <li>{data.personalInfo.location}</li>
              )}
              {linkList(data).map((link) => (
                <li key={link}>{cleanUrl(link)}</li>
              ))}
            </ul>
          </SideSection>

          {data.skills.length > 0 && (
            <SideSection title="Skills">
              <ul className="space-y-1 text-[11.5px] text-[#444]">
                {data.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </SideSection>
          )}

          {data.education.length > 0 && (
            <SideSection title="Education">
              <div className="space-y-2.5">
                {data.education.map((item, i) => (
                  <div key={item.id || i}>
                    <p className="text-[12px] font-semibold leading-snug">
                      {item.degree}
                    </p>
                    <p className="text-[11px] text-[#666]">
                      {item.institution}
                    </p>
                    <p className="text-[11px] text-[#999]">
                      {[item.startYear, item.endYear]
                        .filter(Boolean)
                        .join(" — ")}
                    </p>
                  </div>
                ))}
              </div>
            </SideSection>
          )}

          {certifications.length > 0 && (
            <SideSection title="Certifications">
              <ul className="space-y-1.5 text-[11px] text-[#555]">
                {certifications.map((cert, i) => (
                  <li key={i}>{cert}</li>
                ))}
              </ul>
            </SideSection>
          )}
        </aside>

        {/* Main column */}
        <div className="px-8 py-9">
          {summary && (
            <section className="print-block">
              <SectionTitle>Profile</SectionTitle>
              <p className="whitespace-pre-line text-[#333]">{summary}</p>
            </section>
          )}

          {data.experience.length > 0 && (
            <section className="mt-6">
              <SectionTitle>Experience</SectionTitle>
              <div className="space-y-4">
                {data.experience.map((item, i) => (
                  <div key={item.id || i} className="print-block">
                    <h3 className="text-[13.5px] font-semibold">
                      {item.position}
                    </h3>
                    <p className="text-[12px] text-[#666]">
                      {item.company}
                      {item.company && " · "}
                      <span className="text-[#999]">
                        {dateRange(item.startDate, item.endDate, item.current)}
                      </span>
                    </p>
                    <Bullets text={item.description} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.projects.length > 0 && (
            <section className="mt-6">
              <SectionTitle>Projects</SectionTitle>
              <div className="space-y-4">
                {data.projects.map((item, i) => (
                  <div key={item.id || i} className="print-block">
                    <h3 className="text-[13.5px] font-semibold">
                      {item.title}
                    </h3>
                    <Bullets text={item.description} />
                    {item.techStack.length > 0 && (
                      <p className="mt-1.5 text-[11.5px] text-[#666]">
                        {item.techStack.join(" · ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </Sheet>
  );
}

function SideSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6">
      <h2 className="mb-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#888]">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#111]">
      {children}
    </h2>
  );
}
