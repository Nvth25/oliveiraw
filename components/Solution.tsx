"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Diagram data ───────────────────────────────────────────────────────────*/
const NODES = [
  {
    id: "capture",
    label: "CAPTURE",
    desc: "the visitor lands",
    x: 110, cy: 90, r: 44,
  },
  {
    id: "qualify",
    label: "QUALIFY",
    desc: "the bot asks 3 questions",
    x: 370, cy: 90, r: 44,
  },
  {
    id: "convert",
    label: "CONVERT",
    desc: "Stripe + sales handoff",
    x: 630, cy: 90, r: 44,
  },
  {
    id: "retain",
    label: "RETAIN",
    desc: "follow-up fires for 90 days",
    x: 890, cy: 90, r: 44,
  },
] as const;

/* Line segments between adjacent node edges */
const LINES = [
  { id: "l1", x1: 154, x2: 326, length: 172 },
  { id: "l2", x1: 414, x2: 586, length: 172 },
  { id: "l3", x1: 674, x2: 846, length: 172 },
];

const METRICS = [
  { num: "< 60s",   label: "response time"           },
  { num: "92%",     label: "lead capture rate"        },
  { num: "3.4×",    label: "lead lift in 30 days"     },
] as const;

/* ─── Component ──────────────────────────────────────────────────────────────*/
export function Solution() {
  const sectionRef  = useRef<HTMLElement>(null);
  const diagramRef  = useRef<SVGSVGElement>(null);
  const travelerRef = useRef<SVGCircleElement>(null);
  const lineRefs    = useRef<(SVGLineElement | null)[]>([]);
  const nodeRefs    = useRef<(SVGCircleElement | null)[]>([]);
  const metricRefs  = useRef<(HTMLDivElement | null)[]>([]);
  const headRef     = useRef<HTMLDivElement>(null);
  const loopTl      = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const traveler = travelerRef.current;
    if (!section || !traveler) return;

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

    /* ── Manifesto lines stagger ─────────────────────────────────────────── */
    if (headRef.current) {
      const lines = headRef.current.querySelectorAll(".sol-line");
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

    /* ── SVG line draw ───────────────────────────────────────────────────── */
    lineRefs.current.forEach((line, i) => {
      if (!line) return;
      const len = LINES[i].length;
      gsap.set(line, { strokeDasharray: `${len}`, strokeDashoffset: `${len}` });
    });
    ScrollTrigger.create({
      trigger: diagramRef.current,
      start: "top 75%",
      onEnter: () => {
        lineRefs.current.forEach((line, i) => {
          if (!line) return;
          gsap.to(line, {
            strokeDashoffset: 0,
            duration: 0.65,
            ease: "expo.inOut",
            delay: i * 0.1,
          });
        });
        /* Node pop-in */
        nodeRefs.current.forEach((node, i) => {
          if (!node) return;
          gsap.fromTo(
            node,
            { scale: 0.6, opacity: 0, transformOrigin: `${NODES[i].x}px ${NODES[i].cy}px` },
            {
              scale: 1, opacity: 1,
              duration: 0.5,
              ease: "back.out(1.8)",
              delay: i * 0.08,
            }
          );
        });
        /* Kick off traveler loop after lines draw */
        setTimeout(startLoop, 800);
      },
      once: true,
    });

    /* ── Metrics fade-up ─────────────────────────────────────────────────── */
    metricRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.set(el, { opacity: 0, y: 20 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        onEnter: () =>
          gsap.to(el, {
            opacity: 1, y: 0,
            duration: 0.9,
            ease: "expo.out",
            delay: i * 0.1,
          }),
        once: true,
      });
    });

    /* ── Traveling dot loop ──────────────────────────────────────────────── */
    function startLoop() {
      if (!traveler) return;

      /*
        Correct positions: node CENTRES, not line edges.
        Correct timing:    pulse fires after dot ARRIVES (sequential),
                           not when it starts moving ("<" was the bug).
      */
      const cx = [NODES[0].x, NODES[1].x, NODES[2].x, NODES[3].x]; // 110 370 630 890
      const NODE_R = 44; // all nodes share the same radius

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });

      // Start: dot visible at CAPTURE
      tl.set(traveler, { attr: { cx: cx[0] }, opacity: 1 });

      // Pulse CAPTURE on start
      const n0 = nodeRefs.current[0];
      if (n0) tl.to(n0, { attr: { r: NODE_R + 6 }, duration: 0.18, ease: "sine.out", yoyo: true, repeat: 1 });

      // Travel → QUALIFY, then pulse on arrival
      tl.to(traveler, { attr: { cx: cx[1] }, duration: 1.0, ease: "power2.inOut" }, "+=0.15");
      const n1 = nodeRefs.current[1];
      if (n1) tl.to(n1, { attr: { r: NODE_R + 6 }, duration: 0.18, ease: "sine.out", yoyo: true, repeat: 1 });

      // Travel → CONVERT, then pulse on arrival
      tl.to(traveler, { attr: { cx: cx[2] }, duration: 1.0, ease: "power2.inOut" }, "+=0.15");
      const n2 = nodeRefs.current[2];
      if (n2) tl.to(n2, { attr: { r: NODE_R + 6 }, duration: 0.18, ease: "sine.out", yoyo: true, repeat: 1 });

      // Travel → RETAIN, then pulse on arrival
      tl.to(traveler, { attr: { cx: cx[3] }, duration: 1.0, ease: "power2.inOut" }, "+=0.15");
      const n3 = nodeRefs.current[3];
      if (n3) tl.to(n3, { attr: { r: NODE_R + 6 }, duration: 0.18, ease: "sine.out", yoyo: true, repeat: 1 });

      // Hold, then fade out and reset
      tl.to(traveler, { opacity: 0, duration: 0.3 }, "+=0.5");
      tl.set(traveler, { attr: { cx: cx[0] } });
      tl.to(traveler, { opacity: 1, duration: 0.2 });

      loopTl.current = tl;
    }

    return () => {
      loopTl.current?.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solution"
    >
      {/* Top rule */}
      <div className="wrap">
        <div style={{ height: "1px", background: "rgba(15,14,12,0.10)" }} />
      </div>

      <div className="wrap" style={{ paddingTop: "6rem", paddingBottom: "6rem" }}>

        {/* ── Manifesto header ────────────────────────────────────────────── */}
        <div ref={headRef} className="sol-head">
          <p className="sol-idx">03 / Solution</p>

          <div className="sol-manifesto">
            <p className="sol-line sol-line-reg">We don&apos;t sell marketing.</p>
            <p className="sol-line sol-line-em">
              <em
                style={{
                  fontVariationSettings: '"opsz" 144, "SOFT" 50, "ital" 1',
                  fontStyle: "normal",
                  color: "#0F0E0C",
                }}
              >
                We build the system
              </em>
            </p>
            <p className="sol-line sol-line-reg">that makes marketing work.</p>
          </div>
        </div>

        {/* ── System diagram ──────────────────────────────────────────────── */}
        <div className="sol-diagram-wrap">
          {/* SVG — circles + lines + labels */}
          <svg
            ref={diagramRef}
            viewBox="0 0 1000 220"
            preserveAspectRatio="xMidYMid meet"
            width="100%"
            aria-label="Client acquisition system: Capture, Qualify, Convert, Retain"
            overflow="visible"
          >
            {/* ── Dashed connector lines ── */}
            {LINES.map((l, i) => (
              <line
                key={l.id}
                ref={(el) => { lineRefs.current[i] = el; }}
                x1={l.x1} y1={90}
                x2={l.x2} y2={90}
                stroke="rgba(15,14,12,0.20)"
                strokeWidth="1"
                strokeDasharray="5 4"
              />
            ))}

            {/* ── Node circles ── */}
            {NODES.map((n, i) => (
              <circle
                key={n.id}
                ref={(el) => { nodeRefs.current[i] = el; }}
                cx={n.x} cy={n.cy} r={n.r}
                fill="#F5F1E8"
                stroke="rgba(15,14,12,0.22)"
                strokeWidth="1"
                style={{ cursor: "default", opacity: 0 }}
              />
            ))}

            {/* ── Traveling dot ── */}
            <circle
              ref={travelerRef}
              cx={NODES[0].x}
              cy={90}
              r={4}
              fill="#0F0E0C"
              opacity={0}
            />

            {/* ── Node labels (uppercase) ── */}
            {NODES.map((n) => (
              <text
                key={`lbl-${n.id}`}
                x={n.x}
                y={152}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-inter-tight, system-ui)",
                  fontSize: "9px",
                  letterSpacing: "0.18em",
                  fill: "rgba(15,14,12,0.45)",
                  textTransform: "uppercase",
                }}
              >
                {n.label}
              </text>
            ))}

            {/* ── Node descriptions (italic serif) ── */}
            {NODES.map((n) => (
              <text
                key={`desc-${n.id}`}
                x={n.x}
                y={172}
                textAnchor="middle"
                style={{
                  fontFamily: "var(--font-fraunces, serif)",
                  fontVariationSettings: '"opsz" 9, "SOFT" 60, "ital" 1',
                  fontSize: "9.5px",
                  fill: "rgba(15,14,12,0.38)",
                }}
              >
                {n.desc}
              </text>
            ))}

            {/* ── Node inner state — tiny ink dot at centre ── */}
            {NODES.map((n) => (
              <circle
                key={`dot-${n.id}`}
                cx={n.x} cy={n.cy} r={3}
                fill="rgba(15,14,12,0.18)"
              />
            ))}
          </svg>
        </div>

        {/* ── Metrics row ─────────────────────────────────────────────────── */}
        <div className="sol-metrics">
          {METRICS.map((m, i) => (
            <div key={i} ref={(el) => { metricRefs.current[i] = el; }} className="sol-metric">
              <span className="sol-metric-num">{m.num}</span>
              <span className="sol-metric-label">{m.label}</span>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        /* ── Header ── */
        .sol-head {
          margin-bottom: 5rem;
        }
        .sol-idx {
          font-family: var(--font-inter-tight, system-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(15,14,12,0.32);
          margin-bottom: 2.5rem;
        }
        .sol-manifesto {
          max-width: 28ch;
        }
        .sol-line {
          font-family: var(--font-fraunces, serif);
          font-weight: 300;
          line-height: 1.05;
          letter-spacing: -0.02em;
          display: block;
        }
        .sol-line-reg {
          font-variation-settings: "opsz" 144, "SOFT" 10;
          font-size: clamp(1.875rem, 3.2vw, 4rem);
          color: rgba(15,14,12,0.62);
        }
        .sol-line-em {
          font-variation-settings: "opsz" 144, "SOFT" 50;
          font-size: clamp(2.25rem, 4vw, 5rem);
          margin: 0.05em 0;
        }

        /* ── Diagram ── */
        .sol-diagram-wrap {
          width: 100%;
          max-width: 900px;
          margin: 0 auto 5rem;
        }

        /* ── Metrics ── */
        .sol-metrics {
          display: flex;
          align-items: stretch;
          gap: 0;
          border-top: 1px solid rgba(15,14,12,0.10);
          border-bottom: 1px solid rgba(15,14,12,0.10);
          max-width: 900px;
          margin: 0 auto;
        }
        .sol-metric {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.375rem;
          padding: 2rem 0 2rem clamp(1.5rem,3vw,3rem);
          border-right: 1px solid rgba(15,14,12,0.10);
        }
        .sol-metric:last-child { border-right: none; }
        .sol-metric-num {
          font-family: var(--font-fraunces, serif);
          font-variation-settings: "opsz" 72, "SOFT" 0;
          font-size: clamp(2rem, 3.5vw, 3.5rem);
          font-weight: 300;
          letter-spacing: -0.03em;
          color: #0F0E0C;
          line-height: 1;
        }
        .sol-metric-label {
          font-family: var(--font-inter-tight, system-ui);
          font-size: 0.625rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(15,14,12,0.38);
        }

        /* ── Mobile ── */
        @media (max-width: 599px) {
          .sol-metrics { flex-direction: column; }
          .sol-metric  { border-right: none; border-bottom: 1px solid rgba(15,14,12,0.08); padding: 1.5rem clamp(1.5rem,5vw,2.5rem); }
          .sol-metric:last-child { border-bottom: none; }
        }
      `}</style>
    </section>
  );
}
