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

type Panel = "home" | "platform" | "company" | "contact";

const PANEL_CONTENT: Record<Panel, { title: string; body: JSX.Element }> = {
  home: {
    title: "Megsy",
    body: (
      <>
        <p>
          Megsy builds one calm window where every AI workflow lives — chat across leading
          models, image generation and editing, video, slides, documents and research, all in
          a single workspace instead of a dozen scattered tools.
        </p>
        <h3>What we believe</h3>
        <p>
          Software should absorb the busywork. People keep the judgment, the taste and the
          decisions; the machine handles the assembling, formatting, searching and drafting.
        </p>
      </>
    ),
  },
  platform: {
    title: "The platform",
    body: (
      <>
        <h3>One window, every workflow</h3>
        <ul>
          <li>Multi-model chat with long-context reasoning and tool use.</li>
          <li>Image generation, editing and background removal.</li>
          <li>Short-form video rendering from a written idea.</li>
          <li>Deep research reports with traceable sources.</li>
          <li>Presentations, spreadsheets and document analysis.</li>
          <li>Integrations that let the workspace act inside your other apps.</li>
        </ul>
        <h3>How it is engineered</h3>
        <p>
          A unified orchestration layer routes each task to the model that handles it best,
          keeps context between steps, and returns one continuous session rather than a chain
          of disconnected tabs.
        </p>
      </>
    ),
  },
  company: {
    title: "The company",
    body: (
      <>
        <p>
          Megsy is an Egyptian technology company founded by Hamza Hassan Elgzairy, building AI
          infrastructure from Cairo for a global audience. The team ships product directly:
          research, platform engineering, design and support under one roof.
        </p>
        <h3>Focus</h3>
        <p>
          Reliability over novelty. Clear pricing. Data handled with restraint. A workspace
          that stays fast on an average phone and an average connection.
        </p>
        <div className="sheet__legal" lang="ar" dir="rtl">
          <h3>الجهة المسؤولة قانونيًا</h3>
          <p>
            <strong>
              ميغسي لتطوير المنصات الرقمية والتجارة الإلكترونية — شركة ذات مسؤولية محدودة
            </strong>
          </p>
          <p>
            ٥٨ شارع الحجاز، برج آمون، أمام مستشفى هليوبوليس، وحدة ٨٤، الدور ٨، شياخة شيراتون
            المطار، قسم النزهة، محافظة القاهرة، مصر
          </p>
          <p>
            سجل تجاري: <strong>284691</strong> · رقم ضريبي: <strong>774034785</strong>
          </p>
          <p>
            <a href="mailto:support@megsyai.com">support@megsyai.com</a>
          </p>
        </div>
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
          billing, account and data requests.
        </p>
        <h3>Product</h3>
        <p>
          <a href="https://www.megsyai.com/" target="_blank" rel="noreferrer">
            megsyai.com
          </a>
        </p>
        <div className="sheet__legal" lang="ar" dir="rtl">
          <h3>الجهة المسؤولة قانونيًا</h3>
          <p>
            <strong>
              ميغسي لتطوير المنصات الرقمية والتجارة الإلكترونية — شركة ذات مسؤولية محدودة
            </strong>
          </p>
          <p>
            ٥٨ شارع الحجاز، برج آمون، أمام مستشفى هليوبوليس، وحدة ٨٤، الدور ٨، شياخة شيراتون
            المطار، قسم النزهة، محافظة القاهرة، مصر
          </p>
          <p>
            سجل تجاري: <strong>284691</strong> · رقم ضريبي: <strong>774034785</strong>
          </p>
          <p>
            <a href="mailto:support@megsyai.com">support@megsyai.com</a>
          </p>
        </div>
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

          <span className="status-pill">Secure system</span>

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
              <aside className="sheet" role="dialog" aria-modal="true" aria-label={PANEL_CONTENT[panel].title}>
                <button
                  type="button"
                  className="sheet__close"
                  aria-label="Close"
                  onClick={() => setPanel(null)}
                >
                  ✕
                </button>
                <h2>{PANEL_CONTENT[panel].title}</h2>
                {PANEL_CONTENT[panel].body}
              </aside>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
