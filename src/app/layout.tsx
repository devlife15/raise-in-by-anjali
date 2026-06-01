import {
  Geist,
  Geist_Mono,
  Cormorant_Garamond,
  Plus_Jakarta_Sans,
  Instrument_Serif,
  Homemade_Apple,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const serifDisplay = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: ["400"],
  style: ["normal", "italic"],
});

const sansClean = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

const homemadeApple = Homemade_Apple({
  subsets: ["latin"],
  variable: "--font-homemade-apple",
  weight: "400",
});

export const metadata = {
  title: "Raise-In | Premium Handmade Resin Art",
  description:
    "Handcrafted resin wall clocks, wedding garland preservations, and bespoke gifts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${serifDisplay.variable} ${instrumentSerif.variable} ${homemadeApple.variable} ${sansClean.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
