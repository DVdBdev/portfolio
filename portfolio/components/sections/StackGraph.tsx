"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stackNodes, stackEdges } from "@/data/stack";
import type { StackNode } from "@/types/stack";

const categoryColors: Record<StackNode["category"], { border: string; bg: string; text: string; dot: string }> = {
  language: { border: "#1F6FEB", bg: "#0D2B55", text: "#58A6FF", dot: "#58A6FF" },
  framework: { border: "#1A6972", bg: "#0B2F35", text: "#39C5CF", dot: "#39C5CF" },
  platform: { border: "#B08800", bg: "#2D1F00", text: "#D29922", dot: "#D29922" },
  tooling: { border: "#238636", bg: "#0F2A14", text: "#3FB950", dot: "#3FB950" },
  ml: { border: "#6E40C9", bg: "#1D1033", text: "#8B5CF6", dot: "#8B5CF6" },
  data: { border: "#B08800", bg: "#2D1F00", text: "#D29922", dot: "#D29922" },
};

const categoryLabel: Record<StackNode["category"], string> = {
  language: "Language",
  framework: "Framework",
  platform: "Platform",
  tooling: "Tooling",
  ml: "ML / AI",
  data: "Data",
};

function NodeCard({
  node,
  isActive,
  isRelated,
  onClick,
}: {
  node: StackNode;
  isActive: boolean;
  isRelated: boolean;
  onClick: () => void;
}) {
  const colors = categoryColors[node.category];
  const dimmed = !isActive && isRelated === false;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`relative text-left p-3 rounded-lg border transition-all cursor-pointer ${
        isActive
          ? "ring-1 ring-offset-0"
          : dimmed
          ? "opacity-40"
          : "hover:opacity-80"
      }`}
      style={{
        borderColor: isActive ? colors.border : "#21262D",
        backgroundColor: isActive ? colors.bg : "#11161D",
        ...(isActive ? { boxShadow: `0 0 0 1px ${colors.border}40` } : {}),
      }}
    >
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <span
          className="text-sm font-medium"
          style={{ color: isActive ? colors.text : "#C9D1D9" }}
        >
          {node.label}
        </span>
        <span
          className="shrink-0 font-mono text-[9px] px-1.5 py-0.5 rounded mt-0.5"
          style={{ color: colors.text, backgroundColor: colors.bg, border: `1px solid ${colors.border}40` }}
        >
          {categoryLabel[node.category]}
        </span>
      </div>
      {isActive && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="text-xs text-[#8B949E] leading-relaxed"
        >
          {node.description}
        </motion.p>
      )}
    </motion.button>
  );
}

export default function StackGraph() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const connectedNodeIds = activeNode
    ? new Set(
        stackEdges
          .filter((e) => e.source === activeNode || e.target === activeNode)
          .flatMap((e) => [e.source, e.target])
      )
    : null;

  function handleNodeClick(id: string) {
    setActiveNode((prev) => (prev === id ? null : id));
  }

  const categories = Array.from(new Set(stackNodes.map((n) => n.category)));

  return (
    <section id="stack" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 mb-3">
          <span className="font-mono text-[11px] text-[#484F58] tracking-widest uppercase">
            sys/stack
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-[#E6EDF3] mb-2">
          Technical stack
        </h2>
        <p className="text-sm text-[#8B949E]">
          Click any node to see how I use it and what connects to it.
        </p>
      </motion.div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mb-8">
        {categories.map((cat) => {
          const colors = categoryColors[cat];
          return (
            <div key={cat} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: colors.dot }}
              />
              <span className="font-mono text-[11px] text-[#8B949E]">
                {categoryLabel[cat]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Node grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {stackNodes.map((node, i) => (
          <motion.div
            key={node.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <NodeCard
              node={node}
              isActive={activeNode === node.id}
              isRelated={
                activeNode === null
                  ? false
                  : connectedNodeIds?.has(node.id) ?? false
              }
              onClick={() => handleNodeClick(node.id)}
            />
          </motion.div>
        ))}
      </div>

      {/* Active node detail */}
      <AnimatePresence>
        {activeNode && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="mt-6 p-4 bg-[#11161D] border border-[#21262D] rounded-lg"
          >
            {(() => {
              const node = stackNodes.find((n) => n.id === activeNode)!;
              const colors = categoryColors[node.category];
              const connected = stackEdges
                .filter((e) => e.source === activeNode || e.target === activeNode)
                .map((e) => (e.source === activeNode ? e.target : e.source))
                .map((id) => stackNodes.find((n) => n.id === id)!)
                .filter(Boolean);
              return (
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.dot }} />
                      <span className="font-medium text-[#E6EDF3]">{node.label}</span>
                      <span
                        className="font-mono text-[10px] px-1.5 py-px rounded"
                        style={{ color: colors.text, backgroundColor: colors.bg }}
                      >
                        {categoryLabel[node.category]}
                      </span>
                    </div>
                    <p className="text-sm text-[#8B949E] leading-relaxed">{node.description}</p>
                  </div>
                  {connected.length > 0 && (
                    <div className="shrink-0">
                      <span className="font-mono text-[10px] text-[#484F58] tracking-widest mb-2 block">
                        CONNECTS TO
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {connected.map((c) => {
                          const cc = categoryColors[c.category];
                          return (
                            <button
                              key={c.id}
                              onClick={() => handleNodeClick(c.id)}
                              className="font-mono text-[11px] px-2 py-1 rounded border hover:opacity-80 transition-opacity"
                              style={{
                                borderColor: cc.border,
                                color: cc.text,
                                backgroundColor: cc.bg,
                              }}
                            >
                              {c.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
