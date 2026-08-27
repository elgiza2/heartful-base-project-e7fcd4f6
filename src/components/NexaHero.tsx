import { useEffect, useState } from "react";
import "../nexa-hero.css";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4";

const LINKS = [
  { label: "Company", href: "#company" },
  { label: "What we do", href: "#work" },
  { label: "Leadership", href: "#leadership" },
  { label: "Contact", href: "#contact" },
];

const STRIP = [
  "Applied AI",
  "Commerce infrastructure",
  "Design systems",
  "Direct support",
];

function BrandMark() {
  return (
    <svg viewBox="0 0 31.5 48.5" aria-hidden="true">
      <defs>
        <linearGradient id="nx-bg1" gradientUnits="userSpaceOnUse" x1="8" y1="0" x2="34.1" y2="28.9">
          <stop offset="0" stopColor="#9e9e9e" />
          <stop offset="0.28" stopColor="#a6a6a6" />
          <stop offset="0.34" stopColor="#a3a3a3" />
          <stop offset="0.4" stopColor="#3a3a3a" />
          <stop offset="0.55" stopColor="#414141" />
          <stop offset="0.6" stopColor="#7a7a7a" />
          <stop offset="0.68" stopColor="#8e8e8e" />
          <stop offset="0.8" stopColor="#a9a9a9" />
          <stop offset="0.95" stopColor="#c4c4c4" />
          <stop offset="1" stopColor="#cccccc" />
        </linearGradient>
      </defs>
      <path
        d="M21.5 0 L21.5 19.5 L31.5 19.5 L31.5 29 L10 48.5 L10 28.5 L0.5 28.5 L0.5 18.5 Z"
        fill="url(#nx-bg1)"
      />
      <rect x="0.5" y="18.5" width="9" height="10" fill="#fdfdfd" />
      <rect x="22" y="19.5" width="9.5" height="9.5" fill="#fdfdfd" />
    </svg>
  );
}

function StripMark({ i }: { i: number }) {
  if (i === 0)
    return (
      <svg viewBox="0 0 30 31" aria-hidden="true">
        <mask id="nx-m1">
          <rect width="30" height="31" fill="#fff" />
          <circle cx="19.5" cy="10.5" r="5.1" fill="#000" />
        </mask>
        <rect x="1.5" y="2.5" width="21" height="21" rx="3" fill="currentColor" mask="url(#nx-m1)" />
        <circle
          cx="19.5"
          cy="10.5"
          r="8.4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
    );
  if (i === 1)
    return (
      <svg viewBox="0 0 25 30" aria-hidden="true">
        <rect x="1" y="2" width="5.5" height="26" rx="2.5" fill="currentColor" />
        <path d="M12 4a11 11 0 0 1 0 22z" fill="currentColor" />
        <path d="M12 4a11 11 0 0 0 0 22" fill="none" stroke="currentColor" strokeWidth="3" />
      </svg>
    );
  if (i === 2)
    return (
      <svg viewBox="0 0 28 28" aria-hidden="true">
        <circle cx="14" cy="14" r="12.35" fill="none" stroke="currentColor" strokeWidth="3.1" />
        <path d="M4 18c4-8 12-10 18-6" fill="none" stroke="currentColor" strokeWidth="3.1" />
        <path d="M6 10c6 2 10 8 12 14" fill="none" stroke="currentColor" strokeWidth="3.1" />
      </svg>
    );
  return (
    <svg viewBox="0 0 28 25.5" aria-hidden="true">
      <path d="M1 12c4-9 9-11 13-8s7 3 13-1v9H1z" fill="currentColor" />
      <path d="M1.5 18c5-3 9 2 13 0s7-3 12-1" fill="none" stroke="currentColor" strokeWidth="3.05" />
      <path d="M1.5 23c5-3 9 2 13 0s7-3 12-1" fill="none" stroke="currentColor" strokeWidth="3.05" />
    </svg>
  );
}

export default function NexaHero() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth / window.innerHeight > 1.1) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <section id="top" className={`nexa${open ? " is-open" : ""}`}>
      <div className="plate">
        <video
          className="plate-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
      </div>

      <a className="brand" href="#top" aria-label="Home">
        <BrandMark />
      </a>

      <nav className="links" aria-label="Primary">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>

      <a className="pill pill-nav" href="#contact">
        <span>Get in touch</span>
      </a>

      <button
        className="burger"
        type="button"
        aria-expanded={open}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((v) => !v)}
      >
        <i />
        <i />
      </button>

      <nav className="menu" aria-hidden={!open} aria-label="Mobile">
        <div className="menu-inner">
          <p className="menu-eyebrow">Menu</p>
          <ul className="menu-list">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} onClick={() => setOpen(false)}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="menu-foot">
            <a className="pill" href="#contact" onClick={() => setOpen(false)}>
              <span>Get in touch</span>
            </a>
            <a className="ghost" href="#work" onClick={() => setOpen(false)}>
              What we do
            </a>
          </div>
        </div>
      </nav>

      <main className="hero">
        <h1 className="headline">
          <span>Applied AI,</span> <span>built from Cairo.</span>
        </h1>
        <p className="sub">
          <span>Megsy for Digital Platforms Development and E-commerce LLC designs,</span>{" "}
          <span>builds and runs its own products end to end.</span>
        </p>
        <a className="pill pill-cta" href="#contact">
          <span>Get in touch</span>
        </a>
        <a className="ghost" href="#company">
          About the company
        </a>
      </main>

      <div className="logos">
        {STRIP.map((label, i) => (
          <div className="lg" key={label}>
            <StripMark i={i} />
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
