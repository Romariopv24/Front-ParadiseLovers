import { HeroSection } from "./home/HeroSection";
import { ProductosSection } from "./home/ProductosSection";
import { CartFooter } from "./components/CartFooter";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <ProductosSection />
      <CartFooter />
      <Footer />
    </>
  );
}
