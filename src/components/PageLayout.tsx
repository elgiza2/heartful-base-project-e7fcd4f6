import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { COMPANY_NAV } from "../site";
import { Footer } from "../App";

export const PAGE_VIDEOS = {
  company:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260616_212935_bbf608da-62d1-4f25-9be4-c346e4d09cc8.mp4",
  work: "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260619_191346_9d19d66e-86a4-47f7-8dc6-712c1788c3b2.mp4",
  leadership:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064122_c4750c0e-7476-4b44-94a2-a85a65c63bf2.mp4",
  contact:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_064209_0cb7d815-ff61-4caa-a6d5-bbff145ab272.mp4",
  ambient:
    "https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260709_102332_2d8c4e02-313c-4362-aaa7-4c907cfc4f79.mp4",
  aurora:
    "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4",
} as const;

const EASE = [0.16, 1, 0.3, 1] as const;

export function BackgroundVideo({ src, opacity = 1 }: { src: string; opacity?: number }) {
  return (
    <video
      className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      style={{ opacity }}
      aria-hidden="true"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      src={src}
    />
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 26, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Word-by-word blur reveal, matching the homepage headline motion. */
export function WordReveal({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  return (
    <span className={className}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block will-change-transform"
          initial={{ opacity: 0, y: "0.5em", filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.9, delay: delay + i * 0.055, ease: EASE }}
        >
          {word}
          {i < text.split(" ").length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </span>
  );
}

function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={`liquid-glass pointer-events-auto mx-auto flex h-14 max-w-6xl items-center justify-between rounded-2xl px-4 transition-all duration-500 sm:px-5 ${
          solid ? "bg-black/50 backdrop-blur-xl" : ""
        }`}
      >
        <Link to="/" className="flex items-center gap-2.5">
          <img src="/brand-logos/megsy.png" alt="Megsy" className="h-7 w-auto" />
          <span className="font-display text-base font-medium tracking-tight text-white">
            MEG<span className="text-gradient">SY</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {COMPANY_NAV.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `relative text-[13px] transition-colors ${
                  isActive ? "text-white" : "text-white/55 hover:text-white"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1.5 left-1/2 h-[2px] w-4 -translate-x-1/2 rounded-full bg-white/70" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://megsyai.com"
            target="_blank"
            rel="noreferrer"
            className="hidden items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-semibold text-black transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Open Megsy AI <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="glass-soft rounded-full p-2 text-white md:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="liquid-glass pointer-events-auto mx-auto mt-2 max-w-6xl rounded-2xl bg-black/70 px-5 py-4 backdrop-blur-xl md:hidden">
          <ul className="space-y-3">
            {COMPANY_NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-sm text-white/70 hover:text-white">
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
  video = PAGE_VIDEOS.ambient,
  meta,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  video?: string;
  meta?: { label: string; value: string }[];
}) {
  return (
    <section className="relative isolate flex min-h-[78vh] items-end overflow-hidden">
      <BackgroundVideo src={video} />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/45" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-1/2 bg-gradient-to-t from-background via-background/45 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-8 sm:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="flex items-center gap-3 text-[11px] uppercase tracking-[0.28em] text-white/60"
        >
          <span className="h-[1px] w-8 bg-white/40" />
          {eyebrow}
        </motion.p>

        <h1 className="mt-6 max-w-4xl text-[clamp(2.1rem,5.4vw,4rem)] font-semibold leading-[1.03] tracking-[-0.03em] text-white">
          <WordReveal text={title} delay={0.12} />
        </h1>

        {lead && (
          <motion.p
            initial={{ opacity: 0, y: 18, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
            className="mt-7 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg"
          >
            {lead}
          </motion.p>
        )}

        {meta && meta.length > 0 && (
          <motion.dl
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: EASE }}
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {meta.map((m) => (
              <div key={m.label} className="glass-soft rounded-full px-4 py-2">
                <dt className="inline text-[10px] uppercase tracking-[0.18em] text-white/45">
                  {m.label}
                </dt>
                <dd className="ml-2 inline text-xs font-medium text-white/85">{m.value}</dd>
              </div>
            ))}
          </motion.dl>
        )}
      </div>
    </section>
  );
}

export function Section({
  title,
  children,
  lead,
  video,
  index,
}: {
  title?: string;
  lead?: string;
  video?: string;
  index?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden px-5 py-16 sm:px-8 sm:py-24">
      {video ? (
        <>
          <BackgroundVideo src={video} opacity={0.5} />
          <div className="pointer-events-none absolute inset-0 z-[1] bg-black/55" />
        </>
      ) : (
        <div className="pointer-events-none absolute inset-0 z-[1] grid-lines opacity-40" />
      )}

      <div className="relative z-10 mx-auto max-w-6xl">
        {title && (
          <Reveal>
            <div className="flex items-baseline gap-4">
              {index && (
                <span className="font-display text-xs tracking-[0.2em] text-white/30">{index}</span>
              )}
              <h2 className="text-[clamp(1.6rem,3.2vw,2.5rem)] font-semibold leading-tight tracking-[-0.02em]">
                {title}
              </h2>
            </div>
            {lead && (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {lead}
              </p>
            )}
            <div className="mt-8 h-[1px] w-full bg-gradient-to-r from-white/15 via-white/5 to-transparent" />
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
    <article className="liquid-glass group relative h-full overflow-hidden rounded-2xl bg-white/[0.03] p-7 transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.06]">
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
      {title && <h3 className="relative text-base font-semibold tracking-[-0.01em]">{title}</h3>}
      {body && (
        <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
      )}
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
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
}
