"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { products } from "@/data/products";

const FEATURED_IDS = ["g1", "c1", "ch1", "p1"];

export default function FeaturedProducts() {
  const featuredRef = useRef<HTMLDivElement>(null);
  const featuredProducts = products.filter((p) => FEATURED_IDS.includes(p.id));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-heading",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        ".featured-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: featuredRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, featuredRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={featuredRef} className="px-[5vw] py-16 md:py-20">
      <div className="flex items-end justify-between mb-8 md:mb-12">
        <div>
          <p
            className="featured-heading font-sans text-[10px] tracking-[0.3em] uppercase mb-3 opacity-0"
            style={{ color: "#9C4D7A" }}
          >
            Handpicked
          </p>
          <h2
            className="featured-heading text-[clamp(2rem,4vw,4rem)] italic tracking-tight opacity-0"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              color: "#6A1040",
            }}
          >
            Featured Pieces
          </h2>
        </div>
        <Link
          href="/products"
          className="font-sans text-[11px] tracking-[0.2em] uppercase border-b pb-px mb-1 transition-colors"
          style={{ color: "#9C4D7A", borderColor: "#D4B8C5" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#6A1040")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#9C4D7A")}
        >
          View All
        </Link>
      </div>

      <div className="flex gap-5 overflow-x-auto pb-4 -mr-[5vw] pr-[5vw] scrollbar-none">
        {featuredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="featured-card group shrink-0 opacity-0"
            style={{ width: "clamp(240px, 28vw, 380px)" }}
          >
            <div
              className="relative overflow-hidden aspect-[4/5] mb-4"
              style={{ backgroundColor: "#F5D5E5" }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                draggable={false}
              />
            </div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p
                  className="font-sans text-[9px] tracking-[0.25em] uppercase mb-1.5"
                  style={{ color: "#9C4D7A" }}
                >
                  {product.category.replace(/-/g, " ")}
                </p>
                <h3
                  className="text-base font-medium leading-snug transition-colors duration-300"
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    color: "#6A1040",
                  }}
                >
                  {product.name}
                </h3>
              </div>
              <div className="shrink-0 mt-0.5">
                {product.price !== null ? (
                  <span
                    className="font-sans text-sm font-medium"
                    style={{ color: "#6A1040" }}
                  >
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>
                ) : (
                  <span
                    className="font-sans text-[9px] tracking-[0.1em] uppercase border px-2 py-1 rounded-full"
                    style={{ borderColor: "#D4B8C5", color: "#9C4D7A" }}
                  >
                    Contact
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
