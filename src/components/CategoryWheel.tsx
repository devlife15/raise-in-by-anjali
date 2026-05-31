"use client";

import { useEffect, useRef, useState } from "react";
import { categories } from "@/data/categories";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CURVE_MULTIPLIER = 1.2;
const ITEM_HEIGHT_VH = 11;
const SCROLL_HEIGHT = "500vh";

function getXOffset(distanceFromActive: number): number {
  return Math.pow(distanceFromActive, 2) * CURVE_MULTIPLIER;
}

export default function CategoryWheel() {
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const imageRefs = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    const totalItems = categories.length;

    const ctx = gsap.context(() => {
      gsap.set(listRef.current, { y: 0 });

      ScrollTrigger.create({
        trigger: scrollWrapperRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const rawIndex = self.progress * (totalItems - 1);
          const newActive = Math.round(rawIndex);

          if (newActive !== activeIndexRef.current) {
            activeIndexRef.current = newActive;
            setActiveIndex(newActive);
          }
        },
      });
    }, scrollWrapperRef);

    return () => ctx.revert();
  }, []);

  // Handle list y movement and arc layout on activeIndex change
  useEffect(() => {
    if (listRef.current) {
      gsap.to(listRef.current, {
        y: -activeIndex * ITEM_HEIGHT_VH * (window.innerHeight / 100),
        duration: 0.6,
        ease: "power3.out",
      });
    }

    itemRefs.current.forEach((el, idx) => {
      if (!el) return;
      const distance = idx - activeIndex;
      const xOffset = getXOffset(distance);
      const rotation = distance * 5;
      const isActive = idx === activeIndex;

      gsap.to(el, {
        x: `${xOffset}vw`,
        rotation: rotation,
        opacity: isActive ? 1 : Math.max(0.18, 1 - Math.abs(distance) * 0.28),
        duration: 0.6,
        ease: "power3.out",
      });
    });
  }, [activeIndex]);

  const handleMouseEnter = (index: number) => {
    const img = imageRefs.current[index];
    if (!img) return;
    gsap.killTweensOf(img);
    gsap.fromTo(
      img,
      { opacity: 0, x: -30, visibility: "visible" },
      { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" },
    );
  };

  const handleMouseLeave = (index: number) => {
    const img = imageRefs.current[index];
    if (!img) return;
    gsap.killTweensOf(img);
    gsap.to(img, {
      opacity: 0,
      x: 20,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => gsap.set(img, { visibility: "hidden" }),
    });
  };

  return (
    <div
      ref={scrollWrapperRef}
      className="relative w-full select-none"
      style={{ height: SCROLL_HEIGHT }}
    >
      {/* DESKTOP */}
      <div className="sticky top-0 hidden h-screen w-full overflow-hidden md:flex items-center">
        {/* Vertical rule accent */}
        <div className="absolute left-[6vw] top-1/2 -translate-y-1/2 w-px h-[30vh] bg-neutral-200" />

        {/* Arc list: top-1/2 so item 0 starts at center, GSAP moves it up from there */}
        <div
          ref={listRef}
          className="absolute left-[8vw] flex flex-col"
          style={{ gap: `${ITEM_HEIGHT_VH}vh`, top: "50%" }}
        >
          {categories.map((category, index) => {
            const isActive = index === activeIndex;
            const itemNumber = String(index + 1).padStart(2, "0");

            return (
              <div
                key={category.id}
                ref={(el) => {
                  if (el) itemRefs.current[index] = el;
                }}
                className="relative flex items-baseline gap-3 origin-left"
                style={{
                  transform: `translateX(${getXOffset(index - 0)}vw) rotate(${index * 5}deg)`,
                  opacity: index === 0 ? 1 : Math.max(0.18, 1 - index * 0.28),
                }}
              >
                <button
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={() => handleMouseLeave(index)}
                  className="font-serif text-left outline-none leading-none tracking-tight uppercase transition-all duration-300"
                  style={{
                    fontSize: "clamp(2rem, 5vw, 5.5vw)",
                    WebkitTextStroke: isActive ? "0px" : "1px #0A0A0A",
                    color: isActive ? "#0A0A0A" : "transparent",
                  }}
                >
                  {category.name}
                </button>

                <span className="font-sans text-[0.8vw] text-neutral-400 shrink-0">
                  {itemNumber}
                </span>

                <div
                  ref={(el) => {
                    if (el) imageRefs.current[index] = el;
                  }}
                  className="pointer-events-none invisible absolute z-30 opacity-0"
                  style={{
                    left: "30%",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "12vw",
                    height: "15vw",
                  }}
                >
                  <div className="w-full h-full rounded-sm overflow-hidden border border-neutral-100 shadow-xl">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll progress indicator */}
        <div className="absolute right-[6vw] bottom-[8vh] font-sans text-[10px] tracking-[0.2em] text-neutral-300 uppercase">
          {String(activeIndex + 1).padStart(2, "0")} /{" "}
          {String(categories.length).padStart(2, "0")}
        </div>
      </div>

      {/* MOBILE FALLBACK */}
      <div className="block px-6 py-28 md:hidden min-h-screen">
        <div className="mb-14">
          <p className="font-sans text-[9px] tracking-[0.25em] text-neutral-400 uppercase mb-1">
            Handmade Resin Preservations
          </p>
          <h2 className="font-serif text-3xl font-bold tracking-tight text-neutral-900">
            Collections
          </h2>
        </div>
        <div className="space-y-10">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="border-b border-neutral-200/60 pb-6"
            >
              <span className="font-sans text-[10px] text-neutral-400 block mb-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-serif text-xl font-bold uppercase text-neutral-900">
                {category.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
