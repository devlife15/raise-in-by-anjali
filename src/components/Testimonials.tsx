"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "She preserved my wedding garland so beautifully. Every petal looks exactly as it did on our special day.",
    name: "Priya Sharma",
    item: "Marriage Garland Preservation",
  },
  {
    id: 2,
    quote:
      "The resin clock she made is the centrepiece of our living room. Everyone who visits asks about it.",
    name: "Rahul Mehta",
    item: "Wall Clock",
  },
  {
    id: 3,
    quote:
      "Got my first salary cheque preserved as a gift for my father. He was moved to tears. Absolutely priceless.",
    name: "Sneha Iyer",
    item: "First Salary Cheque",
  },
  {
    id: 4,
    quote:
      "The pooja thali she crafted for our housewarming is stunning. The detail in the resin work is unreal.",
    name: "Deepa Nair",
    item: "Pooja Plate",
  },
  {
    id: 5,
    quote:
      "Ordered a custom keychain with my initials. The quality and finish is far beyond what I expected.",
    name: "Arjun Kapoor",
    item: "Keychain",
  },
  {
    id: 6,
    quote:
      "The preserved rose from my anniversary bouquet now sits on my desk. It looks like it was just picked.",
    name: "Meera Pillai",
    item: "Rose Preservation",
  },
];

export default function Testimonials() {
  const testimonialsTrackRef = useRef<HTMLDivElement>(null);
  const testimonialsAnimRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const track = testimonialsTrackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;
    testimonialsAnimRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 28,
      ease: "none",
      repeat: -1,
      modifiers: { x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth) },
    });

    return () => {
      testimonialsAnimRef.current?.kill();
    };
  }, []);

  const pauseTestimonials = () => testimonialsAnimRef.current?.pause();
  const resumeTestimonials = () => testimonialsAnimRef.current?.resume();

  return (
    <section
      className="py-24 overflow-hidden"
      style={{ backgroundColor: "#F5D5E5" }}
    >
      <div className="px-[5vw] mb-12">
        <p
          className="font-sans text-[10px] tracking-[0.3em] uppercase mb-3"
          style={{ color: "#9C4D7A" }}
        >
          Kind Words
        </p>
        <h2
          className="text-[clamp(2rem,4vw,4rem)] italic tracking-tight"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            color: "#6A1040",
          }}
        >
          What Customers Say
        </h2>
      </div>
      <div
        className="relative overflow-hidden"
        onMouseEnter={pauseTestimonials}
        onMouseLeave={resumeTestimonials}
      >
        <div ref={testimonialsTrackRef} className="flex gap-5 w-max pl-[5vw]">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
            <div
              key={idx}
              className="shrink-0 border p-8 rounded-sm"
              style={{
                width: "clamp(280px, 30vw, 420px)",
                backgroundColor: "#FEF0F5",
                borderColor: "#D4B8C5",
              }}
            >
              <p
                className="text-base leading-relaxed mb-6 italic"
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  color: "#4A1030",
                }}
              >
                "{t.quote}"
              </p>
              <div>
                <p
                  className="font-sans text-[11px] font-medium tracking-[0.1em] uppercase"
                  style={{ color: "#6A1040" }}
                >
                  {t.name}
                </p>
                <p
                  className="font-sans text-[10px] tracking-[0.15em] uppercase mt-0.5"
                  style={{ color: "#9C4D7A" }}
                >
                  {t.item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
