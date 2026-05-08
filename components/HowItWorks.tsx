"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Free Systems Audit",
    duration: "48 hours",
    desc: "We map every automation opportunity in your business — where leads fall off, where you're losing revenue, exactly what to build first. No obligation.",
    deliverable: "Detailed PDF with exact automation opportunities and projected ROI.",
  },
  {
    num: "02",
    title: "Architecture & Build",
    duration: "Weeks 1–4",
    desc: "We design and build your complete system — funnels, CRM, WhatsApp flows, payment integrations, AI chatbots. You approve the blueprint before we write a line of code.",
    deliverable: "Full staging environment before any live migration.",
  },
  {
    num: "03",
    title: "Launch & Optimise",
    duration: "Day 30+",
    desc: "Go live with a battle-tested system. We monitor, A/B test, and refine every month — pushing conversion rates higher as your business grows.",
    deliverable: "Monthly performance review. We don't disappear after launch.",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hiw-head", { opacity:0, y:28, duration:1, ease:"expo.out",
        scrollTrigger:{ trigger:".hiw-head", start:"top 80%", once:true } });
      gsap.from(".hiw-step", { opacity:0, y:36, stagger:0.12, duration:0.9, ease:"expo.out",
        scrollTrigger:{ trigger:".hiw-step", start:"top 80%", once:true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="how-it-works" className="section-py bg-surface overflow-hidden">
      <div className="wrap">
        <div className="hiw-head max-w-xl mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6 bg-olive/50" />
            <span className="overline">How It Works</span>
          </div>
          <h2 className="font-display font-light text-ivory leading-[0.94] tracking-tight"
            style={{ fontSize:"clamp(2.25rem,5vw,4.5rem)" }}>
            From audit to results
            <br /><span className="olive-text">in 30 days.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {STEPS.map((s, i) => (
            <div key={s.num} className="hiw-step glass rounded-2xl p-8 md:p-10 relative overflow-hidden group hover:border-olive/25 transition-all duration-400">
              {/* watermark */}
              <span className="absolute -right-3 -bottom-4 font-display font-light text-ivory/[0.03] select-none pointer-events-none leading-none"
                style={{ fontSize:"8rem" }} aria-hidden>{s.num}</span>

              <div className="flex items-start justify-between gap-4 mb-8">
                <span className="font-mono text-[0.625rem] text-olive/60 tracking-widest">{s.num}</span>
                <span className="text-[0.5625rem] text-muted/40 border border-border rounded-full px-3 py-1 tracking-wider">{s.duration}</span>
              </div>

              <h3 className="font-display font-light text-ivory tracking-tight leading-tight mb-4 group-hover:text-olive transition-colors duration-300"
                style={{ fontSize:"clamp(1.25rem,1.8vw,1.625rem)" }}>{s.title}</h3>
              <p className="text-sm text-muted leading-relaxed mb-6">{s.desc}</p>

              <div className="flex items-start gap-2.5">
                <svg className="w-3.5 h-3.5 text-olive/50 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                <span className="text-[0.6875rem] text-muted/50 leading-snug">{s.deliverable}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
