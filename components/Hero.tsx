"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ThreeBackground } from "./ThreeBackground";

const LETTERS = "OLIVEIRA".split("");

const STATS = [
  { val: "340%",  label: "avg. lead increase"   },
  { val: "28h",   label: "saved per week"        },
  { val: "30d",   label: "to first results"      },
  { val: "17×",   label: "median ROI"            },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const y  = useTransform(scrollY, [0, 600], [0, 80]);
  const op = useTransform(scrollY, [0, 500], [1, 0]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(".hero-letter", { yPercent: 110, opacity: 0 });
      gsap.set([".hero-tag",".hero-h2",".hero-sub",".hero-btns",".hero-stats"], { opacity: 0, y: 24 });

      const tl = gsap.timeline({ delay: 0.6 });

      tl.to(".hero-letter", {
        yPercent: 0, opacity: 1,
        duration: 1.1, stagger: 0.06, ease: "expo.out",
      })
      .to(".hero-tag",  { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" }, "-=0.5")
      .to(".hero-h2",   { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" }, "-=0.65")
      .to(".hero-sub",  { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" }, "-=0.6")
      .to(".hero-btns", { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" }, "-=0.55")
      .to(".hero-stats",{ opacity: 1, y: 0, duration: 0.7, ease: "expo.out", stagger: 0.07 }, "-=0.5");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="hero"
      className="relative min-h-[100svh] flex flex-col overflow-hidden bg-void">

      {/* Three.js bg */}
      <ThreeBackground />

      {/* Vignette */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_68%_52%_at_50%_46%,rgba(10,14,11,0.05)_0%,rgba(10,14,11,0.7)_65%,rgba(10,14,11,0.98)_100%)] pointer-events-none" />
      <div aria-hidden className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-void to-transparent pointer-events-none" />

      {/* Content */}
      <motion.div style={{ y, opacity: op }}
        className="relative z-10 flex flex-col flex-1 min-h-[100svh] wrap pt-36 pb-20">

        <div className="flex-1 flex flex-col justify-center items-center text-center">
          {/* Overline */}
          <div className="hero-tag flex items-center gap-3 mb-8">
            <div className="h-px w-8 bg-olive/50" />
            <span className="overline">AI Client Acquisition</span>
            <div className="h-px w-8 bg-olive/50" />
          </div>

          {/* OLIVEIRA wordmark */}
          <div className="overflow-hidden mb-5">
            <div className="flex items-baseline justify-center" style={{ gap: "0 0.02em" }}>
              {LETTERS.map((l, i) => (
                <span key={i} className="hero-letter inline-block font-display font-extralight text-ivory leading-none select-none"
                  style={{ fontSize: "clamp(4rem,14vw,13rem)", letterSpacing: "0.06em" }}>
                  {l}
                </span>
              ))}
            </div>
          </div>

          {/* Tagline */}
          <p className="hero-h2 font-display font-light text-muted leading-[1.15] mb-6 max-w-[22ch] mx-auto"
            style={{ fontSize: "clamp(1.125rem,2.2vw,1.875rem)" }}>
            We build <span className="text-olive">automated client acquisition</span> systems
            that fill your calendar while you sleep.
          </p>

          {/* Sub */}
          <p className="hero-sub text-sm text-faint max-w-[38ch] mx-auto mb-10 leading-relaxed">
            WhatsApp automation · AI-powered CRM · Payment integrations · Lead capture · 30-day delivery
          </p>

          {/* CTAs */}
          <div className="hero-btns flex flex-col sm:flex-row items-center gap-3 mb-20">
            <a href="#offer"
              className="group inline-flex items-center gap-2.5 bg-olive text-void text-sm font-semibold tracking-wide px-8 h-12 rounded-full hover:bg-olive-light transition-all duration-300 shadow-[0_0_40px_rgba(184,194,138,0.2)] hover:shadow-[0_0_60px_rgba(184,194,138,0.38)]">
              See the $8,400 Package
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </a>
            <a href="#how-it-works"
              className="text-sm text-muted hover:text-ivory transition-colors duration-300 tracking-wide">
              See how it works ↓
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden w-full max-w-2xl">
            {STATS.map(s => (
              <div key={s.val} className="hero-stats bg-card px-6 py-5 hover:bg-surface transition-colors duration-300">
                <p className="font-display font-light text-olive leading-none tabular-nums mb-1"
                  style={{ fontSize: "clamp(1.5rem,3vw,2.25rem)" }}>{s.val}</p>
                <p className="text-[0.625rem] text-muted tracking-wider uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="self-center flex flex-col items-center gap-2 mt-10">
          <div className="relative w-px h-14 overflow-hidden">
            <div className="absolute inset-0 bg-faint" />
            <motion.div className="absolute inset-x-0 top-0 bg-gradient-to-b from-olive/60 to-transparent"
              animate={{ y: ["0%","200%"] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear", repeatDelay: 0.6 }}
              style={{ height: "40%" }} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
