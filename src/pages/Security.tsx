import { Mail } from "lucide-react";
import PageLayout, { GlassCard, PageHero, Reveal, Section } from "../components/PageLayout";
import { COMPANY } from "../site";

const PRACTICES = [
  {
    title: "Encryption in transit",
    body: "All traffic to our products runs over TLS. Plain HTTP requests are redirected, not served.",
  },
  {
    title: "Managed infrastructure",
    body: "We build on established managed cloud providers for databases, storage and edge compute rather than hand-rolled servers.",
  },
  {
    title: "Least-privilege access",
    body: "Production access is limited to the engineers who need it, and credentials are held in a managed secret store — never in source code.",
  },
  {
    title: "Row-level authorisation",
    body: "User data is scoped per account at the database layer, so one account cannot read another's records.",
  },
  {
    title: "Payments handled by processors",
    body: "Card data is processed by established payment providers. We do not store full card numbers on our systems.",
  },
  {
    title: "Data minimisation",
    body: "We collect what the product needs to function. Anything we cannot justify keeping, we do not keep.",
  },
];

const RIGHTS = [
  "Ask what personal data we hold about you",
  "Request a copy of your data",
  "Ask us to correct inaccurate data",
  "Ask us to delete your account and data",
  "Withdraw consent where processing relies on it",
  "Object to a specific use of your data",
];

export default function SecurityPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Security"
        title="How we protect the data you trust us with."
        lead="This page describes the practices in place today. It is a plain description of how we work — not a certification claim."
      />

      <Section title="Practices in place">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PRACTICES.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <GlassCard title={p.title} body={p.body} />
            </Reveal>
          ))}
        </div>
      </Section>

      <Section
        title="Privacy regulation"
        lead="Our privacy policy is written to address the Egyptian Personal Data Protection Law (PDPL) No. 151/2020, the EU GDPR, the UK Data Protection Act 2018, CCPA/CPRA, the Brazilian LGPD and the ePrivacy Directive."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-xl">
              <h3 className="text-base font-semibold">Your rights</h3>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {RIGHTS.map((r) => (
                  <li key={r} className="flex gap-3">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-primary" />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm text-muted-foreground">
                To exercise any of these, email{" "}
                <a href={`mailto:${COMPANY.privacyEmail}`} className="text-foreground hover:underline">
                  {COMPANY.privacyEmail}
                </a>
                .
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard
              title="Full privacy policy"
              body="The complete policy — data categories, retention periods, legal bases and third parties — is published in full and kept current."
            >
              <a
                href="https://privacy.megsyai.com/"
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex rounded-full border border-white/15 px-4 py-2 text-xs font-medium transition-colors hover:bg-white/10"
              >
                Read the privacy policy
              </a>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <Section
        title="Reporting a vulnerability"
        lead="If you believe you have found a security issue, tell us before telling anyone else. We will confirm receipt and keep you updated while we investigate."
      >
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <GlassCard
              title="What to send"
              body="A description of the issue, the affected URL or endpoint, and the steps needed to reproduce it."
            />
          </Reveal>
          <Reveal delay={0.06}>
            <GlassCard
              title="What to avoid"
              body="Please do not access other people's data, degrade the service, or run automated scans that generate load on production."
            />
          </Reveal>
          <Reveal delay={0.12}>
            <GlassCard
              title="What we do"
              body="We acknowledge reports, investigate, and fix confirmed issues as a priority. We will credit you if you would like that."
            />
          </Reveal>
        </div>
        <a
          href={`mailto:${COMPANY.email}?subject=Security report`}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          <Mail className="h-4 w-4" /> Report a security issue
        </a>
      </Section>
    </PageLayout>
  );
}
