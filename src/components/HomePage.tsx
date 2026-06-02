import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import PreservationPitch from "@/components/PreservationPitch";
import FeaturedProducts from "@/components/FeaturedProducts";
import CustomerFavorites from "@/components/CustomerFavorites";
import ShopByOccasion from "@/components/ShopByOccasion";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";
import ShopByCategories from "./ShopByCategories";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full" style={{ backgroundColor: "#FAF7F2" }}>
      <Navbar />
      <HeroSection />
      <PreservationPitch />
      <FeaturedProducts />
      <ShopByCategories />
      <CustomerFavorites />
      <ShopByOccasion />
      <Testimonials />
      <Footer />
    </div>
  );
}
