import { useEffect, useRef, useState } from "react";
import "../triptych.css";

const BAR_HEIGHTS = [
  "20%","33%","48%","56%","51%","47%","39%","31%","53%","55%","60%","56%",
  "100%","92%","76%","67%","62%","65%","59%","70%","74%","87%","83%","77%",
];

const SPARKLE_POINTS: Array<[number, number]> = [
  [0.5, 0.06],
  [0.59, 0.41],
  [0.94, 0.5],
  [0.59, 0.59],
  [0.5, 0.94],
  [0.41, 0.59],
  [0.06, 0.5],
  [0.41, 0.41],
];
const SPARKLES = [
  { x: 0.01, y: 0.01, size: 0.5 },
  { x: 0.28, y: 0.26, size: 0.72 },
];

const BANDS = [
  { source: [0.08, 0.26], target: [0.29, 0.32], color: "rgba(255,189,144,.60)" },
  { source: [0.23, 0.42], target: [0.3, 0.335], color: "rgba(255,149,80,.70)" },
  { source: [0.5, 0.75], target: [0.32, 0.355], color: "rgba(255,136,64,.82)" },
  { source: [0.69, 0.98], target: [0.33, 0.365], color: "rgba(255,181,128,.54)" },
  { source: [0.39, 0.51], target: [0.31, 0.345], color: "rgba(255,105,0,.96)" },
];
const THREADS = [
  { source: 0.05, target: 0.3, alpha: 0.68 },
  { source: 0.2, target: 0.315, alpha: 0.6 },
  { source: 0.62, target: 0.342, alpha: 0.84 },
  { source: 0.82, target: 0.352, alpha: 0.74 },
  { source: 0.97, target: 0.36, alpha: 0.64 },
];
const SOURCE_HOLD = 0.38;
const TARGET_APPROACH = 0.74;
const THREAD_WIDTH = 0.00135;

function fitCanvas(canvas: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const rect = canvas.getBoundingClientRect();
  const w = Math.max(1, rect.width);
  const h = Math.max(1, rect.height);
  canvas.width = Math.round(w * dpr);
  canvas.height = Math.round(h * dpr);
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, w, h);
  return { ctx, w, h };
}

function roundedPolygon(
  ctx: CanvasRenderingContext2D,
  pts: Array<{ x: number; y: number }>,
  roundness = 0.34,
) {
  const corners = pts.map((p, i) => {
    const prev = pts[(i - 1 + pts.length) % pts.length];
    const next = pts[(i + 1) % pts.length];
    return {
      point: p,
      before: { x: p.x + (prev.x - p.x) * roundness, y: p.y + (prev.y - p.y) * roundness },
      after: { x: p.x + (next.x - p.x) * roundness, y: p.y + (next.y - p.y) * roundness },
    };
  });
  ctx.beginPath();
  ctx.moveTo(corners[0].after.x, corners[0].after.y);
  for (let i = 1; i <= corners.length; i++) {
    const c = corners[i % corners.length];
    ctx.lineTo(c.before.x, c.before.y);
    ctx.quadraticCurveTo(c.point.x, c.point.y, c.after.x, c.after.y);
  }
  ctx.closePath();
}

function drawSparkleIcon(canvas: HTMLCanvasElement) {
  const fit = fitCanvas(canvas);
  if (!fit) return;
  const { ctx, w, h } = fit;
  for (const s of SPARKLES) {
    const size = Math.min(w, h) * s.size;
    const ox = w * s.x;
    const oy = h * s.y;
    const pts = SPARKLE_POINTS.map(([px, py]) => ({ x: ox + px * size, y: oy + py * size }));
    roundedPolygon(ctx, pts, 0.34);
    ctx.fillStyle = "rgba(255,220,202,.55)";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = Math.max(1.1, size * 0.15);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.shadowColor = "rgba(255,255,255,.78)";
    ctx.shadowBlur = size * 0.06;
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
}

function drawFlowChart(canvas: HTMLCanvasElement) {
  const fit = fitCanvas(canvas);
  if (!fit) return;
  const { ctx, w, h } = fit;
  for (const band of BANDS) {
    const [st, sb] = band.source;
    const [tt, tb] = band.target;
    ctx.beginPath();
    ctx.moveTo(0, h * st);
    ctx.bezierCurveTo(w * SOURCE_HOLD, h * st, w * TARGET_APPROACH, h * tt, w, h * tt);
    ctx.lineTo(w, h * tb);
    ctx.bezierCurveTo(w * TARGET_APPROACH, h * tb, w * SOURCE_HOLD, h * sb, 0, h * sb);
    ctx.closePath();
    ctx.fillStyle = band.color;
    ctx.fill();
  }
  ctx.lineWidth = Math.max(0.72, w * THREAD_WIDTH);
  for (const t of THREADS) {
    ctx.beginPath();
    ctx.moveTo(0, h * t.source);
    ctx.bezierCurveTo(
      w * SOURCE_HOLD,
      h * t.source,
      w * TARGET_APPROACH,
      h * t.target,
      w,
      h * t.target,
    );
    ctx.strokeStyle = `rgba(255,255,255,${t.alpha})`;
    ctx.stroke();
  }
}

export default function OperationsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const magicRef = useRef<HTMLCanvasElement>(null);
  const flowRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.unobserve(el);
        }
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const magic = magicRef.current;
    const flow = flowRef.current;
    if (!magic || !flow) return;
    const paint = () => {
      drawSparkleIcon(magic);
      drawFlowChart(flow);
    };
    paint();
    const ro = new ResizeObserver(paint);
    ro.observe(magic);
    ro.observe(flow);
    return () => ro.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`tri ${visible ? "tri--in" : ""}`}
      aria-label="What Megsy does"
    >
      <header className="tri__head">
        <h2>Technology, built with intention.</h2>
        <p>
          Megsy is an Egyptian technology company that designs, builds and operates its own
          products. We see technology as a craft: useful systems, built end-to-end, by a small team
          that takes responsibility for every layer — from research to design, engineering and
          support.
        </p>
      </header>

      <div className="tri__cards" aria-label="How Megsy thinks about technology">
        {/* Card 1 */}
        <article className="card">
          <div className="panel" aria-label="Company lifecycle chart">
            <div className="timeline">
              <span>IDEA</span>
              <i />
              <span>BUILD</span>
              <i />
              <span>RUN</span>
            </div>
            <div className="bars" aria-hidden="true">
              {BAR_HEIGHTS.map((h, i) => (
                <span
                  key={i}
                  className={`bar${h === "100%" ? " active" : ""}`}
                  style={{ ["--h" as string]: h }}
                />
              ))}
            </div>
            <div className="value-chip">Full Stack</div>
            <div className="axis">
              <span>RESEARCH</span>
              <span>DESIGN</span>
              <span>ENGINEER</span>
              <span>OPERATE</span>
            </div>
          </div>
          <div className="card-copy">
            <h2>End-to-End Ownership</h2>
            <p>
              We design, build and run our
              <br />
              own products under one roof.
            </p>
            <span className="corner-icon">
              <i className="spark" />
            </span>
          </div>
        </article>

        {/* Card 2 */}
        <article className="card">
          <div className="panel">
            <div className="assistant-head">
              <span className="badge">
                <i className="spark" />
              </span>
              <span>Megsy Lab</span>
            </div>
            <p className="question">What is our view of AI?</p>
            <div className="prompt">
              Applied intelligence should solve real
              <br />
              problems — not generate noise. We turn
              <br />
              research into products people use daily.
            </div>
            <div className="automate">
              <span className="automate-label">Ship</span>
              <canvas className="magic" ref={magicRef} aria-hidden="true" />
            </div>
            <i className="cursor" aria-hidden="true" />
          </div>
          <div className="card-copy">
            <h2>Applied AI Mindset</h2>
            <p>
              Research becomes real products
              <br />
              built from Cairo for the world.
            </p>
            <span className="corner-icon">
              <i className="flow-icon" />
            </span>
          </div>
        </article>

        {/* Card 3 */}
        <article className="card">
          <div className="panel">
            <div className="metric">
              <div className="metric-label">Systems built</div>
              <div className="metric-row">
                <strong>In-House</strong>
                <span>↑ reliability</span>
              </div>
            </div>
            <canvas
              className="decision-flow"
              ref={flowRef}
              aria-label="Decision paths converging into an optimized result"
            />
            <div className="tag action">Principle: Own the stack</div>
            <div className="tag confidence">Principle: Ship small, ship often</div>
            <div className="tag path">Principle: Measure real usage</div>
          </div>
          <div className="card-copy">
            <h2>Commerce Infrastructure</h2>
            <p>
              Billing, subscriptions and support
              <br />
              systems built to scale.
            </p>
            <span className="corner-icon">
              <i className="speed" />
            </span>
          </div>
        </article>
      </div>

      <div className="tri__doing">
        <div>
          <h3>How we work</h3>
          <p>
            We believe the best technology comes from small teams with clear ownership. Our work is
            guided by reliability, restraint with data, and respect for the user’s time and device.
          </p>
        </div>
        <ul>
          <li>Small team, direct ownership — no layers between builder and user.</li>
          <li>Reliability over novelty. We ship what works and improve it.</li>
          <li>Clear economics: honest pricing, transparent operations.</li>
          <li>Data handled with restraint. We collect only what we need.</li>
          <li>Fast on average phones and average connections — that is the bar.</li>
        </ul>
      </div>
    </section>
  );
}
