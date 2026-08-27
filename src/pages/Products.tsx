import { ArrowUpRight } from "lucide-react";
import PageLayout, { GlassCard, PageHero, Reveal, Section } from "../components/PageLayout";
import { COMPANY } from "../site";

const SURFACES = [
  {
    title: "Chat & assistant",
    body: "One conversation surface with tool access — search, files, code and images — instead of a separate app per task.",
  },
  {
    title: "Deep research",
    body: "Multi-step research runs that gather sources and return a structured, citable answer rather than a single reply.",
  },
  {
    title: "Image generation & editing",
    body: "Text-to-image and reference-based editing, with style consistency across a set of outputs.",
  },
  {
    title: "Video & motion",
    body: "Short video generation from text or a still image, including animation of existing frames.",
  },
  {
    title: "Slides & documents",
    body: "Presentations generated from a prompt, plus reading and question-answering over PDFs, Word and Excel files.",
  },
  {
    title: "Code & app building",
    body: "Programming assistance through to full-stack app scaffolding for people who want to ship, not configure.",
  },
];

const STACK = [
  {
    title: "Model routing",
    body: "Our own Megay model plus leading third-party models, selected per task instead of forcing one model to do everything.",
  },
  {
    title: "Edge compute",
    body: "Serverless functions placed close to the user so requests do not travel further than they must.",
  },
  {
    title: "Optimised storage",
    body: "Generated media is routed and cached deliberately, which is what keeps large outputs feeling quick.",
  },
  {
    title: "Billing & subscriptions",
    body: "Plans, quotas and invoices run on systems we operate, so pricing questions get answered by the people who built them.",
  },
];

export default function ProductsPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Products"
        title="One product, many capabilities — operated by us end to end."
        lead="Megsy builds and runs its own platform. Everything below lives inside a single workspace at megsyai.com, on infrastructure the company operates itself."
      />

      <Section title="What the workspace covers">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SURFACES.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <GlassCard title={s.title} body={s.body} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="What it runs on">
        <div className="grid gap-5 sm:grid-cols-2">
          {STACK.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05}>
              <GlassCard title={s.title} body={s.body} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="Who uses it">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Creators", b: "Image, video and copy work in one place." },
            { t: "Developers", b: "Coding help and app scaffolding without another subscription." },
            { t: "Marketing teams", b: "Research, content and assets produced side by side." },
            { t: "Small businesses", b: "One tool and one bill instead of a stack of them." },
          ].map((a, i) => (
            <Reveal key={a.t} delay={i * 0.05}>
              <GlassCard title={a.t} body={a.b} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        title="Try the product"
        lead="This site is about the company. The product itself lives on its own domain."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={COMPANY.product}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Open megsyai.com <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="/megay"
            className="glass-soft inline-flex rounded-full px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
          >
            About Megay 3.9
          </a>
        </div>
      </Section>
    </PageLayout>
  );
}
