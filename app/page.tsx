import { SmoothScroll } from "@/components/SmoothScroll";
import { Cursor }       from "@/components/Cursor";
import { Nav }          from "@/components/Nav";
import { Hero }         from "@/components/Hero";
import { Problem }      from "@/components/Problem";
import { Solution }     from "@/components/Solution";

/**
 * Phase 1 — Foundation + Hero
 * Phase 2 — Problem + Solution
 * Phase 3 — Services, Process, Results, CTA, Footer (upcoming)
 */
export default function Home() {
  return (
    <SmoothScroll>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
      </main>
    </SmoothScroll>
  );
}
