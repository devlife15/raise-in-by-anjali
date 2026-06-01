"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { categoryCustomisations } from "@/data/categoryCustomisations";
import Navbar from "@/components/Navbar";

gsap.registerPlugin(ScrollTrigger);

interface ProductDetailProps {
  slug: string;
}

export default function ProductDetail({ slug }: ProductDetailProps) {
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

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

  const customisation = categoryCustomisations.find(
    (c) => c.categorySlug === product.category,
  );

  const [activeImage, setActiveImage] = useState(0);
  const [prevImage, setPrevImage] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [selections, setSelections] = useState<Record<string, string>>({});

  const slideRefs = useRef<HTMLDivElement[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const relatedRef = useRef<HTMLDivElement>(null);

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

  const buildWhatsappMessage = () => {
    let msg = product.price
      ? `Hi, I'd like to buy ${product.name} for ₹${product.price.toLocaleString("en-IN")}`
      : `Hi, I'd like to enquire about ${product.name}`;

    if (customisation && Object.keys(selections).length > 0) {
      const details = customisation.options
        .filter((opt) => selections[opt.id])
        .map((opt) => `${opt.label}: ${selections[opt.id]}`)
        .join(", ");
      if (details) msg += `. Customisation: ${details}`;
    }

    return encodeURIComponent(msg);
  };

  const whatsappUrl = `https://wa.me/918167356807?text=${buildWhatsappMessage()}`;
  const instagramUrl = "https://www.instagram.com/raise.inn/";

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#FAF7F2" }}>
      <Navbar />

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

      <div className="px-[6vw] pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left: carousel, sticky on desktop only */}
        <div ref={heroRef} className="lg:sticky lg:top-28">
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

            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "rgba(250,247,242,0.85)",
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
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "rgba(250,247,242,0.85)",
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

            <div
              className="absolute bottom-4 right-4 z-10 font-sans text-[10px] tracking-[0.2em]"
              style={{ color: "#6A1040" }}
            >
              {String(activeImage + 1).padStart(2, "0")} /{" "}
              {String(images.length).padStart(2, "0")}
            </div>
          </div>

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

        {/* Right: info */}
        <div ref={infoRef} className="pt-2">
          <p
            className="font-sans text-[10px] tracking-[0.3em] uppercase mb-3"
            style={{ color: "#9C4D7A" }}
          >
            {categoryName}
          </p>

          <h1
            className="text-[clamp(2rem,3.5vw,3.5rem)] font-bold leading-tight tracking-tight mb-5"
            style={{
              fontFamily: "var(--font-instrument-serif)",
              color: "#6A1040",
            }}
          >
            {product.name}
          </h1>

          <div
            className="w-12 h-px mb-6"
            style={{ backgroundColor: "#9C4D7A" }}
          />

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

          <p
            className="font-sans text-sm leading-relaxed mb-10"
            style={{ color: "#4A1030", opacity: 0.75 }}
          >
            A beautifully handcrafted resin piece, made to order with care and
            precision. Each creation is unique and preserves your memory exactly
            as it was, encased in clear resin for a lifetime.
          </p>

          {/* Customisation options */}
          {customisation && (
            <div className="mb-10 space-y-7">
              <p
                className="font-sans text-[10px] tracking-[0.25em] uppercase"
                style={{ color: "#6A1040" }}
              >
                Customise Your Piece
              </p>

              {customisation.options.map((option) => (
                <div key={option.id}>
                  <div className="flex items-center gap-2 mb-3">
                    <p
                      className="font-sans text-[11px] tracking-[0.15em] uppercase"
                      style={{ color: "#4A1030" }}
                    >
                      {option.label}
                    </p>
                    {option.required && (
                      <span
                        className="font-sans text-[9px] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: "#F5D5E5", color: "#9C4D7A" }}
                      >
                        Required
                      </span>
                    )}
                  </div>

                  {option.type === "pills" && (
                    <div className="flex flex-wrap gap-2">
                      {option.choices?.map((choice) => {
                        const isSelected =
                          selections[option.id] === choice.value;
                        return (
                          <button
                            key={choice.value}
                            onClick={() =>
                              setSelections((prev) => ({
                                ...prev,
                                [option.id]: isSelected ? "" : choice.value,
                              }))
                            }
                            className="font-sans text-[11px] tracking-[0.1em] px-4 py-2 rounded-full border transition-all duration-200"
                            style={{
                              borderColor: isSelected ? "#6A1040" : "#D4B8C5",
                              backgroundColor: isSelected
                                ? "#6A1040"
                                : "transparent",
                              color: isSelected ? "#FAF7F2" : "#6A1040",
                            }}
                          >
                            {choice.label}
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {option.type === "color-swatches" && (
                    <div className="flex flex-wrap gap-3 items-center">
                      {option.choices?.map((choice) => {
                        const isSelected =
                          selections[option.id] === choice.value;
                        return (
                          <button
                            key={choice.value}
                            onClick={() =>
                              setSelections((prev) => ({
                                ...prev,
                                [option.id]: isSelected ? "" : choice.value,
                              }))
                            }
                            title={choice.label}
                            className="w-8 h-8 rounded-full transition-all duration-200"
                            style={{
                              backgroundColor: choice.hex,
                              border: isSelected
                                ? "3px solid #6A1040"
                                : "2px solid #D4B8C5",
                              boxShadow: isSelected
                                ? "0 0 0 2px #FAF7F2, 0 0 0 4px #6A1040"
                                : "none",
                            }}
                          />
                        );
                      })}
                      {selections[option.id] && (
                        <span
                          className="font-sans text-[11px]"
                          style={{ color: "#9C4D7A" }}
                        >
                          {
                            option.choices?.find(
                              (c) => c.value === selections[option.id],
                            )?.label
                          }
                        </span>
                      )}
                    </div>
                  )}

                  {option.type === "text-input" && (
                    <input
                      type="text"
                      placeholder={option.placeholder}
                      value={selections[option.id] ?? ""}
                      onChange={(e) =>
                        setSelections((prev) => ({
                          ...prev,
                          [option.id]: e.target.value,
                        }))
                      }
                      className="w-full font-sans text-sm px-4 py-3 rounded-sm outline-none transition-all duration-200"
                      style={{
                        border: "1.5px solid #D4B8C5",
                        backgroundColor: "#FAF7F2",
                        color: "#4A1030",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#6A1040")}
                      onBlur={(e) => (e.target.style.borderColor = "#D4B8C5")}
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col gap-3 mb-8">
            {product.price !== null ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center font-sans text-[12px] tracking-[0.2em] uppercase py-4 transition-all duration-300"
                style={{ backgroundColor: "#6A1040", color: "#FAF7F2" }}
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
                  style={{ backgroundColor: "#6A1040", color: "#FAF7F2" }}
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
                    e.currentTarget.style.color = "#FAF7F2";
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
              Every piece is made to order. Want something different?{" "}
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
          <div className="mb-10">
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
