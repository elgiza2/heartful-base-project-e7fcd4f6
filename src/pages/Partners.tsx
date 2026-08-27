import { Mail } from "lucide-react";
import PageLayout, { GlassCard, PageHero, Reveal, Section } from "../components/PageLayout";
import { COMPANY } from "../site";

const MODEL_PARTNERS = [
  "OpenAI",
  "Google",
  "Anthropic",
  "xAI",
  "Black Forest Labs",
  "Kling",
  "Luma",
  "Runway",
  "Ideogram",
  "Recraft",
  "Stability",
  "Qwen",
];

const CATEGORIES = [
  {
    title: "Model providers",
    body: "Alongside our own Megay model, the workspace routes to leading third-party models so each task runs on something suited to it.",
  },
  {
    title: "Cloud & infrastructure",
    body: "Managed databases, object storage and edge compute providers that let a small team run a fast platform reliably.",
  },
  {
    title: "Payments & billing",
    body: "Established payment processors handle card data and invoicing, so we never store full card numbers ourselves.",
  },
  {
    title: "Distribution & resellers",
    body: "Agencies and studios that put the workspace in front of their own clients under a partnership agreement.",
  },
];

const OFFER = [
  {
    title: "Technology partners",
    body: "Have a model, API or service that belongs inside a unified workspace? We integrate quickly when the fit is real.",
  },
  {
    title: "Agencies & studios",
    body: "Bring the workspace to your clients with partner pricing and a direct line to the engineering team.",
  },
  {
    title: "Education & community",
    body: "Universities, bootcamps and developer communities in Egypt and the region — we support access programmes.",
  },
];

export default function PartnersPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Partners"
        title="The companies our platform is built on — and built with."
        lead="We own our product, but no one operates alone. These are the categories of partner that make the workspace possible, and the ways we work with new ones."
      />

      <Section title="Partnership categories">
        <div className="grid gap-5 sm:grid-cols-2">
          {CATEGORIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <GlassCard title={c.title} body={c.body} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        title="Models available in the workspace"
        lead="Provider names are shown for identification only. All trademarks belong to their respective owners."
      >
        <Reveal>
          <div className="flex flex-wrap gap-3">
            {MODEL_PARTNERS.map((name) => (
              <span
                key={name}
                className="glass-soft rounded-full px-4 py-2 text-xs uppercase tracking-[0.14em] text-muted-foreground"
              >
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </Section>

      <Section title="Work with us">
        <div className="grid gap-5 sm:grid-cols-3">
          {OFFER.map((o, i) => (
            <Reveal key={o.title} delay={i * 0.06}>
              <GlassCard title={o.title} body={o.body} />
            </Reveal>
          ))}
        </div>
        <a
          href={`mailto:${COMPANY.email}?subject=Partnership enquiry`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          <Mail className="h-4 w-4" /> Start a partnership conversation
        </a>
      </Section>
    </PageLayout>
  );
}
