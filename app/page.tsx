import { SmoothScroll }    from "@/components/SmoothScroll";
import { Cursor }          from "@/components/Cursor";
import { Nav }             from "@/components/Nav";
import { Hero }            from "@/components/Hero";

/**
 * Phase 1 — Foundation, Navigation, and Hero.
 * Monopo-inspired: centered full-bleed layout, fluid shader bg, monogram logo.
 * Sections (Problem → Services → Process → Results → CTA → Footer) added in Phase 2.
 */
export default function Home() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main>
        <Hero />
      </main>
    </SmoothScroll>
  );
}
