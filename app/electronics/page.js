// app/electronics/page.js
'use client';
import Link from 'next/link';
import '../category-style.css';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export default function ElectronicsPage() {
  const { addToCart } = useCart();

  const subCategories = [
    {
      id: 1,
      name: "Smartphones",
      description: "Latest smartphones and accessories",
      link: "/electronics/smartphones",
      image: "/Smartphones.jpeg"
    },
    {
      id: 2,
      name: "Laptops & Computers",
      description: "Laptops, desktops and computer accessories",
      link: "/electronics/laptops",
      image: "/Laptops & Computers.jpeg"
    },
    {
      id: 3,
      name: "TV & Audio",
      description: "Televisions, speakers and audio systems",
      link: "/electronics/tv-audio",
      image: "/TV & Audio.jpeg"
    },
    {
      id: 4,
      name: "Cameras",
      description: "DSLR, mirrorless and action cameras",
      link: "/electronics/cameras",
      image: "/Cameras.jpeg"
    },
    {
      id: 5,
      name: "Wearables",
      description: "Smartwatches and fitness trackers",
      link: "/electronics/wearables",
      image: "/Wearables.png"
    },
    {
      id: 6,
      name: "Gaming",
      description: "Gaming consoles and accessories",
      link: "/electronics/gaming",
      image: "/Electronics.jpeg"
    }
  ];

  const electronicsProducts = [
    {
      id: 501,
      name: "iPhone 15 Pro Max",
      description: "Latest iPhone with advanced camera system",
      price: 149999,
      image: "https://picsum.photos/300/200?random=501"
    },
    {
      id: 502,
      name: "MacBook Pro 16-inch",
      description: "Powerful laptop for professionals",
      price: 249999,
      image: "https://picsum.photos/300/200?random=502"
    },
    {
      id: 503,
      name: "Samsung 55-inch OLED TV",
      description: "4K OLED television with smart features",
      price: 89999,
      image: "https://picsum.photos/300/200?random=503"
    },
    {
      id: 504,
      name: "Sony Alpha A7R IV",
      description: "Professional mirrorless camera",
      price: 349999,
      image: "https://picsum.photos/300/200?random=504"
    },
    {
      id: 505,
      name: "Apple Watch Series 9",
      description: "Advanced smartwatch with health features",
      price: 49999,
      image: "https://picsum.photos/300/200?random=505"
    },
    {
      id: 506,
      name: "PlayStation 5 Console",
      description: "Next-gen gaming console",
      price: 59999,
      image: "https://picsum.photos/300/200?random=506"
    }
  ];

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Electronics</h1>
        <p>Discover the latest gadgets and technology</p>
      </div>

      <div className="subcategories-grid">
        {subCategories.map((category) => (
          <Link href={category.link} key={category.id} className="subcategory-card">
            <div className="category-image">
              <img
                src={category.image}
                alt={category.name}
                className="category-img"
              />
            </div>
            <div className="category-info">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <span className="shop-now">Shop Now →</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="container mt-5">
        <h2 className="text-center mb-4">Featured Electronics</h2>
        <div className="row g-4">
          {electronicsProducts.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}
