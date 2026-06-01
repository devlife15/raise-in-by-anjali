"use client";

import { useState } from "react";
import CategoryWheel from "@/components/CategoryWheel";
import IntroLoader from "@/components/IntroLoader";
import gsap from "gsap";
import { useRef } from "react";

export default function Home() {
  const [showPage, setShowPage] = useState(false);
  const pageContentRef = useRef<HTMLElement>(null);

  const handleIntroComplete = () => {
    setShowPage(true);

    // Stagger in page content after curtain opens
    requestAnimationFrame(() => {
      gsap.fromTo(
        pageContentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: "power2.out" }
      );
    });
  };

  return (
    <>
      <IntroLoader onComplete={handleIntroComplete} />

      <main
        ref={pageContentRef}
        className="min-h-screen w-full relative"
        style={{ opacity: 0 }}
      >
        {/* Header */}
        <header className="absolute top-0 left-0 z-50 flex w-full items-center justify-between px-[6vw] py-8 pointer-events-none">
          <h1 className="font-serif text-xl font-bold tracking-wide pointer-events-auto">
            AuraResin
            <span className="italic font-normal text-neutral-500">.studio</span>
          </h1>
          <div className="font-sans text-[11px] tracking-[0.2em] text-neutral-500 uppercase pointer-events-auto">
            Portfolio 2026
          </div>
        </header>

        {/* Category wheel */}
        <CategoryWheel />
      </main>
    </>
  );
}
