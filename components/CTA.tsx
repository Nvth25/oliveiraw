"use client";
import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end","end start"] });
  const bgY = useTransform(scrollYProgress, [0,1], ["-6%","6%"]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".cta-word", { yPercent:110, opacity:0, stagger:0.07, duration:1.1, ease:"expo.out",
        scrollTrigger:{ trigger:".cta-word", start:"top 74%", once:true } });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="cta" className="relative overflow-hidden bg-void section-py">
      <motion.div style={{ y: bgY }} aria-hidden className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full"
          style={{ background:"radial-gradient(ellipse,rgba(184,194,138,0.045) 0%,transparent 70%)" }} />
      </motion.div>
      <div className="absolute top-0 inset-x-0 hairline-olive" />

      <div className="relative z-10 wrap">
        {/* label */}
        <motion.div className="flex items-center gap-4 mb-10"
          initial={{ opacity:0 }} whileInView={{ opacity:1 }} viewport={{ once:true }}
          transition={{ duration:0.8, ease:[0.16,1,0.3,1] }}>
          <div className="h-px w-6 bg-olive/50" />
          <span className="overline">Ready to scale?</span>
        </motion.div>

        {/* headline */}
        <div className="mb-14 md:mb-16">
          <div className="flex flex-wrap" style={{ gap:"0 0.28em" }}>
            {["Let's","build","something","exceptional."].map((word, i) => (
              <div key={i} className="overflow-hidden">
                <span className={`cta-word inline-block font-display font-extralight leading-[0.9] tracking-[-0.02em] ${i===3?"olive-text":"text-ivory"}`}
                  style={{ fontSize:"clamp(3rem,8vw,8.5rem)", opacity:0, transform:"translateY(110%)" }}>
                  {word}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* body + CTAs */}
        <motion.div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end"
          initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
          transition={{ duration:1, delay:0.3, ease:[0.16,1,0.3,1] }}>

          <div>
            <p className="text-lg text-muted leading-relaxed max-w-md mb-10">
              Start with a free systems audit. We map every automation opportunity in your business and show you exactly what to build first.
            </p>

            {/* WhatsApp CTA */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <a href="https://wa.me/message/oliveira" target="_blank" rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 bg-olive text-void text-[0.8125rem] font-semibold tracking-wide rounded-full px-8 h-12 hover:bg-olive-light transition-all duration-300 shadow-[0_0_40px_rgba(184,194,138,0.2)] hover:shadow-[0_0_60px_rgba(184,194,138,0.38)]">
                {/* WhatsApp icon */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Book on WhatsApp
                <svg className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 16 16" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10M9 4l4 4-4 4"/>
                </svg>
              </a>
              <a href="mailto:hello@oliveira.studio"
                className="text-[0.8125rem] text-muted/60 hover:text-ivory transition-colors duration-300">
                or email us →
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {["No commitment required","Results in 30 days","100% done-for-you"].map(item => (
                <div key={item} className="flex items-center gap-2">
                  <svg className="w-3 h-3 text-olive/50 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span className="text-[0.6875rem] text-muted/40">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* right — contact card */}
          <div className="hidden lg:block">
            <div className="glass rounded-2xl p-8 space-y-5">
              <p className="text-[0.5625rem] text-muted/40 tracking-widest uppercase">Reach us directly</p>
              <a href="mailto:hello@oliveira.studio"
                className="block font-display font-light text-ivory/80 hover:text-olive transition-colors duration-300"
                style={{ fontSize:"clamp(1.1rem,1.6vw,1.375rem)" }}>
                hello@oliveira.studio
              </a>
              <div className="hairline" />
              <div className="flex flex-wrap gap-2">
                {["Available globally","< 24h response","Free audit"].map(label => (
                  <span key={label} className="text-[0.5625rem] text-muted/40 border border-border rounded-full px-3 py-1 tracking-wide">
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 hairline-olive" />
    </section>
  );
}
