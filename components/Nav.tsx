"use client";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "./LogoMark";

const LINKS = [
  { label: "Work",     href: "#work"     },
  { label: "Services", href: "#services" },
  { label: "Process",  href: "#process"  },
  { label: "Results",  href: "#results"  },
];

export function Nav() {
  const navRef  = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 inset-x-0 z-50 transition-all duration-500"
      style={{
        padding: scrolled ? "0.75rem 0" : "1.5rem 0",
        background: scrolled ? "rgba(245,241,232,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
      }}
      aria-label="Main navigation"
    >
      <div className="wrap flex items-center justify-between">

        {/* ── Logo ── */}
        <a href="/" aria-label="OLIVEIRA home" data-magnetic className="flex items-center gap-3 group">
          <LogoMark size={26} />
          <span
            className="font-display font-light leading-none"
            style={{
              fontSize: "0.8125rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontVariationSettings: '"opsz" 144, "SOFT" 0',
            }}
          >
            Oliveira
          </span>
        </a>

        {/* ── Links (hide below 640px) ── */}
        <ul
          className="list-none"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          {LINKS.map(({ label, href }) => (
            <li key={label} className="hidden sm:block">
              <a
                href={href}
                className="nav-link"
                style={{ fontSize: "0.8125rem", letterSpacing: "0.02em", color: "rgba(15,14,12,0.5)" }}
              >
                <span className="nl-base">{label}</span>
                <span className="nl-alt">{label}</span>
              </a>
            </li>
          ))}
        </ul>

        {/* ── CTA ── */}
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
          <a href="#contact" className="btn-ghost hidden sm:block" data-magnetic>
            Contact
          </a>
          <a href="#audit" className="btn-lime" data-magnetic>
            <span className="dot-lime" aria-hidden="true" />
            Book free audit
          </a>
        </div>

      </div>
    </nav>
  );
}
