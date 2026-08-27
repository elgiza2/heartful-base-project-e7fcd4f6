import { ArrowUpRight } from "lucide-react";
import PageLayout, { GlassCard, PageHero, Reveal, Section } from "../components/PageLayout";
import { COMPANY } from "../site";

const HIGHLIGHTS = [
  {
    title: "Arabic-first by design",
    body: "Tokenizer and training data built around Arabic, with deliberate coverage of Egyptian dialect rather than treating it as an edge case.",
  },
  {
    title: "Multilingual",
    body: "Over 100 languages, with English quality held to the same bar as Arabic.",
  },
  {
    title: "Tool-native",
    body: "Web search, image generation, code execution and document reading are first-class capabilities, not bolted-on wrappers.",
  },
  {
    title: "Built for real-time chat",
    body: "Tuned for low-latency inference so conversation feels immediate on an ordinary connection.",
  },
  {
    title: "Cultural context",
    body: "Trained with attention to context relevant to Egypt and the wider Arab world, where generic models tend to flatten meaning.",
  },
  {
    title: "Free on every plan",
    body: "Megay is the default model behind Megsy conversations and is available on the free tier.",
  },
];

const WHY = [
  {
    title: "Why build our own model",
    body: "Relying only on third-party models means inheriting their blind spots — and Arabic nuance is one of the largest. Owning a model lets us fix what matters to our users directly.",
  },
  {
    title: "How it fits the workspace",
    body: "Megay is the default. When a task genuinely suits another model, the workspace routes to it — the choice is made per task, not per ideology.",
  },
];

export default function MegayPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Megay 3.9"
        title="Our in-house model — built and trained in Egypt."
        lead="Megay 3.9 is the default model behind Megsy conversations: Arabic-native, multilingual, tool-native, and available free on every plan."
      />

      <Section title="What makes it different">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.05}>
              <GlassCard title={h.title} body={h.body} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="The reasoning behind it">
        <div className="grid gap-5 lg:grid-cols-2">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.06}>
              <GlassCard title={w.title} body={w.body} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="At a glance">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { k: "Model", v: "Megay 3.9" },
            { k: "Origin", v: "Built & trained in Egypt" },
            { k: "Languages", v: "100+" },
            { k: "Availability", v: "Free on every plan" },
          ].map((f, i) => (
            <Reveal key={f.k} delay={i * 0.05}>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{f.k}</p>
                <p className="mt-2 text-lg font-semibold">{f.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        title="Use it"
        lead="Megay runs inside the Megsy workspace. No separate signup, no separate bill."
      >
        <a
          href={COMPANY.product}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          Open megsyai.com <ArrowUpRight className="h-4 w-4" />
        </a>
      </Section>
    </PageLayout>
  );
}
