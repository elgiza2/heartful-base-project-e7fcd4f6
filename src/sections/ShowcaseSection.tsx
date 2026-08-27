import { useEffect, useRef, useState } from "react";

const TEXT_COLOR = "#000000";
const BG_LIME = "#BDE84F";
const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const VIDEO_URL =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260511_151818_65bb22c5-33ae-4e23-85ea-0a3dd89957c2.mp4";

const MEGSY_COMPANY = {
  name: "Megsy",
  size: "Digital Platforms Development & E-commerce LLC",
  image:
    "https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260511_151621_4fba6892-ed21-4c2e-8cb3-0bd2ec2abefa.png&w=1280&q=85",
  notes: [
    { label: "Focus", ingredient: "APPLIED AI & DIGITAL COMMERCE" },
    { label: "Approach", ingredient: "END-TO-END PRODUCT OWNERSHIP" },
    { label: "Base", ingredient: "CAIRO, EGYPT" },
  ],
};

function anim(
  visible: boolean,
  delay: number,
  opts: { y?: number; x?: number; duration?: number } = {},
) {
  const { y = 20, x = 0, duration = 1600 } = opts;
  const translateFrom = y !== 0 ? `translateY(${y}px)` : x !== 0 ? `translateX(${x}px)` : "none";
  return {
    style: {
      opacity: visible ? 1 : 0,
      transform: visible ? "translate(0,0)" : translateFrom,
      transition: `opacity ${duration}ms ${EASE} ${delay}ms, transform ${duration}ms ${EASE} ${delay}ms`,
    } as React.CSSProperties,
  };
}

type Note = { label: string; ingredient: string };

function ProductPanel({
  bg,
  product,
  notes,
  visible,
  noteStyle = "normal",
}: {
  bg: string;
  product: { name: string; size: string; image: string };
  notes: Note[];
  visible: boolean;
  noteStyle?: "normal" | "bold";
}) {
  return (
    <div
      className="relative flex flex-col px-6 pb-8 pt-6 md:px-8 md:pb-10 md:pt-8"
      style={{ backgroundColor: bg, minHeight: "100%" }}
    >
      <div
        className="mb-auto flex items-start justify-between"
        {...anim(visible, 0, { y: 12, duration: 1400 })}
      >
        <span className="text-xs font-normal" style={{ color: TEXT_COLOR }}>
          Megsy company
        </span>
        <span className="text-xs font-normal" style={{ color: TEXT_COLOR }}>
          Independent
        </span>
      </div>

      <div
        className="flex flex-col items-center py-8"
        style={{
          flex: 1,
          justifyContent: "center",
          ...anim(visible, 300, { y: 40, duration: 1800 }).style,
        }}
      >
        <div
          className="overflow-hidden"
          style={{
            width: "clamp(140px, 40%, 220px)",
            aspectRatio: "220/340",
            backgroundColor: "#D9D9D9",
            borderRadius: "2px",
            flexShrink: 0,
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        <div className="mt-4 text-center" {...anim(visible, 600, { y: 10, duration: 1400 })}>
          <p className="text-sm font-normal" style={{ color: TEXT_COLOR }}>
            {product.name}
          </p>
          <p className="mt-1 text-xs font-normal" style={{ color: TEXT_COLOR }}>
            {product.size}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-0.5" {...anim(visible, 900, { y: 16, duration: 1400 })}>
          {notes.map((note) => (
            <div key={note.ingredient}>
              <p
                className="text-xs leading-snug"
                style={{ color: TEXT_COLOR, fontWeight: noteStyle === "bold" ? 700 : 400 }}
              >
                {note.label}
              </p>
              <p
                className="text-xs font-bold uppercase leading-snug tracking-widest"
                style={{ color: TEXT_COLOR }}
              >
                {note.ingredient}
              </p>
            </div>
          ))}
        </div>

        <a
          href="mailto:support@megsyai.com"
          className="group relative shrink-0 border px-6 py-3 text-xs font-bold uppercase tracking-widest"
          style={{
            color: TEXT_COLOR,
            borderColor: TEXT_COLOR,
            backgroundColor: "transparent",
            ...anim(visible, 1150, { y: 16, duration: 1400 }).style,
          }}
        >
          <span className="relative z-10 transition-colors duration-500 group-hover:text-black">
            CONTACT US
          </span>
          <span
            className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100"
            style={{ backgroundColor: "#ffffff" }}
          />
        </a>
      </div>
    </div>
  );
}

export default function ShowcaseSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative w-full font-sans">
      <div ref={ref} className="flex flex-col-reverse md:grid md:min-h-screen" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div
          className="relative hidden overflow-hidden md:block"
          style={{ backgroundColor: "#111", minHeight: "100%" }}
        >
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        </div>

        <div
          className="relative overflow-hidden md:hidden"
          style={{ height: "75vw", backgroundColor: "#111" }}
        >
          <video autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover">
            <source src={VIDEO_URL} type="video/mp4" />
          </video>
        </div>

        <ProductPanel
          bg={BG_LIME}
          product={MEGSY_COMPANY}
          notes={MEGSY_COMPANY.notes}
          visible={visible}
          noteStyle="bold"
        />
      </div>
    </section>
  );
}
