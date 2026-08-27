import { Mail, MapPin, Phone } from "lucide-react";
import PageLayout, { GlassCard, PageHero, Reveal, Section } from "../components/PageLayout";
import { COMPANY } from "../site";

const FOCUS = [
  {
    title: "Product direction",
    body: "What ships, in what order, and what gets cut. One decision-maker keeps the roadmap short and honest.",
  },
  {
    title: "Engineering standards",
    body: "Performance budgets, reliability targets and code review sit with the same person who answers for the product.",
  },
  {
    title: "Customer commitments",
    body: "Pricing, support promises and partnership terms are made by the person accountable for keeping them.",
  },
];

export default function LeadershipPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Leadership"
        title="One CEO. One line of accountability."
        lead="Megsy is led by a single chief executive. There is no committee between a customer's problem and the person who can fix it."
      />

      <Section>
        <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="relative mx-auto max-w-sm">
              <div className="glass overflow-hidden rounded-3xl p-2">
                <img
                  src="/hamza-portrait.jpg"
                  alt="Hamza Hassan — Founder & Chief Executive Officer of Megsy"
                  className="aspect-[4/5] w-full rounded-2xl object-cover"
                />
              </div>
              <div className="glass absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full px-6 py-3 text-center">
                <p className="text-sm font-semibold">Hamza Hassan</p>
                <p className="text-xs text-muted-foreground">Founder &amp; Chief Executive Officer</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="text-2xl font-semibold">Hamza Hassan</h2>
            <p className="mt-1 text-sm text-primary">Founder &amp; Chief Executive Officer</p>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Hamza Hassan is an Egyptian entrepreneur who started coding at 15 and shipped his
                first product at 17. He founded Megsy to build AI products from Egypt for a global
                audience, rather than waiting for someone else to build them for the region.
              </p>
              <p>
                His working thesis is simple: most people do not want ten AI tools, they want one
                that works — fast, in their own language, at a price they can read. That belief shapes
                what Megsy ships and what it deliberately refuses to ship.
              </p>
              <p>
                A particular focus is Arabic, and Egyptian dialect in specific — nuance that global
                models still handle poorly and that a company based in Cairo is well placed to fix.
              </p>
            </div>

            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Cairo &amp; Damanhour, Egypt
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href={`mailto:${COMPANY.email}`} className="hover:text-foreground">
                  {COMPANY.email}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <a href={COMPANY.phoneHref} className="hover:text-foreground">
                  {COMPANY.phone}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section title="What sits on the CEO's desk">
        <div className="grid gap-5 sm:grid-cols-3">
          {FOCUS.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <GlassCard title={f.title} body={f.body} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        title="Speaking, interviews and press"
        lead="For interview requests, quotes or event appearances, reach the team directly — every message is read."
      >
        <a
          href={`mailto:${COMPANY.email}`}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          <Mail className="h-4 w-4" /> {COMPANY.email}
        </a>
      </Section>
    </PageLayout>
  );
}
