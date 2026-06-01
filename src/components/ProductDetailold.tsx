"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import gsap from "gsap";
import { products, Product } from "@/data/products";
import { categories } from "@/data/categories";
import Navbar from "@/components/Navbar";

interface ProductDetailProps {
  slug: string;
}

export default function ProductDetail({ slug }: ProductDetailProps) {
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  // Use images array if present, fallback to single image repeated
  const images: string[] = (product as any).images ?? [
    product.image,
    product.image,
    product.image,
  ];

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const categoryName =
    categories.find((c) => c.slug === product.category)?.name ??
    product.category;

  const [activeImage, setActiveImage] = useState(0);
  const [prevImage, setPrevImage] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const slideRefs = useRef<HTMLDivElement[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

  // Page entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", delay: 0.1 },
      );
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", delay: 0.25 },
      );
    });
    return () => ctx.revert();
  }, []);

  // Carousel transition
  useEffect(() => {
    if (prevImage === null) return;
    const incoming = slideRefs.current[activeImage];
    const outgoing = slideRefs.current[prevImage];
    if (!incoming || !outgoing) return;

    const xIn = direction === "next" ? "100%" : "-100%";
    const xOut = direction === "next" ? "-40%" : "40%";

    gsap.set(incoming, { x: xIn, zIndex: 2 });
    gsap.set(outgoing, { zIndex: 1 });
    gsap.to(incoming, { x: "0%", duration: 0.7, ease: "power3.inOut" });
    gsap.to(outgoing, {
      x: xOut,
      duration: 0.7,
      ease: "power3.inOut",
      onComplete: () => gsap.set(outgoing, { x: "0%", zIndex: 0 }),
    });
  }, [activeImage, prevImage, direction]);

  // Related products entrance
  useEffect(() => {
    if (!relatedRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".related-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: relatedRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
    }, relatedRef);
    return () => ctx.revert();
  }, []);

  const goTo = (idx: number) => {
    if (idx === activeImage) return;
    setDirection(idx > activeImage ? "next" : "prev");
    setPrevImage(activeImage);
    setActiveImage(idx);
  };

  const goNext = () => goTo((activeImage + 1) % images.length);
  const goPrev = () => goTo((activeImage - 1 + images.length) % images.length);

  const whatsappMessage = product.price
    ? `Hi, I'd like to buy ${product.name} for ₹${product.price.toLocaleString("en-IN")}`
    : `Hi, I'd like to enquire about ${product.name}`;

  const whatsappUrl = `https://wa.me/918167356807?text=${encodeURIComponent(whatsappMessage)}`;
  const instagramUrl = "https://www.instagram.com/raise.inn/";

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#FAF7F2" }}>
      <Navbar />

      {/* Breadcrumb */}
      <div className="px-[6vw] pt-32 pb-6">
        <div className="flex items-center gap-2 font-sans text-[10px] tracking-[0.2em] text-[#9C4D7A]/60 uppercase">
          <Link
            href="/products"
            className="hover:text-[#6A1040] transition-colors"
          >
            Products
          </Link>
          <span>/</span>
          <Link
            href={`/products?category=${product.category}`}
            className="hover:text-[#6A1040] transition-colors"
          >
            {categoryName}
          </Link>
          <span>/</span>
          <span className="text-[#6A1040]">{product.name}</span>
        </div>
      </div>

      {/* Main product section */}
      <div className="px-[6vw] pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left: image carousel */}
        <div ref={heroRef} className="lg:sticky lg:top-28">
          {/* Main image */}
          <div
            className="relative w-full overflow-hidden rounded-sm"
            style={{ aspectRatio: "4/5", backgroundColor: "#FAF7F2" }}
          >
            {images.map((src, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  if (el) slideRefs.current[idx] = el;
                }}
                className="absolute inset-0"
                style={{ zIndex: idx === 0 ? 1 : 0 }}
              >
                <img
                  src={src}
                  alt={product.name}
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </div>
            ))}

            {/* Prev / Next arrows */}
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: "#FEF0F5/80",
                backdropFilter: "blur(4px)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M10 3L5 8L10 13"
                  stroke="#6A1040"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                backgroundColor: "#FEF0F5/80",
                backdropFilter: "blur(4px)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M6 3L11 8L6 13"
                  stroke="#6A1040"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {/* Slide counter */}
            <div className="absolute bottom-4 right-4 z-10 font-sans text-[10px] tracking-[0.2em] text-white/80">
              {String(activeImage + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex gap-3 mt-4">
            {images.map((src, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                className="relative overflow-hidden rounded-sm transition-all duration-300"
                style={{
                  width: "72px",
                  height: "90px",
                  border:
                    idx === activeImage
                      ? "2px solid #6A1040"
                      : "2px solid transparent",
                  opacity: idx === activeImage ? 1 : 0.5,
                }}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover"
                  draggable={false}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right: product info */}
        <div ref={infoRef} className="pt-2">
          {/* Category label */}
          <p
            className="font-sans text-[10px] tracking-[0.3em] uppercase mb-3"
            style={{ color: "#9C4D7A" }}
          >
            {categoryName}
          </p>

          {/* Product name */}
          <h1
            className="text-[clamp(2rem,3.5vw,3.5rem)] font-bold leading-tight tracking-tight mb-5"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              color: "#6A1040",
            }}
          >
            {product.name}
          </h1>

          {/* Divider */}
          <div
            className="w-12 h-px mb-6"
            style={{ backgroundColor: "#9C4D7A" }}
          />

          {/* Price */}
          <div className="mb-8">
            {product.price !== null ? (
              <div className="flex items-baseline gap-3">
                <span
                  className="text-3xl font-semibold"
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    color: "#6A1040",
                  }}
                >
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span
                  className="font-sans text-[11px] tracking-[0.15em] uppercase"
                  style={{ color: "#9C4D7A" }}
                >
                  incl. of all taxes
                </span>
              </div>
            ) : (
              <div
                className="inline-block font-sans text-[11px] tracking-[0.2em] uppercase px-4 py-2 rounded-full border"
                style={{ borderColor: "#9C4D7A", color: "#9C4D7A" }}
              >
                Price on request
              </div>
            )}
          </div>

          {/* Description placeholder */}
          <p
            className="font-sans text-sm leading-relaxed mb-8"
            style={{ color: "#4A1030", opacity: 0.75 }}
          >
            A beautifully handcrafted resin piece, made to order with care and
            precision. Each creation is unique and preserves your memory exactly
            as it was, encased in clear resin for a lifetime.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col gap-3 mb-8">
            {product.price !== null ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center font-sans text-[12px] tracking-[0.2em] uppercase py-4 transition-all duration-300"
                style={{
                  backgroundColor: "#6A1040",
                  color: "#FEF0F5",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#9C4D7A")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#6A1040")
                }
              >
                Buy Now via WhatsApp
              </a>
            ) : (
              <>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center font-sans text-[12px] tracking-[0.2em] uppercase py-4 transition-all duration-300"
                  style={{ backgroundColor: "#6A1040", color: "#FEF0F5" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#9C4D7A")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#6A1040")
                  }
                >
                  Enquire on WhatsApp
                </a>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center font-sans text-[12px] tracking-[0.2em] uppercase py-4 transition-all duration-300 border"
                  style={{
                    borderColor: "#6A1040",
                    color: "#6A1040",
                    backgroundColor: "transparent",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#6A1040";
                    e.currentTarget.style.color = "#FEF0F5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#6A1040";
                  }}
                >
                  Enquire on Instagram
                </a>
              </>
            )}
          </div>

          {/* Customisation note */}
          <div
            className="flex items-start gap-3 px-4 py-3 rounded-sm"
            style={{ backgroundColor: "#F5EEF0" }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="mt-0.5 shrink-0"
            >
              <circle cx="7" cy="7" r="6" stroke="#9C4D7A" strokeWidth="1.2" />
              <path
                d="M7 6v4M7 4.5v.5"
                stroke="#9C4D7A"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <p
              className="font-sans text-[11px] leading-relaxed"
              style={{ color: "#6A1040" }}
            >
              Every piece is made to order. Want something personalised?{" "}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:opacity-70 transition-opacity"
              >
                Contact to discuss customisation.
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <div
          ref={relatedRef}
          className="px-[6vw] py-20 border-t"
          style={{ borderColor: "#F5D5E5" }}
        >
          <div className="flex items-baseline gap-4 mb-10">
            <h2
              className="text-[clamp(1.8rem,3vw,3rem)] font-bold tracking-tight"
              style={{
                fontFamily: "var(--font-instrument-serif)",
                color: "#6A1040",
              }}
            >
              You might{" "}
              <span className="italic font-normal" style={{ color: "#9C4D7A" }}>
                also like
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((related) => (
              <Link
                key={related.id}
                href={`/products/${related.slug}`}
                className="related-card group opacity-0 block"
              >
                <div
                  className="relative overflow-hidden rounded-sm mb-4"
                  style={{ aspectRatio: "4/5", backgroundColor: "#FAF7F2" }}
                >
                  <img
                    src={related.image}
                    alt={related.name}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    draggable={false}
                  />
                </div>
                <h3
                  className="text-sm font-medium leading-snug mb-1 group-hover:opacity-70 transition-opacity"
                  style={{
                    fontFamily: "var(--font-instrument-serif)",
                    color: "#6A1040",
                  }}
                >
                  {related.name}
                </h3>
                <div>
                  {related.price !== null ? (
                    <span
                      className="font-sans text-xs"
                      style={{ color: "#9C4D7A" }}
                    >
                      ₹{related.price.toLocaleString("en-IN")}
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
        </div>
      )}
    </div>
  );
}
