"use client";

import { motion } from "framer-motion";

const statusItems = [
  { label: "STATUS", value: "ONLINE", color: "#3FB950", pulse: true },
  { label: "FOCUS", value: "ML Systems / Data Engineering", color: "#58A6FF" },
  { label: "LOCATION", value: "Belgium", color: "#8B949E" },
  { label: "BUILD", value: "v2026.05", color: "#8B949E", mono: true },
  { label: "GITHUB", value: "dvdbdev", color: "#58A6FF", mono: true, link: "https://github.com/dvdbdev" },
];

export default function StatusBar() {
  return (
    <div className="w-full border-b border-[#21262D] bg-[#11161D]/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
          {statusItems.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              className="flex items-center gap-1.5"
            >
              <span className="font-mono text-[10px] text-[#484F58] tracking-widest">
                {item.label}
              </span>
              <span className="text-[#21262D]">·</span>
              {item.pulse && (
                <span className="relative flex h-1.5 w-1.5">
                  <span
                    className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                    style={{ backgroundColor: item.color }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-1.5 w-1.5"
                    style={{ backgroundColor: item.color }}
                  />
                </span>
              )}
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-[11px] hover:text-[#58A6FF] transition-colors ${item.mono ? "font-mono" : ""}`}
                  style={{ color: item.color }}
                >
                  {item.value}
                </a>
              ) : (
                <span
                  className={`text-[11px] ${item.mono ? "font-mono" : ""}`}
                  style={{ color: item.color }}
                >
                  {item.value}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
