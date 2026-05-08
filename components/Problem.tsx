"use client";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const PROBLEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a10 10 0 11-20 0 10 10 0 0120 0z"/>
      </svg>
    ),
    title: "Slow Response Time",
    body:  "Leads go cold in minutes. Manual follow-up means you're always reacting — never converting at the right moment.",
    cost:  "Up to 78% of deals lost to slow response",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-3-3v6M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z"/>
      </svg>
    ),
    title: "Weak Digital Presence",
    body:  "No optimised website, no clear journey, no automated lead capture. Your best clients can't find you — or don't trust what they see.",
    cost:  "60% of prospects research online before buying",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    ),
    title: "No Follow-Up System",
    body:  "Leads that don't close today are forgotten. Without a structured nurture sequence, you're leaving thousands on the table every month.",
    cost:  "Only 2% of deals close on first contact",
  },
];

export function Problem() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".prob-header", { opacity:0, y:32, duration:0.9, ease:"expo.out",
        scrollTrigger:{ trigger:".prob-header", start:"top 82%", once:true } });
      gsap.from(".prob-card", { opacity:0, y:40, duration:0.9, stagger:0.1, ease:"expo.out",
        scrollTrigger:{ trigger:".prob-card", start:"top 80%", once:true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="problem" className="section-py bg-void overflow-hidden">
      <div className="wrap">
        {/* header */}
        <div className="prob-header max-w-xl mb-14 md:mb-18">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6 bg-olive/50" />
            <span className="overline">The Problem</span>
          </div>
          <h2 className="font-display font-light text-ivory leading-[0.94] tracking-tight"
            style={{ fontSize:"clamp(2.25rem,5vw,4.5rem)" }}>
            Most businesses lose clients
            <br /><span className="olive-text">before they even pitch.</span>
          </h2>
        </div>

        {/* cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROBLEMS.map(p => (
            <div key={p.title}
              className="prob-card glass rounded-2xl p-8 group hover:border-olive/25 transition-all duration-300 hover:shadow-[0_0_40px_rgba(184,194,138,0.05)] cursor-pointer">
              <div className="w-11 h-11 rounded-xl bg-olive/10 flex items-center justify-center text-olive mb-6
                group-hover:bg-olive/15 group-hover:scale-[1.04] transition-all duration-300">
                {p.icon}
              </div>
              <h3 className="font-display font-light text-ivory text-xl tracking-tight mb-3">{p.title}</h3>
              <p className="text-sm text-muted leading-relaxed mb-6">{p.body}</p>
              <div className="hairline-olive mb-4" />
              <p className="text-[0.625rem] text-olive/70 tracking-wider uppercase">{p.cost}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
