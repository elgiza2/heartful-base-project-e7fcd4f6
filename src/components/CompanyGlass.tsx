const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260616_212935_bbf608da-62d1-4f25-9be4-c346e4d09cc8.mp4";

const FACTS = [
  {
    title: "Legal name",
    text: "Megsy for Digital Platforms Development and E-commerce LLC — an Egyptian limited liability company registered and operating in Cairo.",
  },
  {
    title: "Registered office",
    text: "58 Al Hijaz St., Amoun Tower, opposite Heliopolis Hospital, Unit 84, Floor 8, Sheraton Al Matar, Nozha District, Cairo Governorate, Egypt.",
  },
  {
    title: "Registry",
    text: "Commercial register 284691 · Tax ID 774034785 · support@megsyai.com",
  },
];

export default function CompanyGlass() {
  return (
    <section
      id="company"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black text-white"
    >
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={VIDEO_URL}
      />

      <div className="pointer-events-none absolute inset-0 z-[1] bg-black/45" />
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      <div className="relative z-10 w-full max-w-7xl px-6 py-24 md:px-12">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">The company</p>
            <h2 className="font-display text-3xl font-light leading-tight md:text-4xl lg:text-5xl">
              The company behind Megsy.
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-white/70 md:text-base">
              Megsy for Digital Platforms Development and E-commerce LLC is an Egyptian technology
              company registered and operating in Cairo. We build applied AI software and the
              digital commerce infrastructure around it — product engineering, platform operations,
              and the systems that let a small team ship at scale.
            </p>
          </div>

          <div className="glass rounded-2xl p-7 md:p-9">
            <h3 className="font-display text-lg font-medium tracking-tight">Legal &amp; registry</h3>
            <div className="mt-6 space-y-5">
              {FACTS.map((f) => (
                <div key={f.title}>
                  <p className="text-sm font-semibold text-white/90">{f.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
