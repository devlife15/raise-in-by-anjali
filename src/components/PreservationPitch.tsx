"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { products } from "@/data/products";

const PRESERVATION_CATEGORIES = [
  "marriage-garland-preservation",
  "first-salary-cheque",
  "photo-frames",
];

export default function PreservationPitch() {
  const preservationRef = useRef<HTMLDivElement>(null);
  const preservationProducts = products
    .filter((p) => PRESERVATION_CATEGORIES.includes(p.category))
    .slice(0, 5);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".preservation-heading",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: preservationRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        ".preservation-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: preservationRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, preservationRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={preservationRef}
      className="relative w-full px-[6vw] py-16 md:py-28 overflow-hidden"
      style={{ backgroundColor: "#3D0A25" }}
    >
      <p
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-sans font-bold uppercase leading-none pointer-events-none select-none whitespace-nowrap"
        style={{ color: "#FAF7F2", opacity: 0.03, fontSize: "20vw" }}
      >
        Preserve
      </p>

      <div className="relative z-10 max-w-2xl mx-auto text-center mb-10 md:mb-16">
        <p
          className="preservation-heading font-sans text-[10px] tracking-[0.35em] uppercase mb-4 opacity-0"
          style={{ color: "#F5D5E5", opacity: 0.7 }}
        >
          Our Specialty
        </p>
        <h2
          className="preservation-heading text-[clamp(2rem,4.5vw,4.5rem)] font-bold leading-tight tracking-tight mb-6 opacity-0"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            color: "#FAF7F2",
          }}
        >
          Your Flowers & Wedding Items{" "}
          <span className="italic font-normal" style={{ color: "#F5D5E5" }}>
            Deserve to Last Forever
          </span>
        </h2>
        <p
          className="font-sans text-sm leading-relaxed"
          style={{ color: "#F5D5E5", opacity: 0.75 }}
        >
          Got a wedding garland, bridal dupatta, or bouquet you cannot throw
          away? We preserve them in resin so they stay with you for a lifetime,
          exactly as they were on your most precious day.
        </p>
      </div>

      <div className="relative z-10 flex gap-5 overflow-x-auto pb-4 scrollbar-none -mx-[6vw] px-[6vw]">
        {preservationProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="preservation-card group shrink-0 opacity-0"
            style={{ width: "clamp(200px, 22vw, 320px)" }}
          >
            <div
              className="relative overflow-hidden mb-4"
              style={{ aspectRatio: "3/4", backgroundColor: "#6A1040" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:opacity-100 group-hover:scale-105"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D0A25]/70 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <h3
                  className="text-sm font-medium leading-snug"
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    color: "#FAF7F2",
                  }}
                >
                  {product.name}
                </h3>
                <p
                  className="font-sans text-[10px] mt-1"
                  style={{ color: "#F5D5E5", opacity: 0.8 }}
                >
                  {product.price !== null
                    ? `₹${product.price.toLocaleString("en-IN")}`
                    : "Contact for pricing"}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="relative z-10 text-center mt-12">
        <a
          href="https://wa.me/918167356807?text=Hi, I'd like to preserve my wedding items"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-sans text-[11px] tracking-[0.2em] uppercase px-8 py-4 border transition-all duration-300"
          style={{
            borderColor: "#F5D5E5",
            color: "#F5D5E5",
            backgroundColor: "transparent",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#FAF7F2";
            e.currentTarget.style.color = "#3D0A25";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
            e.currentTarget.style.color = "#F5D5E5";
          }}
        >
          Preserve My Memories
        </a>
      </div>
    </section>
  );
}
