"use client";

import { motion } from "framer-motion";
import { GitBranch, Mail, Link2, ArrowUpRight } from "lucide-react";

const contactLinks = [
  {
    label: "GitHub",
    value: "dvdbdev",
    href: "https://github.com/dvdbdev",
    icon: GitBranch,
    mono: true,
  },
  {
    label: "Email",
    value: "Dries.Van.den.Brande@proton.me",
    href: "mailto:Dries.Van.den.Brande@proton.me",
    icon: Mail,
    mono: false,
  }
];

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
