"use client";
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { createLenis } from "@/lib/lenis";

gsap.registerPlugin(ScrollTrigger);

/**
 * Initialises Lenis smooth scroll and wires it to GSAP's ticker.
 * GSAP ticker drives Lenis — this avoids double-RAF and keeps
 * ScrollTrigger perfectly in sync.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = createLenis();

    // Sync Lenis with ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP ticker (time is in seconds, Lenis expects ms)
    const ticker = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(ticker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
