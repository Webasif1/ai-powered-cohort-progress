type Props = {
  resume: any;
};

export default function ResumePreview({ resume }: Props) {
  return (
    <div className="h-full bg-white text-black">
      {/* Header */}
      <h1 className="text-3xl font-bold">
        {resume.personalInfo.fullName || "Your Name"}
      </h1>

      <p className="mt-1">
        {resume.personalInfo.profile || "Your Role"}
      </p>

      <div className="mt-4 text-sm space-y-1">
        <p>{resume.personalInfo.email}</p>
        <p>{resume.personalInfo.location}</p>
        <p>{resume.personalInfo.github}</p>
        <p>{resume.personalInfo.linkedin}</p>
      </div>

      {/* Summary */}
      <hr className="my-5" />

      <h2 className="font-bold text-lg">Summary</h2>
      <p>{resume.summery || "Summary appears here..."}</p>

      {/* Skills */}
      {resume.skills?.length > 0 && (
        <>
          <hr className="my-5" />
          <h2 className="font-bold text-lg">Skills</h2>

          <div className="flex flex-wrap gap-2 mt-3">
            {resume.skills.map((skill: string, index: number) => (
              <span
                key={index}
                className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </>
      )}

      {/* Experience */}
      {resume.workExperience?.length > 0 && (
        <>
          <hr className="my-5" />
          <h2 className="font-bold text-lg">Experience</h2>

          {resume.workExperience.map((exp: any, index: number) => (
            <div key={index} className="mt-4">
              <h3 className="font-semibold">{exp.position}</h3>
              <p className="text-sm text-gray-600">
                {exp.company} • {exp.statDate}
              </p>
              <p className="text-sm mt-2">{exp.description}</p>
            </div>
          ))}
        </>
      )}

      {/* Projects */}
      {resume.projects?.length > 0 && (
        <>
          <hr className="my-5" />
          <h2 className="font-bold text-lg">Projects</h2>

          {resume.projects.map((project: any, index: number) => (
            <div key={index} className="mt-4">
              <h3 className="font-semibold">{project.title}</h3>
              <p className="text-sm">{project.description}</p>
              <p className="text-xs text-orange-500 mt-1">
                {project.githubUrl}
              </p>
              <p className="text-xs text-orange-500">
                {project.liveUrl}
              </p>
            </div>
          ))}
        </>
      )}

      {/* Education */}
      {resume.education?.length > 0 && (
        <>
          <hr className="my-5" />
          <h2 className="font-bold text-lg">Education</h2>

          {resume.education.map((edu: any, index: number) => (
            <div key={index} className="mt-4">
              <h3 className="font-semibold">{edu.degree}</h3>
              <p>{edu.institute}</p>
              <p className="text-sm text-gray-500">
                {edu.startDate} - {edu.endDate}
              </p>
            </div>
          ))}
        </>
      )}

      {/* Certifications */}
      {resume.certifications?.length > 0 && (
        <>
          <hr className="my-5" />
          <h2 className="font-bold text-lg">Certifications</h2>

          <ul className="list-disc ml-5 mt-2">
            {resume.certifications.map(
              (cert: string, index: number) => (
                <li key={index}>{cert}</li>
              )
            )}
          </ul>
        </>
      )}
    </div>
  );
}
