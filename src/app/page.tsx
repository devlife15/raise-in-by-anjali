"use client";

import { useState } from "react";
import { useRef } from "react";
import gsap from "gsap";
import IntroLoader from "@/components/IntroLoader";
import HomePage from "@/components/HomePage";

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  const handleIntroComplete = () => {
    setIntroComplete(true);
    requestAnimationFrame(() => {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" },
      );
    });
  };

  return (
    <>
      <IntroLoader onComplete={handleIntroComplete} />
      <div ref={pageRef} style={{ opacity: introComplete ? undefined : 0 }}>
        <HomePage />
      </div>
    </>
  );
}
