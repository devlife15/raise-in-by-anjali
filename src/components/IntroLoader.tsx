"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { categories } from "@/data/categories";

// Mood reel images for cycling phase, replace with real close-up product shots later
const MOOD_IMAGES = [
  "/Anjali.jpg",
  "/anju.jpg",
  "/Anjali.jpg",
  "/anju.jpg",
  "/Anjali.jpg",
  "/anju.jpg",
];

const CYCLE_DURATION = 400; // ms per image swap

type Phase =
  | "cycling"
  | "stacking"
  | "paused"
  | "curtain-close"
  | "curtain-open"
  | "done";

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [phase, setPhase] = useState<Phase>("cycling");
  const [cycleIndex, setCycleIndex] = useState(0);

  const loaderRef = useRef<HTMLDivElement>(null);
  const cyclingCardRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const stackCardRefs = useRef<HTMLDivElement[]>([]);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const leftLabelRef = useRef<HTMLSpanElement>(null);
  const rightLabelRef = useRef<HTMLSpanElement>(null);
  const cycleIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Phase 1: image cycling
  useEffect(() => {
    if (phase !== "cycling") return;

    // Fade in labels gradually
    gsap.fromTo(
      [leftLabelRef.current, rightLabelRef.current],
      { opacity: 0 },
      { opacity: 0.35, duration: 1.2, ease: "power2.out" },
    );

    // Fade in cycling card
    gsap.fromTo(
      cyclingCardRef.current,
      { opacity: 0, scale: 0.92 },
      { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
    );

    let index = 0;
    cycleIntervalRef.current = setInterval(() => {
      index++;
      if (index >= MOOD_IMAGES.length) {
        clearInterval(cycleIntervalRef.current!);
        setPhase("stacking");
        return;
      }

      // Quick swap animation
      gsap.to(cyclingCardRef.current, {
        scale: 0.94,
        opacity: 0.6,
        duration: 0.12,
        ease: "power2.in",
        onComplete: () => {
          setCycleIndex(index);
          gsap.to(cyclingCardRef.current, {
            scale: 1,
            opacity: 1,
            duration: 0.22,
            ease: "power3.out",
          });
        },
      });
    }, CYCLE_DURATION);

    return () => {
      if (cycleIntervalRef.current) clearInterval(cycleIntervalRef.current);
    };
  }, [phase]);

  // Phase 2: stack build
  useEffect(() => {
    if (phase !== "stacking") return;

    // Labels go full opacity
    gsap.to([leftLabelRef.current, rightLabelRef.current], {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
    });

    // Hide cycling card, show stack
    if (cyclingCardRef.current) cyclingCardRef.current.style.display = "none";
    if (stackRef.current) stackRef.current.style.visibility = "visible";

    const tl = gsap.timeline({
      onComplete: () => setPhase("paused"),
    });

    stackCardRefs.current.forEach((card, idx) => {
      if (!card) return;
      gsap.set(card, { y: -40, opacity: 0, scale: 0.95 });
      tl.to(
        card,
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.4,
          ease: "power3.out",
        },
        idx * 0.12,
      );
    });
  }, [phase]);

  // Phase 3: pause briefly then trigger curtain close
  useEffect(() => {
    if (phase !== "paused") return;
    const timer = setTimeout(() => setPhase("curtain-close"), 400);
    return () => clearTimeout(timer);
  }, [phase]);

  // Phase 4: curtain close
  useEffect(() => {
    if (phase !== "curtain-close") return;

    const tl = gsap.timeline({
      onComplete: () => setPhase("curtain-open"),
    });

    tl.fromTo(
      curtainTopRef.current,
      { yPercent: -100 },
      { yPercent: 0, duration: 0.55, ease: "power3.inOut" },
    ).fromTo(
      curtainBottomRef.current,
      { yPercent: 100 },
      { yPercent: 0, duration: 0.55, ease: "power3.inOut" },
      "<",
    );
  }, [phase]);

  // Phase 5: curtain open + reveal
  useEffect(() => {
    if (phase !== "curtain-open") return;

    // Signal parent to show page content before curtain opens
    onComplete();

    const tl = gsap.timeline({
      onComplete: () => setPhase("done"),
    });

    tl.to(curtainTopRef.current, {
      yPercent: -100,
      duration: 0.65,
      ease: "power3.inOut",
      delay: 0.1,
    }).to(
      curtainBottomRef.current,
      {
        yPercent: 100,
        duration: 0.65,
        ease: "power3.inOut",
      },
      "<",
    );
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      {/* Left label */}
      <span
        ref={leftLabelRef}
        className="absolute left-[6vw] top-1/2 -translate-y-1/2 font-instrument-serif italic text-[1.4vw] tracking-[0.15em] text-neutral-900 opacity-0"
      >
        Raise-in
      </span>

      <span
        ref={rightLabelRef}
        className="absolute right-[6vw] top-1/2 -translate-y-1/2 font-serif text-[1.4vw] tracking-[0.15em] text-neutral-900 uppercase opacity-0"
      >
        By <span className="font-homemade-apple">Anjali</span>
      </span>

      {/* Cycling card (phase 1) */}
      <div
        ref={cyclingCardRef}
        className="relative z-10 overflow-hidden rounded-sm shadow-lg opacity-0"
        style={{ width: "10vw", height: "10vw", minWidth: 120, minHeight: 120 }}
      >
        <img
          src={MOOD_IMAGES[cycleIndex]}
          alt=""
          className="h-full w-full object-cover"
          draggable={false}
        />
      </div>

      {/* Card stack (phase 2+) */}
      <div
        ref={stackRef}
        className="absolute z-10 flex flex-col items-center"
        style={{
          visibility: "hidden",
          gap: "6px",
        }}
      >
        {categories.map((category, index) => (
          <div
            key={category.id}
            ref={(el) => {
              if (el) stackCardRefs.current[index] = el;
            }}
            className="overflow-hidden rounded-sm shadow-md opacity-0"
            style={{
              width: "6.5vw",
              height: "6.5vw",
              minWidth: 120,
              minHeight: 75,
            }}
          >
            <img
              src={category.image}
              alt={category.name}
              className="h-full w-full object-cover"
              draggable={false}
            />
          </div>
        ))}
      </div>

      {/* Curtain top */}
      <div
        ref={curtainTopRef}
        className="absolute inset-x-0 top-0 z-20 h-1/2"
        style={{
          backgroundColor: "#FAF7F2",
          transform: "translateY(-100%)",
        }}
      />

      {/* Curtain bottom */}
      <div
        ref={curtainBottomRef}
        className="absolute inset-x-0 bottom-0 z-20 h-1/2"
        style={{
          backgroundColor: "#FAF7F2",
          transform: "translateY(100%)",
        }}
      />
    </div>
  );
}
