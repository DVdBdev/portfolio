"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  Background,
  BackgroundVariant,
  type NodeProps,
  type Node,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
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

// ─── React Flow custom node ───────────────────────────────────────────────────
type GraphNodeData = StackNode & { isActive: boolean; isDimmed: boolean } & Record<string, unknown>;
type GraphNode = Node<GraphNodeData, "stack">;

function StackNodeCard({ data }: NodeProps<GraphNode>) {
  const colors = categoryColors[data.category];
  return (
    <div
      style={{
        opacity: data.isDimmed ? 0.18 : 1,
        borderColor: data.isActive ? colors.border : "#21262D",
        backgroundColor: data.isActive ? colors.bg : "#11161D",
        boxShadow: data.isActive ? `0 0 22px ${colors.border}66` : "none",
        transition: "opacity 0.25s, border-color 0.25s, box-shadow 0.25s",
        minWidth: 130,
      }}
      className="px-4 py-3 rounded-lg border cursor-pointer select-none"
    >
      <Handle type="target" position={Position.Top} style={{ opacity: 0, width: 1, height: 1 }} />
      <div className="flex flex-col items-center gap-2">
        <div
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: data.isActive ? colors.dot : colors.dot + "70" }}
        />
        <span
          className="font-mono text-[13px] font-semibold text-center leading-tight whitespace-nowrap"
          style={{ color: data.isActive ? colors.text : "#C9D1D9" }}
        >
          {data.label}
        </span>
        <span
          className="font-mono text-[9px] px-1.5 py-0.5 rounded text-center"
          style={{ color: colors.text, backgroundColor: colors.bg, border: `1px solid ${colors.border}50` }}
        >
          {categoryLabel[data.category]}
        </span>
      </div>
      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, width: 1, height: 1 }} />
    </div>
  );
}

const nodeTypes = { stack: StackNodeCard };

// ─── Edge builder ─────────────────────────────────────────────────────────────
function buildEdges(active: string | null): Edge[] {
  return stackEdges.map((e) => {
    const isHighlighted = !!active && (e.source === active || e.target === active);
    const sourceColor = categoryColors[stackNodes.find((n) => n.id === e.source)!.category].border;
    return {
      id: `${e.source}-${e.target}`,
      source: e.source,
      target: e.target,
      animated: isHighlighted,
      style: {
        stroke: isHighlighted ? sourceColor : active ? "#1C2128" : "#2D333B",
        strokeWidth: isHighlighted ? 2 : 1,
        transition: "stroke 0.25s, stroke-width 0.25s",
      },
    };
  });
}

// ─── Mobile card grid fallback ────────────────────────────────────────────────
function CardGrid({
  activeNode,
  setActiveNode,
  activeCategory,
}: {
  activeNode: string | null;
  setActiveNode: (id: string | null) => void;
  activeCategory: StackNode["category"] | null;
}) {
  const connectedIds = activeNode
    ? new Set(
        stackEdges
          .filter((e) => e.source === activeNode || e.target === activeNode)
          .flatMap((e) => [e.source, e.target])
      )
    : null;

  const visibleNodes = activeCategory
    ? stackNodes.filter((n) => n.category === activeCategory)
    : stackNodes;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {visibleNodes.map((node, i) => {
        const colors = categoryColors[node.category];
        const isActive = activeNode === node.id;
        const dimmed = activeNode !== null && !connectedIds?.has(node.id);
        return (
          <motion.button
            key={node.id}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            onClick={() => setActiveNode(isActive ? null : node.id)}
            className="text-left p-3 rounded-lg border transition-all"
            style={{
              opacity: dimmed ? 0.3 : 1,
              borderColor: isActive ? colors.border : "#21262D",
              backgroundColor: isActive ? colors.bg : "#11161D",
            }}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-sm font-medium" style={{ color: isActive ? colors.text : "#C9D1D9" }}>
                {node.label}
              </span>
              <span
                className="shrink-0 font-mono text-[9px] px-1.5 py-0.5 rounded mt-0.5"
                style={{ color: colors.text, backgroundColor: colors.bg, border: `1px solid ${colors.border}40` }}
              >
                {categoryLabel[node.category]}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

// ─── Initial nodes ────────────────────────────────────────────────────────────
const initialNodes: GraphNode[] = stackNodes.map((n) => ({
  id: n.id,
  position: { x: n.x, y: n.y },
  type: "stack" as const,
  data: { ...n, isActive: false, isDimmed: false },
}));

// ─── Main component ───────────────────────────────────────────────────────────
export default function StackGraph() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<StackNode["category"] | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState<GraphNode>(initialNodes);
  const [edges, setEdges] = useEdgesState<Edge>(buildEdges(null));
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Sync node/edge visual state with activeNode + activeCategory
  useEffect(() => {
    const connected = activeNode
      ? new Set(
          stackEdges
            .filter((e) => e.source === activeNode || e.target === activeNode)
            .flatMap((e) => [e.source, e.target])
        )
      : null;

    setNodes((nds) =>
      nds.map((n) => {
        const categoryMismatch = activeCategory !== null && n.data.category !== activeCategory;
        const nodeDimmed = activeNode !== null && activeNode !== n.id && !connected?.has(n.id);
        return {
          ...n,
          data: {
            ...n.data,
            isActive: n.id === activeNode,
            isDimmed: categoryMismatch || nodeDimmed,
          },
        };
      })
    );
    setEdges(buildEdges(activeNode));
  }, [activeNode, activeCategory, setNodes, setEdges]);

  const handleNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setActiveNode((prev) => (prev === node.id ? null : node.id));
  }, []);

  const activeNodeData = activeNode ? stackNodes.find((n) => n.id === activeNode) : null;
  const connectedNodes = activeNode
    ? stackEdges
        .filter((e) => e.source === activeNode || e.target === activeNode)
        .map((e) => (e.source === activeNode ? e.target : e.source))
        .map((id) => stackNodes.find((n) => n.id === id)!)
        .filter(Boolean)
    : [];

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
        <h2 className="text-2xl font-semibold text-[#E6EDF3] mb-2">Technical stack</h2>
        <p className="text-sm text-[#8B949E]">
          {isMobile
            ? "Tap a node to explore it."
            : "Click any node to see how I use it and what connects to it. Drag to rearrange."}
        </p>
      </motion.div>

      {/* Legend / filter tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => { setActiveCategory(null); setActiveNode(null); }}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-mono text-[11px] transition-all"
          style={{
            borderColor: activeCategory === null ? "#30363D" : "#21262D",
            backgroundColor: activeCategory === null ? "#161B22" : "transparent",
            color: activeCategory === null ? "#E6EDF3" : "#484F58",
          }}
        >
          All
        </button>
        {categories.map((cat) => {
          const colors = categoryColors[cat];
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => { setActiveCategory(isActive ? null : cat); setActiveNode(null); }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-mono text-[11px] transition-all"
              style={{
                borderColor: isActive ? colors.border : "#21262D",
                backgroundColor: isActive ? colors.bg : "transparent",
                color: isActive ? colors.text : "#484F58",
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isActive ? colors.dot : colors.dot + "60" }} />
              {categoryLabel[cat]}
            </button>
          );
        })}
      </div>

      {/* Graph / mobile fallback */}
      {isMobile ? (
        <CardGrid activeNode={activeNode} setActiveNode={setActiveNode} activeCategory={activeCategory} />
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-lg border border-[#21262D] overflow-hidden"
          style={{ height: 600, background: "#0B0F14" }}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            onNodesChange={onNodesChange}
            onNodeClick={handleNodeClick}
            fitView
            fitViewOptions={{ padding: 0.25 }}
            nodesDraggable
            nodesConnectable={false}
            elementsSelectable={false}
            panOnScroll
            zoomOnScroll={false}
            style={{ background: "transparent" }}
          >
            <Background variant={BackgroundVariant.Dots} color="#1a1f26" gap={24} size={1} />
          </ReactFlow>
        </motion.div>
      )}

      {/* Detail panel */}
      <AnimatePresence>
        {activeNodeData && (
          <motion.div
            key="detail"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="mt-6 p-4 bg-[#11161D] border border-[#21262D] rounded-lg"
          >
            {(() => {
              const colors = categoryColors[activeNodeData.category];
              return (
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors.dot }} />
                      <span className="font-medium text-[#E6EDF3]">{activeNodeData.label}</span>
                      <span
                        className="font-mono text-[9px] px-1.5 py-0.5 rounded"
                        style={{ color: colors.text, backgroundColor: colors.bg, border: `1px solid ${colors.border}40` }}
                      >
                        {categoryLabel[activeNodeData.category]}
                      </span>
                    </div>
                    <p className="text-sm text-[#8B949E] leading-relaxed">{activeNodeData.description}</p>
                  </div>
                  {connectedNodes.length > 0 && (
                    <div className="shrink-0">
                      <span className="font-mono text-[10px] text-[#484F58] tracking-widest block mb-2">
                        CONNECTS TO
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {connectedNodes.map((cn) => {
                          const cc = categoryColors[cn.category];
                          return (
                            <button
                              key={cn.id}
                              onClick={() => setActiveNode(cn.id)}
                              className="font-mono text-[11px] px-2 py-1 rounded border hover:opacity-80 transition-opacity"
                              style={{ borderColor: cc.border + "80", color: cc.text, backgroundColor: cc.bg }}
                            >
                              {cn.label}
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
