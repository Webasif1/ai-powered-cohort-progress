import type { ResumeData } from "@/types/resume.types";

/**
 * Sample content for the template gallery.
 *
 * Deliberately a fictional person with a fictional employer, so nothing on
 * the page can be mistaken for a real candidate's resume or a real company's
 * endorsement.
 */
export const SAMPLE_RESUME: ResumeData = {
  _id: "sample",
  title: "Sample Resume",
  // Each gallery card overrides this by rendering its own template
  // component directly; the value only matters if something renders the
  // sample through the registry.
  template: "classic",
  personalInfo: {
    fullName: "Amara Okafor",
    email: "amara.okafor@example.com",
    phone: "+1 555 0142",
    location: "Austin, TX",
    github: "github.com/example",
    linkedin: "linkedin.com/in/example",
    portfolio: "amara.example.com",
  },
  summary:
    "Frontend engineer with six years building design systems and data-heavy interfaces for B2B products. Led the component library that three product teams now ship on, cutting new-feature build time by roughly a third. Happiest where accessibility, performance and design detail overlap.",
  experience: [
    {
      id: "exp-1",
      company: "Northwind Analytics",
      position: "Senior Frontend Engineer",
      startDate: "2022-03",
      endDate: "",
      current: true,
      description:
        "Own the shared component library used by three product teams; adoption removed about 12,000 lines of duplicated UI code.\nCut median dashboard load from 4.1s to 1.3s by moving chart rendering off the main thread and deferring below-fold queries.\nIntroduced automated accessibility checks in CI, taking the audit backlog from 78 open issues to 6.",
    },
    {
      id: "exp-2",
      company: "Harborline",
      position: "Frontend Engineer",
      startDate: "2019-08",
      endDate: "2022-02",
      current: false,
      description:
        "Rebuilt the customer onboarding flow, lifting completion from 54% to 71% over two quarters.\nMigrated a four-year-old Angular app to React incrementally, with no feature freeze and no regression in uptime.\nMentored two junior engineers, both promoted within eighteen months.",
    },
    {
      id: "exp-3",
      company: "Studio Meridian",
      position: "Junior Developer",
      startDate: "2018-06",
      endDate: "2019-07",
      current: false,
      description:
        "Built responsive marketing sites for eleven clients on a shared internal framework.\nAutomated the image pipeline, removing roughly six hours of manual work per project.",
    },
  ],
  projects: [
    {
      id: "proj-1",
      title: "Kettle",
      description:
        "Open-source charting library focused on accessible defaults — every chart ships with a keyboard-navigable data table fallback. Used by roughly 400 projects.",
      githubUrl: "github.com/example/kettle",
      liveUrl: "kettle.example.com",
      techStack: ["TypeScript", "D3", "React", "Vitest"],
    },
    {
      id: "proj-2",
      title: "Signal Desk",
      description:
        "Realtime incident dashboard built for a volunteer emergency response network. Handles 2,000 concurrent viewers on a single small instance.",
      githubUrl: "github.com/example/signal-desk",
      liveUrl: "",
      techStack: ["Next.js", "WebSockets", "Postgres"],
    },
  ],
  skills: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "GraphQL",
    "Testing Library",
    "Playwright",
    "Design systems",
    "Web accessibility",
    "Performance profiling",
    "Postgres",
    "CI/CD",
  ],
  education: [
    {
      id: "edu-1",
      degree: "BSc Computer Science",
      institution: "University of Texas at Austin",
      startYear: "2014",
      endYear: "2018",
    },
  ],
  certifications: [
    "AWS Certified Developer — Associate (2024)",
    "IAAP Web Accessibility Specialist (2023)",
  ],
};
