"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * Custom editorial cursor:
 *  - Small dot that follows mouse exactly
 *  - Larger ring that lags behind (lerp)
 *  - Magnetic effect: buttons/links with [data-magnetic] shift toward cursor
 *  - Disabled below 900px viewport width
 */
export function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse   = useRef({ x: -100, y: -100 });
  const ring    = useRef({ x: -100, y: -100 });
  const raf     = useRef(0);

  useEffect(() => {
    if (window.innerWidth < 900) return;

    const dot  = dotRef.current!;
    const ringEl = ringRef.current!;

    /* ── Move dot instantly, ring with lag ─────────────────────────────────── */
    const onMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      gsap.set(dot, { x: e.clientX, y: e.clientY });
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const tick = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1);
      gsap.set(ringEl, { x: ring.current.x, y: ring.current.y });
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    /* ── Hover states ──────────────────────────────────────────────────────── */
    const onEnter = () => {
      dot.classList.add("is-hovering");
      ringEl.classList.add("is-hovering");
    };
    const onLeave = () => {
      dot.classList.remove("is-hovering");
      ringEl.classList.remove("is-hovering");
    };

    /* ── Magnetic effect ───────────────────────────────────────────────────── */
    const magnetics: Array<{ el: Element; onMove: (e: MouseEvent) => void; onLeave: () => void }> = [];

    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      const strength = parseFloat((el as HTMLElement).dataset.magneticStrength ?? "0.3");
      const radius = 80;

      const handleMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width  / 2;
        const cy = rect.top  + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < radius) {
          const pull = ((radius - dist) / radius) * strength;
          gsap.to(el, {
            x: dx * pull,
            y: dy * pull,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto",
          });
        } else {
          gsap.to(el, {
            x: 0, y: 0,
            duration: 0.5,
            ease: "expo.out",
            overwrite: "auto",
          });
        }
      };

      const handleLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.4)" });
      };

      el.addEventListener("mousemove", handleMove as EventListener);
      el.addEventListener("mouseleave", handleLeave);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      magnetics.push({ el, onMove: handleMove, onLeave: handleLeave });
    });

    /* interactives without magnetic */
    document.querySelectorAll("a:not([data-magnetic]), button:not([data-magnetic])").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("mousemove", onMouseMove);
      magnetics.forEach(({ el, onMove, onLeave: ol }) => {
        el.removeEventListener("mousemove", onMove as EventListener);
        el.removeEventListener("mouseleave", ol);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef}   className="cursor-dot"  aria-hidden />
      <div ref={ringRef}  className="cursor-ring" aria-hidden />
    </>
  );
}
