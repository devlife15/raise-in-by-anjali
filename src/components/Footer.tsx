"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import gsap from "gsap";

const POLAROID_CARDS = [
  {
    image: "/ajfav.png",
    label: "Garland Preservation",
    rotate: -6,
    yOffset: 65,
  },
  { image: "/anju.jpg", label: "First Rose Drop", rotate: 4, yOffset: 45 },
  { image: "/Anjali.jpg", label: "Behind the craft", rotate: -3, yOffset: 70 },
  { image: "/AJ.png", label: "First Salary Cheque", rotate: 7, yOffset: 50 },
  {
    image: "/Ajmall.png",
    label: "Bespoke Wall Clock",
    rotate: -5,
    yOffset: 60,
  },
  { image: "/ag.png", label: "Pooja Plate Setup", rotate: 5, yOffset: 40 },
  { image: "/Anjali.jpg", label: "Work in progress", rotate: -4, yOffset: 75 },
  { image: "/ajred.png", label: "Preserved Memories", rotate: 8, yOffset: 55 },
  { image: "/ajglass.png", label: "Studio casting", rotate: -2, yOffset: 65 },
  { image: "/anju.jpg", label: "Made with love", rotate: 6, yOffset: 50 },
];

const PAGES = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/categories" },
  { label: "Products", href: "/products" },
  { label: "About", href: "/about" },
];

const CONNECT = [
  {
    label: "WhatsApp",
    href: "https://wa.me/918167356807?text=Hi, I'd like to place an order",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
  },
];

export default function Footer() {
  const cardRefs = useRef<HTMLDivElement[]>([]);

  // Initialize all 10 cards with their baseline custom resting offsets and rotations
  useEffect(() => {
    POLAROID_CARDS.forEach((card, idx) => {
      if (cardRefs.current[idx]) {
        gsap.set(cardRefs.current[idx], {
          y: card.yOffset,
          rotation: card.rotate,
          zIndex: 10 + idx, // Progressively layers them from left to right
        });
      }
    });
  }, []);

  const handleMouseEnter = (idx: number) => {
    gsap.to(cardRefs.current[idx], {
      y: -25, // Pops up completely out of the pocket row
      scale: 1.06,
      rotation: POLAROID_CARDS[idx].rotate * 0.3, // Straightens out slightly for look focus
      zIndex: 50, // Ensures the hovered card stacks on top of BOTH neighbors
      duration: 0.4,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const handleMouseLeave = (idx: number) => {
    gsap.to(cardRefs.current[idx], {
      y: POLAROID_CARDS[idx].yOffset, // Drops back safely into the mask line
      scale: 1,
      rotation: POLAROID_CARDS[idx].rotate,
      zIndex: 10 + idx, // Restores original layered deck order
      duration: 0.4,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  return (
    <footer
      className="relative w-full"
      style={{ backgroundColor: "#0F0A0B", marginTop: "-60px" }}
    >
      {/* 
        CARDS ZONE MASK CONTAINER 
        Using flex + negative horizontal spacing (-space-x-14) creates 
        an overlapping photo chain across all desktop resolutions.
      */}
      <div
        className="relative w-full overflow-hidden flex justify-center items-end -space-x-14 px-4 select-none"
        style={{ height: "320px", zIndex: 10 }}
      >
        {POLAROID_CARDS.map((card, idx) => (
          <div
            key={idx}
            ref={(el) => {
              if (el) cardRefs.current[idx] = el;
            }}
            onMouseEnter={() => handleMouseEnter(idx)}
            onMouseLeave={() => handleMouseLeave(idx)}
            className="relative cursor-pointer shrink-0 origin-bottom"
            style={{ width: "185px" }}
          >
            {/* Authentic Polaroid Frame Structure */}
            <div
              className="w-full transition-shadow duration-300 hover:shadow-[0_25px_50px_rgba(0,0,0,0.8)]"
              style={{
                backgroundColor: "#FEFCF8",
                boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
                borderRadius: "1px",
                padding: "12px 12px 0px 12px", // Crisp uniform white borders around the image
              }}
            >
              {/* Deep Portrait Cropped Image Wrapper */}
              <div
                className="w-full overflow-hidden bg-neutral-100"
                style={{ height: "205px" }}
              >
                <img
                  src={card.image}
                  alt={card.label}
                  className="w-full h-full object-cover"
                  draggable={false}
                />
              </div>

              {/* The iconic Polaroid wide bottom strip */}
              <div className="pt-3 pb-5 px-1">
                <p
                  className="text-neutral-600 text-center truncate italic font-serif font-medium"
                  style={{ fontSize: "11.5px", tracking: "-0.01em" }}
                >
                  {card.label}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Link Content Grid */}
      <div className="px-[6vw] pt-12 pb-12">
        <div className="w-full h-px bg-neutral-800/60 mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div>
            <Link href="/" className="block mb-4">
              <span className="font-serif text-xl font-bold text-[#FAF7F2]">
                Raise-in
              </span>
              <span className="font-serif text-xl italic font-normal text-[#FAF7F2]/50">
                {" "}
                by Anjali
              </span>
            </Link>
            <p className="font-sans text-[12px] leading-relaxed text-neutral-400 max-w-[220px]">
              Handcrafted resin art and preservation pieces, made with love and
              care in every detail.
            </p>
          </div>

          <div>
            <p className="font-sans text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-5 font-semibold">
              Pages
            </p>
            <ul className="space-y-3">
              {PAGES.map((page) => (
                <li key={page.href}>
                  <Link
                    href={page.href}
                    className="font-sans text-[13px] text-neutral-400 hover:text-[#FAF7F2] transition-colors duration-200"
                  >
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-5 font-semibold">
              Connect
            </p>
            <ul className="space-y-3">
              {CONNECT.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[13px] text-neutral-400 hover:text-[#FAF7F2] transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-sans text-[10px] tracking-[0.25em] text-neutral-500 uppercase mb-5 font-semibold">
              The Craft
            </p>
            <p className="font-sans text-[12px] leading-relaxed text-neutral-400">
              Every piece is made to order and preserved with care. From wedding
              garlands to first salary cheques, each creation holds a memory
              that lasts forever.
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-neutral-800/60 mt-16 mb-6" />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[10px] tracking-[0.15em] text-neutral-500 uppercase">
            © 2026 Raise-in by Anjali. All rights reserved.
          </p>
          <p className="font-serif text-[11px] italic text-neutral-500 lowercase tracking-wide">
            Handcrafted with love
          </p>
        </div>
      </div>
    </footer>
  );
}
