"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const NODES = [
  { num:"01", label:"Capture",  desc:"Lead lands on your optimised funnel or WhatsApp flow. Instantly captured, tagged, and entered into the system." },
  { num:"02", label:"Qualify",  desc:"AI-powered qualification sequences filter prospects by intent, budget, and fit — 24/7, without human effort." },
  { num:"03", label:"Convert",  desc:"Hot leads are routed to your calendar with context, social proof, and urgency — ready to close." },
  { num:"04", label:"Retain",   desc:"Post-sale automation handles onboarding, upsells, referrals, and renewals. Revenue that compounds itself." },
];

export function Solution() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sol-head", { opacity:0, y:28, duration:1, ease:"expo.out",
        scrollTrigger:{ trigger:".sol-head", start:"top 80%", once:true } });
      gsap.from(".sol-node", { opacity:0, y:36, stagger:0.1, duration:0.9, ease:"expo.out",
        scrollTrigger:{ trigger:".sol-node", start:"top 78%", once:true } });
      gsap.from(".sol-line", { scaleX:0, duration:1.2, ease:"expo.out", transformOrigin:"left center",
        scrollTrigger:{ trigger:".sol-line", start:"top 78%", once:true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="solution" className="section-py bg-surface overflow-hidden">
      <div className="wrap">
        {/* header */}
        <div className="sol-head max-w-xl mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-6 bg-olive/50" />
            <span className="overline">The System</span>
          </div>
          <h2 className="font-display font-light text-ivory leading-[0.94] tracking-tight"
            style={{ fontSize:"clamp(2.25rem,5vw,4.5rem)" }}>
            One complete engine.
            <br /><span className="olive-text">Four unstoppable stages.</span>
          </h2>
        </div>

        {/* diagram */}
        <div className="relative">
          {/* connector line (desktop) */}
          <div className="sol-line hidden md:block absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-olive/20 via-olive/50 to-olive/20" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-4">
            {NODES.map((n, i) => (
              <motion.div key={n.label}
                className="sol-node glass rounded-2xl p-7 flex flex-col group hover:border-olive/30 hover:shadow-[0_0_40px_rgba(184,194,138,0.07)] transition-all duration-300 cursor-pointer"
                whileHover={{ y: -4 }}
                transition={{ type:"spring", stiffness:260, damping:20 }}>

                {/* circle with number */}
                <div className="relative w-11 h-11 mb-6 self-center">
                  <div className="absolute inset-0 rounded-full border border-olive/30 group-hover:border-olive/60 group-hover:shadow-[0_0_20px_rgba(184,194,138,0.15)] transition-all duration-300" />
                  <span className="absolute inset-0 flex items-center justify-center font-mono text-[0.6875rem] text-olive">{n.num}</span>
                </div>

                <h3 className="font-display font-light text-ivory text-xl tracking-tight text-center mb-3">
                  {n.label}
                </h3>
                <p className="text-sm text-muted leading-relaxed text-center flex-1">{n.desc}</p>

                {/* arrow connector (mobile) */}
                {i < NODES.length - 1 && (
                  <div className="md:hidden flex justify-center mt-6">
                    <svg className="w-5 h-5 text-olive/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
