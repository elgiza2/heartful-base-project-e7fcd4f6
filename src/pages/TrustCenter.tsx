import PageLayout, { GlassCard, PageHero, Reveal, Section } from "../components/PageLayout";
import { COMPANY } from "../site";

const DATA_FLOW = [
  {
    title: "What we collect",
    body: "Account details (name, email), billing records handled by our payment processor, and the content you send to the product so it can respond.",
  },
  {
    title: "Why we collect it",
    body: "To create and run your account, deliver the feature you asked for, prevent abuse and fraud, and meet legal and tax obligations.",
  },
  {
    title: "Where it lives",
    body: "On managed cloud infrastructure with access limited to the engineers who operate the service.",
  },
  {
    title: "How long we keep it",
    body: "Account data for the life of the account plus a short grace period; billing records for the retention period required by law.",
  },
  {
    title: "Who else sees it",
    body: "Only the service providers required to deliver the product — infrastructure, payment processing and model providers — under their own terms.",
  },
  {
    title: "How you get it back",
    body: "Ask us and we will export or delete your data. Requests go to our privacy address and we confirm when they are done.",
  },
];

const RELIABILITY = [
  {
    title: "Availability target",
    body: "We aim for continuous availability of the platform and treat any user-facing outage as the highest priority work in the queue.",
  },
  {
    title: "Monitoring",
    body: "Errors and failures are logged and reviewed. Regressions that reach users get fixed before new features continue.",
  },
  {
    title: "Incident communication",
    body: "If an incident affects your account or your data, we tell you what happened, what we did, and what changes as a result.",
  },
  {
    title: "Backups",
    body: "Production data sits on managed database services with provider-level backup and point-in-time recovery.",
  },
];

export default function TrustCenterPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Trust center"
        title="Reliability and data handling, described plainly."
        lead="This page is published by Megsy about its own products. It states what we actually do — no certification badges we have not earned, no claims we cannot back."
      />

      <Section title="How your data is handled">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {DATA_FLOW.map((d, i) => (
            <Reveal key={d.title} delay={i * 0.05}>
              <GlassCard title={d.title} body={d.body} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="Reliability & operations">
        <div className="grid gap-5 sm:grid-cols-2">
          {RELIABILITY.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <GlassCard title={r.title} body={r.body} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="AI-specific notes">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <GlassCard
              title="Outputs are not advice"
              body="Generated text, code and images can be wrong. Check anything you rely on for legal, medical, financial or safety decisions."
            />
          </Reveal>
          <Reveal delay={0.06}>
            <GlassCard
              title="Third-party models"
              body="Some features route to external model providers. When they do, their processing terms apply to that request in addition to ours."
            />
          </Reveal>
          <Reveal delay={0.12}>
            <GlassCard
              title="Your content stays yours"
              body="You keep ownership of what you create in the product, subject to the terms of the plan you are on."
            />
          </Reveal>
        </div>
      </Section>

      <Section
        title="Questions about trust, data or compliance"
        lead={`Security and reliability questions: ${COMPANY.email}. Privacy and data-rights requests: ${COMPANY.privacyEmail}.`}
      >
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${COMPANY.email}?subject=Trust enquiry`}
            className="inline-flex rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            {COMPANY.email}
          </a>
          <a
            href={`mailto:${COMPANY.privacyEmail}`}
            className="glass-soft inline-flex rounded-full px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
          >
            {COMPANY.privacyEmail}
          </a>
        </div>
      </Section>
    </PageLayout>
  );
}
