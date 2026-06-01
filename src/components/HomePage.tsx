"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { products } from "@/data/products";
import Navbar from "./Navbar";

gsap.registerPlugin(ScrollTrigger);

// Hero slider images, replace with real product shots
const HERO_IMAGES = ["/Anjali.jpg", "/anju.jpg", "/Anjali.jpg", "/anju.jpg"];

// Marquee content
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

// Placeholder testimonials
const TESTIMONIALS = [
  {
    id: 1,
    quote:
      "She preserved my wedding garland so beautifully. Every petal looks exactly as it did on our special day.",
    name: "Priya Sharma",
    item: "Marriage Garland Preservation",
  },
  {
    id: 2,
    quote:
      "The resin clock she made is the centrepiece of our living room. Everyone who visits asks about it.",
    name: "Rahul Mehta",
    item: "Wall Clock",
  },
  {
    id: 3,
    quote:
      "Got my first salary cheque preserved as a gift for my father. He was moved to tears. Absolutely priceless.",
    name: "Sneha Iyer",
    item: "First Salary Cheque",
  },
  {
    id: 4,
    quote:
      "The pooja thali she crafted for our housewarming is stunning. The detail in the resin work is unreal.",
    name: "Deepa Nair",
    item: "Pooja Plate",
  },
  {
    id: 5,
    quote:
      "Ordered a custom keychain with my initials. The quality and finish is far beyond what I expected.",
    name: "Arjun Kapoor",
    item: "Keychain",
  },
  {
    id: 6,
    quote:
      "The preserved rose from my anniversary bouquet now sits on my desk. It looks like it was just picked.",
    name: "Meera Pillai",
    item: "Rose Preservation",
  },
];

// Featured: pick 4 products manually by id
const FEATURED_IDS = ["g1", "c1", "ch1", "p1"];
const featuredProducts = products.filter((p) => FEATURED_IDS.includes(p.id));

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const featuredRef = useRef<HTMLDivElement>(null);
  const testimonialsTrackRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const slideRefs = useRef<HTMLDivElement[]>([]);
  const sliderIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const testimonialsAnimRef = useRef<gsap.core.Tween | null>(null);

  // Hero slide entrance
  useEffect(() => {
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
  }, []);

  // Auto slide
  useEffect(() => {
    sliderIntervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => {
        setPrevSlide(prev);
        return (prev + 1) % HERO_IMAGES.length;
      });
    }, 4000);
    return () => {
      if (sliderIntervalRef.current) clearInterval(sliderIntervalRef.current);
    };
  }, []);

  // Slide transition
  useEffect(() => {
    if (prevSlide === null) return;
    const incoming = slideRefs.current[currentSlide];
    const outgoing = slideRefs.current[prevSlide];
    if (!incoming || !outgoing) return;

    gsap.set(incoming, { x: "100%", zIndex: 2 });
    gsap.set(outgoing, { zIndex: 1 });

    gsap.to(incoming, {
      x: "0%",
      duration: 1,
      ease: "power3.inOut",
    });
    gsap.to(outgoing, {
      x: "-30%",
      duration: 1,
      ease: "power3.inOut",
      onComplete: () => {
        gsap.set(outgoing, { x: "0%", zIndex: 0 });
      },
    });
  }, [currentSlide, prevSlide]);

  // Featured products scroll entrance
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

  // Testimonials auto scroll
  useEffect(() => {
    const track = testimonialsTrackRef.current;
    if (!track) return;

    const totalWidth = track.scrollWidth / 2;

    testimonialsAnimRef.current = gsap.to(track, {
      x: -totalWidth,
      duration: 28,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => {
      testimonialsAnimRef.current?.kill();
    };
  }, []);

  const pauseTestimonials = () => testimonialsAnimRef.current?.pause();
  const resumeTestimonials = () => testimonialsAnimRef.current?.resume();

  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#FAF7F2" }}>
      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <section
        ref={heroRef}
        className="relative w-full h-screen flex overflow-hidden"
      >
        {/* Left: image slider */}
        <div className="relative w-1/2 h-full overflow-hidden">
          {HERO_IMAGES.map((src, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) slideRefs.current[idx] = el;
              }}
              className="absolute inset-0"
              style={{
                zIndex: idx === 0 ? 1 : 0,
                transform: "translateX(0%)",
              }}
            >
              <img
                src={src}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
              {/* Subtle warm overlay */}
              <div className="absolute inset-0 bg-neutral-900/10" />
            </div>
          ))}

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-8 z-10 flex gap-2">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setPrevSlide(currentSlide);
                  setCurrentSlide(idx);
                }}
                className={`h-px transition-all duration-500 ${
                  idx === currentSlide ? "w-8 bg-white" : "w-3 bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Diagonal divider */}
        <div
          className="absolute top-0 bottom-0 z-10 w-16"
          style={{
            left: "calc(50% - 2rem)",
            background: "linear-gradient(to right, transparent, #FAF7F2)",
          }}
        />

        {/* Right: text content */}
        <div className="relative w-1/2 h-full flex flex-col justify-center px-[6vw] pt-20">
          <p className="hero-sub font-sans text-[10px] tracking-[0.35em] text-neutral-400 uppercase mb-6 opacity-0">
            Handmade Resin Art
          </p>

          <h1 className="hero-headline font-serif text-[clamp(2.8rem,5vw,5.5rem)] font-bold leading-[1.05] tracking-tight text-neutral-900 mb-6 opacity-0">
            Preserved
            <br />
            <span className="italic font-instrument-serif font-normal">
              in Resin.
            </span>
            <br />
            Kept Forever.
          </h1>

          <p className="hero-sub font-sans text-sm text-neutral-500 leading-relaxed max-w-xs mb-10 opacity-0">
            Custom resin art and preservation pieces, handcrafted to hold your
            most precious memories.
          </p>

          <div className="hero-ctas flex items-center gap-4 opacity-0">
            <Link
              href="/categories"
              className="font-sans text-[11px] tracking-[0.15em] uppercase bg-neutral-900 text-[#FAF7F2] px-7 py-3.5 hover:bg-neutral-700 transition-colors duration-300"
            >
              Explore Collection
            </Link>
            <a
              href="https://wa.me/919999999999?text=Hi, I'd like to place a custom order"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[11px] tracking-[0.15em] uppercase text-neutral-900 border border-neutral-900 px-7 py-3.5 hover:bg-neutral-900 hover:text-[#FAF7F2] transition-all duration-300"
            >
              Custom Order
            </a>
          </div>

          {/* Slide count */}
          <div className="absolute bottom-8 right-[6vw] font-sans text-[10px] tracking-[0.2em] text-neutral-400">
            {String(currentSlide + 1).padStart(2, "0")} /{" "}
            {String(HERO_IMAGES.length).padStart(2, "0")}
          </div>
        </div>

        {/* Marquee strip pinned at hero bottom */}
        <div
          ref={marqueeRef}
          className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden py-3"
          style={{ backgroundColor: "#0A0A0A" }}
        >
          <div className="flex whitespace-nowrap animate-marquee">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map(
              (item, idx) => (
                <span
                  key={idx}
                  className="font-sans text-[10px] tracking-[0.25em] uppercase text-neutral-400 mx-6"
                >
                  {item}
                  <span className="mx-6 text-neutral-600">✦</span>
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section ref={featuredRef} className="px-[5vw] py-28">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="featured-heading font-sans text-[10px] tracking-[0.3em] text-neutral-400 uppercase mb-3 opacity-0">
              Handpicked
            </p>
            <h2 className="featured-heading font-instrument-serif italic text-[clamp(2rem,4vw,4rem)] tracking-tight text-neutral-900 opacity-0">
              Featured Pieces
            </h2>
          </div>
          <Link
            href="/products"
            className="font-sans text-[11px] tracking-[0.2em] uppercase text-neutral-500 hover:text-neutral-900 transition-colors border-b border-neutral-300 pb-px mb-1"
          >
            View All
          </Link>
        </div>

        {/* Cards: overflow scroll, right edge cut off */}
        <div className="flex gap-5 overflow-x-auto pb-4 -mr-[5vw] pr-[5vw] scrollbar-none">
          {featuredProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="featured-card group shrink-0 opacity-0"
              style={{ width: "clamp(240px, 28vw, 380px)" }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-[4/5] bg-neutral-100 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  draggable={false}
                />
              </div>

              {/* Info */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-sans text-[9px] tracking-[0.25em] text-neutral-400 uppercase mb-1.5">
                    {product.category.replace(/-/g, " ")}
                  </p>
                  <h3 className="font-serif text-base font-medium text-neutral-900 leading-snug group-hover:text-neutral-500 transition-colors duration-300">
                    {product.name}
                  </h3>
                </div>
                <div className="shrink-0 mt-0.5">
                  {product.price !== null ? (
                    <span className="font-sans text-sm font-medium text-neutral-900">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>
                  ) : (
                    <span className="font-sans text-[9px] tracking-[0.1em] uppercase text-neutral-400 border border-neutral-200 px-2 py-1 rounded-full">
                      Contact
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        className="py-24 overflow-hidden"
        style={{ backgroundColor: "#F2EDE6" }}
      >
        <div className="px-[5vw] mb-12">
          <p className="font-sans text-[10px] tracking-[0.3em] text-neutral-400 uppercase mb-3">
            Kind Words
          </p>
          <h2 className="font-instrument-serif text-[clamp(2rem,4vw,4rem)] italic tracking-tight text-neutral-900">
            What Customers Say
          </h2>
        </div>

        {/* Auto scroll track */}
        <div
          className="relative overflow-hidden"
          onMouseEnter={pauseTestimonials}
          onMouseLeave={resumeTestimonials}
        >
          <div ref={testimonialsTrackRef} className="flex gap-5 w-max pl-[5vw]">
            {/* Duplicate for seamless loop */}
            {[...TESTIMONIALS, ...TESTIMONIALS].map((t, idx) => (
              <div
                key={idx}
                className="shrink-0 bg-[#FAF7F2] border border-neutral-200/60 p-8 rounded-sm"
                style={{ width: "clamp(280px, 30vw, 420px)" }}
              >
                <p className="font-serif text-base leading-relaxed text-neutral-700 mb-6 italic">
                  "{t.quote}"
                </p>
                <div>
                  <p className="font-sans text-[11px] font-medium tracking-[0.1em] text-neutral-900 uppercase">
                    {t.name}
                  </p>
                  <p className="font-sans text-[10px] tracking-[0.15em] text-neutral-400 uppercase mt-0.5">
                    {t.item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
