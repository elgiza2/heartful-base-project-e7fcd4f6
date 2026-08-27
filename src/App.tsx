import { Link } from "react-router-dom";
import FlowpathHero from "./components/FlowpathHero";
import CompanyGlass from "./components/CompanyGlass";
import { FOOTER_LINKS } from "./site";
import { motion } from "framer-motion";

import {
  Boxes,
  Facebook,
  Gauge,
  Instagram,
  Mail,
  MapPin,
  Music2,
  Twitter,
  Youtube,
} from "lucide-react";

const NAV = [
  { label: "Company", href: "#company" },
  { label: "What we do", href: "#work" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];


const CAPABILITIES = [
  {
    title: "Unified AI workspace",
    body: "Text generation, coding assistance, image creation and document handling in one screen — instead of a separate paid tool for each.",
  },
  {
    title: "Digital platform development",
    body: "We design, build and maintain our own platforms end to end — no outsourced core.",
  },
  {
    title: "High-performance cloud",
    body: "Fast databases, optimised storage routing and edge functions keep the product responsive at near-zero latency.",
  },
  {
    title: "Commerce & billing operations",
    body: "E-commerce systems, subscriptions and billing run in-house, with pricing that stays readable.",
  },
  {
    title: "Automation & integrations",
    body: "Automated media workflows and third-party integrations so recurring work stops being manual.",
  },
  {
    title: "Direct customer support",
    body: "Support is handled by the engineers who wrote the code. No ticket theatre.",
  },
];

const PRINCIPLES = [
  {
    title: "Small team, direct ownership",
    body: "A small team that ships directly, with no layers in between.",
  },
  {
    title: "One product, not ten tools",
    body: "Consolidation over sprawl: fewer subscriptions, fewer contexts, one workspace.",
  },
  {
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
            We build the workspace, the infrastructure and the support behind it.
          </h2>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            Our first product launched in July 2026 and drew roughly 100 users in its first 24
            hours. Everything it runs on is ours: the platform, the cloud layer, the billing and the
            inbox that answers you.
          </p>
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
      <div className="relative z-10 mx-auto max-w-6xl">
        <Reveal>
          <h2 className="max-w-2xl text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08]">
            One CEO. One line of accountability.
          </h2>
        </Reveal>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <div className="relative mx-auto max-w-sm">
              <div className="glass overflow-hidden rounded-3xl p-2">
                <img
                  src="/hamza-portrait.jpg"
                  alt="Hamza Hassan — Founder & CEO of Megsy"
                  className="aspect-[4/5] w-full rounded-2xl object-cover"
                />
              </div>
              <div className="glass absolute -bottom-5 left-1/2 w-max -translate-x-1/2 rounded-full px-6 py-3 text-center">
                <p className="text-sm font-semibold">Hamza Hassan</p>
                <p className="text-xs text-muted-foreground">Founder & Chief Executive Officer</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              Megsy is led by a single chief executive — Hamza Hassan, Founder & Chief Executive
              Officer. An Egyptian entrepreneur who started coding at 15 and shipped his first
              product at 17, he founded Megsy to build AI products from Egypt for the world. Product
              direction, engineering standards and customer commitments all run through one desk.
            </p>
            <div className="mt-8 space-y-3 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" /> Cairo &amp; Damanhour, Egypt
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:support@megsyai.com" className="hover:text-foreground">
                  support@megsyai.com
                </a>
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {PRINCIPLES.map((p) => (
                <div
                  key={p.title}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.04] p-5 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.07]"
                >
                  <h3 className="text-sm font-semibold">{p.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.body}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const CONTACT_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064209_0cb7d815-ff61-4caa-a6d5-bbff145ab272.mp4";

function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden px-5 py-24 sm:px-8 sm:py-32">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={CONTACT_VIDEO_URL}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/40" />

      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <Reveal>
          <h2 className="text-[clamp(1.9rem,4.4vw,3.2rem)] font-semibold leading-[1.06]">
            Talk to the people who build it.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Partnerships, press, billing or legal — every message reaches the team directly.
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="mailto:support@megsyai.com"
              className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
            >
              <Mail className="h-4 w-4" /> support@megsyai.com
            </a>
            <a
              href="tel:+201098125727"
              className="glass-soft inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
            >
              +20 109 812 5727
            </a>


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

const FOOTER_VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4";

export function Footer() {
  return (
    <section className="relative overflow-hidden px-5 py-16 sm:px-8 md:py-24">
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={FOOTER_VIDEO_URL}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/40" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.footer
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="liquid-glass w-full rounded-3xl p-6 text-white/70 md:p-10"
        >
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <img
                  src="/brand-logos/megsy.png"
                  alt="Megsy"
                  className="h-8 w-auto"
                />
                <span className="font-display text-xl font-medium">
                  MEG<span className="text-gradient">SY</span>
                </span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Megsy is a registered Egyptian company building unified AI workspaces — one product
                that replaces a stack of separate subscriptions, engineered and supported in-house.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-10 md:col-span-7 md:grid-cols-4">
              {FOOTER_LINKS.map((group) => (
                <div key={group.title}>
                  <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-white">
                    {group.title}
                  </h4>
                  <ul className="space-y-2 text-xs text-muted-foreground">
                    {group.links.map((link) => (
                      <li key={link.to}>
                        <Link to={link.to} className="transition-colors hover:text-white">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div>
                <h4 className="mb-4 text-sm font-medium uppercase tracking-wider text-white">Connect</h4>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li>
                    <a href="mailto:support@megsyai.com" className="transition-colors hover:text-white">
                      support@megsyai.com
                    </a>
                  </li>
                  <li>
                    <a href="tel:+201098125727" className="transition-colors hover:text-white">
                      +20 109 812 5727
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://megsyai.com"
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors hover:text-white"
                    >
                      megsyai.com
                    </a>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 md:flex-row md:gap-4">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} Megsy. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest opacity-50">Follow:</span>
              <div className="flex items-center gap-3">
                {[Music2, Facebook, Twitter, Youtube, Instagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="opacity-70 transition-colors hover:text-white hover:opacity-100"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
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
