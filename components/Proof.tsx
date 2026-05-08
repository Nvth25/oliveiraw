"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { val:"340%", label:"Average lead increase"       },
  { val:"28h",  label:"Saved per week, per client"  },
  { val:"94%",  label:"Client renewal rate"         },
  { val:"17×",  label:"Median ROI on investment"    },
];

const TESTIMONIALS = [
  {
    quote: "Before OLIVEIRA, my team sent follow-ups manually for every lead. Now the system qualifies, nurtures, and books on its own. We went from 3 closings a month to 11 in 90 days.",
    name:  "Rodrigo Almeida",
    role:  "Founder, Almeida Capital",
    tag:   "Real Estate · 3× bookings in 90 days",
  },
  {
    quote: "The WhatsApp automation paid for the entire engagement in the first month. Our show-up rate went from 41% to 78% almost overnight. The ROI is insane.",
    name:  "Beatriz Carvalho",
    role:  "CEO, Carvalho Clinic",
    tag:   "Healthcare · +37pts show-up rate",
  },
  {
    quote: "I was skeptical about AI acquisition. But OLIVEIRA built something that genuinely understands our offer. My closers only talk to people who are already sold.",
    name:  "Marcus Ferreira",
    role:  "Managing Director, Ferreira Consulting",
    tag:   "B2B Services · 4× pipeline in 60 days",
  },
];

export function Proof() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".proof-head,.proof-stat", { opacity:0, y:28, stagger:0.07, duration:0.9, ease:"expo.out",
        scrollTrigger:{ trigger:".proof-head", start:"top 80%", once:true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="proof" className="section-py bg-void overflow-hidden">
      <div className="wrap">
        {/* header */}
        <div className="proof-head max-w-xl mb-14 md:mb-20">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6 bg-olive/50" />
            <span className="overline">Results & Proof</span>
          </div>
          <h2 className="font-display font-light text-ivory leading-[0.94] tracking-tight"
            style={{ fontSize:"clamp(2.25rem,5vw,4.5rem)" }}>
            The numbers
            <br /><span className="olive-text">don&apos;t lie.</span>
          </h2>
        </div>

        {/* stats strip */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden mb-20 md:mb-24">
          {STATS.map(s => (
            <div key={s.val} className="proof-stat bg-card px-8 py-9 hover:bg-surface transition-colors duration-300">
              <p className="font-display font-light text-olive leading-none mb-2 tabular-nums"
                style={{ fontSize:"clamp(2rem,3.5vw,3rem)" }}>{s.val}</p>
              <p className="text-[0.6875rem] text-muted/55 leading-snug max-w-[130px]">{s.label}</p>
            </div>
          ))}
        </div>

        {/* testimonials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* selector */}
          <div className="lg:col-span-4 space-y-2">
            {TESTIMONIALS.map((t, i) => (
              <button key={i} onClick={() => setActive(i)}
                className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                  active === i ? "border-olive/25 bg-card" : "border-transparent hover:border-border hover:bg-card/40"
                }`}>
                <p className={`text-sm font-medium transition-colors duration-300 ${active === i ? "text-ivory" : "text-muted"}`}>
                  {t.name}
                </p>
                <p className="text-[0.6875rem] text-muted/40 mt-0.5">{t.role}</p>
                {active === i && <p className="text-[0.625rem] text-olive/70 font-medium mt-2">{t.tag}</p>}
              </button>
            ))}
          </div>

          {/* quote */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div key={active}
                initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:-16 }}
                transition={{ duration:0.45, ease:[0.16,1,0.3,1] }}
                className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden">

                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-olive/20 to-transparent" />

                <blockquote className="font-display font-light text-ivory/88 leading-[1.45] mb-8"
                  style={{ fontSize:"clamp(1.0625rem,1.6vw,1.375rem)" }}>
                  &ldquo;{TESTIMONIALS[active].quote}&rdquo;
                </blockquote>

                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-olive/10 border border-olive/20 flex items-center justify-center shrink-0">
                      <span className="font-display font-light text-olive">{TESTIMONIALS[active].name[0]}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-ivory">{TESTIMONIALS[active].name}</p>
                      <p className="text-[0.6875rem] text-muted/50">{TESTIMONIALS[active].role}</p>
                    </div>
                  </div>
                  <span className="text-[0.625rem] text-olive/70 border border-olive/20 rounded-full px-3 py-1 tracking-wider">
                    {TESTIMONIALS[active].tag}
                  </span>
                </div>

                <div className="flex gap-1 mt-6">
                  {Array.from({length:5}).map((_,i) => (
                    <svg key={i} className="w-3.5 h-3.5 text-olive/50" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
