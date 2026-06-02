"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { categories } from "@/data/categories";

gsap.registerPlugin(ScrollTrigger);

export default function CategoryList() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<HTMLAnchorElement[]>([]);
  const floodRefs = useRef<HTMLDivElement[]>([]);
  const sharedImageRef = useRef<HTMLDivElement>(null);
  const sharedImgEl = useRef<HTMLImageElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Page entrance stagger
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowRefs.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.06,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    const flood = floodRefs.current[index];
    const img = sharedImageRef.current;
    const imgEl = sharedImgEl.current;

    if (!flood || !img || !imgEl) return;

    // Update shared image src
    imgEl.src = categories[index].image;

    // Flood background left to right
    gsap.killTweensOf(flood);
    gsap.fromTo(
      flood,
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 0.45, ease: "power3.out" },
    );

    // Slide image in from right
    gsap.killTweensOf(img);
    gsap.fromTo(
      img,
      { x: 30, opacity: 0, visibility: "visible" },
      { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" },
    );
  };

  const handleMouseLeave = (index: number) => {
    setHoveredIndex(null);
    const flood = floodRefs.current[index];
    const img = sharedImageRef.current;

    if (!flood || !img) return;

    // Flood out right to left
    gsap.killTweensOf(flood);
    gsap.to(flood, {
      clipPath: "inset(0 0% 0 100%)",
      duration: 0.35,
      ease: "power2.inOut",
    });

    // Hide image
    gsap.killTweensOf(img);
    gsap.to(img, {
      x: 20,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => gsap.set(img, { visibility: "hidden" }),
    });
  };

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen select-none"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      {/* Page header */}
      <div className="px-[6vw] pt-20 pb-10 md:pt-25 md:pb-12">
        <p
          className="font-sans text-[10px] tracking-[0.3em] uppercase mb-3"
          style={{ color: "#9C4D7A" }}
        >
          Handmade Resin Art
        </p>
        <h1
          className="text-[clamp(2.5rem,5vw,5rem)] font-bold tracking-tight leading-none"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            color: "#6A1040",
          }}
        >
          Collections
        </h1>
      </div>

      {/* Divider */}
      <div className="w-full h-px" style={{ backgroundColor: "#D4B8C5" }} />

      {/* Category rows */}
      <div className="w-full">
        {categories.map((category, index) => {
          const isHovered = hoveredIndex === index;
          const itemNumber = String(index + 1).padStart(2, "0");

          return (
            <Link
              key={category.id}
              href={`/products?category=${category.slug}`}
              ref={(el) => {
                if (el) rowRefs.current[index] = el;
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="relative flex items-center w-full overflow-hidden opacity-0 group"
              style={{
                borderBottom: "1px solid #D4B8C5",
                minHeight: "clamp(72px, 13vh, 120px)",
                paddingLeft: "6vw",
                paddingRight: "6vw",
              }}
            >
              {/* Flood background */}
              <div
                ref={(el) => {
                  if (el) floodRefs.current[index] = el;
                }}
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundColor: "#6A1040",
                  clipPath: "inset(0 100% 0 0)",
                }}
              />

              {/* Number */}
              <span
                className="relative z-10 font-sans text-[11px] tracking-[0.2em] shrink-0 mr-8 transition-colors duration-300"
                style={{
                  color: isHovered ? "#F5D5E5" : "#9C4D7A",
                  opacity: 0.8,
                }}
              >
                {itemNumber}
              </span>

              {/* Category name */}
              <h2
                className="relative z-10 flex-1 tracking-tight uppercase leading-none transition-all duration-300"
                style={{
                  fontFamily: "var(--font-instrument-serif)",
                  fontSize: "clamp(1.6rem, 4vw, 4.5rem)",
                  WebkitTextStroke: isHovered ? "0px" : "1.5px #6A1040",
                  color: isHovered ? "#FAF7F2" : "transparent",
                }}
              >
                {category.name}
              </h2>

              {/* Explore label: appears on hover */}
              <span
                className="relative z-10 font-sans text-[11px] tracking-[0.2em] uppercase shrink-0 transition-all duration-300"
                style={{
                  color: "#F5D5E5",
                  opacity: isHovered ? 1 : 0,
                  transform: isHovered ? "translateX(0)" : "translateX(8px)",
                }}
              >
                Explore →
              </span>
            </Link>
          );
        })}
      </div>

      {/* Shared floating image */}
      <div
        ref={sharedImageRef}
        className="pointer-events-none invisible fixed z-50 overflow-hidden rounded-sm shadow-2xl"
        style={{
          width: "clamp(160px, 16vw, 280px)",
          height: "clamp(200px, 20vw, 350px)",
          top: "50%",
          right: "8vw",
          transform: "translateY(-50%)",
          opacity: 0,
        }}
      >
        <img
          ref={sharedImgEl}
          src={undefined}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* Mobile: simplified, no hover */}
      <style>{`
        @media (max-width: 768px) {
          .category-explore { display: none; }
        }
      `}</style>
    </div>
  );
}
