"use client";

import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import type { Project, ProjectStatus } from "@/types/project";
import { ExternalLink, GitBranch } from "lucide-react";

const statusConfig: Record<
  ProjectStatus,
  { label: string; color: string; bg: string }
> = {
  production: { label: "PRODUCTION", color: "#3FB950", bg: "#0F2A14" },
  active: { label: "ACTIVE", color: "#58A6FF", bg: "#0D2B55" },
  experimental: { label: "EXPERIMENTAL", color: "#D29922", bg: "#2D1F00" },
  archived: { label: "ARCHIVED", color: "#484F58", bg: "#161B22" },
  paused: { label: "PAUSED", color: "#8B949E", bg: "#21262D" },
};

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const status = statusConfig[project.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative bg-[#11161D] border border-[#21262D] rounded-lg p-5 flex flex-col gap-4 hover:border-[#30363D] transition-colors"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-[#E6EDF3] mb-0.5 group-hover:text-[#58A6FF] transition-colors">
            {project.name}
          </h3>
          <span className="font-mono text-[10px] text-[#484F58] tracking-wide">
            {project.systemRole}
          </span>
        </div>
        <span
          className="shrink-0 font-mono text-[10px] px-2 py-0.5 rounded"
          style={{ color: status.color, backgroundColor: status.bg }}
        >
          {status.label}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-[#8B949E] leading-relaxed">
        {project.description}
      </p>

      {/* Challenge */}
      <div className="bg-[#161B22] rounded px-3 py-2.5 border-l-2 border-[#21262D]">
        <span className="font-mono text-[10px] text-[#484F58] tracking-widest block mb-1">
          CHALLENGE
        </span>
        <p className="text-xs text-[#8B949E] leading-relaxed">{project.challenge}</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-2">
        {project.metrics.map((metric) => (
          <div
            key={metric.label}
            className="bg-[#161B22] rounded p-2 text-center border border-[#21262D]"
          >
            <div className="font-mono text-sm font-semibold text-[#E6EDF3]">
              {metric.value}
              {metric.unit && (
                <span className="text-[10px] text-[#484F58] ml-0.5">{metric.unit}</span>
              )}
            </div>
            <div className="font-mono text-[10px] text-[#484F58] mt-0.5">{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Stack */}
      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[#21262D]">
        {project.stack.map((tech) => (
          <span
            key={tech}
            className="font-mono text-[10px] px-2 py-0.5 bg-[#161B22] border border-[#21262D] rounded text-[#8B949E]"
          >
            {tech}
          </span>
        ))}
        <div className="ml-auto flex items-center gap-2">
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#484F58] hover:text-[#8B949E] transition-colors"
              aria-label="View repository"
            >
              <GitBranch size={13} />
            </a>
          )}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#484F58] hover:text-[#8B949E] transition-colors"
              aria-label="View project"
            >
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export default function ProjectsSection() {
  return (
    <section id="projects" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[11px] text-[#484F58] tracking-widest uppercase">
            sys/projects
          </span>
        </div>
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#E6EDF3] mb-2">
              System registry
            </h2>
            <p className="text-sm text-[#8B949E]">
              Projects I&apos;ve shipped — each one a system with a defined
              role, a real challenge, and measurable outcomes.
            </p>
          </div>
          <div className="shrink-0 hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-[#484F58]">
            <span>{projects.length} systems</span>
            <span className="text-[#21262D]">/</span>
            <span className="text-[#3FB950]">
              {projects.filter((p) => p.status === "active" || p.status === "production").length} online
            </span>
          </div>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
