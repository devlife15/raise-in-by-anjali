"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
        scrolled ? "w-[92vw] max-w-6xl" : "w-[96vw] max-w-7xl"
      }`}
    >
      <nav
        className={`w-full flex items-center justify-between px-6 py-2.5 rounded-lg transition-all duration-500 ${
          scrolled
            ? "bg-[#6E2C3E]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(110,44,62,0.2)] border border-[#8B3A50]/40"
            : "bg-[#6E2C3E]/80 backdrop-blur-sm shadow-[0_2px_12px_rgba(110,44,62,0.15)] border border-[#8B3A50]/30"
        }`}
      >
        {/* Brand */}
        <Link
          href="/"
          className="font-serif text-lg font-bold tracking-wide text-[#FAF7F2] shrink-0"
        >
          Raise-in
          <span className="italic font-normal text-[#FAF7F2]/60">
            {" "}
            by Anjali
          </span>
        </Link>

        {/* Center links */}
        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          <Link
            href="/categories"
            className="font-sans text-[11px] tracking-[0.2em] text-[#FAF7F2]/70 uppercase hover:text-[#FAF7F2] transition-colors duration-200"
          >
            Categories
          </Link>
          <Link
            href="/products"
            className="font-sans text-[11px] tracking-[0.2em] text-[#FAF7F2]/70 uppercase hover:text-[#FAF7F2] transition-colors duration-200"
          >
            Products
          </Link>
          <Link
            href="/about"
            className="font-sans text-[11px] tracking-[0.2em] text-[#FAF7F2]/70 uppercase hover:text-[#FAF7F2] transition-colors duration-200"
          >
            About
          </Link>
        </div>

        {/* WhatsApp CTA */}
        <a
          href="https://wa.me/919999999999?text=Hi, I'd like to know more about your products"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-[11px] tracking-[0.15em] uppercase bg-[#FAF7F2] text-[#6E2C3E] px-5 py-2.5 rounded-full hover:bg-[#F5E6EA] transition-colors duration-300 shrink-0"
        >
          WhatsApp
        </a>
      </nav>
    </header>
  );
}
