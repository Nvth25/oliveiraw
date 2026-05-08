"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollIndicator } from "./ScrollIndicator";

/*
  OLIVEIRA — 8 letters, symmetric inward stagger:
    O(0) A(7)  delay 0.00  ← outermost pair (first to reveal)
    L(1) R(6)  delay 0.08
    I(2) I(5)  delay 0.16  ← italic accent pair
    V(3) E(4)  delay 0.24  ← innermost pair (last to reveal)
*/
const LETTERS: { char: string; delay: number; accent: boolean }[] = [
  { char: "O", delay: 0.00, accent: false },
  { char: "L", delay: 0.08, accent: false },
  { char: "I", delay: 0.16, accent: true  },
  { char: "V", delay: 0.24, accent: false },
  { char: "E", delay: 0.24, accent: false },
  { char: "I", delay: 0.16, accent: true  },
  { char: "R", delay: 0.08, accent: false },
  { char: "A", delay: 0.00, accent: false },
];

export function Hero() {
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[];

    /* ── Initial states ─────────────────────────────────────────────────────── */
    gsap.set(letters, { clipPath: "inset(100% 0 0 0)" });
    gsap.set(
      [eyebrowRef.current, subtitleRef.current, ctaRef.current, taglineRef.current],
      { opacity: 0, y: 12 }
    );

    /* ── Master timeline ────────────────────────────────────────────────────── */
    const tl = gsap.timeline({ delay: 0.2 });

    // Eyebrow line
    tl.to(eyebrowRef.current, {
      opacity: 1, y: 0,
      duration: 0.6,
      ease: "expo.out",
    });

    // All letters simultaneously with individual delays (outer → inner)
    letters.forEach((el, i) => {
      tl.to(
        el,
        {
          clipPath: "inset(0% 0 0 0)",
          duration: 0.85,
          ease: "expo.out",
          delay: LETTERS[i].delay * 0.7,   // tighten stagger
        },
        "<0.03"
      );
    });

    // Subtitle + CTA
    tl.to(
      subtitleRef.current,
      { opacity: 1, y: 0, duration: 0.6, ease: "expo.out" },
      "+=0.0"
    );
    tl.to(
      ctaRef.current,
      { opacity: 1, y: 0, duration: 0.55, ease: "expo.out" },
      "-=0.3"
    );
    tl.to(
      taglineRef.current,
      { opacity: 1, y: 0, duration: 0.5, ease: "expo.out" },
      "-=0.35"
    );

    return () => { tl.kill(); };
  }, []);

  return (
    <section
      className="relative min-h-[100svh] flex flex-col items-center justify-center"
      aria-label="Hero"
    >
      {/* Gentle center bloom — softens the fixed shader beneath */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(245,241,232,0.72) 0%, transparent 100%)",
        }}
      />

      {/* ── Content ──────────────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 w-full max-w-[1600px] mx-auto">

        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          style={{ opacity: 0 }}
          className="flex items-center gap-2.5 mb-10 md:mb-12"
        >
          <span className="dot-lime" aria-hidden />
          <span
            className="text-[0.6875rem] tracking-[0.2em] uppercase"
            style={{
              fontFamily: "var(--font-inter-tight, system-ui)",
              fontWeight: 500,
              color: "rgba(15,14,12,0.5)",
            }}
          >
            AI Client Acquisition Systems
          </span>
          <span className="dot-lime" aria-hidden />
        </p>

        {/* ── OLIVEIRA wordmark ─────────────────────────────────────────────── */}
        <h1
          className="flex items-baseline justify-center flex-wrap leading-none mb-10 md:mb-12 w-full"
          aria-label="OLIVEIRA"
          style={{ gap: "0 0.01em" }}
        >
          {LETTERS.map((l, i) => (
            <span
              key={i}
              ref={(el) => { letterRefs.current[i] = el; }}
              className={`h-letter${l.accent ? " accent" : ""} font-display`}
              style={{
                fontSize: "clamp(3.5rem, 13.5vw, 15rem)",
                fontWeight: 300,
                letterSpacing: "-0.02em",
                fontVariationSettings: l.accent
                  ? '"opsz" 144, "SOFT" 40, "ital" 1'
                  : '"opsz" 144, "SOFT" 30',
              }}
            >
              {l.char}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          style={{ opacity: 0 }}
          className="mb-10 md:mb-12 max-w-[38ch]"
        >
          <span
            style={{
              fontFamily: "var(--font-inter-tight, system-ui)",
              fontSize: "clamp(1rem, 1.4vw, 1.125rem)",
              lineHeight: 1.55,
              color: "rgba(15,14,12,0.6)",
            }}
          >
            Systems that turn cold visitors into paying clients.{" "}
            <em
              className="font-display not-italic"
              style={{
                fontVariationSettings: '"opsz" 9, "SOFT" 80, "ital" 1',
                color: "#0F0E0C",
              }}
            >
              In days, not quarters.
            </em>
          </span>
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          style={{ opacity: 0 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <a href="#audit" className="btn-lime" data-magnetic>
            <span className="dot-lime" aria-hidden />
            Book free audit
          </a>
          <a href="#work" className="btn-ghost" data-magnetic>
            See our work
          </a>
        </div>
      </div>

      {/* ── Tagline stripe — bottom center ───────────────────────────────────── */}
      <p
        ref={taglineRef}
        style={{ opacity: 0 }}
        className="absolute bottom-[6.5rem] md:bottom-[5rem] left-1/2 -translate-x-1/2 z-10 whitespace-nowrap"
      >
        <span
          style={{
            fontFamily: "var(--font-fraunces, serif)",
            fontVariationSettings: '"opsz" 9, "SOFT" 0, "ital" 1',
            fontSize: "0.6875rem",
            letterSpacing: "0.28em",
            color: "rgba(15,14,12,0.3)",
          }}
        >
          Results guaranteed in 30 days
        </span>
      </p>

      {/* ── Scroll indicator — bottom left ───────────────────────────────────── */}
      <div className="absolute bottom-6 left-8 md:left-14 z-10">
        <ScrollIndicator />
      </div>

      {/* ── Availability notice — bottom right ───────────────────────────────── */}
      <div className="absolute bottom-8 right-8 md:right-14 z-10 flex items-center gap-2">
        <span className="dot-lime" aria-hidden />
        <span
          style={{
            fontFamily: "var(--font-inter-tight, system-ui)",
            fontSize: "0.625rem",
            letterSpacing: "0.14em",
            color: "rgba(15,14,12,0.38)",
            textTransform: "uppercase",
          }}
        >
          4 slots open this quarter
        </span>
      </div>
    </section>
  );
}
