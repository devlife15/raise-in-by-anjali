"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";

const NAV_LINKS = [
  { label: "Categories", href: "/categories" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const linkRefs = useRef<HTMLDivElement[]>([]);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const instagramRef = useRef<HTMLAnchorElement>(null);
  const line1Ref = useRef<HTMLSpanElement>(null);
  const line2Ref = useRef<HTMLSpanElement>(null);
  const line3Ref = useRef<HTMLSpanElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const openMenu = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setMenuOpen(true);

    // Hamburger to X
    gsap.to(line1Ref.current, {
      rotate: 45,
      y: 7,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(line2Ref.current, { opacity: 0, duration: 0.2 });
    gsap.to(line3Ref.current, {
      rotate: -45,
      y: -7,
      duration: 0.3,
      ease: "power2.out",
    });

    // Overlay clip in from top
    gsap.fromTo(
      overlayRef.current,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 0.55,
        ease: "power3.inOut",
        onComplete: () => {
          // Stagger links in
          gsap.fromTo(
            linkRefs.current,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.5,
              ease: "power3.out",
              stagger: 0.08,
            },
          );
          gsap.fromTo(
            [ctaRef.current, instagramRef.current],
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.4,
              ease: "power3.out",
              stagger: 0.06,
              delay: NAV_LINKS.length * 0.08,
              onComplete: () => {
                isAnimating.current = false;
              },
            },
          );
        },
      },
    );
  };

  const closeMenu = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    // X back to hamburger
    gsap.to(line1Ref.current, {
      rotate: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });
    gsap.to(line2Ref.current, { opacity: 1, duration: 0.2, delay: 0.1 });
    gsap.to(line3Ref.current, {
      rotate: 0,
      y: 0,
      duration: 0.3,
      ease: "power2.out",
    });

    // Fade out links
    gsap.to([...linkRefs.current, ctaRef.current, instagramRef.current], {
      y: -20,
      opacity: 0,
      duration: 0.25,
      ease: "power2.in",
      stagger: 0.04,
    });

    // Clip overlay out upward
    gsap.to(overlayRef.current, {
      clipPath: "inset(0 0 100% 0)",
      duration: 0.45,
      ease: "power3.inOut",
      delay: 0.15,
      onComplete: () => {
        setMenuOpen(false);
        isAnimating.current = false;
        // Reset link positions for next open
        gsap.set([...linkRefs.current, ctaRef.current, instagramRef.current], {
          y: 40,
          opacity: 0,
        });
      },
    });
  };

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-500 ${
          scrolled ? "w-[92vw] max-w-6xl" : "w-[96vw] max-w-7xl"
        }`}
      >
        <nav
          className={`w-full flex items-center justify-between px-6 py-2.5 rounded-lg transition-all duration-500 ${
            scrolled
              ? "bg-[#6A1040]/95 backdrop-blur-md shadow-[0_4px_24px_rgba(110,44,62,0.2)] border border-[#8B3A50]/40"
              : "bg-[#6A1040]/80 backdrop-blur-sm shadow-[0_2px_12px_rgba(110,44,62,0.15)] border border-[#8B3A50]/30"
          }`}
        >
          {/* Brand */}
          <Link
            href="/"
            className="font-serif text-lg font-bold tracking-wide text-[#FAF7F2] shrink-0"
            onClick={() => menuOpen && closeMenu()}
          >
            Raise-in
            <span className="italic font-normal text-[#FAF7F2]/60">
              {" "}
              by Anjali
            </span>
          </Link>

          {/* Center links: desktop only */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-sans text-[12px] font-medium text-[#FAF7F2]/70 hover:text-[#FAF7F2] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* WhatsApp: desktop only */}
            <a
              href="https://wa.me/918167356807?text=Hi, I'd like to know more about your products"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex font-sans text-[12px] font-medium bg-[#FAF7F2] text-[#6E2C3E] px-5 py-2.5 rounded-full hover:bg-[#F5E6EA] transition-colors duration-300 shrink-0"
            >
              WhatsApp
            </a>

            {/* Hamburger: mobile only */}
            <button
              onClick={menuOpen ? closeMenu : openMenu}
              className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-0 shrink-0"
              aria-label="Toggle menu"
            >
              <span
                ref={line1Ref}
                className="block w-5 h-px bg-[#FAF7F2] origin-center"
                style={{ marginBottom: "5px" }}
              />
              <span
                ref={line2Ref}
                className="block w-5 h-px bg-[#FAF7F2] origin-center"
              />
              <span
                ref={line3Ref}
                className="block w-5 h-px bg-[#FAF7F2] origin-center"
                style={{ marginTop: "5px" }}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Full screen overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center"
        style={{
          backgroundColor: "#3D0A25",
          clipPath: "inset(0 0 100% 0)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        {/* Close button top right */}
        <button
          onClick={closeMenu}
          className="absolute top-6 right-6 font-sans text-[11px] tracking-[0.2em] uppercase text-[#F5D5E5]/60 hover:text-[#FAF7F2] transition-colors"
        >
          Close
        </button>

        {/* Brand in overlay */}
        <div className="absolute top-6 left-6">
          <span className="font-serif text-lg font-bold text-[#FAF7F2]">
            Raise-in
          </span>
          <span className="font-serif text-lg italic font-normal text-[#FAF7F2]/40">
            {" "}
            by Anjali
          </span>
        </div>

        {/* Nav links */}
        <div className="flex flex-col items-center gap-6 mb-12">
          {NAV_LINKS.map((link, idx) => (
            <div
              key={link.href}
              ref={(el) => {
                if (el) linkRefs.current[idx] = el;
              }}
              style={{ opacity: 0, transform: "translateY(40px)" }}
            >
              <Link
                href={link.href}
                onClick={closeMenu}
                className="block font-serif text-[clamp(2.5rem,8vw,5rem)] font-bold tracking-tight text-[#FAF7F2] hover:text-[#F5D5E5] transition-colors duration-200 leading-none"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <a
          ref={ctaRef}
          href="https://wa.me/918167356807?text=Hi, I'd like to place a custom order"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-[12px] tracking-[0.2em] uppercase px-8 py-4 mb-4 transition-all duration-300"
          style={{
            backgroundColor: "#FAF7F2",
            color: "#3D0A25",
            opacity: 0,
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#F5D5E5")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#FAF7F2")
          }
        >
          Order on WhatsApp
        </a>

        {/* Instagram */}
        <a
          ref={instagramRef}
          href="https://www.instagram.com/raise.inn/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-[11px] tracking-[0.2em] uppercase border-b pb-px transition-colors duration-200"
          style={{
            color: "#F5D5E5",
            borderColor: "#9C4D7A",
            opacity: 0,
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#FAF7F2")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#F5D5E5")}
        >
          Instagram
        </a>

        {/* Bottom decoration */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 font-sans text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "#FAF7F2", opacity: 0.2 }}
        >
          Raise-in Studio ✦ 2026
        </div>
      </div>
    </>
  );
}
