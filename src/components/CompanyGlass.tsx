import { useEffect, useRef } from "react";
import "../company-glass.css";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260816_125506_3a597378-ec85-4ebd-bd22-03b45508ac62.mp4";

const WAVE_D =
  "M0,20 L8,20 L8,8 L12,8 L12,32 L16,32 L16,14 L22,14 L22,26 L28,26 L28,4 L32,4 L32,36 L36,36 L36,16 L42,16 L42,24 L48,24 L48,10 L54,10 L54,30 L58,30 L58,18 L64,18 L64,22 L70,22 L70,12 L76,12 L76,28 L82,28 L82,17 L88,17 L88,23 L94,23 L94,15 L100,15 L100,25 L106,25 L106,19 L112,19 L112,21 L120,21 L120,20 L276,20";

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

/** Live refraction: draw the section's background video into a canvas that
 *  sits behind the card, aligned 1:1 with the real video, and let the SVG
 *  filter refract it on composite. */
function useGlassRefraction(
  videoRef: React.RefObject<HTMLVideoElement>,
  cardRef: React.RefObject<HTMLElement>,
  dupRef: React.RefObject<HTMLDivElement>,
  canvasRef: React.RefObject<HTMLCanvasElement>,
) {
  useEffect(() => {
    let raf = 0;
    const ctx = canvasRef.current?.getContext("2d") ?? null;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const video = videoRef.current;
      const card = cardRef.current;
      const dup = dupRef.current;
      const canvas = canvasRef.current;
      if (!video || !card || !dup || !canvas || !ctx) return;
      if (!video.videoWidth || !video.videoHeight) return;

      const cardRect = card.getBoundingClientRect();
      const videoRect = video.getBoundingClientRect();
      if (!cardRect.width || !cardRect.height || !videoRect.width) return;

      // Align the duplicate with the real video, not with the card: the filter
      // shifts each colour channel differently, so the filtered element's own
      // edges show hard channel-separation bands. Sized to the full video they
      // fall outside the card and only clean refraction shows.
      dup.style.left = `${videoRect.left - cardRect.left}px`;
      dup.style.top = `${videoRect.top - cardRect.top}px`;
      dup.style.width = `${videoRect.width}px`;
      dup.style.height = `${videoRect.height}px`;

      // Stay at 1x even on retina: the SVG filter cost scales with pixel count
      // and a soft refraction gains nothing from 4x the work.
      const w = Math.round(videoRect.width);
      const h = Math.round(videoRect.height);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }

      // reproduce object-fit: cover
      const cover = Math.max(w / video.videoWidth, h / video.videoHeight);
      const sw = w / cover;
      const sh = h / cover;
      const sx = (video.videoWidth - sw) / 2;
      const sy = (video.videoHeight - sh) / 2;
      try {
        ctx.drawImage(video, sx, sy, sw, sh, 0, 0, w, h);
      } catch {
        /* frame not decodable yet */
      }
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [videoRef, cardRef, dupRef, canvasRef]);
}

function GlassDefs() {
  return (
    <svg className="glass-defs" width="0" height="0" aria-hidden="true" focusable="false">
      <defs>
        <filter
          id="liquid-glass-refraction"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.012 0.015"
            numOctaves="3"
            result="noise"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            result="boosted_alpha"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 100 0"
          />
          <feGaussianBlur in="boosted_alpha" stdDeviation="45" result="blurred_alpha" />
          <feComponentTransfer in="blurred_alpha" result="edge_mask">
            <feFuncA type="linear" slope="-1.3" intercept="1" />
          </feComponentTransfer>
          <feComposite
            in="noise"
            in2="edge_mask"
            operator="arithmetic"
            k1="1"
            k2="0"
            k3="0"
            k4="0"
            result="masked_noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="masked_noise"
            scale="65"
            xChannelSelector="R"
            yChannelSelector="G"
            result="red_displaced"
          />
          <feColorMatrix
            in="red_displaced"
            type="matrix"
            result="red"
            values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="masked_noise"
            scale="56"
            xChannelSelector="R"
            yChannelSelector="G"
            result="green_displaced"
          />
          <feColorMatrix
            in="green_displaced"
            type="matrix"
            result="green"
            values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="masked_noise"
            scale="47"
            xChannelSelector="R"
            yChannelSelector="G"
            result="blue_displaced"
          />
          <feColorMatrix
            in="blue_displaced"
            type="matrix"
            result="blue"
            values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
          <feBlend in="red" in2="green" mode="screen" result="rg" />
          <feBlend in="rg" in2="blue" mode="screen" result="chromatic_dispersion" />
        </filter>
      </defs>
    </svg>
  );
}

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const dupRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGlassRefraction(videoRef, cardRef, dupRef, canvasRef);

  return (
    <section id="company" className="tg">
      <video
        ref={videoRef}
        className="tg__video"
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        src={VIDEO_URL}
      />
      <GlassDefs />

      <Rule side="left" />
      <Rule side="right" />

      <div className="tg__inner">
        <div className="tg__bar">
          <span className="tg__barItem">
            <span className="tg__dot" />
            <span className="tg__barLabel">Cairo, Egypt</span>
          </span>
          <a className="tg__barItem" href="mailto:support@megsyai.com">
            <span className="tg__barLabel">support@megsyai.com</span>
          </a>
        </div>

        <div className="tg__bottom">
          <div className="tg__lede">
            <span className="tg__eyebrow">The company</span>
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
              <svg
                className="tg__icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>

          <aside className="tg__card" ref={cardRef}>
            <div className="tg__dupContainer" ref={dupRef} aria-hidden="true">
              <canvas className="tg__dupImage" ref={canvasRef} />
            </div>
            <div className="tg__frost" aria-hidden="true" />

            <div>
              <div className="tg__head">
                <h3 className="tg__cardTitle">Legal &amp; registry</h3>
                <span className="tg__cardIndex">//01</span>
              </div>
              <div className="tg__cardBody">
                {FACTS.map((f) => (
                  <div key={f.title}>
                    <p className="tg__factTitle">{f.title}</p>
                    <p className="tg__factText">{f.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <svg
              className="tg__wave"
              viewBox="0 0 276 40"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              aria-hidden="true"
            >
              <path d={WAVE_D} />
            </svg>
          </aside>
        </div>
      </div>
    </section>
  );
}
