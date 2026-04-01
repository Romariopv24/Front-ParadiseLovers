import { HeroSection } from "./home/HeroSection";
import { ProductosSection } from "./home/ProductosSection";
import { CartFooter } from "./components/CartFooter";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductosSection />
      <CartFooter />
      <Footer />
    </>
  );
}
