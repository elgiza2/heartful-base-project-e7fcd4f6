import { motion } from "framer-motion";
import { Facebook, Instagram, Music2, Twitter, Youtube } from "lucide-react";

const FOOTER_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260429_114316_1c7889ad-2885-410e-b493-98119fee0ddb.mp4";

const LINKS: Array<{ title: string; items: string[] }> = [
  {
    title: "Discover",
    items: ["Labs & Workshops", "Deep Dive Series", "Global Circle", "Resource Vault", "Future Roadmap"],
  },
  { title: "The Mission", items: ["Origin Story", "The Collective", "Newsroom Hub", "Join the Team"] },
  { title: "Concierge", items: ["Get in Touch", "Legal Privacy", "User Agreement", "Report Concern"] },
];

const SOCIALS = [Music2, Facebook, Twitter, Youtube, Instagram];

export default function SiteFooter() {
  return (
    <div className="relative flex w-full min-h-[115vh] flex-col items-center overflow-x-hidden font-sans selection:bg-white/20 selection:text-white">
      <video
        src={FOOTER_VIDEO}
        autoPlay
        loop
        muted
        playsInline
        className="fixed inset-0 z-[0] h-full w-full object-cover"
      />

      <div className="relative z-10 flex w-full max-w-7xl flex-1 flex-col px-4 pt-24 md:px-8">
        <div className="text-center text-white">
          <h2 className="text-3xl font-medium md:text-5xl">Build with Megsy.</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/70">
            One company, one workspace, one point of contact. Reach the team directly and we will
            answer.
          </p>
          <a
            href="mailto:support@megsyai.com"
            className="liquid-glass mt-8 inline-flex rounded-full px-6 py-3 text-sm text-white/90"
          >
            Get in Touch
          </a>
        </div>

        <motion.footer
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
          className="liquid-glass mt-32 w-full rounded-3xl p-6 text-white/70 md:mt-64 md:p-10"
        >
          <div className="mb-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 66 62" className="h-6 w-6" aria-hidden="true">
                  <g stroke="currentColor" strokeWidth="5" strokeLinecap="square">
                    <line x1="33" y1="1" x2="33" y2="61" />
                    <line x1="3" y1="31" x2="63" y2="31" />
                    <line x1="11.8" y1="9.8" x2="54.2" y2="52.2" />
                    <line x1="54.2" y1="9.8" x2="11.8" y2="52.2" />
                  </g>
                </svg>
                <span className="text-xl font-medium text-white">MEGSY</span>
              </div>
              <p className="mt-4 max-w-sm text-sm leading-relaxed">
                Megsy for Digital Platforms Development and E-commerce LLC — an Egyptian company
                building applied AI products from Cairo for the world.
              </p>
              <div className="mt-6 space-y-1 text-xs text-white/50">
                <p>58 Al Hijaz St., Amoun Tower, Unit 84, Floor 8, Sheraton Al Matar, Nozha, Cairo, Egypt</p>
                <p>Commercial Register: 284691 · Tax ID: 774034785</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:col-span-7">
              {LINKS.map((group) => (
                <div key={group.title}>
                  <h3 className="mb-4 text-sm font-medium uppercase tracking-wider text-white">
                    {group.title}
                  </h3>
                  <ul className="space-y-2 text-xs">
                    {group.items.map((item) => (
                      <li key={item}>
                        <a href="#" className="transition-colors hover:text-white">
                          {item}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-6 md:flex-row md:gap-4">
            <p className="text-[10px] uppercase tracking-widest opacity-50">
              © {new Date().getFullYear()} Megsy · Curated by @megsyai
            </p>
            <div className="flex items-center gap-4">
              <span className="text-[10px] uppercase tracking-widest opacity-50">
                Join the Journey:
              </span>
              <div className="flex items-center gap-4">
                {SOCIALS.map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    aria-label="Megsy social profile"
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
    </div>
  );
}
