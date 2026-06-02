"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { categories } from "@/data/categories";

export default function ShopByCategories() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Title fade in
      gsap.fromTo(
        ".categories-heading",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      // 2. Staggered oval card floating rise
      gsap.fromTo(
        ".category-oval-card",
        { y: 50, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-[5vw] py-16 md:py-20 relative overflow-hidden"
      style={{ backgroundColor: "#4A1030" }} // Rich, deep berry colored canvas
    >
      {/* Editorial Header Frame */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-4">
        <div>
          <p className="categories-heading font-inter text-[10px] tracking-[0.3em] uppercase mb-3 text-[#F5D5E5]/70 opacity-0">
            The Collections
          </p>
          <h2
            className="categories-heading text-[clamp(2rem,4.2vw,4.5rem)] tracking-tight text-[#FAF7F2] opacity-0"
            style={{ fontFamily: "var(--font-instrument-serif)" }}
          >
            Shop by{" "}
            <span className="italic font-normal text-[#F5D5E5]">Category</span>
          </h2>
        </div>
        <Link
          href="/categories"
          className="categories-heading font-inter text-[11px] tracking-[0.2em] uppercase border-b pb-px text-[#F5D5E5] border-[#9C4D7A] transition-colors duration-300 hover:text-[#FAF7F2] hover:border-[#FAF7F2] self-start md:self-end opacity-0"
        >
          View Wheel Experience →
        </Link>
      </div>

      {/* Grid Track: Centers items and lets them flex cleanly */}
      <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none lg:grid lg:grid-cols-7">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/categories/${category.slug}`}
            className="category-oval-card group block shrink-0 w-[40vw] sm:w-[28vw] lg:w-full text-center opacity-0 outline-none"
          >
            {/* The Clickable Vertical Oval Cameo */}
            <div
              className="w-full aspect-[2/3] rounded-full overflow-hidden relative mb-4 transition-all duration-500 ease-out 
                         bg-[#6A1040]/40 border border-[#FAF7F2]/10
                         group-hover:border-[#F5D5E5]/40 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] group-focus:scale-98"
            >
              {/* Image asset container */}
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover opacity-80 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-100"
                draggable={false}
              />
              {/* Smooth ambient inner shade gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A1030]/40 via-transparent to-transparent opacity-60 pointer-events-none" />
            </div>

            {/* Typography Labels */}
            <h3
              className="text-sm tracking-tight px-2 text-[#FAF7F2] line-clamp-2 transition-colors duration-300 group-hover:text-[#F5D5E5]"
              style={{ fontFamily: "var(--font-inter)" }}
            >
              {category.name}
            </h3>
          </Link>
        ))}
      </div>
    </section>
  );
}
