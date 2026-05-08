"use client";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Conversion Websites",
    tag:   "Foundation",
    body:  "Landing pages and full sites engineered to convert. Every element designed with intent — headline, proof, CTA.",
    metric:"3× avg. conversion lift",
  },
  {
    title: "Payment Integrations",
    tag:   "Revenue",
    body:  "Stripe, local gateways, subscription logic. Clients pay smoothly; you never chase invoices again.",
    metric:"Zero manual billing",
  },
  {
    title: "WhatsApp Automation",
    tag:   "Engagement",
    body:  "AI sequences that qualify, nurture, and book appointments automatically via WhatsApp Business API.",
    metric:"+37pts show-up rate",
  },
  {
    title: "Follow-Up Systems",
    tag:   "Retention",
    body:  "Multi-channel automated follow-up — email, WhatsApp, SMS. No lead falls through the cracks.",
    metric:"6× more closed deals",
  },
  {
    title: "Lead Capture Funnels",
    tag:   "Acquisition",
    body:  "High-converting opt-in pages, quiz funnels, and lead magnets that feed your CRM around the clock.",
    metric:"340% avg. lead increase",
  },
  {
    title: "CRM & Pipeline",
    tag:   "Operations",
    body:  "Full CRM setup — custom pipelines, lead scoring, automated stage transitions, team dashboards.",
    metric:"28h saved per week",
  },
  {
    title: "AI Customer Interaction",
    tag:   "Intelligence",
    body:  "GPT-powered chatbots that handle FAQs, qualify leads, and schedule calls — your best salesperson never sleeps.",
    metric:"24/7 qualified pipeline",
  },
];

export function Services() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".svc-head", { opacity:0, y:28, duration:1, ease:"expo.out",
        scrollTrigger:{ trigger:".svc-head", start:"top 82%", once:true } });
      gsap.from(".svc-row", { opacity:0, y:28, stagger:0.07, duration:0.85, ease:"expo.out",
        scrollTrigger:{ trigger:".svc-row", start:"top 82%", once:true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="services" className="section-py bg-void overflow-hidden">
      <div className="wrap">
        <div className="svc-head grid grid-cols-1 lg:grid-cols-2 gap-10 items-end mb-14 md:mb-18">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6 bg-olive/50" />
              <span className="overline">Services</span>
            </div>
            <h2 className="font-display font-light text-ivory leading-[0.94] tracking-tight"
              style={{ fontSize:"clamp(2.25rem,5vw,4.5rem)" }}>
              Everything you need
              <br /><span className="olive-text">to scale.</span>
            </h2>
          </div>
          <p className="text-base text-muted leading-relaxed max-w-sm">
            Seven integrated systems. One cohesive engine. We don&apos;t deliver tools — we deliver outcomes.
          </p>
        </div>

        {/* list */}
        <div className="flex flex-col divide-y divide-border">
          {SERVICES.map((s, i) => (
            <motion.div key={s.title}
              className="svc-row group flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-6 cursor-pointer"
              whileHover={{ x: 4 }}
              transition={{ type:"spring", stiffness:300, damping:25 }}>

              <div className="flex items-start sm:items-center gap-5 flex-1">
                <span className="font-mono text-[0.6rem] text-olive/50 w-6 shrink-0 mt-1 sm:mt-0">
                  {String(i+1).padStart(2,"0")}
                </span>
                <div>
                  <span className="text-[0.5625rem] text-olive/60 tracking-widest uppercase mb-1 block">{s.tag}</span>
                  <h3 className="font-display font-light text-ivory group-hover:text-olive transition-colors duration-300"
                    style={{ fontSize:"clamp(1.125rem,1.8vw,1.5rem)" }}>
                    {s.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-muted leading-relaxed max-w-xs hidden md:block">{s.body}</p>

              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[0.625rem] text-olive/70 border border-olive/20 rounded-full px-3 py-1 tracking-wider whitespace-nowrap group-hover:border-olive/40 transition-colors duration-300">
                  {s.metric}
                </span>
                <svg className="w-4 h-4 text-olive/30 group-hover:text-olive group-hover:translate-x-0.5 transition-all duration-300" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
