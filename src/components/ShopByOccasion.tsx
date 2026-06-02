"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

const OCCASIONS = [
  {
    id: "diwali",
    name: "Diwali",
    tag: "Festival of Lights",
    description: "Gift something that glows as bright as the occasion.",
    icon: "🪔",
    bg: "#3D0A25",
    text: "#FAF7F2",
    accent: "#F5D5E5",
  },
  {
    id: "rakhi",
    name: "Rakhi",
    tag: "Bond of Love",
    description: "Keepsakes as special as the bond you share.",
    icon: "🎀",
    bg: "#9C4D7A",
    text: "#FAF7F2",
    accent: "#FEF0F5",
  },
];

export default function ShopByOccasion() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".occasion-card",
        { scale: 0.95, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={gridRef}
      className="px-[5vw] py-16 md:py-20"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      <div className="mb-8 md:mb-12">
        <p
          className="font-sans text-[10px] tracking-[0.3em] uppercase mb-3"
          style={{ color: "#9C4D7A" }}
        >
          Gift Ideas
        </p>
        <h2
          className="text-[clamp(2rem,4vw,4rem)] font-bold tracking-tight"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            color: "#6A1040",
          }}
        >
          Shop for Every{" "}
          <span className="italic font-normal" style={{ color: "#9C4D7A" }}>
            Occasion
          </span>
        </h2>
      </div>

      <div className="occasion-grid grid grid-cols-2 gap-4 mx-auto max-w-2xl">
        {OCCASIONS.map((occasion) => (
          <Link
            key={occasion.id}
            href={`/products?occasion=${occasion.id}`}
            className="occasion-card group relative overflow-hidden block opacity-0"
            style={{ aspectRatio: "3/4", maxHeight: "520px" }}
          >
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundColor: occasion.bg }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className="text-[6vw] md:text-[4vw] select-none"
                style={{ opacity: 0.2 }}
              >
                {occasion.icon}
              </span>
            </div>
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(to top, ${occasion.bg} 40%, transparent)`,
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <p
                className="font-sans text-[9px] tracking-[0.2em] uppercase mb-2"
                style={{ color: occasion.accent, opacity: 0.8 }}
              >
                {occasion.tag}
              </p>
              <h3
                className="text-xl font-bold leading-tight mb-1"
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  color: occasion.text,
                }}
              >
                {occasion.name}
              </h3>
              <p
                className="font-sans text-[11px] leading-snug"
                style={{ color: occasion.text, opacity: 0.7 }}
              >
                {occasion.description}
              </p>
              <div
                className="mt-4 inline-block font-sans text-[10px] tracking-[0.15em] uppercase border-b pb-px transition-all duration-300 group-hover:pb-1"
                style={{ borderColor: occasion.accent, color: occasion.accent }}
              >
                Shop Now
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
