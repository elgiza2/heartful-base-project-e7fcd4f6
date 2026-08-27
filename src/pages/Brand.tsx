import PageLayout, { GlassCard, PageHero, Reveal, Section } from "../components/PageLayout";
import { COMPANY } from "../site";

const DOS = [
  "Write the name as “Megsy” — capital M, lowercase rest.",
  "Use “Megsy AI” only when referring to the product, not the company.",
  "Keep clear space around the logo mark equal to the height of the mark.",
  "Place the mark on dark or plain backgrounds where the edges stay readable.",
];

const DONTS = [
  "Do not write MEGSY in full caps in body text, or “MegSy”, “Megsi”, “Magsy”.",
  "Do not stretch, rotate, recolour or add effects to the mark.",
  "Do not place the mark on busy imagery without a solid backing shape.",
  "Do not use the mark to imply partnership or endorsement.",
];

export default function BrandPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Brand"
        title="Brand kit and usage guidelines."
        lead="Everything you need to reference Megsy accurately in articles, decks and partner material."
      />

      <Section title="The mark">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <div className="rounded-2xl border border-white/[0.08] bg-black p-10 backdrop-blur-xl">
              <img src="/brand-logos/megsy.png" alt="Megsy logo on dark" className="h-16 w-auto" />
              <p className="mt-6 text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Primary · on dark
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="rounded-2xl border border-white/[0.08] bg-white p-10">
              <img src="/brand-logos/megsy.png" alt="Megsy logo on light" className="h-16 w-auto invert" />
              <p className="mt-6 text-xs uppercase tracking-[0.16em] text-black/50">
                Inverted · on light
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <GlassCard
              title="Download"
              body="Transparent PNG of the logo mark. For other formats or the full press kit, email us."
            >
              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href="/brand-logos/megsy.png"
                  download
                  className="inline-flex rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background"
                >
                  Logo (PNG)
                </a>
                <a
                  href={`mailto:${COMPANY.email}?subject=Brand kit request`}
                  className="inline-flex rounded-full border border-white/15 px-4 py-2 text-xs font-medium transition-colors hover:bg-white/10"
                >
                  Request full kit
                </a>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <Section title="Naming">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <GlassCard title="Company" body={`“Megsy” in prose; “${COMPANY.legalName}” in legal or contractual text.`} />
          </Reveal>
          <Reveal delay={0.06}>
            <GlassCard title="Product" body="“Megsy AI” — the unified AI workspace at megsyai.com." />
          </Reveal>
          <Reveal delay={0.12}>
            <GlassCard title="Model" body="“Megay 3.9” — our in-house model. Note the spelling: Megay, not Megsy." />
          </Reveal>
        </div>
      </Section>

      <Section title="Usage">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.04] p-7 backdrop-blur-xl">
              <h3 className="text-base font-semibold">Please do</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {DOS.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.04] p-7 backdrop-blur-xl">
              <h3 className="text-base font-semibold">Please don’t</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                {DONTS.map((d) => (
                  <li key={d} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-white/30" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section title="Boilerplate">
        <Reveal>
          <div className="max-w-3xl rounded-2xl border border-white/[0.08] bg-white/[0.04] p-7 text-sm leading-relaxed text-muted-foreground backdrop-blur-xl">
            <p>
              {COMPANY.name} is an Egyptian technology company founded in {COMPANY.founded} and based in
              Cairo. It builds and operates Megsy AI, a unified digital workspace that brings chat,
              research, image and video generation, documents and coding into one product — replacing a
              stack of separate subscriptions. The company also develops Megay 3.9, an Arabic-first
              in-house model. Megsy is led by founder and CEO Hamza Hassan.
            </p>
          </div>
        </Reveal>
      </Section>
    </PageLayout>
  );
}
