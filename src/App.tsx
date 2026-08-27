import FlowpathHero from "./components/FlowpathHero";
import CompanyGlass from "./components/CompanyGlass";
import { motion } from "framer-motion";
import {
  Boxes,
  Gauge,
  Mail,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const NAV = [
  { label: "Company", href: "#company" },
  { label: "What we do", href: "#work" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];


const CAPABILITIES = [
  {
    title: "Digital platform development",
    body: "We design, build and maintain our own platforms end to end — no outsourced core.",
  },
  {
    title: "Applied AI research",
    body: "Research only counts when it ships. We turn models into products people use daily.",
  },
  {
    title: "Commerce infrastructure",
    body: "E-commerce systems, billing and subscription operations run in-house.",
  },
  {
    title: "Design systems & brand",
    body: "One design language across every product we own, maintained by the team that ships it.",
  },
  {
    title: "Direct customer support",
    body: "Support is handled by the engineers who wrote the code. No ticket theatre.",
  },
  {
    title: "Data handled with restraint",
    body: "We collect what the product needs to work, and nothing we cannot justify.",
  },
];

const PRINCIPLES = [
  {
    icon: Sparkles,
    title: "Small team, direct ownership",
    body: "A small team that ships directly, with no layers in between.",
  },
  {
    icon: ShieldCheck,
    title: "Reliability over novelty",
    body: "Clear pricing, predictable systems, and data handled with restraint.",
  },
  {
    icon: Gauge,
    title: "Fast on an average phone",
    body: "Average device, average connection — that is the performance bar we hold.",
  },
];


function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

const WORK_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4";

function Work() {
  return (
    <section id="work" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={WORK_VIDEO_URL}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/30" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-2xl text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08]">
            Software, commerce and support — owned in one house.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <article className="group h-full rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.07]">
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const LEADERSHIP_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4";

function Leadership() {
  return (
    <section id="leadership" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={LEADERSHIP_VIDEO_URL}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/30" />
      <div className="relative z-10">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Leadership</p>
          <h2 className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08]">
            One CEO. One line of accountability.
          </h2>
          <p className="mt-6 max-w-lg text-muted-foreground">
            Megsy is led by a single chief executive — Hamza Hassan, Founder & Chief Executive
            Officer. An Egyptian entrepreneur who started coding at 15 and shipped his first product
            at 17, he founded Megsy to build AI infrastructure from Egypt for the world.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {PRINCIPLES.map((p) => (
              <div key={p.title} className="glass-soft rounded-xl p-4">
                <p.icon className="h-4 w-4 text-primary" />
                <h3 className="mt-3 text-sm font-semibold">{p.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass rounded-2xl p-7 sm:p-9">
            <p className="eyebrow">Office of the CEO</p>
            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-blush to-primary text-lg font-semibold text-background">
                HH
              </div>
              <div>
                <p className="text-lg font-semibold">Hamza Hassan</p>
                <p className="text-sm text-muted-foreground">
                  Founder & Chief Executive Officer
                </p>
              </div>
            </div>
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Cairo, Egypt
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:support@megsyai.com" className="hover:text-foreground">
                  support@megsyai.com
                </a>
              </p>
            </div>
            <p className="mt-8 border-t border-white/10 pt-6 text-sm leading-relaxed text-muted-foreground">
              How we work: a small team that ships directly, with no layers in between. Reliability
              over novelty. Clear pricing. Fast on an average phone and an average connection — that
              is the bar.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative border-t border-white/5 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <div className="glass noise-overlay relative overflow-hidden rounded-3xl px-6 py-14 text-center sm:px-14">
            <div className="pointer-events-none absolute inset-x-0 -top-24 h-64 veil" />
            <p className="eyebrow relative">Contact</p>
            <h2 className="relative mt-4 text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.06]">
              Talk to the people who build it.
            </h2>
            <p className="relative mx-auto mt-5 max-w-xl text-muted-foreground">
              Partnerships, press, billing or legal — every message reaches the team directly.
            </p>
            <div className="relative mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="mailto:support@megsyai.com"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" /> support@megsyai.com
              </a>
              <span className="text-sm text-muted-foreground">Cairo, Egypt · UTC+2</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section id="showcase" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px]" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Showcase</p>
          <h2 className="mt-4 max-w-2xl text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.05]">
            One company, one <span className="text-gradient">stack</span>.
          </h2>
        </Reveal>

        <div className="relative mt-14 grid gap-6 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="glass relative z-10 rounded-2xl p-8 lg:col-span-7 lg:p-10"
          >
            <Boxes className="h-5 w-5 text-primary" />
            <h3 className="mt-6 text-2xl font-semibold">Research, engineering, design, support</h3>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Everything that makes our products work lives under one roof in Cairo. The people who
              research the models write the code, ship the interface and answer the customer.
            </p>
            <div className="mt-8 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {["In-house core", "No outsourced stack", "Direct ownership"].map((t) => (
                <span key={t} className="glass-soft rounded-full px-3 py-1.5">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="glass-soft relative rounded-2xl p-8 lg:col-span-5 lg:-ml-16 lg:mt-16 lg:p-10"
          >
            <Gauge className="h-5 w-5 text-primary" />
            <h3 className="mt-6 text-xl font-semibold">Built to hold up in production</h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Reliability before novelty. Clear economics. Fast on an average phone and an average
              connection — that is the bar we measure against.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="text-muted-foreground">Base</dt>
                <dd className="mt-1 font-medium">Cairo, Egypt</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Leadership</dt>
                <dd className="mt-1 font-medium">One CEO</dd>
              </div>
            </dl>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-5 py-14 sm:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">
            MEG<span className="text-gradient">SY</span>
          </p>
          <p className="mt-3 max-w-md text-xs leading-relaxed text-muted-foreground">
            Megsy for Digital Platforms Development and E-commerce LLC · Commercial register 284691
            · Tax ID 774034785 · 58 Al Hijaz St., Amoun Tower, Unit 84, Floor 8, Sheraton Al Matar,
            Nozha, Cairo, Egypt
          </p>
        </div>
        <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:items-end">
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </a>
          ))}
          <span>© {new Date().getFullYear()} Megsy. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="relative min-h-screen bg-background">
      <main>
        <FlowpathHero />
        <CompanyGlass />
        <Work />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
