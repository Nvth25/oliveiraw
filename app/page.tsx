import { Cursor }        from "@/components/Cursor";
import { LenisProvider } from "@/components/LenisProvider";
import { Nav }           from "@/components/Nav";
import { Hero }          from "@/components/Hero";
import { Problem }       from "@/components/Problem";
import { Solution }      from "@/components/Solution";
import { Services }      from "@/components/Services";
import { HowItWorks }    from "@/components/HowItWorks";
import { Proof }         from "@/components/Proof";
import { Offer }         from "@/components/Offer";
import { CTA }           from "@/components/CTA";
import { Footer }        from "@/components/Footer";

export default function Home() {
  return (
    <LenisProvider>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Services />
        <HowItWorks />
        <Proof />
        <Offer />
        <CTA />
      </main>
      <Footer />
    </LenisProvider>
  );
}
