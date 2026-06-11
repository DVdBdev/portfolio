"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { telemetryEvents } from "@/data/telemetry";
import type { TelemetryEvent } from "@/data/telemetry";
import { formatRelativeTime } from "@/lib/utils";

const levelConfig: Record<
  TelemetryEvent["level"],
  { label: string; color: string; bg: string }
> = {
  info: { label: "INFO", color: "#58A6FF", bg: "#0D2B55" },
  debug: { label: "DEBUG", color: "#8B949E", bg: "#21262D" },
  success: { label: "OK", color: "#3FB950", bg: "#0F2A14" },
  warn: { label: "WARN", color: "#D29922", bg: "#2D1F00" },
};

function FeedEntry({ event }: { event: TelemetryEvent }) {
  const level = levelConfig[event.level];
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="flex items-start gap-3 py-2.5 border-b border-[#21262D] last:border-0 group hover:bg-[#161B22] px-3 -mx-3 rounded transition-colors"
    >
      {/* Level badge */}
      <span
        className="shrink-0 font-mono text-[10px] px-1.5 py-0.5 rounded mt-0.5"
        style={{ color: level.color, backgroundColor: level.bg }}
      >
        {level.label}
      </span>

      {/* Message */}
      <span className="flex-1 text-sm text-[#8B949E] group-hover:text-[#C9D1D9] transition-colors leading-snug">
        {event.message}
      </span>

      {/* Timestamp */}
      <span className="shrink-0 font-mono text-[11px] text-[#484F58]" suppressHydrationWarning>
        {formatRelativeTime(event.timestamp)}
      </span>
    </motion.div>
  );
}

export default function TelemetryFeed() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [started, setStarted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Start streaming once the section enters the viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    if (visibleCount >= telemetryEvents.length) return;
    const t = setTimeout(() => setVisibleCount((c) => c + 1), 260);
    return () => clearTimeout(t);
  }, [started, visibleCount]);

  return (
    <section ref={sectionRef} className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Header */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2 mb-3">
              <div className="w-1.5 h-1.5 rounded-full bg-[#3FB950] shadow-[0_0_4px_#3FB950]" />
              <span className="font-mono text-[11px] text-[#484F58] tracking-widest uppercase">
                activity/feed
              </span>
            </div>
            <h2 className="text-2xl font-semibold text-[#E6EDF3] mb-3">
              What I&apos;m working on
            </h2>
            <p className="text-sm text-[#8B949E] leading-relaxed">
              A live log of recent engineering work — pipeline changes,
              tooling experiments, and system improvements.
            </p>
            <div className="mt-6 p-3 bg-[#11161D] border border-[#21262D] rounded-md">
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono text-[10px] text-[#484F58] tracking-widest">
                  SYSTEM STATUS
                </span>
                <span className="font-mono text-[10px] text-[#3FB950]">NOMINAL</span>
              </div>
              <div className="space-y-1.5">
                {[
                  { label: "Active projects", value: "4" },
                  { label: "Focus area", value: "ML / Data" },
                  { label: "Build", value: "v2026.05" },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="font-mono text-[11px] text-[#484F58]">{label}</span>
                    <span className="font-mono text-[11px] text-[#8B949E]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Feed */}
        <div className="lg:col-span-2">
          <div className="bg-[#11161D] border border-[#21262D] rounded-lg p-4">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#21262D]">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-[#484F58] tracking-widest">
                  LOG STREAM
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3FB950] opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#3FB950]" />
                </span>
                <span className="font-mono text-[10px] text-[#3FB950]">LIVE</span>
              </div>
            </div>
            <div>
              <AnimatePresence initial={false}>
                {telemetryEvents.slice(0, visibleCount).map((event) => (
                  <FeedEntry key={event.id} event={event} />
                ))}
              </AnimatePresence>
              {/* Blinking cursor while streaming */}
              {visibleCount < telemetryEvents.length && started && (
                <motion.div
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{ repeat: Infinity, duration: 0.9, times: [0, 0.45, 0.5, 1], ease: "linear" }}
                  className="mt-1 ml-3 w-2 h-3.5 bg-[#3FB950] rounded-sm inline-block"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
