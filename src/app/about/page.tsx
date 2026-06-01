"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!starRef.current) return;

      // Pure scroll-driven rotation for the star token emblem
      gsap.to(starRef.current, {
        rotation: 360,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-[#FAF7F2] text-[#1B3B22] font-inter px-[8vw] py-24 overflow-hidden"
    >
      {/* 3-COLUMN GEOMETRIC PRINT GRID (Matches aboutme_2.jpg blueprint) */}
      <div className="hidden md:grid grid-cols-3 gap-x-16 gap-y-24 items-start max-w-7xl mx-auto auto-rows-auto">
        {/* ================= ROW 1 ================= */}
        {/* Column 1 & 2: Title Headline */}
        <div className="col-span-2 select-none self-center">
          <h1 className="font-instrument-serif italic text-[8.5vw] tracking-tight leading-[0.8] text-[#1B3B22]">
            About Me
          </h1>
        </div>

        {/* Column 3: Block 01 */}
        <div className="space-y-3 pt-4">
          <div className="flex gap-6 items-baseline">
            <span className="text-[10px] font-bold tracking-widest text-[#1B3B22]/50">
              01
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider">Love</h3>
          </div>
          <p className="text-xs uppercase tracking-wide leading-tight font-normal max-w-[280px]">
            I love minimalism, typographic works and emotional design.
          </p>
        </div>

        {/* ================= ROW 2 ================= */}
        {/* Column 1: Intentionally Left Empty */}
        <div className="invisible" aria-hidden="true">
          Spacer
        </div>

        {/* Column 2: Block 02 */}
        <div className="space-y-3">
          <div className="flex gap-6 items-baseline">
            <span className="text-[10px] font-bold tracking-widest text-[#1B3B22]/50">
              02
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Past Experience
            </h3>
          </div>
          <p className="text-xs uppercase tracking-wide leading-tight font-normal max-w-[280px]">
            I've worked as a design engineer in the oil and gas industry for 12
            years.
          </p>
        </div>

        {/* Column 3: Block 03 */}
        <div className="space-y-3">
          <div className="flex gap-6 items-baseline">
            <span className="text-[10px] font-bold tracking-widest text-[#1B3B22]/50">
              03
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Approach
            </h3>
          </div>
          <p className="text-xs uppercase tracking-wide leading-tight font-normal max-w-[280px]">
            My background allows me to apply an engineering approach to website
            development.
          </p>
        </div>

        {/* ================= ROW 3 ================= */}
        {/* Column 1: Rotating Star Emblem Group */}
        <div className="pt-6">
          <div
            ref={starRef}
            className="w-12 h-12 flex items-center justify-center text-[#1B3B22]"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="w-full h-full"
            >
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
            </svg>
          </div>
        </div>

        {/* Column 2: Visual Center Portrait (Spans vertically across rows) */}
        <div className="row-span-2 w-full aspect-[3/3.8] bg-neutral-200 relative shadow-xs overflow-hidden self-end">
          <div className="absolute inset-0 bg-neutral-300 flex items-center justify-center text-[10px] uppercase tracking-widest text-neutral-500 font-bold">
            [ Portrait Frame ]
          </div>
          <img
            src="/ajfav.png"
            alt="Profile Portfolio"
            className="w-full h-full object-cover filter grayscale"
          />
        </div>

        {/* Column 3: Empty space above Block 05 alignment line */}
        <div className="invisible" aria-hidden="true">
          Spacer
        </div>

        {/* ================= ROW 4 ================= */}
        {/* Column 1: Block 04 */}
        <div className="space-y-3 self-end">
          <div className="flex gap-6 items-baseline">
            <span className="text-[10px] font-bold tracking-widest text-[#1B3B22]/50">
              04
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Current Experience
            </h3>
          </div>
          <p className="text-xs uppercase tracking-wide leading-tight font-normal max-w-[280px]">
            I've been working as a freelancer for brands and individuals for 2
            years now. I make turnkey websites.
          </p>
        </div>

        {/* Column 3: Block 05 */}
        <div className="space-y-3 self-end">
          <div className="flex gap-6 items-baseline">
            <span className="text-[10px] font-bold tracking-widest text-[#1B3B22]/50">
              05
            </span>
            <h3 className="text-xs font-bold uppercase tracking-wider">
              Inspiration
            </h3>
          </div>
          <p className="text-xs uppercase tracking-wide leading-tight font-normal max-w-[280px]">
            I'm most inspired by nature, music and art. I can't imagine my life
            without walks in the countryside in the fields and forests.
          </p>
        </div>
      </div>

      {/* MOBILE MOBILE CASCADE DECK STREAM */}
      <div className="block md:hidden space-y-16">
        <div>
          <h1 className="font-instrument text-6xl uppercase tracking-tight text-[#1B3B22]">
            About Me
          </h1>
          <div className="w-10 h-10 text-[#1B3B22] mt-6 animate-[spin_16s_linear_infinite]">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
              className="w-full h-full"
            >
              <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
            </svg>
          </div>
        </div>

        <div className="w-full bg-neutral-200 aspect-[3/4] relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-[10px] uppercase tracking-widest text-neutral-400 font-bold">
            [ Portrait Frame ]
          </div>
        </div>

        <div className="space-y-12">
          {[
            {
              num: "01",
              title: "Love",
              text: "I love minimalism, typographic works and emotional design.",
            },
            {
              num: "02",
              title: "Past Experience",
              text: "I've worked as a design engineer in the oil and gas industry for 12 years.",
            },
            {
              num: "03",
              title: "Approach",
              text: "My background allows me to apply an engineering approach to website development.",
            },
            {
              num: "04",
              title: "Current Experience",
              text: "I've been working as a freelancer for brands and individuals for 2 years now. I make turnkey websites.",
            },
            {
              num: "05",
              title: "Inspiration",
              text: "I'm most inspired by nature, music and art. I can't imagine my life without walks in the countryside in the fields and forests.",
            },
          ].map((item) => (
            <div
              key={item.num}
              className="space-y-2 border-l border-neutral-300 pl-4"
            >
              <div className="flex gap-4 items-baseline">
                <span className="text-[10px] font-bold text-[#1B3B22]/50">
                  {item.num}
                </span>
                <h3 className="text-xs font-bold uppercase tracking-wider">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs uppercase tracking-wide leading-relaxed font-semibold text-[#1B3B22]/80">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
