"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { products } from "@/data/products";

const FAVORITE_IDS = ["c2", "p2", "k1", "f2"];

export default function CustomerFavorites() {
  const favoritesRef = useRef<HTMLDivElement>(null);
  const favoriteProducts = products.filter((p) => FAVORITE_IDS.includes(p.id));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".favorites-heading",
        { x: -40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: favoritesRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        ".favorites-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: favoritesRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    }, favoritesRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={favoritesRef}
      className="px-[5vw] py-16 md:py-20"
      style={{ backgroundColor: "#F5D5E5" }}
    >
      <div className="flex items-end justify-between mb-8 md:mb-12">
        <div>
          <p
            className="favorites-heading font-sans text-[10px] tracking-[0.3em] uppercase mb-3 opacity-0"
            style={{ color: "#9C4D7A" }}
          >
            Most Loved
          </p>
          <h2
            className="favorites-heading text-[clamp(2rem,4vw,4rem)] font-bold tracking-tight opacity-0"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              color: "#6A1040",
            }}
          >
            Customer{" "}
            <span className="italic font-normal" style={{ color: "#9C4D7A" }}>
              Favorites
            </span>
          </h2>
        </div>
        <Link
          href="/products"
          className="font-sans text-[11px] tracking-[0.2em] uppercase border-b pb-px mb-1 transition-colors"
          style={{ color: "#9C4D7A", borderColor: "#9C4D7A" }}
        >
          View All
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {favoriteProducts.map((product, idx) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="favorites-card group opacity-0 block"
          >
            <div
              className="relative overflow-hidden mb-3"
              style={{
                aspectRatio: idx === 0 || idx === 3 ? "3/4" : "4/5",
                backgroundColor: "#FEF0F5",
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                draggable={false}
              />
              <div
                className="absolute top-3 left-3 font-sans text-[9px] tracking-[0.15em] uppercase px-2 py-1 rounded-full"
                style={{ backgroundColor: "#6A1040", color: "#FAF7F2" }}
              >
                ✦ Loved
              </div>
            </div>
            <h3
              className="text-sm font-medium leading-snug mb-1"
              style={{
                fontFamily: "var(--font-instrument-serif)",
                color: "#6A1040",
              }}
            >
              {product.name}
            </h3>
            <div>
              {product.price !== null ? (
                <span
                  className="font-sans text-xs"
                  style={{ color: "#9C4D7A" }}
                >
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
              ) : (
                <span
                  className="font-sans text-[9px] tracking-[0.1em] uppercase border px-2 py-0.5 rounded-full"
                  style={{ borderColor: "#9C4D7A", color: "#9C4D7A" }}
                >
                  Contact
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
