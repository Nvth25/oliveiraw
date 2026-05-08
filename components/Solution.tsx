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
    gsap.set(section, { opacity: 0, y: 60 });
    ScrollTrigger.create({
      trigger: section,
      start: "top 78%",
      onEnter: () =>
        gsap.to(section, {
          opacity: 1, y: 0,
          duration: 1.1,
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
            duration: 1.2,
            ease: "expo.inOut",
            delay: i * 0.18,
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
              duration: 0.7,
              ease: "back.out(1.8)",
              delay: i * 0.14,
            }
          );
        });
        /* Kick off traveler loop after lines draw */
        setTimeout(startLoop, 1400);
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
      gsap.set(traveler, { opacity: 1 });

      const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2 });

      // Travel across each line segment, lighting nodes on arrival
      const stops = [
        LINES[0].x1,   // start of line 1
        LINES[0].x2,   // → node 2
        LINES[1].x2,   // → node 3
        LINES[2].x2,   // → node 4
      ];

      stops.forEach((x, i) => {
        tl.to(
          traveler,
          {
            attr: { cx: x },
            duration: i === 0 ? 0 : 0.65,
            ease: "power2.inOut",
          },
          i === 0 ? 0 : ">"
        );
        /* Pulse the node we just reached */
        const nodeIdx = i === 0 ? 0 : i;
        const n = nodeRefs.current[nodeIdx];
        if (n) {
          tl.to(
            n,
            {
              attr: { r: NODES[nodeIdx].r + 5 },
              fill: "#C6F432",
              duration: 0.2,
              ease: "power1.out",
              yoyo: true,
              repeat: 1,
            },
            "<"
          );
        }
      });

      // Fade out traveler at end before reset
      tl.to(traveler, { opacity: 0, duration: 0.25 }, ">");
      tl.set(traveler, { attr: { cx: LINES[0].x1 } });
      tl.to(traveler, { opacity: 1, duration: 0.15 });

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
      style={{ background: "#F5F1E8" }}
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
                  color: "#C6F432",
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
              cx={LINES[0].x1}
              cy={90}
              r={4}
              fill="#C6F432"
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
