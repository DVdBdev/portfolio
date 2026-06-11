"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Mail, ArrowUpRight, Copy, Check } from "lucide-react";

const EMAIL = "Dries.Van.den.Brande@proton.me";

const contactLinks = [
  {
    label: "GitHub",
    value: "dvdbdev",
    href: "https://github.com/dvdbdev",
    icon: GitBranch,
    mono: true,
  },
];

function EmailRow() {
  const [copied, setCopied] = useState(false);

  function handleCopy(e: React.MouseEvent) {
    e.preventDefault();
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: 0.08 }}
      className="flex items-center bg-[#11161D] border border-[#21262D] rounded-lg overflow-hidden hover:border-[#30363D] transition-colors group"
    >
      {/* mailto link — takes up most of the row */}
      <a
        href={`mailto:${EMAIL}`}
        className="flex flex-1 items-center gap-3 p-4 hover:bg-[#161B22] transition-colors"
      >
        <div className="p-2 bg-[#161B22] border border-[#21262D] rounded-md group-hover:border-[#30363D] transition-colors">
          <Mail size={14} className="text-[#8B949E]" />
        </div>
        <div>
          <div className="text-xs text-[#484F58] mb-0.5">Email</div>
          <div className="text-sm text-[#C9D1D9] hover:text-[#58A6FF] transition-colors">
            {EMAIL}
          </div>
        </div>
      </a>

      {/* Copy button */}
      <div className="relative shrink-0 border-l border-[#21262D]">
        <button
          onClick={handleCopy}
          className="flex items-center justify-center w-12 h-full py-4 text-[#484F58] hover:text-[#E6EDF3] hover:bg-[#161B22] transition-colors"
          aria-label="Copy email address"
        >
          <AnimatePresence mode="wait" initial={false}>
            {copied ? (
              <motion.span
                key="check"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Check size={14} className="text-[#3FB950]" />
              </motion.span>
            ) : (
              <motion.span
                key="copy"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Copy size={14} />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        {/* Tooltip */}
        <AnimatePresence>
          {copied && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-[#3FB950] text-[#0B0F14] text-[10px] font-mono font-semibold rounded whitespace-nowrap"
            >
              Copied!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div className="max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="font-mono text-[11px] text-[#484F58] tracking-widest uppercase">
              sys/contact
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-[#E6EDF3] mb-4">
            Get in touch
          </h2>
          <p className="text-sm text-[#8B949E] leading-relaxed">
            I&apos;m open to internship opportunities, junior engineering roles,
            technical collaborations, and interesting projects — particularly in
            data engineering, ML systems, and developer tooling. If any of this
            looks relevant, reach out.
          </p>
        </motion.div>

        <div className="space-y-3">
          {contactLinks.map((link, i) => {
            const Icon = link.icon;
            return (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="group flex items-center justify-between p-4 bg-[#11161D] border border-[#21262D] rounded-lg hover:border-[#30363D] hover:bg-[#161B22] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-[#161B22] border border-[#21262D] rounded-md group-hover:border-[#30363D] transition-colors">
                    <Icon size={14} className="text-[#8B949E]" />
                  </div>
                  <div>
                    <div className="text-xs text-[#484F58] mb-0.5">{link.label}</div>
                    <div
                      className={`text-sm text-[#C9D1D9] group-hover:text-[#58A6FF] transition-colors ${
                        link.mono ? "font-mono" : ""
                      }`}
                    >
                      {link.value}
                    </div>
                  </div>
                </div>
                <ArrowUpRight
                  size={14}
                  className="text-[#484F58] group-hover:text-[#58A6FF] transition-colors"
                />
              </motion.a>
            );
          })}

          {/* Email row with copy button */}
          <EmailRow />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 p-4 bg-[#11161D] border border-[#21262D] rounded-lg"
        >
          <div className="font-mono text-[10px] text-[#484F58] tracking-widest mb-2">
            AVAILABILITY
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3FB950] opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#3FB950]" />
            </span>
            <span className="text-sm text-[#8B949E]">
              Open to opportunities, internships, junior roles,
              collaborations, and technical projects.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
