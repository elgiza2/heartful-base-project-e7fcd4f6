import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageLayout, { GlassCard, PageHero, Reveal, Section } from "../components/PageLayout";
import { COMPANY } from "../site";

const REASONS = [
  { title: "Support", body: "Something not working in the product, or a question about your plan.", email: COMPANY.email },
  { title: "Partnerships", body: "Integrations, resellers, joint launches and distribution.", email: COMPANY.email },
  { title: "Press", body: "Interviews, quotes, company facts and logo files.", email: COMPANY.email },
  { title: "Privacy & data", body: "Access, export, correction or deletion of your personal data.", email: COMPANY.privacyEmail },
];

const MAP_QUERY = encodeURIComponent(
  "Amoun Tower, Al Hijaz St, Sheraton Al Matar, Nozha, Cairo, Egypt",
);

export default function ContactPage() {
  return (
    <PageLayout>
      <PageHero
        eyebrow="Contact"
        title="Talk to the people who build it."
        lead="There is no call-centre layer here. Messages reach the team that writes the code and operates the platform."
      />

      <Section>
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <Reveal>
            <div className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.04] p-7 backdrop-blur-xl">
              <h2 className="text-xl font-semibold">Registered office</h2>
              <address className="mt-4 space-y-1 text-sm not-italic leading-relaxed text-muted-foreground">
                <p className="font-medium text-foreground">{COMPANY.legalName}</p>
                {COMPANY.addressLines.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </address>
              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <p className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Second base: {COMPANY.secondBase}
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href={COMPANY.phoneHref} className="hover:text-foreground">
                    {COMPANY.phone}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href={`mailto:${COMPANY.email}`} className="hover:text-foreground">
                    {COMPANY.email}
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" /> {COMPANY.hours}
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.04] p-2 backdrop-blur-xl">
              <iframe
                title="Megsy registered office location"
                src={`https://www.google.com/maps?q=${MAP_QUERY}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full min-h-[20rem] w-full rounded-xl border-0 grayscale-[0.3]"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      <Section title="Where to send what">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.05}>
              <GlassCard title={r.title} body={r.body}>
                <a
                  href={`mailto:${r.email}?subject=${encodeURIComponent(r.title)}`}
                  className="mt-5 inline-flex rounded-full border border-white/15 px-4 py-2 text-xs font-medium transition-colors hover:bg-white/10"
                >
                  {r.email}
                </a>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="Registry details">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { k: "Commercial register", v: COMPANY.register },
            { k: "Tax ID", v: COMPANY.taxId },
            { k: "Legal form", v: "Egyptian limited liability company" },
          ].map((f, i) => (
            <Reveal key={f.k} delay={i * 0.05}>
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{f.k}</p>
                <p className="mt-2 text-sm font-medium">{f.v}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </PageLayout>
  );
}
