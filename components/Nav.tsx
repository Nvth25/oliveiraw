"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

const LINKS = [
  { label: "Services",   href: "#services"    },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Results",    href: "#proof"        },
  { label: "Pricing",    href: "#offer"        },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", v => setScrolled(v > 48));

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-12"
      style={{ height: "4.5rem" }}
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: 0.2, ease: [0.16,1,0.3,1] }}
    >
      {/* backdrop */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          backdropFilter: scrolled ? "blur(20px)" : "blur(0px)",
          backgroundColor: scrolled ? "rgba(10,14,11,0.75)" : "rgba(10,14,11,0)",
          borderBottom: scrolled ? "1px solid rgba(184,194,138,0.08)" : "1px solid transparent",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* logo */}
      <a href="#" className="relative z-10 font-display font-light text-ivory/90 tracking-[0.3em] text-sm hover:text-olive transition-colors duration-300">
        OLIVEIRA
      </a>

      {/* desktop links */}
      <nav className="relative z-10 hidden md:flex items-center gap-8">
        {LINKS.map(l => (
          <a key={l.href} href={l.href}
            className="text-[0.6875rem] text-muted hover:text-ivory transition-colors duration-300 tracking-widest uppercase">
            {l.label}
          </a>
        ))}
      </nav>

      {/* cta */}
      <a
        href="#cta"
        className="relative z-10 inline-flex items-center gap-2 bg-olive text-void text-[0.75rem] font-semibold tracking-wide uppercase px-5 h-9 rounded-full hover:bg-olive-light transition-all duration-300 shadow-[0_0_24px_rgba(184,194,138,0.2)] hover:shadow-[0_0_36px_rgba(184,194,138,0.35)]"
      >
        Book Free Audit
      </a>
    </motion.header>
  );
}
