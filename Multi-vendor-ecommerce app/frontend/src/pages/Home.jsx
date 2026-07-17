import CustomerLayout from "../layouts/customer/CustomerLayout";

import OfferBar from "../components/customer/OfferBar";
import HeroSection from "../components/customer/HeroSection";
import StatsSection from "../components/customer/StatsSection";
import BrandSection from "../components/customer/BrandSection";
import FeaturedProducts from "../components/customer/product/FeaturedProducts";

export default function Home() {
  return (
    <CustomerLayout>

      <OfferBar />

      <HeroSection />

      <StatsSection />

      <FeaturedProducts />

      <BrandSection />

    </CustomerLayout>
  );
}