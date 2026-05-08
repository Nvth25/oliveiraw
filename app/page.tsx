import { SmoothScroll }    from "@/components/SmoothScroll";
import { Cursor }          from "@/components/Cursor";
import { Nav }             from "@/components/Nav";
import { Hero }            from "@/components/Hero";
import { Problem }         from "@/components/Problem";
import { Solution }        from "@/components/Solution";
import { Services }        from "@/components/Services";
import { HeroBackground }  from "@/components/HeroBackground";

/**
 * Single fixed canvas behind the whole page — one WebGL context,
 * one RAF loop, zero per-section instances.
 */
export default function Home() {
  return (
    <SmoothScroll>
      {/* One shader canvas, fixed behind everything */}
      <HeroBackground fixed />

      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Services />
      </main>
    </SmoothScroll>
  );
}
