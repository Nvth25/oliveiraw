import Lenis from "@studio-freight/lenis";

/**
 * Create and configure a Lenis smooth scroll instance.
 * Call this once inside a useEffect in a client component.
 * Integrates with GSAP ticker for ScrollTrigger sync.
 */
export function createLenis(): Lenis {
  return new Lenis({
    // Duration in seconds — how long a scroll impulse takes to settle
    duration: 1.2,
    // Expo-style easing: fast start, smooth deceleration
    easing: (t: number) => 1 - Math.pow(1 - t, 5),
    orientation: "vertical",
    gestureOrientation: "vertical",
    smoothWheel: true,
    wheelMultiplier: 0.9,   // slightly slower than native for editorial feel
    touchMultiplier: 1.8,
    infinite: false,
  });
}
