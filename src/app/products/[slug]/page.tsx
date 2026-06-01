import { products } from "@/data/products";
import ProductDetail from "@/components/ProductDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return {
    title: product ? `${product.name} | Raise-in by Anjali` : "Product",
    description: product
      ? `Handcrafted resin ${product.name}. Made to order by Anjali.`
      : "",
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <ProductDetail slug={slug} />;
}
