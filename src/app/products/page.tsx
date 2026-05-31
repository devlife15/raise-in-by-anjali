import { Suspense } from "react";
import ProductsPage from "@/components/ProductsPage";

export const metadata = {
  title: "Our Products | AuraResin Studio",
  description:
    "Browse handmade resin products including wall clocks, keychains, preservation pieces, pooja plates, candles, frames and more.",
};

export default function Page() {
  return (
    <Suspense>
      <ProductsPage />
    </Suspense>
  );
}
