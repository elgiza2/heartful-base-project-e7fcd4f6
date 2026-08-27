import { useEffect, useRef, useState } from "react";
import "./poster.css";
import CompanySection from "./sections/CompanySection";
import OperationsSection from "./sections/OperationsSection";
import ShowcaseSection from "./sections/ShowcaseSection";
import SiteFooter from "./sections/SiteFooter";

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

function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function RevealSection({
  children,
  className = "",
  ...rest
}: React.HTMLAttributes<HTMLElement>) {
  const { ref, visible } = useScrollReveal<HTMLElement>();
  return (
    <section
      ref={ref}
      className={`reveal ${visible ? "reveal--in" : ""} ${className}`.trim()}
      {...rest}
    >
      {children}
    </section>
  );
}

export default function App() {
  const stageRef = useRef<HTMLDivElement>(null);
  const flowerRef = useRef<HTMLDivElement>(null);
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const revealCanvasRef = useRef<HTMLCanvasElement>(null);
  const frontLayerRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const [anim, setAnim] = useState(true);

  // entrance runs once
  useEffect(() => {
    const timer = window.setTimeout(() => setAnim(false), 2200);
    const safety = window.setTimeout(() => setAnim(false), 6000);
    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(safety);
    };
  }, []);

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

      frontCtx.setTransform(1, 0, 0, 1, 0, 0);
      frontCtx.clearRect(0, 0, front.width, front.height);
      frontCtx.globalCompositeOperation = "source-over";
      frontCtx.fillStyle = "#fff";
      frontCtx.fillRect(0, 0, front.width, front.height);
      frontCtx.globalCompositeOperation = "destination-out";

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

  return (
    <div className={anim ? "anim" : undefined}>
      <main>
        <section className="stage" ref={stageRef}>
          <svg className="brand-mark" viewBox="0 0 66 62" aria-hidden="true">
            <line x1="33" y1="1" x2="33" y2="61" />
            <line x1="3" y1="31" x2="63" y2="31" />
            <line x1="11.8" y1="9.8" x2="54.2" y2="52.2" />
            <line x1="54.2" y1="9.8" x2="11.8" y2="52.2" />
          </svg>

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

          <div className="scroll-hint" aria-hidden="true">
            <span />
          </div>
        </section>

        <article className="content">
          <RevealSection className="content__intro">
            <h2>The company behind Megsy.</h2>
            <p>
              Megsy for Digital Platforms Development and E-commerce LLC is an Egyptian technology
              company registered and operating in Cairo. We design, build and run our own products
              end to end — research, engineering, design and support under one roof.
            </p>
          </RevealSection>

          <RevealSection className="content__platform">
            <div className="content__grid">
              <div>
                <h3>What we do</h3>
                <p>
                  We build applied AI software and the digital commerce infrastructure around it:
                  product engineering, platform operations, and the systems that let a small team
                  ship at scale.
                </p>
              </div>
              <ul className="feature-list">
                <li>Digital platform development and maintenance.</li>
                <li>Applied AI research turned into shippable product.</li>
                <li>E-commerce systems, billing and subscription operations.</li>
                <li>Design systems and brand work for our own products.</li>
                <li>Direct customer support, handled by the team that builds.</li>
              </ul>
            </div>
          </RevealSection>

          <RevealSection className="content__company">
            <div className="content__grid content__grid--split">
              <div>
                <h3>Leadership</h3>
                <p>
                  Megsy is led by a single chief executive. There is one CEO —{" "}
                  <strong>Hamza Hassan</strong>, Founder &amp; Chief Executive Officer.
                </p>
                <p>
                  An Egyptian entrepreneur who started coding at 15 and shipped his first product at
                  17, he founded Megsy to build AI infrastructure from Egypt for the world.
                </p>
              </div>
              <div className="values">
                <h4>Office of the CEO</h4>
                <ul>
                  <li>
                    <strong>Hamza Hassan</strong> — Founder &amp; Chief Executive Officer
                  </li>
                  <li>Cairo, Egypt · support@megsyai.com</li>
                </ul>
                <h4>How we work</h4>
                <ul>
                  <li>A small team that ships directly, with no layers in between.</li>
                  <li>Reliability over novelty. Clear pricing. Data handled with restraint.</li>
                  <li>Fast on an average phone and an average connection — that is the bar.</li>
                </ul>
              </div>
            </div>
          </RevealSection>
        </article>

        <OperationsSection />
        <CompanySection />
        <ShowcaseSection />

        <article className="content">
          <RevealSection className="content__legal">
            <h3>Legal entity</h3>
            <p>
              <strong>
                Megsy for Digital Platforms Development and E-commerce — Limited Liability Company
              </strong>
            </p>
            <p>
              58 Al Hijaz St., Amoun Tower, opposite Heliopolis Hospital, Unit 84, Floor 8, Sheraton
              Al Matar, Nozha District, Cairo Governorate, Egypt
            </p>
            <p>
              Commercial Register: <strong>284691</strong> · Tax ID: <strong>774034785</strong>
            </p>
            <p>
              <a href="mailto:support@megsyai.com">support@megsyai.com</a>
            </p>
          </RevealSection>
        </article>

        <SiteFooter />
      </main>
    </div>
  );
}
