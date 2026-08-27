import { useEffect, useRef, useState } from "react";
import "./poster.css";

const FRONT_LILY =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260808_192942_e1086505-d7da-433b-a59b-8220f4e6c808.png&w=1280&q=85";
const REVEAL_LILY =
  "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260808_151324_bf318a5f-5525-4fc7-aab5-e9a341018828.png&w=1280&q=85";

const TRAIL_MAX_POINTS = 60;
const TRAIL_HEAD_R = 140;
const TRAIL_NOISE_AMP = 44;
const TRAIL_BLOB_PTS = 24;
const TRAIL_FADE_SPEED = 0.92;
const TRAIL_SAMPLE_DIST = 8;

type TrailPoint = { x: number; y: number; r: number; alpha: number; seed: number };

function drawMorphBlob(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  t: number,
  seed: number,
) {
  if (r < 2) return;
  const pts: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < TRAIL_BLOB_PTS; i++) {
    const angle = (i / TRAIL_BLOB_PTS) * Math.PI * 2;
    const n1 = Math.sin(angle * 3 + t * 1.4 + seed) * 0.45;
    const n2 = Math.sin(angle * 5 - t * 0.9 + seed * 2.3) * 0.3;
    const n3 = Math.cos(angle * 2 + t * 1.8 + seed * 0.7) * 0.25;
    const noise = (n1 + n2 + n3) * TRAIL_NOISE_AMP * (r / TRAIL_HEAD_R);
    const rr = r + noise;
    pts.push({ x: cx + Math.cos(angle) * rr, y: cy + Math.sin(angle) * rr });
  }
  ctx.beginPath();
  const mid = (a: { x: number; y: number }, b: { x: number; y: number }) => ({
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
  });
  const start = mid(pts[pts.length - 1], pts[0]);
  ctx.moveTo(start.x, start.y);
  for (let i = 0; i < pts.length; i++) {
    const cur = pts[i];
    const next = pts[(i + 1) % pts.length];
    const m = mid(cur, next);
    ctx.quadraticCurveTo(cur.x, cur.y, m.x, m.y);
  }
  ctx.closePath();
  ctx.fillStyle = "#fff";
  ctx.fill();
}

type Panel = "home" | "platform" | "company" | "contact" | "menu";

const LEGAL = (
  <div className="sheet__legal" lang="ar" dir="rtl">
    <h3>الجهة المسؤولة قانونيًا</h3>
    <p>
      <strong>ميغسي لتطوير المنصات الرقمية والتجارة الإلكترونية — شركة ذات مسؤولية محدودة</strong>
    </p>
    <p>
      ٥٨ شارع الحجاز، برج آمون، أمام مستشفى هليوبوليس، وحدة ٨٤، الدور ٨، شياخة شيراتون المطار، قسم
      النزهة، محافظة القاهرة، مصر
    </p>
    <p>
      سجل تجاري: <strong>284691</strong> · رقم ضريبي: <strong>774034785</strong>
    </p>
    <p>
      <a href="mailto:support@megsyai.com">support@megsyai.com</a>
    </p>
  </div>
);

const PANEL_CONTENT: Record<Exclude<Panel, "menu">, { title: string; body: JSX.Element }> = {
  home: {
    title: "Megsy",
    body: (
      <>
        <p>
          One AI. Every creative tool you need. Megsy unifies chat, images, video, cinema,
          lip-sync, slides, deep research and full-stack app building into a single window —
          built on the world&apos;s best models, wrapped in one calm interface.
        </p>
        <h3>Why we exist</h3>
        <p>
          Creative work broke into a dozen subscriptions and a dozen tabs. Megsy puts the whole
          stack back into one workspace: one prompt, one session, one plan, no app switching.
        </p>
        <h3>At a glance</h3>
        <ul>
          <li>80+ models from OpenAI, Google, xAI, Black Forest Labs, Kling, Luma and more.</li>
          <li>Intelligent routing — or pick your model manually, mid-conversation.</li>
          <li>Founded 2026 · headquartered in Cairo, Egypt · built for a global audience.</li>
          <li>Free to start at megsyai.com.</li>
        </ul>
      </>
    ),
  },
  platform: {
    title: "The platform",
    body: (
      <>
        <h3>One chat, every model</h3>
        <p>
          Megsy routes each message to the model that handles it best and keeps full context when
          you switch. Upload files, search the web live, and let the workspace remember the
          thread instead of starting over.
        </p>
        <h3>Creative suite</h3>
        <ul>
          <li>Image generation across FLUX, Recraft, Ideogram, Nano Banana and Megsy V1.</li>
          <li>Video with Kling, Veo, Runway Gen-4 and Megsy Video — camera control included.</li>
          <li>AI Cinema Studio: script to scene with lip-sync, voice acting, consistent characters.</li>
          <li>Canvas editor, inpaint and outpaint, upscaling, background removal.</li>
          <li>Voice, soundtracks and multilingual voiceover from a single prompt.</li>
          <li>Slides, documents and deep research reports with traceable sources.</li>
        </ul>
        <h3>Megsy Build</h3>
        <p>
          Describe a product and get a production React, TypeScript and Tailwind frontend with
          database, auth, storage and edge functions wired in — RLS policies, secret management
          and dependency scans on every change, then one-click deploy to your domain with SSL
          and CDN.
        </p>
        <h3>Blueprints</h3>
        <p>
          Pre-designed starting points that keep characters, styles and layouts aligned across a
          whole campaign, so output stays consistent instead of drifting prompt to prompt.
        </p>
      </>
    ),
  },
  company: {
    title: "The company",
    body: (
      <>
        <p>
          Megsy is an Egyptian technology company founded in 2026 and operating from Cairo. It is
          led by a single chief executive — <strong>Hamza Hassan</strong>, founder and CEO. Some
          third-party directories list two chief executives; that is inaccurate. Megsy has one
          CEO.
        </p>
        <h3>Hamza Hassan — Founder &amp; CEO</h3>
        <p>
          An Egyptian entrepreneur who started coding at 15 and shipped his first product at 17,
          Hamza founded Megsy to build AI infrastructure from Egypt for the world: models and
          products that complete real tasks on a user&apos;s behalf rather than only answering
          questions.
        </p>
        <h3>How we work</h3>
        <ul>
          <li>A small team that ships directly: research, engineering, design and support.</li>
          <li>Reliability over novelty. Clear pricing. Data handled with restraint.</li>
          <li>Fast on an average phone and an average connection — that is the bar.</li>
        </ul>
        <h3>Where we are going</h3>
        <p>
          Scaling one unified workspace to creators and businesses globally, then autonomous
          agents that carry tasks end to end — with Egypt as the base the infrastructure is built
          from.
        </p>
        {LEGAL}
      </>
    ),
  },
  contact: {
    title: "Contact",
    body: (
      <>
        <h3>Support</h3>
        <p>
          <a href="mailto:support@megsyai.com">support@megsyai.com</a> — product questions,
          billing, accounts, privacy and data requests.
        </p>
        <h3>Product</h3>
        <p>
          <a href="https://www.megsyai.com/" target="_blank" rel="noreferrer">
            megsyai.com
          </a>
        </p>
        <h3>Press &amp; partnerships</h3>
        <p>
          Write to support@megsyai.com with &quot;Press&quot; or &quot;Partnership&quot; in the
          subject line and it reaches the right person.
        </p>
        {LEGAL}
      </>
    ),
  },
};


export default function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const revealCanvasRef = useRef<HTMLCanvasElement>(null);
  const frontLayerRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const [anim, setAnim] = useState(true);
  const [panel, setPanel] = useState<Panel | null>(null);

  // entrance runs once
  useEffect(() => {
    const timer = window.setTimeout(() => setAnim(false), 2200);
    const safety = window.setTimeout(() => setAnim(false), 6000);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(safety);
    };
  }, []);

  useEffect(() => {
    if (!panel) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [panel]);

  // mouse morph-reveal trail
  useEffect(() => {
    const stage = stageRef.current;
    const flower = flowerRef.current;
    const front = frontCanvasRef.current;
    const reveal = revealCanvasRef.current;
    const frontLayer = frontLayerRef.current;
    const revealLayer = revealLayerRef.current;
    if (!stage || !flower || !front || !reveal || !frontLayer || !revealLayer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const trail: TrailPoint[] = [];
    let hovering = false;
    let headRadius = 0;
    let time = 0;
    let pointer = { x: 0, y: 0 };
    let lastSample: { x: number; y: number } | null = null;
    let raf = 0;
    let wasActive = false;

    const sizeCanvases = () => {
      const rect = flower.getBoundingClientRect();
      const w = Math.max(1, Math.round(rect.width));
      const h = Math.max(1, Math.round(rect.height));
      [front, reveal].forEach((c) => {
        c.width = w;
        c.height = h;
      });
    };
    sizeCanvases();
    const onResize = () => sizeCanvases();
    window.addEventListener("resize", onResize);

    const toFlowerSpace = (clientX: number, clientY: number) => {
      const rect = flower.getBoundingClientRect();
      const scaleX = front.width / (rect.width || 1);
      const scaleY = front.height / (rect.height || 1);
      return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
    };

    const onMove = (e: MouseEvent) => {
      hovering = true;
      pointer = toFlowerSpace(e.clientX, e.clientY);
    };
    const onEnter = (e: MouseEvent) => {
      hovering = true;
      pointer = toFlowerSpace(e.clientX, e.clientY);
    };
    const onLeave = () => {
      hovering = false;
      lastSample = null;
    };
    stage.addEventListener("mousemove", onMove);
    stage.addEventListener("mouseenter", onEnter);
    stage.addEventListener("mouseleave", onLeave);

    const frontCtx = front.getContext("2d");
    const revealCtx = reveal.getContext("2d");
    if (!frontCtx || !revealCtx) return;

    const frame = () => {
      raf = requestAnimationFrame(frame);
      const targetR = hovering ? TRAIL_HEAD_R : 0;
      headRadius += (targetR - headRadius) * (hovering ? 0.14 : 0.04);

      if (hovering && headRadius > 5) {
        const dx = lastSample ? pointer.x - lastSample.x : Infinity;
        const dy = lastSample ? pointer.y - lastSample.y : Infinity;
        if (!lastSample || Math.hypot(dx, dy) > TRAIL_SAMPLE_DIST) {
          trail.push({
            x: pointer.x,
            y: pointer.y,
            r: headRadius,
            alpha: 1,
            seed: Math.random() * 100,
          });
          if (trail.length > TRAIL_MAX_POINTS) trail.shift();
          lastSample = { x: pointer.x, y: pointer.y };
        }
      }

      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.alpha *= TRAIL_FADE_SPEED;
        p.r *= 0.995;
        if (p.alpha < 0.01) trail.splice(i, 1);
      }
      time += 0.016;

      const active = trail.length > 0 || headRadius > 1;
      if (!active) {
        if (wasActive) {
          frontLayer.style.maskImage = "";
          frontLayer.style.webkitMaskImage = "";
          revealLayer.style.maskImage = "linear-gradient(#0000, #0000)";
          revealLayer.style.webkitMaskImage = "linear-gradient(#0000, #0000)";
          wasActive = false;
        }
        return;
      }
      wasActive = true;

      // FRONT layer: white fill, blobs punch holes
      frontCtx.setTransform(1, 0, 0, 1, 0, 0);
      frontCtx.clearRect(0, 0, front.width, front.height);
      frontCtx.globalCompositeOperation = "source-over";
      frontCtx.fillStyle = "#fff";
      frontCtx.fillRect(0, 0, front.width, front.height);
      frontCtx.globalCompositeOperation = "destination-out";

      // REVEAL layer: clear, blobs paint white
      revealCtx.setTransform(1, 0, 0, 1, 0, 0);
      revealCtx.clearRect(0, 0, reveal.width, reveal.height);
      revealCtx.globalCompositeOperation = "source-over";

      const paint = (ctx: CanvasRenderingContext2D) => {
        for (const p of trail) {
          ctx.globalAlpha = p.alpha;
          drawMorphBlob(ctx, p.x, p.y, p.r, time, p.seed);
        }
        if (hovering && headRadius > 5) {
          ctx.globalAlpha = 1;
          drawMorphBlob(ctx, pointer.x, pointer.y, headRadius, time, 0.5);
        }
        ctx.globalAlpha = 1;
      };
      paint(frontCtx);
      paint(revealCtx);

      const frontMask = `url(${front.toDataURL()})`;
      const revealMask = `url(${reveal.toDataURL()})`;
      frontLayer.style.maskImage = frontMask;
      frontLayer.style.webkitMaskImage = frontMask;
      frontLayer.style.maskSize = "100% 100%";
      frontLayer.style.webkitMaskSize = "100% 100%";
      frontLayer.style.maskRepeat = "no-repeat";
      frontLayer.style.webkitMaskRepeat = "no-repeat";
      revealLayer.style.maskImage = revealMask;
      revealLayer.style.webkitMaskImage = revealMask;
      revealLayer.style.maskSize = "100% 100%";
      revealLayer.style.webkitMaskSize = "100% 100%";
      revealLayer.style.maskRepeat = "no-repeat";
      revealLayer.style.webkitMaskRepeat = "no-repeat";
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      stage.removeEventListener("mousemove", onMove);
      stage.removeEventListener("mouseenter", onEnter);
      stage.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const navItems: Array<{ key: Panel; label: string }> = [
    { key: "home", label: "Home" },
    { key: "platform", label: "Platform" },
    { key: "company", label: "Company" },
    { key: "contact", label: "Contact" },
  ];

  return (
    <div ref={rootRef} className={anim ? "anim" : undefined}>
      <main className="viewport">
        <section className="stage" ref={stageRef}>
          <svg className="brand-mark" viewBox="0 0 66 62" aria-hidden="true">
            <line x1="33" y1="1" x2="33" y2="61" />
            <line x1="3" y1="31" x2="63" y2="31" />
            <line x1="11.8" y1="9.8" x2="54.2" y2="52.2" />
            <line x1="54.2" y1="9.8" x2="11.8" y2="52.2" />
          </svg>

          <nav className="primary-nav" aria-label="Primary">
            <ul>
              {navItems.map((item, i) => (
                <li key={item.key} className={`nav-${i + 1}`}>
                  <button type="button" onClick={() => setPanel(item.key)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="burger"
            aria-label="Open menu"
            onClick={() => setPanel("company")}
          >
            <span />
            <span />
            <span />
          </button>

          <h1 className="wordmark">
            <span className="wordmark__mask">
              <span className="wordmark__inner">
                <span className="wordmark__solid">
                  <span className="wordmark__wide">M</span>EG
                </span>
                <span className="wordmark__grad">SY</span>
              </span>
            </span>
          </h1>

          <div className="flower" ref={flowerRef}>
            <img className="flower__sizer" src={FRONT_LILY} alt="" aria-hidden="true" />
            <div className="flower__layer flower__layer--front" ref={frontLayerRef}>
              <img src={FRONT_LILY} alt="Pixel-art pink and violet lily" />
            </div>
            <div className="flower__layer flower__layer--reveal" ref={revealLayerRef}>
              <img src={REVEAL_LILY} alt="" />
            </div>
            <canvas className="flower__canvas" ref={frontCanvasRef} />
            <canvas className="flower__canvas" ref={revealCanvasRef} />
          </div>

          <p className="support-copy support-copy--left">
            <span className="support-copy__inner">
              Every workflow,
              <br />
              intelligently connected.
            </span>
          </p>
          <p className="support-copy support-copy--right">
            <span className="support-copy__inner">
              Less manual work.
              <br />
              More meaningful output.
            </span>
          </p>

          {panel && (
            <>
              <button
                type="button"
                className="scrim"
                aria-label="Close panel"
                onClick={() => setPanel(null)}
              />
              <aside
                className="sheet"
                role="dialog"
                aria-modal="true"
                aria-label={panel === "menu" ? "Menu" : PANEL_CONTENT[panel].title}
              >
                <button
                  type="button"
                  className="sheet__close"
                  aria-label="Close"
                  onClick={() => setPanel(null)}
                >
                  ✕
                </button>
                {panel === "menu" ? (
                  <>
                    <h2>Menu</h2>
                    <ul className="sheet__menu">
                      {navItems.map((item) => (
                        <li key={item.key}>
                          <button type="button" onClick={() => setPanel(item.key)}>
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <>
                    <h2>{PANEL_CONTENT[panel].title}</h2>
                    {PANEL_CONTENT[panel].body}
                  </>
                )}
              </aside>
            </>
          )}

        </section>
      </main>
    </div>
  );
}
