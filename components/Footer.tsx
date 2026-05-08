import Link from "next/link";

const SERVICES = [
  "Conversion Websites","Payment Integrations","WhatsApp Automation",
  "Follow-Up Systems","Lead Capture","CRM & Pipeline","AI Customer Interaction",
];

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="wrap py-14 md:py-18">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          <div>
            <p className="font-display font-light text-ivory/80 tracking-[0.28em] text-sm mb-4">OLIVEIRA</p>
            <p className="text-[0.6875rem] text-muted leading-relaxed max-w-[200px]">
              AI client acquisition systems for ambitious businesses.
            </p>
            <div className="flex items-center gap-2 mt-6">
              <div className="w-1.5 h-1.5 rounded-full bg-olive/60 animate-[pulse-olive_2s_ease-in-out_infinite]" />
              <span className="text-[0.5625rem] text-muted/50 tracking-wider">Accepting new clients</span>
            </div>
          </div>

          <div>
            <p className="text-[0.5625rem] text-muted/40 tracking-[0.22em] uppercase mb-5">Services</p>
            <div className="space-y-3">
              {SERVICES.map(s => (
                <a key={s} href="#services"
                  className="block text-[0.6875rem] text-muted hover:text-ivory transition-colors duration-300">
                  {s}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[0.5625rem] text-muted/40 tracking-[0.22em] uppercase mb-5">Contact</p>
            <div className="space-y-3">
              <a href="mailto:hello@oliveira.studio"
                className="block text-[0.6875rem] text-muted hover:text-olive transition-colors duration-300">
                hello@oliveira.studio
              </a>
              <a href="https://wa.me/message/oliveira" target="_blank" rel="noopener noreferrer"
                className="block text-[0.6875rem] text-muted hover:text-olive transition-colors duration-300">
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="hairline mb-8" />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-[0.5625rem] text-muted/25 tracking-wider">
            © {new Date().getFullYear()} OLIVEIRA. All rights reserved.
          </p>
          <p className="text-[0.5625rem] text-muted/15 tracking-wider">
            Automation · Acquisition · Growth
          </p>
        </div>
      </div>
    </footer>
  );
}
