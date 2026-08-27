import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  ArrowUpRight,
  Boxes,
  Building2,
  Cpu,
  CreditCard,
  Gauge,
  LifeBuoy,
  Mail,
  MapPin,
  Menu,
  Palette,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const NAV = [
  { label: "Company", href: "#company" },
  { label: "What we do", href: "#work" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];

const HEADLINE = ["We", "build", "applied", "AI", "from", "Cairo."];

const CAPABILITIES = [
  {
    icon: Boxes,
    title: "Digital platform development",
    body: "We design, build and maintain our own platforms end to end — no outsourced core.",
  },
  {
    icon: Cpu,
    title: "Applied AI research",
    body: "Research only counts when it ships. We turn models into products people use daily.",
  },
  {
    icon: CreditCard,
    title: "Commerce infrastructure",
    body: "E-commerce systems, billing and subscription operations run in-house.",
  },
  {
    icon: Palette,
    title: "Design systems & brand",
    body: "One design language across every product we own, maintained by the team that ships it.",
  },
  {
    icon: LifeBuoy,
    title: "Direct customer support",
    body: "Support is handled by the engineers who wrote the code. No ticket theatre.",
  },
  {
    icon: ShieldCheck,
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

const MARQUEE = [
  "Applied AI",
  "Product engineering",
  "Platform operations",
  "Digital commerce",
  "Design systems",
  "Billing & subscriptions",
  "Research → shipping",
  "Cairo, Egypt",
];

function Backdrop() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const dots = Array.from({ length: 70 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.00016,
      vy: (Math.random() - 0.5) * 0.00016,
      a: Math.random() * 0.4 + 0.1,
    }));

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.max(1, Math.round(w * dpr));
      canvas.height = Math.max(1, Math.round(h * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const frame = () => {
      raf = requestAnimationFrame(frame);
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0 || d.x > 1) d.vx *= -1;
        if (d.y < 0 || d.y > 1) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x * w, d.y * h, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${d.a})`;
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reduced]);

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 900], [0, reduced ? 0 : 140]);

  return (
    <motion.div style={{ y }} className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 grid-lines" />
      <div className="absolute inset-0 veil" />
      <div className="absolute -left-24 top-1/4 h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-[140px]" />
      <div className="absolute -right-32 top-0 h-[28rem] w-[28rem] rounded-full bg-brand-mint/10 blur-[150px]" />
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </motion.div>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <nav className="glass mx-auto flex max-w-6xl items-center justify-between rounded-2xl px-4 py-3 sm:px-5">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight">
          MEG<span className="text-gradient">SY</span>
        </a>
        <ul className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="transition-colors hover:text-foreground">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-opacity hover:opacity-90 sm:inline-flex"
          >
            Get in touch
          </a>
          <a
            href="#work"
            aria-label="Open navigation"
            className="glass-soft inline-flex h-9 w-9 items-center justify-center rounded-full md:hidden"
          >
            <Menu className="h-4 w-4" />
          </a>
        </div>
      </nav>
    </header>
  );
}

function Hero() {
  const reduced = useReducedMotion();
  return (
    <section
      id="top"
      className="noise-overlay relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-24 pt-32 sm:px-8"
    >
      <Backdrop />
      <div className="mx-auto w-full max-w-6xl">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="glass-soft inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs text-muted-foreground"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Egyptian technology company · Est. Cairo
        </motion.span>

        <h1 className="mt-7 max-w-4xl text-[clamp(2.6rem,8vw,6rem)] font-semibold leading-[0.95]">
          {HEADLINE.map((word, i) => (
            <motion.span
              key={word + i}
              initial={
                reduced ? { opacity: 1 } : { opacity: 0, y: 28, filter: "blur(12px)" }
              }
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="mr-[0.28em] inline-block"
            >
              {i >= 4 ? <span className="text-gradient">{word}</span> : word}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Megsy for Digital Platforms Development and E-commerce LLC designs, builds and runs its
          own products end to end — research, engineering, design and support under one roof.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.68, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Talk to the team <ArrowUpRight className="h-4 w-4" />
          </a>
          <a
            href="#work"
            className="glass inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-transform hover:-translate-y-0.5"
          >
            What we do
          </a>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-xs uppercase tracking-[0.18em] text-muted-foreground"
        >
          <li>Registered in Cairo</li>
          <li>One CEO — Hamza Hassan</li>
          <li>Products owned end to end</li>
        </motion.ul>
      </div>

      <div className="mx-auto mt-16 w-full max-w-6xl">
        <div className="glass-soft overflow-hidden rounded-2xl">
          <div className="flex w-max animate-marquee-left items-center gap-10 py-3 pl-10 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {[...MARQUEE, ...MARQUEE].map((item, i) => (
              <span key={item + i} className="whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

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

function Company() {
  return (
    <section id="company" className="relative border-t border-white/5 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">The company</p>
          <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.4rem)] font-semibold leading-[1.05]">
            The company behind Megsy.
          </h2>
          <p className="mt-6 max-w-xl text-muted-foreground">
            Megsy for Digital Platforms Development and E-commerce LLC is an Egyptian technology
            company registered and operating in Cairo. We build applied AI software and the digital
            commerce infrastructure around it: product engineering, platform operations, and the
            systems that let a small team ship at scale.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="glass rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Building2 className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Registered entity</span>
            </div>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="eyebrow">Legal name</dt>
                <dd className="mt-1">
                  Megsy for Digital Platforms Development and E-commerce LLC
                </dd>
              </div>
              <div>
                <dt className="eyebrow">Registered office</dt>
                <dd className="mt-1 text-muted-foreground">
                  58 Al Hijaz St., Amoun Tower, opposite Heliopolis Hospital, Unit 84, Floor 8,
                  Sheraton Al Matar, Nozha District, Cairo Governorate, Egypt
                </dd>
              </div>
              <div className="flex gap-10">
                <div>
                  <dt className="eyebrow">Commercial register</dt>
                  <dd className="mt-1">284691</dd>
                </div>
                <div>
                  <dt className="eyebrow">Tax ID</dt>
                  <dd className="mt-1">774034785</dd>
                </div>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="relative border-t border-white/5 px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="eyebrow">What we do</p>
          <h2 className="mt-4 max-w-2xl text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08]">
            Software, commerce and support — owned in one house.
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CAPABILITIES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <article className="glass lift h-full rounded-2xl p-6">
                <item.icon className="h-5 w-5 text-primary" />
                <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section
      id="leadership"
      className="relative border-t border-white/5 px-5 py-24 sm:px-8 sm:py-32"
    >
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
      <Nav />
      <main>
        <Hero />
        <Company />
        <Work />
        <Leadership />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
