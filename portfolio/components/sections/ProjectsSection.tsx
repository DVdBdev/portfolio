"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import type { Project, ProjectStatus } from "@/types/project";
import { ExternalLink, GitBranch, ChevronDown } from "lucide-react";

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

// Runs the typewriter on every `open` → true transition
function useTypewriter(text: string, active: boolean, speed = 28) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  const raf = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!active) {
      setDisplayed("");
      setDone(false);
      return;
    }
    let i = 0;
    function tick() {
      i++;
      setDisplayed(text.slice(0, i));
      if (i < text.length) {
        raf.current = setTimeout(tick, speed);
      } else {
        setDone(true);
      }
    }
    raf.current = setTimeout(tick, speed);
    return () => { if (raf.current) clearTimeout(raf.current); };
  }, [active, text, speed]);

  return { displayed, done };
}

function TerminalPanel({ project }: { project: Project }) {
  const cmd = `project.getDetails("${project.id}")`;
  const { displayed, done } = useTypewriter(cmd, true, 26);

  // Split the displayed text into the plain prefix and the coloured id portion
  const quoteStart = cmd.indexOf('"');
  const quoteEnd = cmd.lastIndexOf('"');
  const before = displayed.slice(0, Math.min(displayed.length, quoteStart));
  const inside = displayed.length > quoteStart
    ? displayed.slice(quoteStart, Math.min(displayed.length, quoteEnd + 1))
    : "";
  const after = displayed.length > quoteEnd + 1
    ? displayed.slice(quoteEnd + 1)
    : "";

  return (
    <div className="border-t border-[#21262D] bg-[#0D1117] px-5 py-4 font-mono text-xs">
      {/* Typed command line */}
      <div className="flex items-start gap-2 mb-3">
        <span className="text-[#3FB950] shrink-0 mt-px">❯</span>
        <span className="text-[#484F58] break-all">
          {before}
          <span className="text-[#D29922]">{inside}</span>
          {after}
          {/* blinking cursor while typing */}
          {!done && (
            <motion.span
              animate={{ opacity: [1, 1, 0, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, times: [0, 0.45, 0.5, 1], ease: "linear" }}
              className="inline-block w-[6px] h-[11px] bg-[#3FB950] ml-px align-middle"
            />
          )}
        </span>
      </div>

      {/* Output — fades in once typing is done */}
      <AnimatePresence>
        {done && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {/* challenge */}
            <div className="mb-3">
              <span className="text-[#484F58]">challenge</span>
              <span className="text-[#21262D] mx-1.5">·</span>
              <span className="text-[#8B949E] leading-relaxed">{project.challenge}</span>
            </div>

            {/* metrics */}
            <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1">
              {project.metrics.map((m) => (
                <div key={m.label} className="flex gap-1.5">
                  <span className="text-[#484F58]">{m.label}</span>
                  <span className="text-[#21262D]">·</span>
                  <span className="text-[#3FB950] font-semibold">
                    {m.value}
                    {m.unit && (
                      <span className="text-[#484F58] font-normal ml-0.5">{m.unit}</span>
                    )}
                  </span>
                </div>
              ))}
            </div>

            {/* links */}
            <div className="flex items-center gap-3 pt-2 border-t border-[#21262D]">
              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-[#484F58] hover:text-[#58A6FF] transition-colors"
                >
                  <GitBranch size={11} />
                  <span>repo</span>
                </a>
              )}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center gap-1.5 text-[#484F58] hover:text-[#58A6FF] transition-colors"
                >
                  <ExternalLink size={11} />
                  <span>live</span>
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const status = statusConfig[project.status];

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group relative bg-[#11161D] border border-[#21262D] rounded-lg overflow-hidden hover:border-[#30363D] transition-colors flex flex-col"
    >
      {/* ── Always-visible card body — fixed height so grid is uniform ── */}
      <div className="p-5 flex flex-col gap-4 h-[280px] overflow-hidden">
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

        {/* Stack + links row */}
        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[#21262D] mt-auto">
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
      </div>

      {/* ── Terminal toggle button ── */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 w-full px-5 py-2 border-t border-[#21262D] bg-[#0D1117] text-[#484F58] hover:text-[#8B949E] hover:bg-[#11161D] transition-colors font-mono text-[10px]"
      >
        <span className="text-[#3FB950]">❯</span>
        <span>{open ? "close" : "project.getDetails()"}</span>
        <ChevronDown
          size={11}
          className="ml-auto transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {/* ── Terminal detail panel ── */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="detail"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <TerminalPanel project={project} />
          </motion.div>
        )}
      </AnimatePresence>
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

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
