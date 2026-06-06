"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#timeline" },
  { label: "Journey", href: "#principles" },
  { label: "Stack", href: "#stack" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0B0F14]/90 backdrop-blur-md border-b border-[#21262D]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Home"
          >
            <div className="w-2 h-2 rounded-full bg-[#3FB950] shadow-[0_0_6px_#3FB950]" />
            <span className="font-mono text-sm text-[#E6EDF3] tracking-wide group-hover:text-[#58A6FF] transition-colors">
              dvdb
              <span className="text-[#58A6FF]">.dev</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors rounded-md hover:bg-[#161B22]"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://github.com/dvdbdev"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 px-3 py-1.5 text-sm font-mono text-[#58A6FF] border border-[#1F6FEB]/40 rounded-md hover:bg-[#0D2B55] hover:border-[#1F6FEB] transition-all"
            >
              GitHub
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 text-[#8B949E] hover:text-[#E6EDF3] transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="fixed top-14 left-0 right-0 z-40 bg-[#11161D] border-b border-[#21262D] md:hidden"
          >
            <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3 py-2 text-sm text-[#8B949E] hover:text-[#E6EDF3] transition-colors rounded-md hover:bg-[#161B22]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="https://github.com/dvdbdev"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 px-3 py-2 text-sm font-mono text-[#58A6FF]"
                onClick={() => setMobileOpen(false)}
              >
                github/dvdbdev
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
