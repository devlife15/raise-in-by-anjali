export interface Product {
  id: string;
  name: string;
  slug: string;
  category: string; // matches category slug from categories.ts
  image: string;
  price: number | null; // null = "Contact for pricing"
}

export const products: Product[] = [
  // Marriage Garland Preservation
  {
    id: "g1",
    name: "Classic Garland Frame",
    slug: "classic-garland-frame",
    category: "marriage-garland-preservation",
    image: "/products.png",
    price: 2499,
  },
  {
    id: "g2",
    name: "Shadow Box Garland",
    slug: "shadow-box-garland",
    category: "marriage-garland-preservation",
    image: "/ajfav.png",
    price: null,
  },
  {
    id: "g3",
    name: "Resin Dome Preservation",
    slug: "resin-dome-preservation",
    category: "marriage-garland-preservation",
    image: "/Anjali.jpg",
    price: 3199,
  },

  // Wall Clocks
  {
    id: "c1",
    name: "7-Horse Resin Wall Clock",
    slug: "horse-resin-wall-lock",
    category: "wall-clocks",
    image: "/products.png",
    price: 1899,
  },
  {
    id: "c2",
    name: "Ocean Wave Clock",
    slug: "ocean-wave-clock",
    category: "wall-clocks",
    image: "/Anjali.jpg",
    price: 2199,
  },
  {
    id: "c3",
    name: "Marble Finish Clock",
    slug: "marble-finish-clock",
    category: "wall-clocks",
    image: "/anju.jpg",
    price: null,
  },
  {
    id: "c4",
    name: "Dried Petals Clock",
    slug: "dried-petals-clock",
    category: "wall-clocks",
    image: "/Anjali.jpg",
    price: 1699,
  },

  // First Salary Cheque
  {
    id: "ch1",
    name: "Gold Frame Cheque Block",
    slug: "gold-frame-cheque-block",
    category: "first-salary-cheque",
    image: "/ajfav.png",
    price: 1299,
  },
  {
    id: "ch2",
    name: "Minimal Resin Cheque",
    slug: "minimal-resin-cheque",
    category: "first-salary-cheque",
    image: "/Anjali.jpg",
    price: 999,
  },
  {
    id: "ch3",
    name: "Luxury Keepsake Block",
    slug: "luxury-keepsake-block",
    category: "first-salary-cheque",
    image: "/anju.jpg",
    price: null,
  },

  // Pooja Plates
  {
    id: "p1",
    name: "Floral Pooja Thali",
    slug: "floral-pooja-thali",
    category: "pooja-plates",
    image: "/Anjali.jpg",
    price: 1499,
  },
  {
    id: "p2",
    name: "Mandala Resin Plate",
    slug: "mandala-resin-plate",
    category: "pooja-plates",
    image: "/anju.jpg",
    price: 1799,
  },
  {
    id: "p3",
    name: "Rose Petal Thali",
    slug: "rose-petal-thali",
    category: "pooja-plates",
    image: "/Anjali.jpg",
    price: null,
  },
  {
    id: "p4",
    name: "Gold Leaf Offering Plate",
    slug: "gold-leaf-offering-plate",
    category: "pooja-plates",
    image: "/anju.jpg",
    price: 2099,
  },

  // Candles & Lights
  {
    id: "l1",
    name: "Botanical Pillar Candle",
    slug: "botanical-pillar-candle",
    category: "candles-lights",
    image: "/Anjali.jpg",
    price: 699,
  },
  {
    id: "l2",
    name: "Resin Tea Light Holder",
    slug: "resin-tea-light-holder",
    category: "candles-lights",
    image: "/anju.jpg",
    price: 499,
  },
  {
    id: "l3",
    name: "Dried Flower Candle",
    slug: "dried-flower-candle",
    category: "candles-lights",
    image: "/Anjali.jpg",
    price: null,
  },

  // Photo Frames
  {
    id: "f1",
    name: "Pressed Flower Frame",
    slug: "pressed-flower-frame",
    category: "photo-frames",
    image: "/anju.jpg",
    price: 1199,
  },
  {
    id: "f2",
    name: "Ocean Resin Frame",
    slug: "ocean-resin-frame",
    category: "photo-frames",
    image: "/Anjali.jpg",
    price: 1399,
  },
  {
    id: "f3",
    name: "Minimal Clear Frame",
    slug: "minimal-clear-frame",
    category: "photo-frames",
    image: "/anju.jpg",
    price: 899,
  },
  {
    id: "f4",
    name: "Heritage Double Frame",
    slug: "heritage-double-frame",
    category: "photo-frames",
    image: "/Anjali.jpg",
    price: null,
  },

  // Keychains & Tokens
  {
    id: "k1",
    name: "Initial Resin Keychain",
    slug: "initial-resin-keychain",
    category: "keychains",
    image: "/anju.jpg",
    price: 349,
  },
  {
    id: "k2",
    name: "Floral Token",
    slug: "floral-token",
    category: "keychains",
    image: "/Anjali.jpg",
    price: 299,
  },
  {
    id: "k3",
    name: "Galaxy Resin Charm",
    slug: "galaxy-resin-charm",
    category: "keychains",
    image: "/anju.jpg",
    price: 399,
  },
];
