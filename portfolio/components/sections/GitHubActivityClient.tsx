"use client";

import { motion } from "framer-motion";
import type { GitHubActivity } from "@/types/github";
import { GitBranch, Star, GitFork, ExternalLink } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

const langColors: Record<string, string> = {
  TypeScript: "#3178C6",
  Python: "#3572A5",
  JavaScript: "#F1E05A",
  SQL: "#e38c00",
  CSS: "#563d7c",
  Other: "#484F58",
};

export default function GitHubActivityClient({ data }: { data: GitHubActivity }) {
  const totalStars = data.repos.reduce((sum, r) => sum + r.stargazers_count, 0);
  const totalForks = data.repos.reduce((sum, r) => sum + r.forks_count, 0);

  return (
    <section id="github" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[11px] text-[#484F58] tracking-widest uppercase">
            sys/github
          </span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-[#E6EDF3] mb-2">
              GitHub activity
            </h2>
            <p className="text-sm text-[#8B949E]">
              Recent repositories from{" "}
              <a
                href="https://github.com/dvdbdev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#58A6FF] hover:underline"
              >
                dvdbdev
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-center">
              <div className="font-mono text-sm font-semibold text-[#E6EDF3]">{data.repos.length}</div>
              <div className="font-mono text-[10px] text-[#484F58]">repos</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-sm font-semibold text-[#E6EDF3]">{totalStars}</div>
              <div className="font-mono text-[10px] text-[#484F58]">stars</div>
            </div>
            <div className="text-center">
              <div className="font-mono text-sm font-semibold text-[#E6EDF3]">{totalForks}</div>
              <div className="font-mono text-[10px] text-[#484F58]">forks</div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {data.repos.map((repo, i) => (
          <motion.a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
            className="group bg-[#11161D] border border-[#21262D] rounded-lg p-4 hover:border-[#30363D] transition-colors block"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <GitBranch size={13} className="text-[#484F58]" />
                <span className="text-sm font-medium text-[#58A6FF] group-hover:underline">
                  {repo.name}
                </span>
              </div>
              <ExternalLink size={12} className="text-[#484F58] shrink-0 mt-0.5" />
            </div>
            <p className="text-xs text-[#8B949E] leading-relaxed mb-3 line-clamp-2">
              {repo.description ?? "No description"}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {repo.language && (
                  <div className="flex items-center gap-1.5">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: langColors[repo.language] ?? langColors.Other }}
                    />
                    <span className="font-mono text-[11px] text-[#8B949E]">{repo.language}</span>
                  </div>
                )}
                <div className="flex items-center gap-1 text-[#484F58]">
                  <Star size={11} />
                  <span className="font-mono text-[11px]">{repo.stargazers_count}</span>
                </div>
                <div className="flex items-center gap-1 text-[#484F58]">
                  <GitFork size={11} />
                  <span className="font-mono text-[11px]">{repo.forks_count}</span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-[#484F58]">
                {formatRelativeTime(repo.updated_at)}
              </span>
            </div>
            {repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2.5">
                {repo.topics.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="font-mono text-[10px] px-1.5 py-px bg-[#0D2B55] border border-[#1F6FEB]/30 rounded text-[#58A6FF]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </motion.a>
        ))}
      </div>

      {/* Language breakdown */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="bg-[#11161D] border border-[#21262D] rounded-lg p-4"
      >
        <div className="font-mono text-[11px] text-[#484F58] tracking-widest mb-4">
          LANGUAGE DISTRIBUTION
        </div>
        <div className="space-y-2.5">
          {Object.entries(data.languages).map(([lang, pct]) => (
            <div key={lang} className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 w-24 shrink-0">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: langColors[lang] ?? langColors.Other }}
                />
                <span className="font-mono text-xs text-[#8B949E]">{lang}</span>
              </div>
              <div className="flex-1 h-1.5 bg-[#21262D] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ backgroundColor: langColors[lang] ?? langColors.Other }}
                />
              </div>
              <span className="font-mono text-[11px] text-[#484F58] w-8 text-right">{pct}%</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
