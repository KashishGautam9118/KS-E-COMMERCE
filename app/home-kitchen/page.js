// app/home-kitchen/page.js
'use client';
import Link from 'next/link';
import '../category-style.css';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export default function HomeKitchenPage() {
  const { addToCart } = useCart();

  const subCategories = [
    {
      id: 1,
      name: "Furniture",
      description: "Sofas, beds, tables and home furniture",
      link: "/home-kitchen/furniture",
      image: "/Furniture.jpeg"
    },
    {
      id: 2,
      name: "Kitchen Appliances",
      description: "Mixers, cookers and kitchen tools",
      link: "/home-kitchen/appliances",
      image: "/Kitchen Appliances.jpeg"
    },
    {
      id: 3,
      name: "Home Decor",
      description: "Wall art, lighting and decorative items",
      link: "/home-kitchen/decor",
      image: "/Home Decor.jpeg"
    },
    {
      id: 4,
      name: "Bed & Bath",
      description: "Bedding, towels and bathroom accessories",
      link: "/home-kitchen/bed-bath",
      image: "/Bed & Bath.jpeg"
    },
    {
      id: 5,
      name: "Gardening",
      description: "Plants, tools and outdoor furniture",
      link: "/home-kitchen/gardening",
      image: "Gardening.jpeg"
    },
    {
      id: 6,
      name: "Storage",
      description: "Organizers and storage solutions",
      link: "/home-kitchen/storage",
      image: "/Storage.jpeg"
    }
  ];

  const homeKitchenProducts = [
    {
      id: 601,
      name: "Ikea KIVIK Sofa",
      description: "Comfortable 3-seater sofa with removable covers",
      price: 29999,
      image: "https://picsum.photos/300/200?random=601"
    },
    {
      id: 602,
      name: "KitchenAid Stand Mixer",
      description: "Professional 5-quart tilt-head stand mixer",
      price: 49999,
      image: "https://picsum.photos/300/200?random=602"
    },
    {
      id: 603,
      name: "Philips Air Fryer",
      description: "Healthy cooking with rapid air technology",
      price: 8999,
      image: "https://picsum.photos/300/200?random=603"
    },
    {
      id: 604,
      name: "Egyptian Cotton Bed Sheets",
      description: "Luxury 400 thread count bed sheets set",
      price: 3999,
      image: "https://picsum.photos/300/200?random=604"
    },
    {
      id: 605,
      name: "Indoor Plant Collection",
      description: "Set of 3 low-maintenance indoor plants",
      price: 1999,
      image: "https://picsum.photos/300/200?random=605"
    },
    {
      id: 606,
      name: "Storage Ottoman",
      description: "Multi-functional storage with seating",
      price: 7999,
      image: "https://picsum.photos/300/200?random=606"
    }
  ];

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Home & Kitchen</h1>
        <p>Everything to make your house a home</p>
      </div>

      <div className="subcategories-grid">
        {subCategories.map((category) => (
          <Link href={category.link} key={category.id} className="subcategory-card">
            <div className="category-image">
              <img
                src={category.image}
                alt={category.name}
                className="category-img"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=${encodeURIComponent(category.name)}`;
                }}
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
        <h2 className="text-center mb-4">Featured Home & Kitchen Products</h2>
        <div className="row g-4">
          {homeKitchenProducts.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}
