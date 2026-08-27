import {
  ArrowUpRight,
  Aperture,
  Box,
  Brush,
  Camera,
  Chrome,
  Figma,
  Framer,
  Layers,
  Palette,
  PenTool,
  Sparkle,
  Type,
  Wand2,
} from "lucide-react";

const BG_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_150203_44a5bd32-516a-47ce-a077-8acbf9aa8991.mp4";
const STAT_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_154543_d5b83fc1-9cea-44f3-b5e8-8f325935211a.mp4";
const SOFTWARE_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260507_153148_d7a3e1dd-e5d0-4ce6-8306-00d7522ecc44.mp4";

const ROW_1 = [Figma, Framer, Palette, PenTool, Layers, Type, Aperture, Chrome];
const ROW_2 = [Camera, Brush, Box, Wand2, Figma, Framer, Type, Layers];

const TIMELINE: Array<[string, string, string]> = [
  ["2026-Now", "Founder & Chief Executive Officer", "Megsy LLC"],
  ["2024-2026", "Independent Product Engineering", "Cairo"],
  ["2022-2024", "First Shipped Products", "Self-taught"],
];

function SectionLabel({ children, align = "center" }: { children: string; align?: "center" | "start" }) {
  return (
    <div
      className={`flex items-center gap-2 ${align === "center" ? "justify-center" : "justify-start"} text-[11px] uppercase tracking-[0.22em] text-white/70`}
    >
      <Sparkle className="h-3 w-3" strokeWidth={1.5} />
      <span>{children}</span>
      <Sparkle className="h-3 w-3" strokeWidth={1.5} />
    </div>
  );
}

function Marquee({
  icons,
  direction,
}: {
  icons: typeof ROW_1;
  direction: "left" | "right";
}) {
  const items = [...icons, ...icons];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex w-max gap-3 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
      >
        {items.map((Icon, i) => (
          <div
            key={i}
            className="liquid-glass grid h-14 w-14 shrink-0 place-items-center rounded-xl md:h-16 md:w-16"
          >
            <Icon className="h-5 w-5 text-white/80" strokeWidth={1.5} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CompanySection() {
  return (
    <section className="w-full bg-[#0a0a0a] px-4 py-6 font-sans text-white antialiased sm:px-6 sm:py-8 md:px-10 md:py-10 lg:h-screen lg:px-14">
      <header className="mb-6 flex flex-col gap-6 md:mb-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <h2 className="text-[28px] font-normal leading-[1.15] tracking-tight sm:text-3xl md:text-4xl lg:text-[44px]">
Leadership: one CEO, Hamza Hassan.
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-[1.6] text-white/60 md:text-[15px]">
            Megsy is led by a single chief executive. There is one CEO — Hamza Hassan, Founder
            &amp; Chief Executive Officer. An Egyptian entrepreneur who started coding at 15 and
            shipped his first product at 17, he founded Megsy to build AI infrastructure from Egypt
            for the world.
          </p>
        </div>
        <a
          href="mailto:support@megsyai.com"
          className="liquid-glass inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-sm text-white/90 sm:px-6 sm:py-3"
        >
          Contact the office of the CEO
        </a>
      </header>

      <div className="grid gap-4 md:grid-cols-2 md:gap-5 lg:h-[calc(100%-11rem)] lg:grid-cols-3">
        {/* Column 1 */}
        <div className="relative min-h-[360px] overflow-hidden rounded-2xl bg-black">
          <video
            src={BG_VIDEO}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="relative flex h-full flex-col justify-between p-5 md:p-6">
            <SectionLabel>CEO background</SectionLabel>
            <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-x-3 gap-y-2 text-[12px] text-white/85">
              {TIMELINE.map(([year, role, place]) => (
                <div key={year} className="col-span-4 grid grid-cols-subgrid items-center">
                  <span className="text-white/60">{year}</span>
                  <Sparkle className="h-3 w-3 text-white/60" strokeWidth={1.5} />
                  <span>{role}</span>
                  <span className="text-white/60">{place}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="grid gap-4 md:grid-rows-[auto_1fr] md:gap-5">
          <div className="noise-overlay relative overflow-hidden rounded-2xl bg-[#324444] p-5 md:p-6">
            <SectionLabel align="start">How we work</SectionLabel>
            <ul className="mt-4 space-y-2.5 text-[13px] leading-[1.55] text-white/85">
              <li>A small team that ships directly, with no layers in between.</li>
              <li>Reliability over novelty. Clear pricing. Data handled with restraint.</li>
              <li>Fast on an average phone and an average connection — that is the bar.</li>
            </ul>
          </div>
          <div className="relative min-h-[220px] overflow-hidden rounded-2xl bg-black">
            <video
              src={STAT_VIDEO}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative flex h-full flex-col items-center justify-center p-5">
              <span className="text-5xl font-light tracking-tight drop-shadow sm:text-6xl md:text-7xl lg:text-[88px]">
                10M+
              </span>
              <span className="mt-auto text-center text-[13px] text-white/85">
                Creative tasks completed
              </span>
            </div>
          </div>
        </div>

        {/* Column 3 */}
        <div className="grid gap-4 md:grid-rows-[1fr_auto] md:gap-5">
          <div className="relative min-h-[260px] overflow-hidden rounded-2xl bg-black">
            <video
              src={SOFTWARE_VIDEO}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="relative flex h-full flex-col justify-between gap-6 p-5 md:p-6">
              <SectionLabel>Daily Software</SectionLabel>
              <div className="flex flex-col gap-3">
                <Marquee icons={ROW_1} direction="left" />
                <Marquee icons={ROW_2} direction="right" />
              </div>
            </div>
          </div>
          <div className="noise-overlay relative overflow-hidden rounded-2xl bg-[#324444] p-5 md:p-6">
            <SectionLabel align="start">Office of the CEO</SectionLabel>
            <a
              href="mailto:support@megsyai.com"
              className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/80 transition-colors hover:text-white"
              aria-label="Email Megsy support"
            >
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
            </a>
            <p className="mt-4 text-sm text-white/85">
              Hamza Hassan — Founder &amp; Chief Executive Officer
            </p>
            <p className="mt-1 text-sm text-white/60">Cairo, Egypt · support@megsyai.com</p>
          </div>
        </div>
      </div>
    </section>
  );
}
