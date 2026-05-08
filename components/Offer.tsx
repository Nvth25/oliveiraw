"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const INCLUDES = [
  "Conversion-optimised website (design + dev)",
  "WhatsApp Business API setup + 3 automation flows",
  "CRM setup with custom pipeline + lead scoring",
  "AI-powered qualification chatbot",
  "Lead capture funnel (landing page + opt-in)",
  "Automated email + WhatsApp follow-up sequences",
  "Payment gateway integration (Stripe or local)",
  "30-day launch support + performance monitoring",
  "Monthly strategy call for 3 months post-launch",
];

const NOT_INCLUDED = [
  "Ad spend (we build the engine, you fuel it)",
  "Monthly retainer fees",
  "Per-lead charges",
];

export function Offer() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".offer-content", { opacity:0, y:36, duration:1.1, ease:"expo.out",
        scrollTrigger:{ trigger:".offer-content", start:"top 78%", once:true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="offer" className="section-py bg-surface overflow-hidden">
      <div className="wrap">
        <div className="offer-content grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-20 items-start">

          {/* left */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-6 bg-olive/50" />
              <span className="overline">The Offer</span>
            </div>
            <h2 className="font-display font-light text-ivory leading-[0.94] tracking-tight mb-6"
              style={{ fontSize:"clamp(2.25rem,5vw,4.5rem)" }}>
              7-Day Client
              <br /><span className="olive-text">Acquisition Setup.</span>
            </h2>
            <p className="text-base text-muted leading-relaxed mb-10">
              Everything your business needs to attract, convert, and retain clients —
              built, integrated, and launched in one week. One fixed price. No surprises.
            </p>

            <div className="flex items-end gap-3 mb-2">
              <span className="font-display font-light text-ivory" style={{ fontSize:"clamp(3rem,6vw,5rem)", lineHeight:1 }}>
                $8,400
              </span>
              <span className="text-sm text-muted mb-2">one-time</span>
            </div>
            <p className="text-[0.625rem] text-olive/60 tracking-wider uppercase mb-10">
              Full system delivery · No monthly fees · Results guaranteed
            </p>

            <a href="#cta"
              className="group inline-flex items-center gap-2.5 bg-olive text-void text-sm font-semibold tracking-wide px-8 h-12 rounded-full hover:bg-olive-light transition-all duration-300 shadow-[0_0_40px_rgba(184,194,138,0.2)] hover:shadow-[0_0_60px_rgba(184,194,138,0.38)] w-full sm:w-auto justify-center">
              Claim Your Spot
              <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4"/>
              </svg>
            </a>

            <p className="text-[0.6875rem] text-muted/35 mt-4">
              Free systems audit before any commitment
            </p>
          </div>

          {/* right — package card */}
          <motion.div
            className="glass rounded-2xl p-8 md:p-10 relative overflow-hidden"
            whileHover={{ y: -4 }}
            transition={{ type:"spring", stiffness:200, damping:20 }}>

            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-olive/30 to-transparent" />

            <h3 className="font-display font-light text-ivory text-xl tracking-tight mb-6">
              Everything included:
            </h3>

            <ul className="space-y-3.5 mb-8">
              {INCLUDES.map(item => (
                <li key={item} className="flex items-start gap-3">
                  <svg className="w-4 h-4 text-olive/60 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-sm text-muted leading-snug">{item}</span>
                </li>
              ))}
            </ul>

            <div className="hairline mb-6" />

            <p className="text-[0.625rem] text-muted/40 tracking-wider uppercase mb-3">Not included:</p>
            <ul className="space-y-2">
              {NOT_INCLUDED.map(item => (
                <li key={item} className="flex items-center gap-2.5 text-[0.6875rem] text-muted/35">
                  <span className="w-1 h-1 rounded-full bg-muted/20 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
