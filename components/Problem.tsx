"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ─── Data ───────────────────────────────────────────────────────────────────*/
const PROBLEMS = [
  {
    num: 1,
    eyebrow: "THE COST OF DELAY",
    head: [
      { t: "Speed is the ", a: false },
      { t: "only", a: true },
      { t: " moat.", a: false },
    ],
    body: "A lead has a half-life of five minutes. After an hour, your odds of qualifying them drop 80%. Most businesses follow up in 47 hours.",
    stat: "78%",
    statLabel: "of leads convert with whoever responds first",
  },
  {
    num: 2,
    eyebrow: "THE SILENCE GAP",
    head: [
      { t: "Pretty doesn't ", a: false },
      { t: "pay.", a: true },
    ],
    body: "You invested in a beautiful website. No form that qualifies. No automation that warms. No system that converts. A brochure with a URL.",
    stat: "$2.4M",
    statLabel: "average annual revenue lost to slow follow-up",
  },
  {
    num: 3,
    eyebrow: "THE LEAK",
    head: [
      { t: "Most revenue ", a: false },
      { t: "escapes", a: true },
      { t: " in week two.", a: false },
    ],
    body: "The sale rarely happens on first contact. Without a 90-day follow-up sequence, 80% of potential revenue walks out the door — permanently.",
    stat: "2%",
    statLabel: "of inquiries close on first contact without automation",
  },
] as const;

/* ─── Component ──────────────────────────────────────────────────────────────*/
export function Problem() {
  const sectionRef  = useRef<HTMLElement>(null);
  const panelRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const numRefs     = useRef<(HTMLSpanElement | null)[]>([]);
  const lineRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mm = gsap.matchMedia();

    /* ── Desktop (≥900px) ────────────────────────────────────────────────── */
    mm.add("(min-width: 900px)", () => {
      panelRefs.current.forEach((panel, i) => {
        if (!panel) return;

        /* Line draw — clip-path reveal */
        const line = lineRefs.current[i];
        if (line) {
          gsap.set(line, { clipPath: "inset(0 100% 0 0)" });
          ScrollTrigger.create({
            trigger: panel,
            start: "top 72%",
            onEnter: () =>
              gsap.to(line, {
                clipPath: "inset(0 0% 0 0)",
                duration: 1.4,
                ease: "expo.inOut",
              }),
            once: true,
          });
        }

        /* Number count-up + clip reveal */
        const numEl = numRefs.current[i];
        if (numEl) {
          gsap.set(numEl, { opacity: 0, clipPath: "inset(100% 0 0 0)" });
          const obj = { val: 0 };
          ScrollTrigger.create({
            trigger: panel,
            start: "top 68%",
            onEnter: () => {
              gsap.to(numEl, {
                opacity: 1,
                clipPath: "inset(0% 0 0 0)",
                duration: 1,
                ease: "expo.out",
              });
              gsap.to(obj, {
                val: PROBLEMS[i].num,
                duration: 1.6,
                ease: "power3.out",
                onUpdate() {
                  if (numEl) numEl.textContent = `0${Math.round(obj.val)}`;
                },
              });
            },
            once: true,
          });
        }

        /* Content fade-up */
        const content = contentRefs.current[i];
        if (content) {
          gsap.set(content, { opacity: 0, y: 28 });
          ScrollTrigger.create({
            trigger: panel,
            start: "top 65%",
            onEnter: () =>
              gsap.to(content, {
                opacity: 1, y: 0,
                duration: 1.1,
                ease: "expo.out",
              }),
            once: true,
          });
        }
      });
    });

    /* ── Mobile (<900px) — simple fade-up per panel ─────────────────────── */
    mm.add("(max-width: 899px)", () => {
      panelRefs.current.forEach((panel) => {
        if (!panel) return;
        gsap.set(panel, { opacity: 0, y: 36 });
        ScrollTrigger.create({
          trigger: panel,
          start: "top 82%",
          onEnter: () =>
            gsap.to(panel, {
              opacity: 1, y: 0,
              duration: 1,
              ease: "expo.out",
            }),
          once: true,
        });
      });
    });

    return () => { mm.revert(); };
  }, []);

  return (
    <section ref={sectionRef} id="problem" style={{ background: "#F5F1E8" }}>

      {/* Top rule */}
      <div className="wrap">
        <div style={{ height: "1px", background: "rgba(15,14,12,0.10)" }} />
      </div>

      <div className="prb-layout">

        {/* ══════════ LEFT — sticky manifesto ══════════ */}
        <div className="prb-left">
          <div className="prb-left-in">

            <p className="prb-idx">02 / Problem</p>

            <h2 className="prb-h2">
              Most businesses{" "}
              <em
                style={{
                  color: "#C6F432",
                  fontVariationSettings: '"opsz" 144, "SOFT" 40, "ital" 1',
                  fontStyle: "normal",
                }}
              >
                bleed
              </em>{" "}
              leads.
            </h2>

            <p className="prb-sub">
              Not because their marketing fails. Because the system
              behind it never existed.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: "0.625rem" }}>
              <span className="dot-lime" aria-hidden />
              <span className="prb-badge">Observed in 92% of audits</span>
            </div>
          </div>
        </div>

        {/* ══════════ RIGHT — three full-height panels ══════════ */}
        <div className="prb-right">
          {PROBLEMS.map((p, i) => (
            <div
              key={i}
              ref={(el) => { panelRefs.current[i] = el; }}
              className="prb-panel"
            >
              {/* Top rule — draws left-to-right */}
              <div
                ref={(el) => { lineRefs.current[i] = el; }}
                aria-hidden
                style={{
                  position: "absolute",
                  top: 0, left: 0, right: 0,
                  height: "1px",
                  background: "rgba(15,14,12,0.16)",
                  clipPath: "inset(0 100% 0 0)",
                }}
              />

              <div className="prb-panel-row">
                {/* Huge italic number */}
                <span
                  ref={(el) => { numRefs.current[i] = el; }}
                  className="prb-num"
                  aria-hidden
                >
                  0{p.num}
                </span>

                {/* Editorial text block */}
                <div
                  ref={(el) => { contentRefs.current[i] = el; }}
                  className="prb-content"
                >
                  <p className="prb-eyebrow">{p.eyebrow}</p>

                  <h3 className="prb-h3">
                    {p.head.map((part, j) =>
                      part.a ? (
                        <em
                          key={j}
                          style={{
                            color: "#C6F432",
                            fontVariationSettings: '"opsz" 144, "SOFT" 40, "ital" 1',
                            fontStyle: "normal",
                          }}
                        >
                          {part.t}
                        </em>
                      ) : (
                        <span key={j}>{part.t}</span>
                      )
                    )}
                  </h3>

                  <p className="prb-body">{p.body}</p>

                  <div className="prb-stat">
                    <span className="prb-stat-n">{p.stat}</span>
                    <span className="prb-stat-l">{p.statLabel}</span>
                  </div>
                </div>
              </div>

              {/* Hover cue */}
              <span className="prb-readmore" aria-hidden>→ Read more</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        /* ── Layout ── */
        .prb-layout { display: flex; align-items: flex-start; }

        /* ── Left ── */
        .prb-left {
          position: sticky;
          top: 0;
          width: 42%;
          flex-shrink: 0;
          height: 100vh;
          display: flex;
          align-items: center;
          border-right: 1px solid rgba(15,14,12,0.08);
        }
        .prb-left-in {
          padding: 0 clamp(1.5rem, 4vw, 5rem);
        }
        .prb-idx {
          font-family: var(--font-inter-tight, system-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: rgba(15,14,12,0.32);
          margin-bottom: 2.75rem;
        }
        .prb-h2 {
          font-family: var(--font-fraunces, serif);
          font-variation-settings: "opsz" 144, "SOFT" 20;
          font-size: clamp(2.75rem, 5.2vw, 6.5rem);
          font-weight: 300;
          line-height: 0.96;
          letter-spacing: -0.02em;
          color: #0F0E0C;
          margin-bottom: 1.75rem;
        }
        .prb-sub {
          font-family: var(--font-inter-tight, system-ui);
          font-size: 0.9375rem;
          line-height: 1.68;
          color: rgba(15,14,12,0.52);
          max-width: 30ch;
          margin-bottom: 2.5rem;
        }
        .prb-badge {
          font-family: var(--font-inter-tight, system-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: rgba(15,14,12,0.38);
        }

        /* ── Right / Panels ── */
        .prb-right { flex: 1; min-width: 0; }
        .prb-panel {
          position: relative;
          height: 100vh;
          display: flex;
          align-items: center;
          padding: 0 clamp(1.5rem, 4vw, 4rem);
          border-bottom: 1px solid rgba(15,14,12,0.055);
          overflow: hidden;
          cursor: default;
        }
        .prb-panel:last-child { border-bottom: none; }
        .prb-panel-row {
          display: flex;
          align-items: center;
          gap: clamp(1rem, 3vw, 3rem);
          width: 100%;
        }
        .prb-num {
          font-family: var(--font-fraunces, serif);
          font-variation-settings: "opsz" 144, "SOFT" 50, "ital" 1;
          font-size: clamp(6.5rem, 12vw, 14rem);
          font-weight: 300;
          line-height: 0.82;
          color: #C6F432;
          flex-shrink: 0;
          letter-spacing: -0.04em;
          user-select: none;
          display: block;
          transition: transform 0.45s cubic-bezier(0.16,1,0.3,1);
          will-change: transform;
        }
        .prb-panel:hover .prb-num {
          transform: skewX(-2.5deg) translateY(-5px);
        }
        .prb-content { max-width: 38ch; }
        .prb-eyebrow {
          font-family: var(--font-inter-tight, system-ui);
          font-size: 0.5rem;
          letter-spacing: 0.24em;
          text-transform: uppercase;
          color: rgba(15,14,12,0.35);
          margin-bottom: 1rem;
        }
        .prb-h3 {
          font-family: var(--font-fraunces, serif);
          font-variation-settings: "opsz" 144, "SOFT" 20;
          font-size: clamp(1.625rem, 2.5vw, 2.75rem);
          font-weight: 300;
          line-height: 1.1;
          letter-spacing: -0.01em;
          color: #0F0E0C;
          margin-bottom: 1rem;
        }
        .prb-body {
          font-family: var(--font-inter-tight, system-ui);
          font-size: 0.875rem;
          line-height: 1.72;
          color: rgba(15,14,12,0.54);
          margin-bottom: 1.625rem;
        }
        .prb-stat {
          display: flex;
          align-items: baseline;
          gap: 0.875rem;
          padding: 0.875rem 1.125rem;
          background: rgba(15,14,12,0.032);
          border-radius: 0.375rem;
          border-left: 2px solid #C6F432;
        }
        .prb-stat-n {
          font-family: var(--font-fraunces, serif);
          font-variation-settings: "opsz" 72, "SOFT" 0;
          font-size: clamp(1.25rem, 2vw, 1.875rem);
          font-weight: 400;
          color: #0F0E0C;
          letter-spacing: -0.02em;
          white-space: nowrap;
        }
        .prb-stat-l {
          font-family: var(--font-inter-tight, system-ui);
          font-size: 0.75rem;
          line-height: 1.5;
          color: rgba(15,14,12,0.48);
          max-width: 22ch;
        }
        .prb-readmore {
          position: absolute;
          bottom: 1.625rem;
          right: clamp(1.5rem, 4vw, 4rem);
          font-family: var(--font-inter-tight, system-ui);
          font-size: 0.5625rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #C6F432;
          opacity: 0;
          transform: translateX(8px);
          transition: opacity 0.3s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
        }
        .prb-panel:hover .prb-readmore {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Mobile ── */
        @media (max-width: 899px) {
          .prb-layout  { flex-direction: column; }
          .prb-left    { position: relative; top: auto; width: 100%; height: auto; border-right: none; border-bottom: 1px solid rgba(15,14,12,0.08); }
          .prb-left-in { padding: 5rem clamp(1.5rem,5vw,2.5rem) 3.5rem; }
          .prb-right   { width: 100%; }
          .prb-panel   { height: auto; min-height: 80vh; padding: 3rem clamp(1.5rem,5vw,2.5rem); }
          .prb-panel-row { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
          .prb-num     { font-size: clamp(5rem, 22vw, 8rem); }
        }
      `}</style>
    </section>
  );
}
