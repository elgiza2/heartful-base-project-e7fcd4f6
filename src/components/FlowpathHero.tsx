import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

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
        src="/brand-logos/megsy.png"
        alt="Megsy logo"
        className="h-9 w-9 object-contain"
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
    <section className="relative flex h-screen w-full flex-col overflow-hidden bg-[#03070A]">
      {/* Background video + Auren gradient overlay */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_39ca84eAE1ODL9hbR5VhoEj8tBf/hf_20260709_102332_2d8c4e02-313c-4362-aaa7-4c907cfc4f79.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/20" />

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
            One workspace
            <br />
            instead of ten
            <br />
            subscriptions.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/80 sm:mt-8 sm:text-base md:text-lg">
            Megsy is an Egyptian software company building unified, product-led AI workspaces —
            engineered, operated and supported by the same small team in Cairo.
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
      <div className="relative z-10 mt-auto mb-8 flex w-full justify-center px-5">
        <div className="glass-soft flex max-w-[90vw] flex-col items-center gap-4 rounded-2xl px-7 py-5 sm:flex-row sm:gap-8 sm:px-10">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/50 sm:text-[11px]">
            Trusted by teams at
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
            <GoogleLogo />
            <AmazonLogo />
            <SupabaseLogo />
            <GitHubLogo />
            <AlibabaLogo />
            <MegsyLogo />
          </div>
        </div>
      </div>
    </section>
  );
}

function GoogleLogo() {
  return (
    <svg className="logo-item h-5 w-auto" viewBox="0 0 56 24" aria-hidden="true">
      <text x="0" y="17" fontFamily="Arial, sans-serif" fontSize="16" fontWeight="bold" letterSpacing="-0.3">
        <tspan fill="#4285F4">G</tspan>
        <tspan fill="#EA4335">o</tspan>
        <tspan fill="#FBBC05">o</tspan>
        <tspan fill="#4285F4">g</tspan>
        <tspan fill="#34A853">l</tspan>
        <tspan fill="#EA4335">e</tspan>
      </text>
    </svg>
  );
}

function AmazonLogo() {
  return (
    <svg className="logo-item h-5 w-auto text-white/80" viewBox="0 0 84 28" aria-hidden="true">
      <text x="0" y="16" fontFamily="Arial, sans-serif" fontSize="17" fontWeight="bold" fill="currentColor" letterSpacing="-0.2">
        amazon
      </text>
      <path d="M6 20 Q28 26 54 20" stroke="#FF9900" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function SupabaseLogo() {
  return (
    <svg className="logo-item h-5 w-auto" viewBox="0 0 82 24" aria-hidden="true">
      <text x="0" y="17" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="600" fill="#3ECF8E" letterSpacing="0.4">
        supabase
      </text>
    </svg>
  );
}

function GitHubLogo() {
  return (
    <svg className="logo-item h-5 w-auto text-white/80" viewBox="0 0 64 24" aria-hidden="true">
      <text x="0" y="17" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="bold" fill="currentColor" letterSpacing="-0.3">
        GitHub
      </text>
    </svg>
  );
}

function AlibabaLogo() {
  return (
    <svg className="logo-item h-5 w-auto text-white/80" viewBox="0 0 72 24" aria-hidden="true">
      <text x="0" y="17" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="bold" fill="currentColor" letterSpacing="-0.2" fontStyle="italic">
        Alibaba
      </text>
    </svg>
  );
}

function MegsyLogo() {
  return (
    <svg className="logo-item h-5 w-auto text-white/80" viewBox="0 0 54 24" aria-hidden="true">
      <text x="0" y="17" fontFamily="Arial, sans-serif" fontSize="15" fontWeight="500" fill="currentColor" letterSpacing="0.6">
        megsy
      </text>
    </svg>
  );
}
