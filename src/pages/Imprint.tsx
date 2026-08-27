import PageLayout, { PageHero, Reveal, Section } from "../components/PageLayout";
import { COMPANY } from "../site";

const ROWS: { k: string; v: React.ReactNode }[] = [
  { k: "Legal name", v: COMPANY.legalName },
  { k: "Trading name", v: "Megsy · Megsy AI" },
  { k: "Legal form", v: "Limited liability company (LLC), Arab Republic of Egypt" },
  { k: "Commercial register no.", v: COMPANY.register },
  { k: "Tax identification no.", v: COMPANY.taxId },
  { k: "Year of incorporation", v: COMPANY.founded },
  {
    k: "Registered office",
    v: (
      <span className="block space-y-0.5">
        {COMPANY.addressLines.map((l) => (
          <span key={l} className="block">
            {l}
          </span>
        ))}
      </span>
    ),
  },
  { k: "Additional base", v: COMPANY.secondBase },
  {
    k: "Represented by",
    v: "Hamza Hassan, Founder & Chief Executive Officer (sole legal representative)",
  },
  {
    k: "Contact",
    v: (
      <span className="block space-y-0.5">
        <a href={`mailto:${COMPANY.email}`} className="block hover:underline">
          {COMPANY.email}
        </a>
        <a href={COMPANY.phoneHref} className="block hover:underline">
          {COMPANY.phone}
        </a>
      </span>
    ),
  },
  {
    k: "Privacy contact",
    v: (
      <a href={`mailto:${COMPANY.privacyEmail}`} className="hover:underline">
        {COMPANY.privacyEmail}
      </a>
    ),
  },
  {
    k: "Online product",
    v: (
      <a href={COMPANY.product} target="_blank" rel="noreferrer" className="hover:underline">
        megsyai.com
      </a>
    ),
  },
];

export default function ImprintPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Imprint"
        title="Legal and registry information."
        lead="Statutory details of the company operating this website and the Megsy products."
      />

      <Section>
        <Reveal>
          <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] backdrop-blur-xl">
            <dl className="divide-y divide-white/[0.06]">
              {ROWS.map((row) => (
                <div key={row.k} className="grid gap-2 px-6 py-5 sm:grid-cols-[14rem_1fr] sm:gap-8">
                  <dt className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{row.k}</dt>
                  <dd className="text-sm leading-relaxed">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </Section>

      <Section title="Responsibility for content">
        <Reveal>
          <div className="max-w-3xl space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              Responsibility for the content of this website rests with {COMPANY.legalName},
              represented by its Chief Executive Officer. We take care that the information published
              here is accurate and current; where details change — registry data, addresses or contact
              points — this page is updated.
            </p>
            <p>
              This website links to external sites operated by third parties. We do not control their
              content and are not responsible for it. Trademarks and logos of other companies shown on
              this site remain the property of their respective owners.
            </p>
            <p>
              Text, layout, graphics and code on this website are the property of the company unless
              stated otherwise, and may not be reproduced commercially without written permission.
            </p>
          </div>
        </Reveal>
      </Section>
    </PageLayout>
  );
}
