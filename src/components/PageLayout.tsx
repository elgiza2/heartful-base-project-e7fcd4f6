import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { COMPANY_NAV } from "../site";
import { Footer } from "../App";

export function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/brand-logos/megsy.png" alt="Megsy" className="h-8 w-8" />
          <span className="font-display text-lg font-medium tracking-tight">
            MEG<span className="text-gradient">SY</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {COMPANY_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-sm transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://megsyai.com"
            target="_blank"
            rel="noreferrer"
            className="hidden rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Open Megsy AI
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="glass-soft rounded-full p-2 md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/[0.06] bg-black/80 px-5 py-4 backdrop-blur-xl md:hidden">
          <ul className="space-y-3">
            {COMPANY_NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-muted-foreground hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-20 sm:px-8 sm:pb-20 sm:pt-28">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-primary/10 blur-[130px]" />
      <div className="relative mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl text-[clamp(2rem,5vw,3.6rem)] font-semibold leading-[1.05] tracking-[-0.02em]">
            {title}
          </h1>
          {lead && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {lead}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function Section({
  title,
  children,
  lead,
}: {
  title?: string;
  lead?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-6xl">
        {title && (
          <Reveal>
            <h2 className="text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-tight">{title}</h2>
            {lead && <p className="mt-4 max-w-2xl text-sm text-muted-foreground sm:text-base">{lead}</p>}
          </Reveal>
        )}
        <div className={title ? "mt-10" : ""}>{children}</div>
      </div>
    </section>
  );
}

export function GlassCard({
  title,
  body,
  children,
}: {
  title?: string;
  body?: string;
  children?: React.ReactNode;
}) {
  return (
    <article className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 backdrop-blur-xl transition-all duration-300 hover:border-white/[0.16] hover:bg-white/[0.07]">
      {title && <h3 className="text-base font-semibold">{title}</h3>}
      {body && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>}
      {children}
    </article>
  );
}

export default function PageLayout({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="relative min-h-screen bg-background">
      <SiteHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
