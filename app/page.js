'use client';
import Header from './components/header';
import HeroSection from './components/herosection';
import FeaturedProducts from './components/featuredproducts';
import Categories from './components/categories';
import Footer from './components/footer';

export default function HomePage() {
  return (
    <div
      className="d-flex flex-column min-vh-100"
    >
      <Header />
      <main className="flex-grow-5 pb-5" style={{ paddingTop: '80px' }}>
        <HeroSection />
        <FeaturedProducts />
        <Categories />
      </main>
      <Footer />
    </div>
  );
}
