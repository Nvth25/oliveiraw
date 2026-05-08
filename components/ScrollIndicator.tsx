"use client";

/**
 * Rotating circular "SCROLL DOWN ✦" text, monopo-style.
 * Pure CSS animation — no GSAP needed.
 */
export function ScrollIndicator() {
  const TEXT = "SCROLL DOWN  ✦  SCROLL DOWN  ✦  ";
  const R    = 28;          // circle radius
  const CX   = 32;          // viewBox centre
  const CY   = 32;
  const CIRC = Math.round(2 * Math.PI * R);

  // Build textPath with individual characters around the circle
  return (
    <div className="relative w-16 h-16" aria-label="Scroll down">
      <svg
        viewBox="0 0 64 64"
        className="scroll-ring w-full h-full"
        aria-hidden
        fill="none"
      >
        <defs>
          <path
            id="srCircle"
            d={`
              M ${CX},${CY - R}
              a ${R},${R} 0 1,1 -0.001,0
            `}
          />
        </defs>
        <text
          style={{
            fontFamily: "var(--font-inter-tight, system-ui)",
            fontSize: "5.6px",
            letterSpacing: "0.12em",
            fill: "rgba(15,14,12,0.35)",
            fontWeight: 500,
          }}
        >
          <textPath href="#srCircle" startOffset="0%">
            {TEXT}
          </textPath>
        </text>
      </svg>

      {/* Centre dot */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center"
      >
        <span
          className="block w-1 h-1 rounded-full"
          style={{ background: "rgba(15,14,12,0.2)" }}
        />
      </span>
    </div>
  );
}
