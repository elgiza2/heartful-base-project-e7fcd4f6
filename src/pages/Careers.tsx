import { Mail } from "lucide-react";
import PageLayout, { GlassCard, PageHero, Reveal, Section } from "../components/PageLayout";
import { COMPANY } from "../site";

const ROLES = [
  {
    title: "Full-stack Product Engineer",
    type: "Full-time · Cairo or remote (EG)",
    body: "TypeScript, React and edge functions. You will own features end to end — interface, data layer and the deploy that ships them.",
  },
  {
    title: "AI / Applied Research Engineer",
    type: "Full-time · Cairo or remote (EG)",
    body: "Model routing, evaluation and Arabic-first quality work. Research counts here only when it reaches production.",
  },
  {
    title: "Product Designer",
    type: "Contract or full-time · Remote",
    body: "One design language across every surface we own. Minimal, fast, and legible in both Arabic and English.",
  },
  {
    title: "Customer Support Specialist",
    type: "Part-time · Remote (EG)",
    body: "Arabic and English support with real product knowledge. You will sit next to the engineers, not in a separate department.",
  },
];

const WHAT_WE_OFFER = [
  {
    title: "Real ownership",
    body: "A small team means your work is visible in the product within days, not quarters.",
  },
  {
    title: "No layers",
    body: "You work directly with the founder. Decisions take hours, not sign-off chains.",
  },
  {
    title: "Flexible base",
    body: "Cairo, Damanhour or remote inside Egypt. We care about output, not seat time.",
  },
  {
    title: "Learning budget",
    body: "Books, courses and model credits for the things that make you better at the job.",
  },
];

export default function CareersPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Careers"
        title="Small team. Real ownership. Shipping every week."
        lead="We hire people who want to be responsible for something that real users touch. If you need a large organisation around you, this is not the right place — and that is fine."
      />

      <Section title="Open roles" lead="Do not see your role? Send us a note anyway — we read every message.">
        <div className="grid gap-5 sm:grid-cols-2">
          {ROLES.map((role, i) => (
            <Reveal key={role.title} delay={i * 0.06}>
              <div className="flex h-full flex-col rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.07]">
                <p className="text-xs uppercase tracking-[0.16em] text-primary">{role.type}</p>
                <h3 className="mt-3 text-lg font-semibold">{role.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{role.body}</p>
                <a
                  href={`mailto:${COMPANY.email}?subject=Application — ${encodeURIComponent(role.title)}`}
                  className="mt-6 inline-flex w-max items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-medium transition-colors hover:bg-white/10"
                >
                  <Mail className="h-3.5 w-3.5" /> Apply
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="What working here looks like">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {WHAT_WE_OFFER.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <GlassCard title={item.title} body={item.body} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="How we hire" lead="Four steps, usually inside two weeks.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { n: "01", t: "Intro call", b: "30 minutes on what you have built and what you want next." },
            { n: "02", t: "Practical task", b: "A small, paid, realistic piece of work — no puzzle interviews." },
            { n: "03", t: "Review together", b: "We go through your solution and the trade-offs you made." },
            { n: "04", t: "Offer", b: "Clear scope, clear compensation, clear start date." },
          ].map((s, i) => (
            <Reveal key={s.n} delay={i * 0.05}>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-xl">
                <p className="text-xs tracking-[0.2em] text-primary">{s.n}</p>
                <h3 className="mt-3 text-base font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
