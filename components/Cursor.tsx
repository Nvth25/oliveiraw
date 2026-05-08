"use client";
import { useEffect, useRef } from "react";

export function Cursor() {
  const dotRef    = useRef<HTMLDivElement>(null);
  const ringRef   = useRef<HTMLDivElement>(null);
  const mouse     = useRef({ x: 0, y: 0 });
  const ring      = useRef({ x: 0, y: 0 });
  const raf       = useRef<number>(0);
  const hovering  = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px,${e.clientY}px) translate(-50%,-50%)`;
      }
    };

    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px,${ring.current.y}px) translate(-50%,-50%)`;
      }
      raf.current = requestAnimationFrame(loop);
    };

    const onEnter = () => {
      hovering.current = true;
      dotRef.current?.classList.add("scale-0");
      ringRef.current?.classList.add("!w-10", "!h-10", "!border-olive");
    };
    const onLeave = () => {
      hovering.current = false;
      dotRef.current?.classList.remove("scale-0");
      ringRef.current?.classList.remove("!w-10", "!h-10", "!border-olive");
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.querySelectorAll("a,button,[role=button]").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    raf.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        aria-hidden
        className="fixed top-0 left-0 z-[9999] w-1.5 h-1.5 rounded-full bg-olive pointer-events-none transition-transform duration-150"
        style={{ willChange: "transform" }}
      />
      <div
        ref={ringRef}
        aria-hidden
        className="fixed top-0 left-0 z-[9998] w-7 h-7 rounded-full border border-olive/40 pointer-events-none transition-[width,height,border-color] duration-300"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
