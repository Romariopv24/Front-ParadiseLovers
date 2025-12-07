import { HeroSection } from "./home/HeroSection";
import { ProductosSection } from "./home/ProductosSection";
import { CartFooter } from "./components/CartFooter";

export default function Home() {
  return (
    <>
      <HeroSection />
      <ProductosSection />
      {/* <ProductosSection />

      <ProductosSection />

      <ProductosSection />

      <ProductosSection /> */}
    <CartFooter />
    </>
  );
}
