"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";
import { categories } from "@/data/categories";

gsap.registerPlugin(ScrollTrigger);

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");
  const pageRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Group products by category
  const grouped = categories.map((cat) => ({
    category: cat,
    items: products.filter((p) => p.category === cat.slug),
  }));

  // Page load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero heading entrance
      gsap.fromTo(
        headingRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1 },
      );

      // Each category section: heading then cards stagger
      sectionRefs.current.forEach((section) => {
        const heading = section.querySelector(".cat-heading");
        const rule = section.querySelector(".cat-rule");
        const cards = section.querySelectorAll(".product-card");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        });

        tl.fromTo(
          heading,
          { x: -40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.7, ease: "power3.out" },
        )
          .fromTo(
            rule,
            { scaleX: 0, transformOrigin: "left center" },
            { scaleX: 1, duration: 0.6, ease: "power2.out" },
            "-=0.4",
          )
          .fromTo(
            cards,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.6,
              ease: "power3.out",
              stagger: 0.08,
            },
            "-=0.3",
          );
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  // Filter: dim/restore sections when activeCategory changes
  useEffect(() => {
    if (!activeCategory) {
      // Restore all
      sectionRefs.current.forEach((section) => {
        gsap.to(section, { opacity: 1, duration: 0.5, ease: "power2.out" });
      });
      return;
    }

    sectionRefs.current.forEach((section, slug) => {
      const isActive = slug === activeCategory;
      gsap.to(section, {
        opacity: isActive ? 1 : 0.2,
        duration: 0.5,
        ease: "power2.out",
      });
    });

    // Scroll active section into view
    const activeSection = sectionRefs.current.get(activeCategory);
    if (activeSection) {
      setTimeout(() => {
        activeSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }, [activeCategory]);

  return (
    <div ref={pageRef} className="min-h-screen w-full bg-[#FAF7F2]">
      {/* Header */}
      <header className="fixed top-0 left-0 z-50 flex w-full items-center justify-between px-[6vw] py-8 bg-[#FAF7F2]/90 backdrop-blur-sm">
        <Link href="/" className="font-serif text-xl font-bold tracking-wide">
          Raise-in
          <span className="italic font-normal text-neutral-500">
            {" "}
            by Anjali
          </span>
        </Link>
        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className="font-sans text-[11px] tracking-[0.2em] text-neutral-500 uppercase hover:text-neutral-900 transition-colors"
          >
            Categories
          </Link>
          <Link
            href="/products"
            className="font-sans text-[11px] tracking-[0.2em] text-neutral-900 uppercase border-b border-neutral-900 pb-px"
          >
            Products
          </Link>
        </nav>
      </header>

      {/* Main content */}
      <main className="px-[6vw] pt-36 pb-32">
        {/* Page hero */}
        <div className="mb-20 flex items-end justify-between">
          <h1
            ref={headingRef}
            className="font-serif text-[clamp(3rem,8vw,8rem)] font-bold leading-none tracking-tight text-neutral-900 uppercase opacity-0"
          >
            Our Products
          </h1>

          {/* View all pill, visible only when filter active */}
          {activeCategory && (
            <Link
              href="/products"
              className="font-sans text-[11px] tracking-[0.15em] uppercase text-neutral-900 border border-neutral-900 px-5 py-2.5 rounded-full hover:bg-neutral-900 hover:text-[#FAF7F2] transition-all duration-300 shrink-0 mb-2"
            >
              View All
            </Link>
          )}
        </div>

        {/* Category sections */}
        <div className="flex flex-col gap-24">
          {grouped.map(({ category, items }) => (
            <div
              key={category.id}
              ref={(el) => {
                if (el) sectionRefs.current.set(category.slug, el);
              }}
            >
              {/* Category heading */}
              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-4">
                  <h2 className="cat-heading font-instrument-serif italic text-[clamp(1.8rem,4vw,4rem)] tracking-tight text-neutral-900">
                    {category.name}
                  </h2>
                  <span className="font-sans text-[11px] tracking-[0.2em] text-neutral-400 uppercase">
                    {String(items.length).padStart(2, "0")} pieces
                  </span>
                </div>
                <div className="cat-rule h-px w-full bg-neutral-200" />
              </div>

              {/* Product grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-px bg-neutral-200">
                {items.map((product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    className="product-card group bg-[#FAF7F2] block"
                  >
                    {/* Image area */}
                    <div className="relative aspect-square overflow-hidden bg-neutral-100">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-neutral-900/0 group-hover:bg-neutral-900/8 transition-all duration-500" />
                    </div>

                    {/* Card info */}
                    <div className="p-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="font-sans text-[10px] tracking-[0.2em] text-neutral-400 uppercase mb-1.5">
                          {category.name}
                        </p>
                        <h3 className="font-serif text-base font-medium text-neutral-900 leading-snug group-hover:text-neutral-600 transition-colors duration-300">
                          {product.name}
                        </h3>
                      </div>
                      <div className="shrink-0 text-right mt-0.5">
                        {product.price !== null ? (
                          <span className="font-sans text-sm font-medium text-neutral-900">
                            ₹{product.price.toLocaleString("en-IN")}
                          </span>
                        ) : (
                          <span className="font-sans text-[10px] tracking-[0.1em] uppercase text-neutral-400 border border-neutral-300 px-2 py-1 rounded-full">
                            Contact
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer WhatsApp CTA */}
        <div className="mt-32 border-t border-neutral-200 pt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-sans text-[10px] tracking-[0.25em] text-neutral-400 uppercase mb-2">
              Custom Orders Welcome
            </p>
            <h3 className="font-serif text-3xl font-bold text-neutral-900">
              Something in mind?
            </h3>
          </div>
          <a
            href="https://wa.me/919999999999?text=Hi, I'd like to place a custom order"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-[11px] tracking-[0.2em] uppercase bg-neutral-900 text-[#FAF7F2] px-8 py-4 hover:bg-neutral-700 transition-colors duration-300 shrink-0"
          >
            Chat on WhatsApp
          </a>
        </div>
      </main>
    </div>
  );
}
