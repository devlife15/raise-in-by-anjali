export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string; // Transparent PNG placeholder paths
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Marriage Garland Preservation",
    slug: "marriage-garland-preservation",
    image: "/AJ.png",
  },
  {
    id: "2",
    name: "Wall Clocks",
    slug: "wall-clocks",
    image: "/Anjali.jpg",
  },
  {
    id: "3",
    name: "First Salary Cheque",
    slug: "first-salary-cheque",
    image: "/anju.jpg",
  },
  {
    id: "4",
    name: "Pooja Plates",
    slug: "pooja-plates",
    image: "/Anjali.jpg",
  },
  {
    id: "5",
    name: "Candles & Lights",
    slug: "candles-lights",
    image: "/ag.png",
  },
  {
    id: "6",
    name: "Photo Frames",
    slug: "photo-frames",
    image: "/AJ.png",
  },
  {
    id: "7",
    name: "Keychains & Tokens",
    slug: "keychains",
    image: "/anju.jpg",
  },
];
