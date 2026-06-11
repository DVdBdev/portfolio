"use client";

import { motion } from "framer-motion";
import { timeline } from "@/data/timeline";
import type { TimelineItem } from "@/data/timeline";

const typeConfig: Record<TimelineItem["type"], { color: string; bg: string }> = {
  work: { color: "#D29922", bg: "#2D1F00" },
  study: { color: "#58A6FF", bg: "#0D2B55" },
  project: { color: "#39C5CF", bg: "#0B2F35" },
  milestone: { color: "#3FB950", bg: "#0F2A14" },
};

export default function TimelineSection() {
  return (
    <section id="timeline" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[11px] text-[#484F58] tracking-widest uppercase">
            sys/timeline
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-[#E6EDF3] mb-2">
          Engineering journey
        </h2>
        <p className="text-sm text-[#8B949E]">
          How I got here and where I&apos;m headed.
        </p>
      </motion.div>

      <div className="relative">
        {/* Vertical line — draws itself downward on scroll-in */}
        <motion.div
          className="absolute left-[11px] sm:left-[19px] top-0 bottom-0 w-px bg-[#21262D] origin-top"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
        />

        <div className="flex flex-col gap-0">
          {timeline.map((item, i) => {
            const colors = typeConfig[item.type];
            const isLast = i === timeline.length - 1;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-30px" }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="relative flex gap-5 sm:gap-8 pb-8 last:pb-0"
              >
                {/* Dot */}
                <div className="relative z-10 shrink-0 mt-1">
                  <div
                    className="w-[23px] h-[23px] sm:w-[39px] sm:h-[39px] rounded-full flex items-center justify-center border"
                    style={{
                      borderColor: colors.color + "40",
                      backgroundColor: colors.bg,
                    }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: colors.color }}
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 pb-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="font-mono text-xs text-[#484F58]">{item.date}</span>
                    <span
                      className="font-mono text-[10px] px-1.5 py-0.5 rounded"
                      style={{ color: colors.color, backgroundColor: colors.bg }}
                    >
                      {item.type}
                    </span>
                  </div>
                  <h3
                    className={`font-medium mb-2 ${isLast ? "text-[#58A6FF]" : "text-[#E6EDF3]"}`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#8B949E] leading-relaxed mb-3">
                    {item.description}
                  </p>
                  {item.tags && (
                    <div className="flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-[10px] px-2 py-0.5 bg-[#161B22] border border-[#21262D] rounded text-[#8B949E]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
