import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "self-service-ai",
    name: "BASF Self-Service AI App",
    description:
      "A self-service app built during my BASF internship. Lets different BASF installations configure their own AI solutions by selecting data sources, defining preprocessing steps, and choosing modular models like KNN or regression to predict values.",
    systemRole: "Internship Project — BASF",
    stack: ["Python", "Dash", "Databricks", "Azure", "SQL", "Spark"],
    challenge:
      "Building software that fits real workflows used by non-developers. The hard part was designing configuration flows that felt intuitive, not just technically correct.",
    status: "production",
    metrics: [],
  },
  {
    id: "calculation-builder",
    name: "No-Code Calculation Builder",
    description:
      "A no-code tool that lets users define mathematical calculations on top of sensor data without writing code. Behind the scenes, the app generates Spark logic to compute the resulting time series.",
    systemRole: "Internship Project — BASF",
    stack: ["Python", "Dash", "Spark", "SQL"],
    challenge:
      "Translating a user-defined calculation into executable Spark code while keeping the interface understandable for people who don't write code.",
    status: "active",
    metrics: [],
  },
  {
    id: "testing-framework",
    name: "Python Testing Framework",
    description:
      "A testing framework that automatically discovers and runs Pytest files, then generates a Markdown report with optional coverage output. Inspired by a Cucumber/Gherkin approach that BASF wanted for agent skill validation.",
    systemRole: "Internship Project — BASF",
    stack: ["Python", "Pytest", "CI/CD"],
    challenge:
      "Making test output actually useful. A good report should help someone quickly see what passed, what failed, and where to look next — not just a wall of terminal output.",
    status: "active",
    metrics: [],
  },
  {
    id: "journey-blog",
    name: "Internship Blog",
    description:
      "A blog platform I built to document my BASF internship week by week. 15 weeks of posts about what I worked on, what I learned, and how the experience evolved.",
    systemRole: "Personal Project",
    stack: ["Next.js", "TypeScript", "Supabase", "SQL"],
    challenge:
      "Building a real publishing workflow — routing, database setup, auth, and a clean reading experience — while also actually using it consistently throughout the internship.",
    status: "production",
    metrics: [],
    link: "https://internship-blog-app.onrender.com",
  },
  {
    id: "portfolio",
    name: "Portfolio - Telemetry Style",
    description:
      "This portfolio. The design is inspired by telemetry dashboards: project cards, activity logs, a stack graph, and a darker technical interface. The goal is to make it feel like a developer dashboard rather than a standard personal site.",
    systemRole: "Personal Project",
    stack: ["Next.js", "TypeScript"],
    challenge:
      "Presenting myself honestly as a junior developer without overclaiming. The portfolio should show what I can build, what I am learning, and what kind of work I want to do next.",
    status: "active",
    metrics: [],
    repo: "https://github.com/dvdbdev/portfolio",
  },
];
