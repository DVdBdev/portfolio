export interface TimelineItem {
  id: string;
  date: string;
  title: string;
  description: string;
  tags?: string[];
  type: "work" | "study" | "project" | "milestone";
}

export const timeline: TimelineItem[] = [
  {
    id: "campus19",
    date: "2023",
    title: "Started at Campus 19",
    description:
      "Started programming seriously at Campus 19. Learned by solving practical coding challenges, working mainly with C and C++. Completed 3 rings and built a stronger foundation in problem solving, debugging, and thinking like a developer.",
    tags: ["Campus 19", "C", "C++", "Problem solving"],
    type: "study",
  },
  {
    id: "ap-hogeschool",
    date: "Sep 2024",
    title: "Started Graduaat Programmeren at AP",
    description:
      "Started the Graduaat Programmeren at AP Hogeschool. Continued building my foundation in software development, web development, databases, and project-based work.",
    tags: ["AP Hogeschool", "Programming", "Web development", "Databases"],
    type: "study",
  },
  {
    id: "basf-start",
    date: "Sep 2025",
    title: "Internship at BASF",
    description:
      "Started my internship at BASF, working on practical software and data-related tooling in a professional environment. Got more exposure to Python, Dash, internal tools, dashboards, and how software is used inside a larger company.",
    tags: ["Internship", "BASF", "Python", "Dash", "Data tooling"],
    type: "work",
  },
  {
    id: "basf-end",
    date: "May 2026",
    title: "Completed BASF internship",
    description:
      "Completed my BASF internship after working on self-service tooling, testing automation, dashboard interfaces, and data/AI workflow configuration. The experience made me more interested in data engineering, ML tooling, and software that supports real workflows.",
    tags: ["BASF", "Internship", "Data engineering", "ML tooling"],
    type: "milestone",
  },
  {
    id: "graduation",
    date: "Oct 2026",
    title: "Expected graduation",
    description:
      "Expected to graduate from the Graduaat Programmeren at AP Hogeschool in October 2026. Until then, I am taking some time to enjoy the break, build personal projects, keep learning, and prepare for a junior developer role.",
    tags: ["AP Hogeschool", "Graduation", "Junior developer"],
    type: "milestone",
  },
  {
    id: "current-focus",
    date: "Now",
    title: "Growing toward data & ML systems",
    description:
      "Currently focused on becoming stronger as a junior developer, with a growing interest in data engineering, ML systems, internal tools, and clean full-stack applications.",
    tags: ["Data engineering", "ML systems", "Full-stack", "Internal tools"],
    type: "milestone",
  },
];


