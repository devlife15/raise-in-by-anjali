export type CustomisationInputType = "pills" | "color-swatches" | "text-input";

export interface CustomisationOption {
  id: string;
  label: string;
  type: CustomisationInputType;
  required: boolean;
  choices?: { label: string; value: string; hex?: string }[];
  placeholder?: string; // for text-input type
}

export interface CategoryCustomisation {
  categorySlug: string;
  options: CustomisationOption[];
}

export const categoryCustomisations: CategoryCustomisation[] = [
  {
    categorySlug: "wall-clocks",
    options: [
      {
        id: "size",
        label: "Size",
        type: "pills",
        required: true,
        choices: [
          { label: "Small (8\")", value: "small" },
          { label: "Medium (12\")", value: "medium" },
          { label: "Large (16\")", value: "large" },
        ],
      },
      {
        id: "color-theme",
        label: "Color Theme",
        type: "color-swatches",
        required: true,
        choices: [
          { label: "Pearl White", value: "pearl-white", hex: "#F8F4EE" },
          { label: "Rose Gold", value: "rose-gold", hex: "#B76E79" },
          { label: "Ocean Blue", value: "ocean-blue", hex: "#1B4F72" },
          { label: "Midnight Black", value: "midnight-black", hex: "#1A1A2E" },
          { label: "Gold", value: "gold", hex: "#D4AF37" },
        ],
      },
      {
        id: "dial-style",
        label: "Dial Style",
        type: "pills",
        required: false,
        choices: [
          { label: "Roman Numerals", value: "roman" },
          { label: "Minimalist", value: "minimalist" },
          { label: "Floral", value: "floral" },
        ],
      },
    ],
  },
  {
    categorySlug: "marriage-garland-preservation",
    options: [
      {
        id: "size",
        label: "Frame Size",
        type: "pills",
        required: true,
        choices: [
          { label: "Small (6x8\")", value: "small" },
          { label: "Medium (10x12\")", value: "medium" },
          { label: "Large (14x16\")", value: "large" },
        ],
      },
      {
        id: "frame-style",
        label: "Frame Style",
        type: "pills",
        required: true,
        choices: [
          { label: "Shadow Box", value: "shadow-box" },
          { label: "Flat Frame", value: "flat-frame" },
          { label: "Dome", value: "dome" },
        ],
      },
      {
        id: "engraving",
        label: "Couple Names & Date",
        type: "text-input",
        required: false,
        placeholder: "e.g. Priya & Rahul • 12 Feb 2024",
      },
    ],
  },
  {
    categorySlug: "first-salary-cheque",
    options: [
      {
        id: "size",
        label: "Size",
        type: "pills",
        required: true,
        choices: [
          { label: "Standard (8x5\")", value: "standard" },
          { label: "Large (12x8\")", value: "large" },
        ],
      },
      {
        id: "frame-style",
        label: "Frame Style",
        type: "pills",
        required: true,
        choices: [
          { label: "Classic Gold", value: "classic-gold" },
          { label: "Minimal Clear", value: "minimal-clear" },
          { label: "Shadow Box", value: "shadow-box" },
        ],
      },
      {
        id: "engraving",
        label: "Name & Details",
        type: "text-input",
        required: false,
        placeholder: "e.g. Sneha Iyer • First Salary • March 2024",
      },
    ],
  },
  {
    categorySlug: "pooja-plates",
    options: [
      {
        id: "size",
        label: "Size",
        type: "pills",
        required: true,
        choices: [
          { label: "Small (8\")", value: "small" },
          { label: "Medium (10\")", value: "medium" },
          { label: "Large (12\")", value: "large" },
        ],
      },
      {
        id: "color-theme",
        label: "Color Theme",
        type: "color-swatches",
        required: true,
        choices: [
          { label: "Gold & White", value: "gold-white", hex: "#D4AF37" },
          { label: "Rose & Gold", value: "rose-gold", hex: "#B76E79" },
          { label: "Maroon & Gold", value: "maroon-gold", hex: "#6A1040" },
          { label: "Ivory", value: "ivory", hex: "#FFFFF0" },
        ],
      },
      {
        id: "motif",
        label: "Design Motif",
        type: "pills",
        required: false,
        choices: [
          { label: "Floral", value: "floral" },
          { label: "Mandala", value: "mandala" },
          { label: "Plain", value: "plain" },
        ],
      },
    ],
  },
  {
    categorySlug: "candles-lights",
    options: [
      {
        id: "size",
        label: "Size",
        type: "pills",
        required: true,
        choices: [
          { label: "Small", value: "small" },
          { label: "Medium", value: "medium" },
          { label: "Large", value: "large" },
        ],
      },
      {
        id: "scent",
        label: "Scent",
        type: "pills",
        required: false,
        choices: [
          { label: "Rose", value: "rose" },
          { label: "Jasmine", value: "jasmine" },
          { label: "Sandalwood", value: "sandalwood" },
          { label: "Unscented", value: "unscented" },
        ],
      },
      {
        id: "color-theme",
        label: "Color Theme",
        type: "color-swatches",
        required: false,
        choices: [
          { label: "Blush Pink", value: "blush-pink", hex: "#F5D5E5" },
          { label: "Ivory", value: "ivory", hex: "#FFFFF0" },
          { label: "Gold", value: "gold", hex: "#D4AF37" },
          { label: "Sage", value: "sage", hex: "#8A9A6A" },
        ],
      },
    ],
  },
  {
    categorySlug: "photo-frames",
    options: [
      {
        id: "size",
        label: "Photo Size",
        type: "pills",
        required: true,
        choices: [
          { label: "4x6\"", value: "4x6" },
          { label: "5x7\"", value: "5x7" },
          { label: "8x10\"", value: "8x10" },
        ],
      },
      {
        id: "frame-style",
        label: "Frame Style",
        type: "pills",
        required: true,
        choices: [
          { label: "Floral Resin", value: "floral-resin" },
          { label: "Ocean Wave", value: "ocean-wave" },
          { label: "Marble", value: "marble" },
          { label: "Plain Clear", value: "plain-clear" },
        ],
      },
      {
        id: "engraving",
        label: "Message or Name",
        type: "text-input",
        required: false,
        placeholder: "e.g. Forever in our hearts",
      },
    ],
  },
  {
    categorySlug: "keychains",
    options: [
      {
        id: "shape",
        label: "Shape",
        type: "pills",
        required: true,
        choices: [
          { label: "Round", value: "round" },
          { label: "Heart", value: "heart" },
          { label: "Square", value: "square" },
          { label: "Teardrop", value: "teardrop" },
        ],
      },
      {
        id: "color-theme",
        label: "Color Theme",
        type: "color-swatches",
        required: false,
        choices: [
          { label: "Rose Gold", value: "rose-gold", hex: "#B76E79" },
          { label: "Ocean Blue", value: "ocean-blue", hex: "#1B4F72" },
          { label: "Lavender", value: "lavender", hex: "#9B59B6" },
          { label: "Gold", value: "gold", hex: "#D4AF37" },
          { label: "Forest Green", value: "forest-green", hex: "#1A5C38" },
        ],
      },
      {
        id: "engraving",
        label: "Initial or Name",
        type: "text-input",
        required: false,
        placeholder: "e.g. A or Anjali",
      },
    ],
  },
];
