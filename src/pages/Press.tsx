import { ExternalLink, Mail } from "lucide-react";
import PageLayout, { GlassCard, PageHero, Reveal, Section } from "../components/PageLayout";
import { COMPANY } from "../site";

const RELEASES = [
  {
    date: "17 July 2026",
    title: "Megsy AI launches unified digital workspace to cure subscription fatigue",
    outlet: "openPR",
    url: "https://www.openpr.com/news/4579272/megsy-ai-launches-unified-digital-workspace-to-cure",
  },
  {
    date: "16 July 2026",
    title: "Megsy AI launches all-in-one platform for digital content creation",
    outlet: "PRLog",
    url: "https://www.prlog.org/13158812-megsy-ai-launches-all-in-one-platform-to-revolutionize-digital-content-creation.html",
  },
  {
    date: "Company profile",
    title: "Megsy — company profile, services and reviews",
    outlet: "GoodFirms",
    url: "https://www.goodfirms.co/company/megsy",
  },
];

const FACTS = [
  { k: "Legal name", v: COMPANY.legalName },
  { k: "Founded", v: COMPANY.founded },
  { k: "Headquarters", v: "Cairo, Egypt" },
  { k: "Second base", v: "Damanhour, Beheira" },
  { k: "Leadership", v: "Hamza Hassan, Founder & CEO" },
  { k: "Category", v: "Cloud / SaaS — unified AI workspace" },
];

export default function PressPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Press"
        title="Press kit, company facts and coverage."
        lead="Everything a journalist or analyst needs to write about Megsy accurately. For interviews or anything not listed here, email us directly."
      />

      <Section
        title="Boilerplate"
        lead="Use this paragraph verbatim when describing the company."
      >
        <Reveal>
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-7 backdrop-blur-xl">
            <p className="text-base leading-relaxed text-muted-foreground">
              {COMPANY.legalName} is an Egyptian technology company building a unified AI workspace.
              Instead of paying for separate services for chat, research, imaging, video, code and
              document handling, users get those capabilities in one fast, minimal product operated
              on infrastructure the company runs itself. Megsy was founded in {COMPANY.founded} and is
              led by Founder &amp; Chief Executive Officer Hamza Hassan, with bases in Cairo and
              Damanhour, Egypt.
            </p>
          </div>
        </Reveal>
      </Section>

      <Section title="Company facts">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FACTS.map((f, i) => (
            <Reveal key={f.k} delay={i * 0.05}>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{f.k}</p>
                <p className="mt-2 text-sm font-medium leading-relaxed">{f.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="Announcements & coverage">
        <div className="space-y-4">
          {RELEASES.map((r, i) => (
            <Reveal key={r.url} delay={i * 0.06}>
              <a
                href={r.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-start justify-between gap-6 rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.07]"
              >
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-primary">
                    {r.date} · {r.outlet}
                  </p>
                  <h3 className="mt-2 text-base font-semibold">{r.title}</h3>
                </div>
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
              </a>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="Logos & assets" lead="Please do not recolour, stretch or add effects to the mark.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-8 backdrop-blur-xl">
              <img src="/brand-logos/megsy.png" alt="Megsy logo mark" className="h-16 w-16" />
              <p className="mt-5 text-sm text-muted-foreground">
                Primary mark, PNG with transparent background.
              </p>
              <a
                href="/brand-logos/megsy.png"
                download
                className="mt-4 inline-flex rounded-full border border-white/15 px-4 py-2 text-xs font-medium transition-colors hover:bg-white/10"
              >
                Download PNG
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <GlassCard
              title="Full brand guidelines"
              body="Colour values, typography, spacing and usage rules live on the brand page."
            >
              <a
                href="/brand"
                className="mt-5 inline-flex rounded-full border border-white/15 px-4 py-2 text-xs font-medium transition-colors hover:bg-white/10"
              >
                Open brand guidelines
              </a>
            </GlassCard>
          </Reveal>
        </div>
      </Section>

      <Section title="Media contact">
        <a
          href={`mailto:${COMPANY.email}?subject=Press enquiry`}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          <Mail className="h-4 w-4" /> {COMPANY.email}
        </a>
      </Section>
    </PageLayout>
  );
}
