"use client";

import { motion } from "framer-motion";

const principles = [
  {
    id: "01",
    title: "Build things that can grow",
    body: "I try to think past the immediate feature. Not in an over-engineered way — just: will this make sense in 3 months? Can someone else follow it?",
  },
  {
    id: "02",
    title: "Remove friction where you find it",
    body: "Annoying workflows slow you down over time. When something is consistently painful — a setup step, a repeated task, a confusing interface — I'd rather fix it than get used to it.",
  },
  {
    id: "03",
    title: "DX matters",
    body: "How a tool feels to use affects whether it gets used well. I care about error messages, CLI output, and onboarding steps — not just the end result.",
  },
  {
    id: "04",
    title: "Clear is better than clever",
    body: "I've written code I couldn't read two weeks later. Clear naming, obvious structure, and predictable data flow are not beginner habits — they're good ones.",
  },
  {
    id: "05",
    title: "Automate the boring parts",
    body: "If I'm doing something manually for the third time, I should probably automate it. Not everything needs a framework — sometimes a script is enough.",
  },
  {
    id: "06",
    title: "Write for the next person (usually future me)",
    body: "I try to write code as if someone else will need to understand it. That \"someone else\" has been me enough times that I've learned to take it seriously.",
  },
  {
    id: "07",
    title: "The best way to learn is to ship",
    body: "Reading about something only goes so far. I learn more from a broken deployment or a failing test than from a course. Real projects have edges that tutorials don't.",
  },
  {
    id: "08",
    title: "Know what's slow before you fix it",
    body: "Optimizing randomly is mostly wasted effort. I try to understand the actual bottleneck before changing anything.",
  },
];

export default function PrinciplesSection() {
  return (
    <section id="principles" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[11px] text-[#484F58] tracking-widest uppercase">
            sys/principles
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-[#E6EDF3] mb-2">
          How I think
        </h2>
        <p className="text-sm text-[#8B949E] max-w-xl">
          Engineering principles I&apos;ve landed on through building, breaking,
          and iterating. Not rules — working defaults.
        </p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {principles.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            className="group bg-[#11161D] border border-[#21262D] rounded-lg p-4 hover:border-[#30363D] transition-colors"
          >
            <div className="font-mono text-[10px] text-[#484F58] mb-3 tracking-widest">
              {p.id}
            </div>
            <h3 className="text-sm font-medium text-[#C9D1D9] mb-2 leading-snug group-hover:text-[#E6EDF3] transition-colors">
              {p.title}
            </h3>
            <p className="text-xs text-[#8B949E] leading-relaxed">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
