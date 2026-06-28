"use client";

type Props = {
  resume: any;
};

export default function ResumePreview({ resume }: Props) {
  return (
    <div className="w-full min-h-full bg-white text-black p-8 space-y-6">
      {/* Header */}
      <div className="text-center border-b pb-5">
        <h1 className="text-4xl font-bold text-orange-500">
          {resume.title || "Resume Title"}
        </h1>

        <h2 className="text-2xl font-semibold mt-3">
          {resume.personalInfo?.fullName || "Your Name"}
        </h2>

        <p className="text-gray-600 mt-2">
          {resume.personalInfo?.profile || "Your Role"}
        </p>

        <div className="text-sm text-gray-500 mt-3 space-y-1">
          <p>{resume.personalInfo?.email}</p>
          <p>{resume.personalInfo?.location}</p>
          <p>{resume.personalInfo?.github}</p>
          <p>{resume.personalInfo?.linkedin}</p>
          <p>{resume.personalInfo?.portfolio}</p>
        </div>
      </div>

      {/* Summary */}
      {resume.summery && (
        <section>
          <h3 className="text-lg font-bold border-b pb-1 mb-2 text-orange-500">
            Summary
          </h3>
          <p className="text-sm leading-7">{resume.summery}</p>
        </section>
      )}

      {/* Skills */}
      {resume.skills?.length > 0 && (
        <section>
          <h3 className="text-lg font-bold border-b pb-1 mb-3 text-orange-500">
            Skills
          </h3>

          <div className="flex flex-wrap gap-2">
            {resume.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {resume.workExperience?.length > 0 && (
        <section>
          <h3 className="text-lg font-bold border-b pb-1 mb-3 text-orange-500">
            Experience
          </h3>

          <div className="space-y-4">
            {resume.workExperience.map((exp: any, index: number) => (
              <div key={index}>
                <h4 className="font-semibold">
                  {exp.position || "Position"}
                </h4>

                <p className="text-sm text-gray-500">
                  {exp.company || "Company"} • {exp.statDate || "Date"}
                </p>

                <p className="mt-2 text-sm leading-6">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {resume.projects?.length > 0 && (
        <section>
          <h3 className="text-lg font-bold border-b pb-1 mb-3 text-orange-500">
            Projects
          </h3>

          <div className="space-y-4">
            {resume.projects.map((project: any, index: number) => (
              <div key={index}>
                <h4 className="font-semibold">
                  {project.title || "Project"}
                </h4>

                <p className="text-sm mt-2">
                  {project.description}
                </p>

                <div className="text-sm text-gray-500 mt-2">
                  <p>{project.githubUrl}</p>
                  <p>{project.liveUrl}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {project.techStack?.map(
                    (tech: string, i: number) => (
                      <span
                        key={i}
                        className="bg-orange-100 text-orange-600 px-2 py-1 rounded text-xs"
                      >
                        {tech}
                      </span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {resume.education?.length > 0 && (
        <section>
          <h3 className="text-lg font-bold border-b pb-1 mb-3 text-orange-500">
            Education
          </h3>

          <div className="space-y-3">
            {resume.education.map((edu: any, index: number) => (
              <div key={index}>
                <h4 className="font-semibold">
                  {edu.degree || "Degree"}
                </h4>

                <p className="text-sm text-gray-500">
                  {edu.institute} • {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {resume.certifications?.length > 0 && (
        <section>
          <h3 className="text-lg font-bold border-b pb-1 mb-3 text-orange-500">
            Certifications
          </h3>

          <ul className="list-disc ml-5 space-y-2 text-sm">
            {resume.certifications.map(
              (cert: string, index: number) => (
                <li key={index}>{cert}</li>
              )
            )}
          </ul>
        </section>
      )}
    </div>
  );
}
