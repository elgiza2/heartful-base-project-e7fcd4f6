import "../company-glass.css";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260816_125506_3a597378-ec85-4ebd-bd22-03b45508ac62.mp4";

function Rule({ side }: { side: "left" | "right" }) {
  return (
    <div className={`tg__rule tg__rule--${side}`} aria-hidden="true">
      <span className="tg__seg tg__seg--end" />
      <span className="tg__plus">+</span>
      <span className="tg__seg tg__seg--mid" />
      <span className="tg__plus">+</span>
      <span className="tg__seg tg__seg--end" />
    </div>
  );
}

export default function CompanyGlass() {
  return (
    <section id="company" className="tg">
      <video
        className="tg__video"
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={VIDEO_URL}
      />

      <Rule side="left" />
      <Rule side="right" />

      <div className="tg__inner">
        <div className="tg__bottom">
          <div className="tg__lede">
            <h2 className="tg__title">
              The company
              <br />
              behind Megsy.
            </h2>
            <p className="tg__body">
              Megsy for Digital Platforms Development and E-commerce LLC is an Egyptian technology
              company registered and operating in Cairo. We build applied AI software and the
              digital commerce infrastructure around it — product engineering, platform operations,
              and the systems that let a small team ship at scale.
            </p>
            <a className="tg__chamfer" href="#work">
              <span className="tg__chamferGlass" aria-hidden="true" />
              <svg
                className="tg__chamferOutline"
                viewBox="0 0 260 48"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon
                  points="14,0 260,0 260,34 246,48 0,48 0,14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
              <span className="tg__chamferLabel">What we do</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
