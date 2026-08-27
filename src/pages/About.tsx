import PageLayout, { GlassCard, PageHero, Reveal, Section } from "../components/PageLayout";
import { COMPANY } from "../site";

const TIMELINE = [
  {
    year: "Before Megsy",
    title: "A teenager with a laptop",
    body: "Our founder started writing code at 15 and shipped his first product at 17 — long before there was a company name on anything.",
  },
  {
    year: "Early 2026",
    title: "The company is registered",
    body: `${COMPANY.legalName} is incorporated in Egypt as a limited liability company, with a registered office in Cairo and a second base in Damanhour.`,
  },
  {
    year: "July 2026",
    title: "First product launch",
    body: "Our unified AI workspace launches publicly and reaches roughly 100 users in its first 24 hours, built to end the habit of paying for a separate tool per task.",
  },
  {
    year: "Now",
    title: "One workspace, many surfaces",
    body: "Chat, deep research, slides, images, video, and full-stack app generation live in one product — with the cloud layer, billing and support all handled in-house.",
  },
];

const VALUES = [
  {
    title: "Consolidation over sprawl",
    body: "Every feature we add has to remove a subscription, a tab or a context switch. If it only adds surface, it does not ship.",
  },
  {
    title: "Own the whole stack",
    body: "Product engineering, cloud infrastructure, billing and support are handled by the same team. Nothing critical is outsourced.",
  },
  {
    title: "Speed is a feature",
    body: "Optimised storage routing, fast databases and edge functions exist so the product feels instant on an average phone.",
  },
  {
    title: "Arabic is not an afterthought",
    body: "We build for Egyptian and Arabic users first, then for everyone else — not the other way round.",
  },
  {
    title: "Readable pricing",
    body: "Clear plans, no hidden metering games, and a free tier that is genuinely usable.",
  },
  {
    title: "Restraint with data",
    body: "We collect what the product needs to work and nothing we cannot justify to the person it belongs to.",
  },
];

export default function AboutPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="About"
        title="An Egyptian software company building one workspace instead of ten subscriptions."
        lead={`${COMPANY.legalName} is a registered Egyptian technology company. We design, build, operate and support our own products end to end — from the interface down to the cloud layer underneath it.`}
      />

      <Section
        title="Our mission"
        lead="Make advanced AI genuinely usable — in one place, in Arabic and English, on an ordinary device and an ordinary connection."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <GlassCard
              title="The problem we started from"
              body="Creators, developers and small teams were paying for a different premium service for text, imaging, code and file handling — juggling separate logins, separate bills and separate workflows. That is expensive, slow and exhausting."
            />
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard
              title="What we build instead"
              body="A single, minimal workspace where those capabilities sit side by side, share context and run on infrastructure we operate ourselves — so one subscription replaces a stack of them."
            />
          </Reveal>
        </div>
      </Section>

      <Section title="How we got here">
        <div className="space-y-4">
          {TIMELINE.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="grid gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-xl sm:grid-cols-[9rem_1fr] sm:gap-8">
                <p className="text-xs uppercase tracking-[0.18em] text-primary">{item.year}</p>
                <div>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="What we hold to">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} delay={i * 0.05}>
              <GlassCard title={v.title} body={v.body} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="Company at a glance">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Founded", v: COMPANY.founded },
            { k: "Team", v: COMPANY.teamSize },
            { k: "Bases", v: "Cairo & Damanhour, Egypt" },
            { k: "Focus", v: "Cloud & SaaS products" },
          ].map((item, i) => (
            <Reveal key={item.k} delay={i * 0.05}>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{item.k}</p>
                <p className="mt-2 text-lg font-semibold">{item.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
