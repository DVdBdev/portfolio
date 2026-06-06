"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, GitBranch, Mail } from "lucide-react";

// Animated pipeline canvas background
function PipelineCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    const cvs = canvas;
    const context = ctx;

    const nodes: { x: number; y: number; vx: number; vy: number }[] = [];
    const NODE_COUNT = 20;

    function resize() {
      width = cvs.offsetWidth;
      height = cvs.offsetHeight;
      cvs.width = width;
      cvs.height = height;
    }

    function init() {
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        });
      }
    }

    function draw() {
      context.clearRect(0, 0, width, height);

      // Update nodes
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;
      }

      // Draw edges
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            const alpha = (1 - dist / 160) * 0.12;
            context.beginPath();
            context.strokeStyle = `rgba(88, 166, 255, ${alpha})`;
            context.lineWidth = 1;
            context.moveTo(nodes[i].x, nodes[i].y);
            context.lineTo(nodes[j].x, nodes[j].y);
            context.stroke();
          }
        }
      }

      // Draw nodes
      for (const node of nodes) {
        context.beginPath();
        context.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        context.fillStyle = "rgba(88, 166, 255, 0.25)";
        context.fill();
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();

    const observer = new ResizeObserver(() => {
      resize();
      init();
    });
    observer.observe(cvs);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] } },
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />

      {/* Pipeline canvas */}
      <PipelineCanvas />

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0B0F14] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* System label */}
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
            <span className="font-mono text-[11px] text-[#484F58] tracking-widest uppercase">
              sys/engineer
            </span>
            <span className="h-px w-8 bg-[#21262D]" />
            <span className="font-mono text-[11px] text-[#3FB950] tracking-widest uppercase">
              online
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#E6EDF3] leading-[1.1] tracking-tight mb-6"
          >
            Student developer building
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#58A6FF] to-[#39C5CF]">
              practical software.
            </span>
          </motion.h1>

          {/* Supporting text */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-[#8B949E] leading-relaxed mb-10 max-w-xl"
          >
            I like building things that are actually useful — dashboards,
            internal tools, data pipelines, and clean full-stack apps. Based in
            Belgium. Looking for internships and junior roles in data
            engineering, ML tooling, or full-stack development.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#1F6FEB] hover:bg-[#388BFD] text-white text-sm font-medium rounded-md transition-colors"
            >
              View Projects
              <ArrowRight size={14} />
            </a>
            <a
              href="https://github.com/dvdbdev"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-[#21262D] hover:border-[#30363D] hover:bg-[#161B22] text-[#E6EDF3] text-sm font-medium rounded-md transition-all"
            >
              <GitBranch size={14} />
              GitHub
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 text-[#8B949E] hover:text-[#E6EDF3] text-sm transition-colors"
            >
              <Mail size={14} />
              Contact
            </a>
          </motion.div>

          {/* Telemetry tags */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap items-center gap-2"
          >
            {[
              "Python",
              "TypeScript",
              "Data Tooling",
              "Dashboards",
              "Full-Stack",
              "ML Experiments",
            ].map((tag) => (
              <span
                key={tag}
                className="font-mono text-[11px] px-2.5 py-1 bg-[#11161D] border border-[#21262D] rounded text-[#484F58]"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <span className="font-mono text-[10px] text-[#484F58] tracking-widest">scroll</span>
        <motion.div
          animate={{ y: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-px h-6 bg-gradient-to-b from-[#21262D] to-transparent"
        />
      </motion.div>
    </section>
  );
}
