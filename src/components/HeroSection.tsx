"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

const HERO_IMAGES = ["/Anjali.jpg", "/anju.jpg", "/Anjali.jpg", "/anju.jpg"];

const MARQUEE_ITEMS = [
  "Marriage Garland Preservation",
  "Wall Clocks",
  "First Salary Cheque",
  "Handcrafted with Love",
  "Pooja Plates",
  "Custom Orders Welcome",
  "Photo Frames",
  "Keychains & Tokens",
  "Preserved Forever",
  "Candles & Lights",
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<HTMLDivElement[]>([]);
  const sliderIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-headline",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 },
      );
      gsap.fromTo(
        ".hero-sub",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.55 },
      );
      gsap.fromTo(
        ".hero-ctas",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.75 },
      );
    }, heroRef);

    sliderIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        setPrevSlide(prev);
        return (prev + 1) % HERO_IMAGES.length;
      });
    }, 4000);

    return () => {
      ctx.revert();
      if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (prevSlide === null) return;
    const incoming = slideRefs.current[currentSlide];
    const outgoing = slideRefs.current[prevSlide];
    if (!incoming || !outgoing) return;

    gsap.set(incoming, { x: "100%", zIndex: 2 });
    gsap.set(outgoing, { zIndex: 1 });
    gsap.to(incoming, { x: "0%", duration: 1, ease: "power3.inOut" });
    gsap.to(outgoing, {
      x: "-30%",
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => gsap.set(outgoing, { x: "0%", zIndex: 0 }),
    });
  }, [currentSlide, prevSlide]);

  return (
    <section
      ref={heroRef}
      className="relative w-full overflow-hidden flex flex-col md:flex-row"
      style={{ minHeight: "100svh" }}
    >
      {/* Image panel: full width on mobile, half on desktop */}
      <div className="relative w-full h-[55vw] min-h-[280px] md:w-1/2 md:h-auto md:min-h-screen overflow-hidden">
        {HERO_IMAGES.map((src, idx) => (
          <div
            key={idx}
            ref={(el) => {
              if (el) slideRefs.current[idx] = el;
            }}
            className="absolute inset-0"
            style={{ zIndex: idx === 0 ? 1 : 0, transform: "translateX(0%)" }}
          >
            <img
              src={src}
              alt=""
              className="h-full w-full object-cover"
              draggable={false}
            />
            <div className="absolute inset-0 bg-[#6A1040]/10" />
          </div>
        ))}

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-4 z-10 flex gap-2 md:bottom-8 md:left-8">
          {HERO_IMAGES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrevSlide(currentSlide);
                setCurrentSlide(idx);
              }}
              className={`h-px transition-all duration-500 ${idx === currentSlide ? "w-8 bg-white" : "w-3 bg-white/40"}`}
            />
          ))}
        </div>
      </div>

      {/* Diagonal divider: desktop only */}
      <div
        className="hidden md:block absolute top-0 bottom-0 z-10 w-16"
        style={{
          left: "calc(50% - 2rem)",
          background: "linear-gradient(to right, transparent, #FAF7F2)",
        }}
      />

      {/* Text panel: full width on mobile, half on desktop */}
      <div
        className="relative w-full flex flex-col justify-center px-6 py-12 md:w-1/2 md:px-[6vw] md:pt-24 md:pb-20"
        style={{ backgroundColor: "#FAF7F2" }}
      >
        <p
          className="hero-sub font-sans text-[10px] tracking-[0.35em] uppercase mb-4 md:mb-6 opacity-0"
          style={{ color: "#9C4D7A" }}
        >
          Handmade Resin Art
        </p>

        <h1
          className="hero-headline font-bold leading-[0.95] tracking-tight mb-4 md:mb-6 opacity-0"
          style={{
            fontFamily: "var(--font-inter)",
            color: "#6A1040",
            fontSize: "clamp(2.4rem, 6vw, 5.5rem)",
          }}
        >
          Preserved
          <br />
          in Resin
          <br />
          <span
            style={{
              fontFamily: "var(--font-instrument-serif)",
              fontStyle: "italic",
              fontWeight: 400,
              color: "#9C4D7A",
            }}
          >
            Kept Forever.
          </span>
        </h1>

        <p
          className="hero-sub font-sans text-sm leading-relaxed mb-8 md:mb-10 max-w-xs opacity-0"
          style={{ color: "#4A1030", opacity: 0.7 }}
        >
          Custom resin art and preservation pieces, handcrafted to hold your
          most precious memories.
        </p>

        <div className="hero-ctas flex flex-wrap items-center gap-3 opacity-0">
          <Link
            href="/categories"
            className="font-sans text-[11px] tracking-[0.15em] uppercase px-6 py-3.5 transition-colors duration-300"
            style={{ backgroundColor: "#6A1040", color: "#FAF7F2" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#9C4D7A")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#6A1040")
            }
          >
            Explore Collection
          </Link>
          <a
            href="https://wa.me/918167356807?text=Hi, I'd like to place a custom order"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11px] tracking-[0.15em] uppercase px-6 py-3.5 border transition-all duration-300"
            style={{
              borderColor: "#6A1040",
              color: "#6A1040",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#6A1040";
              e.currentTarget.style.color = "#FAF7F2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#6A1040";
            }}
          >
            Custom Order
          </a>
        </div>

        {/* Slide counter: bottom right on desktop, inline below CTAs on mobile */}
        <div
          className="mt-8 md:mt-0 md:absolute md:bottom-8 md:right-[6vw] font-sans text-[10px] tracking-[0.2em]"
          style={{ color: "#9C4D7A" }}
        >
          {String(currentSlide + 1).padStart(2, "0")} /{" "}
          {String(HERO_IMAGES.length).padStart(2, "0")}
        </div>
      </div>

      {/* Marquee strip: always full width, pinned at bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden py-3"
        style={{ backgroundColor: "#3D0A25" }}
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
            (item, idx) => (
              <span
                key={idx}
                className="font-sans text-[10px] tracking-[0.25em] uppercase mx-6"
                style={{ color: "#F5D5E5" }}
              >
                {item}
                <span className="mx-6" style={{ color: "#9C4D7A" }}>
                  ✦
                </span>
              </span>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
