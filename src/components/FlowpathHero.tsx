import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import logoAsset from "@/assets/megsy-logo.png.asset.json";
import megsyLogoAsset from "@/assets/megsy-logo.png.asset.json";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260819_212700_3bb9329b-5c50-4257-a09b-ca85cf3654a3.mp4";

const NAV_ITEMS = [
  {
    label: "Company",
    items: [
      { label: "Who we are", href: "#company" },
      { label: "What we do", href: "#work" },
      { label: "How we work", href: "#company" },
    ],
  },
  {
    label: "Work",
    items: [
      { label: "Applied AI", href: "#work" },
      { label: "Commerce infrastructure", href: "#work" },
      { label: "Design systems", href: "#work" },
    ],
  },
  {
    label: "Leadership",
    items: [
      { label: "Office of the CEO", href: "#leadership" },
      { label: "Our principles", href: "#leadership" },
    ],
  },
  { label: "Contact", items: null as null | { label: string; href: string }[] },
];

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2.5">
      <img
        src={logoAsset.url}
        alt="Megsy logo"
        className="h-8 w-8 object-contain sm:h-9 sm:w-9"
      />
      <span className="text-lg font-medium tracking-tight text-white sm:text-xl">megsy</span>
    </a>
  );
}

function NavDropdown({
  item,
  open,
  onEnter,
  onLeave,
}: {
  item: (typeof NAV_ITEMS)[number];
  open: boolean;
  onEnter: () => void;
  onLeave: () => void;
}) {
  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button className="flex items-center gap-1 text-sm font-medium text-white/90 transition-colors hover:text-white">
        {item.label}
        {item.items && (
          <ChevronDown
            className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        )}
      </button>
      {item.items && open && (
        <div className="liquid-glass animate-dropdown !absolute left-0 top-full min-w-[190px] rounded-xl px-2 py-3 shadow-xl">
          {item.items.map((sub) => (
            <a
              key={sub.label}
              href={sub.href}
              className="block rounded-lg px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
            >
              {sub.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function FlowpathHero() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <section className="relative flex h-screen w-full flex-col overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={VIDEO_URL}
        autoPlay
        muted
        loop
        playsInline
      />
      {/* Vignette over the video */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.28), transparent 30%, transparent 78%, rgba(0,0,0,.32)), radial-gradient(ellipse at 44% 54%, transparent 30%, rgba(0,0,0,.18) 100%)",
        }}
      />

      {/* Nav */}
      <nav className="relative z-20 w-full px-5 py-4 sm:px-6 sm:py-5 md:px-12 lg:px-16">
        <div className="flex items-center justify-between">
          <Logo />

          {/* Desktop nav */}
          <div className="hidden items-center gap-7 md:flex">
            {NAV_ITEMS.map((item) =>
              item.items ? (
                <NavDropdown
                  key={item.label}
                  item={item}
                  open={openDropdown === item.label}
                  onEnter={() => setOpenDropdown(item.label)}
                  onLeave={() => setOpenDropdown(null)}
                />
              ) : (
                <a
                  key={item.label}
                  href="#contact"
                  className="text-sm font-medium text-white/90 transition-colors hover:text-white"
                >
                  {item.label}
                </a>
              ),
            )}
          </div>

          <div className="hidden md:flex">
            <a
              href="#contact"
              className="liquid-glass rounded-full px-5 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              Get in touch
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="relative z-30 flex h-10 w-10 items-center justify-center text-white md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <Menu
              className={`absolute h-6 w-6 transition-all duration-300 ${
                mobileOpen ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
              }`}
            />
            <X
              className={`absolute h-6 w-6 transition-all duration-300 ${
                mobileOpen ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`duration-400 absolute inset-x-4 top-full z-20 transition-all ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden ${
            mobileOpen
              ? "pointer-events-auto translate-y-2 opacity-100"
              : "pointer-events-none -translate-y-3 opacity-0"
          }`}
        >
          <div className="rounded-2xl bg-[#161616]/95 p-6 backdrop-blur-xl">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  {item.items ? (
                    <span className="block py-2 text-sm font-medium text-white">{item.label}</span>
                  ) : (
                    <a
                      href="#contact"
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm font-medium text-white"
                    >
                      {item.label}
                    </a>
                  )}
                  {item.items?.map((sub) => (
                    <a
                      key={sub.label}
                      href={sub.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-1.5 pl-4 text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {sub.label}
                    </a>
                  ))}
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-white/10 pt-5">
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="liquid-glass inline-block rounded-full px-5 py-2 text-sm font-medium text-white"
              >
                Get in touch
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 items-start justify-center px-5 pt-16 sm:pt-20 md:pt-24">
        <div className="max-w-3xl text-center">
          <h1 className="text-3xl leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Applied AI,
            <br />
            built end to end
            <br />
            from Cairo.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/80 sm:mt-8 sm:text-base md:text-lg">
            Megsy is an Egyptian technology company. We design, build and run our own products —
            research, engineering, design and support under one roof.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
            <a
              href="#company"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-white/90 sm:px-6 sm:py-3"
            >
              The company
            </a>
            <a
              href="#work"
              className="liquid-glass rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:px-6 sm:py-3"
            >
              What we do
            </a>
          </div>
        </div>
      </div>

      {/* Logo bar */}
      <div className="relative z-10 mt-auto w-full border-t border-white/10 bg-black/20 py-5 backdrop-blur-md sm:py-6">
        <div className="flex items-center justify-center gap-8 px-5 sm:gap-12 md:gap-16">
          <GoogleLogo />
          <AmazonLogo />
          <SupabaseLogo />
          <GitHubLogo />
          <AlibabaLogo />
          <MegsyLogo />
        </div>
      </div>
    </section>
  );
}

function GoogleLogo() {
  return (
    <svg className="h-5 w-auto sm:h-6" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function AmazonLogo() {
  return (
    <svg className="h-5 w-auto text-white/80 sm:h-6" viewBox="0 0 100 30" aria-hidden="true">
      <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="currentColor">
        amazon
      </text>
      <path d="M8 24 Q28 29 52 24" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function SupabaseLogo() {
  return (
    <svg className="h-5 w-auto sm:h-6" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#3ECF8E" d="M12 2L2 19h10v3l10-17h-10V2z" />
    </svg>
  );
}

function GitHubLogo() {
  return (
    <svg className="h-5 w-auto text-white/80 sm:h-6" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
      />
    </svg>
  );
}

function AlibabaLogo() {
  return (
    <svg className="h-5 w-auto text-white/80 sm:h-6" viewBox="0 0 90 30" aria-hidden="true">
      <text x="0" y="22" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" fill="currentColor">
        Alibaba
      </text>
    </svg>
  );
}

function MegsyLogo() {
  return (
    <img
      src="/model-logos/megsy.png"
      alt="Megsy"
      className="h-5 w-auto object-contain sm:h-6"
    />
  );
}
