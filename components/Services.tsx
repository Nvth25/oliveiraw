"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ───────────────────────────────────────────────────────────────────*/
const SERVICES = [
  {
    num: "01",
    title: "AI Lead Capture",
    tag: "Conversion",
    desc: "We replace passive contact forms with intelligent capture flows — bots that qualify intent, gather context, and respond in under 60 seconds. No lead cools before you know about it.",
    detail: "Custom-trained on your offer, tone, and ICP. Deploys to your existing site in 48 hours. Works 24/7 without a sales rep present.",
  },
  {
    num: "02",
    title: "Qualification Engine",
    tag: "Automation",
    desc: "Three questions. That's all it takes to separate a buyer from a browser. Our engine scores every lead the moment it arrives and routes hot prospects directly to your calendar.",
    detail: "Scoring logic tuned to your deal size and close criteria. CRM sync included. Warm leads escalate to human immediately.",
  },
  {
    num: "03",
    title: "90-Day Follow-Up System",
    tag: "Retention",
    desc: "80% of revenue is lost in the silence after first contact. We build the full sequence — email, SMS, retargeting — that runs without you for three months and closes what would have slipped away.",
    detail: "Behaviour-triggered, not calendar-triggered. Each touchpoint adapts to what the prospect has or hasn't done.",
  },
  {
    num: "04",
    title: "Conversion-Optimised Landing Pages",
    tag: "Design",
    desc: "A website that looks beautiful but converts nothing is a brochure with a domain. We build landing experiences engineered around one outcome: the next step in your funnel.",
    detail: "Framer or Webflow. Built and live in 5 days. A/B testing framework included from day one.",
  },
  {
    num: "05",
    title: "CRM Architecture",
    tag: "Infrastructure",
    desc: "Your data is only useful if your team can act on it. We design and configure the pipeline structure, automation triggers, and reporting views so your CRM becomes a revenue tool, not a contact list.",
    detail: "HubSpot, GoHighLevel, or custom stack. Migration, cleanup, and team training included.",
  },
  {
    num: "06",
    title: "Paid Acquisition",
    tag: "Growth",
    desc: "We don't run ads. We build acquisition systems — full-funnel campaigns where every click has a destination and every visitor has a path. Spend follows signal, not guesswork.",
    detail: "Meta and Google. Minimum 30-day ramp. Performance guarantee or we refund management fee.",
  },
  {
    num: "07",
    title: "System Audit",
    tag: "Strategy",
    desc: "Before building anything new, we map every leak in your current pipeline. One week. One document. A clear diagnosis of where revenue is escaping and exactly what to do about it.",
    detail: "Delivered as a recorded walkthrough + written report. No retainer required. Can be booked standalone.",
  },
] as const;

/* ─── Component ──────────────────────────────────────────────────────────────*/
export function Services() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef  = useRef<HTMLElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const rowRefs     = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 899px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    /* ── Section entrance ────────────────────────────────────────────────── */
    gsap.set(section, { opacity: 0, y: 40 });
    ScrollTrigger.create({
      trigger: section,
      start: "top 88%",
      onEnter: () =>
        gsap.to(section, {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: "expo.out",
        }),
      once: true,
    });

    /* ── Header lines stagger ────────────────────────────────────────────── */
    if (headRef.current) {
      const lines = headRef.current.querySelectorAll(".srv-line");
      gsap.set(lines, { opacity: 0, y: 18 });
      ScrollTrigger.create({
        trigger: headRef.current,
        start: "top 80%",
        onEnter: () =>
          gsap.to(lines, {
            opacity: 1, y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "expo.out",
          }),
        once: true,
      });
    }

    /* ── Row stagger entrance ────────────────────────────────────────────── */
    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      gsap.set(row, { opacity: 0, y: 16 });
      ScrollTrigger.create({
        trigger: row,
        start: "top 88%",
        onEnter: () =>
          gsap.to(row, {
            opacity: 1, y: 0,
            duration: 0.65,
            ease: "expo.out",
            delay: i * 0.08,
          }),
        once: true,
      });
    });

    return () => { ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  return (
    <section ref={sectionRef} id="services">

      {/* Top rule */}
      <div className="wrap">
        <div style={{ height: "1px", background: "rgba(15,14,12,0.10)" }} />
      </div>

      <div className="wrap" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div ref={headRef} className="srv-header">
          <div className="srv-header-left">
            <p className="srv-idx">04 / Services</p>
            <div className="srv-manifesto">
              <p className="srv-line srv-line-reg">Seven systems.</p>
              <p className="srv-line srv-line-em">
                <em style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 50, "ital" 1',
                  fontStyle: "normal",
                  color: "#0F0E0C",
                }}>
                  One outcome.
                </em>
              </p>
            </div>
          </div>
          <div className="srv-header-right srv-line">
            <p className="srv-header-copy">
              Every service we offer exists to solve one problem: your pipeline is leaking.
              Some clients need one system. Most need three or four working in sequence.
              We scope, build, and hand off — or run it for you.
            </p>
          </div>
        </div>

        {/* ── Index list ──────────────────────────────────────────────────── */}
        <div
          className="srv-list"
          onMouseLeave={() => !isMobile && setHovered(null)}
        >
          {SERVICES.map((s, i) => (
            <div
              key={i}
              ref={(el) => { rowRefs.current[i] = el; }}
              className="srv-row"
              style={{
                opacity: !isMobile && hovered !== null && hovered !== i ? 0.4 : 1,
                transition: "opacity 0.3s ease",
              }}
              onMouseEnter={() => !isMobile && setHovered(i)}
            >
              {/* Hairline that draws on hover */}
              <div
                className="srv-row-line"
                style={{
                  clipPath: hovered === i ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
                  transition: "clip-path 0.45s cubic-bezier(0.16,1,0.3,1)",
                }}
                aria-hidden
              />

              {/* Row header — always visible */}
              <div className="srv-row-head">

                {/* Number */}
                <motion.span
                  className="srv-num"
                  animate={{ scale: hovered === i ? 1.05 : 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  {s.num}
                </motion.span>

                {/* Title + tag */}
                <div className="srv-title-wrap">
                  <span className="srv-title">{s.title}</span>
                  <span className="srv-tag">{s.tag}</span>
                </div>

                {/* Toggle icon */}
                <motion.span
                  className="srv-toggle"
                  animate={{ rotate: hovered === i ? 45 : 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden
                >
                  +
                </motion.span>
              </div>

              {/* Expand panel */}
              <AnimatePresence initial={false}>
                {(hovered === i || isMobile) && (
                  <motion.div
                    key="panel"
                    initial={isMobile ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={isMobile ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="srv-panel">
                      <p className="srv-panel-desc">{s.desc}</p>
                      <p className="srv-panel-detail">{s.detail}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        /* ── Header ── */
        .srv-header {
          display: flex;
          align-items: flex-start;
          gap: clamp(3rem, 8vw, 10rem);
          margin-bottom: 5rem;
        }
        .srv-header-left { flex-shrink: 0; }
        .srv-header-right {
          max-width: 40ch;
          padding-top: 3.5rem;
        }
        .srv-idx {
          font-family: var(--font-inter-tight, system-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(15,14,12,0.32);
          margin-bottom: 2.5rem;
        }
        .srv-manifesto { max-width: 20ch; }
        .srv-line {
          font-family: var(--font-fraunces, serif);
          font-weight: 300;
          line-height: 1.05;
          letter-spacing: -0.02em;
          display: block;
        }
        .srv-line-reg {
          font-variation-settings: "opsz" 144, "SOFT" 10;
          font-size: clamp(1.875rem, 3.2vw, 4rem);
          color: rgba(15,14,12,0.62);
        }
        .srv-line-em {
          font-variation-settings: "opsz" 144, "SOFT" 50;
          font-size: clamp(2.25rem, 4vw, 5rem);
          margin: 0.05em 0;
        }
        .srv-header-copy {
          font-family: var(--font-inter-tight, system-ui);
          font-size: 0.9375rem;
          line-height: 1.72;
          color: rgba(15,14,12,0.52);
        }

        /* ── List ── */
        .srv-list {
          max-width: 900px;
          border-top: 1px solid rgba(15,14,12,0.10);
        }

        /* ── Row ── */
        .srv-row {
          position: relative;
          border-bottom: 1px solid rgba(15,14,12,0.10);
          cursor: default;
        }
        .srv-row-line {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: rgba(15,14,12,0.55);
          pointer-events: none;
          z-index: 1;
        }
        .srv-row-head {
          display: flex;
          align-items: center;
          gap: clamp(1.25rem, 3vw, 2.5rem);
          padding: 1.625rem 0;
        }
        .srv-num {
          font-family: var(--font-fraunces, serif);
          font-variation-settings: "opsz" 9, "SOFT" 0;
          font-size: clamp(0.625rem, 0.9vw, 0.75rem);
          font-weight: 300;
          letter-spacing: 0.12em;
          color: rgba(15,14,12,0.28);
          flex-shrink: 0;
          display: inline-block;
          width: 2.5rem;
          transform-origin: left center;
        }
        .srv-title-wrap {
          flex: 1;
          display: flex;
          align-items: baseline;
          gap: 1.25rem;
          min-width: 0;
        }
        .srv-title {
          font-family: var(--font-fraunces, serif);
          font-variation-settings: "opsz" 72, "SOFT" 10;
          font-size: clamp(1.25rem, 2.2vw, 2rem);
          font-weight: 300;
          letter-spacing: -0.015em;
          color: #0F0E0C;
          line-height: 1.1;
        }
        .srv-tag {
          font-family: var(--font-inter-tight, system-ui);
          font-size: 0.5rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(15,14,12,0.30);
          flex-shrink: 0;
        }
        .srv-toggle {
          font-family: var(--font-inter-tight, system-ui);
          font-size: 1.25rem;
          font-weight: 300;
          color: rgba(15,14,12,0.38);
          flex-shrink: 0;
          display: inline-block;
          line-height: 1;
          transform-origin: center center;
          user-select: none;
        }

        /* ── Panel ── */
        .srv-panel {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(1.5rem, 4vw, 4rem);
          padding: 0 0 2rem calc(2.5rem + clamp(1.25rem, 3vw, 2.5rem));
        }
        .srv-panel-desc {
          font-family: var(--font-inter-tight, system-ui);
          font-size: 0.9375rem;
          line-height: 1.72;
          color: rgba(15,14,12,0.58);
          max-width: 38ch;
        }
        .srv-panel-detail {
          font-family: var(--font-inter-tight, system-ui);
          font-size: 0.8125rem;
          line-height: 1.68;
          color: rgba(15,14,12,0.38);
          max-width: 34ch;
        }

        /* ── Mobile ── */
        @media (max-width: 899px) {
          .srv-header {
            flex-direction: column;
            gap: 2rem;
            margin-bottom: 3rem;
          }
          .srv-header-right { padding-top: 0; }
          .srv-row { opacity: 1 !important; }
          .srv-panel {
            grid-template-columns: 1fr;
            gap: 1rem;
            padding-left: 0;
            padding-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
}
