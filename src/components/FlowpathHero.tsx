import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260703_053131_1ec3dd1c-d627-44fb-ab20-6e1fce41b0d5.mp4";

const NAV_ITEMS = [
  {
    label: "Product",
    items: [
      { label: "Connections", href: "#work" },
      { label: "Workflows", href: "#work" },
      { label: "Insights", href: "#company" },
    ],
  },
  {
    label: "Solutions",
    items: [
      { label: "Guides", href: "#company" },
      { label: "Use cases", href: "#work" },
      { label: "API reference", href: "#contact" },
    ],
  },
  {
    label: "About",
    items: [
      { label: "Our story", href: "#company" },
      { label: "Open roles", href: "#contact" },
      { label: "Reach us", href: "#contact" },
    ],
  },
  { label: "Plans", items: null as null | { label: string; href: string }[] },
];

function Logo() {
  return (
    <a href="#" className="flex items-center gap-2">
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
        <path
          d="M14 2 26 14 14 26 2 14Z"
          stroke="white"
          strokeWidth="1.6"
          opacity="0.9"
        />
        <path
          d="M14 7 21 14 14 21 7 14Z"
          stroke="white"
          strokeWidth="1.6"
          opacity="0.5"
        />
      </svg>
      <span className="text-lg font-medium tracking-tight text-white sm:text-xl">flowpath</span>
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
        <div className="liquid-glass animate-dropdown !absolute left-0 top-full min-w-[160px] rounded-xl px-2 py-3 shadow-xl">
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
      {/* Vantage-style vignette over the video */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,.03), transparent 24%, transparent 82%, rgba(0,0,0,.05)), radial-gradient(ellipse at 44% 54%, transparent 30%, rgba(0,0,0,.055) 100%)",
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

          <div className="hidden items-center gap-5 md:flex">
            <a
              href="#contact"
              className="text-sm font-medium text-white/90 transition-colors hover:text-white"
            >
              Log in
            </a>
            <a
              href="#contact"
              className="liquid-glass rounded-full px-5 py-2 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
            >
              Try it free
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
          <div className="rounded-2xl bg-[#2C221C]/95 p-6 backdrop-blur-xl">
            <div className="space-y-1">
              {NAV_ITEMS.map((item) => (
                <div key={item.label}>
                  <span className="block py-2 text-sm font-medium text-white">{item.label}</span>
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
            <div className="mt-5 flex items-center gap-4 border-t border-white/10 pt-5">
              <a href="#contact" className="text-sm font-medium text-white/90 hover:text-white">
                Log in
              </a>
              <a
                href="#contact"
                className="liquid-glass rounded-full px-5 py-2 text-sm font-medium text-white"
              >
                Try it free
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-10 flex flex-1 items-start justify-center px-5 pt-16 sm:pt-20 md:pt-24">
        <div className="max-w-3xl text-center">
          <h1 className="text-3xl leading-[1.05] tracking-[-0.02em] text-white sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Bridge the
            <br />
            gaps. Ditch the
            <br />
            grindwork.
          </h1>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/80 sm:mt-8 sm:text-base md:text-lg">
            Flowpath unifies your complete wellness tools, so your crew spends less energy plugging
            gaps and more on real progress.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
            <a
              href="#company"
              className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 transition-colors hover:bg-white/90 sm:px-6 sm:py-3"
            >
              Begin your journey
            </a>
            <a
              href="#work"
              className="liquid-glass rounded-full px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:px-6 sm:py-3"
            >
              See it live
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
