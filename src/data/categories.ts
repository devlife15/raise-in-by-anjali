export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string; // Transparent PNG placeholder paths
}

export const categories: Category[] = [
  {
    id: "1",
    name: "Varmala & Jaimala Preservation",
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
    name: "Salary Cheque Preservation",
    slug: "first-salary-cheque",
    image: "/anju.jpg",
  },
  {
    id: "4",
    name: "Pooja Thalis",
    slug: "pooja-thalis",
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
