// app/beauty/page.js
'use client';
import Link from 'next/link';
import '../category-style.css';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export default function BeautyPage() {
  const { addToCart } = useCart();

  const subCategories = [
    {
      id: 1,
      name: "Skincare",
      description: "Face creams, serums and treatments",
      link: "/beauty/skincare",
      image: "/Skincare.jpeg"
    },
    {
      id: 2,
      name: "Makeup",
      description: "Cosmetics and beauty products",
      link: "/beauty/makeup",
      image: "/Makeup.jpeg"
    },
    {
      id: 3,
      name: "Hair Care",
      description: "Shampoos, conditioners and styling",
      link: "/beauty/haircare",
      image: "/Hair Care.jpeg"
    },
    {
      id: 4,
      name: "Fragrances",
      description: "Perfumes and body mists",
      link: "/beauty/fragrances",
      image: "/Fragrances.png"
    },
    {
      id: 5,
      name: "Bath & Body",
      description: "Soaps, lotions and bath products",
      link: "/beauty/bath-body",
      image: "/Bath & Body.jpeg"
    },
    {
      id: 6,
      name: "Men's Grooming",
      description: "Shaving and grooming products",
      link: "/beauty/mens-grooming",
      image: "/Men's Grooming.jpg"
    }
  ];

  const beautyProducts = [
    {
      id: 101,
      name: "Cetaphil Gentle Skin Cleanser",
      description: "Gentle daily facial cleanser for all skin types",
      price: 899,
      image: "https://picsum.photos/300/200?random=101"
    },
    {
      id: 102,
      name: "Maybelline Lash Sensational Mascara",
      description: "Volumizing mascara for dramatic lashes",
      price: 499,
      image: "https://picsum.photos/300/200?random=102"
    },
    {
      id: 103,
      name: "Dove Shampoo Intense Repair",
      description: "Deep conditioning shampoo for damaged hair",
      price: 349,
      image: "https://picsum.photos/300/200?random=103"
    },
    {
      id: 104,
      name: "Chanel No. 5 Perfume",
      description: "Iconic floral fragrance for women",
      price: 8500,
      image: "https://picsum.photos/300/200?random=104"
    },
    {
      id: 105,
      name: "The Body Shop Body Butter",
      description: "Rich moisturizing body lotion",
      price: 1299,
      image: "https://picsum.photos/300/200?random=105"
    },
    {
      id: 106,
      name: "Gillette Mach3 Razor",
      description: "Precision razor for smooth shaving",
      price: 299,
      image: "https://picsum.photos/300/200?random=106"
    }
  ];

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Beauty & Personal Care</h1>
        <p>Enhance your natural beauty</p>
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
                  e.target.src = `https://via.placeholder.com/300x200/FFA5A5/FFFFFF?text=${encodeURIComponent(category.name)}`;
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
        <h2 className="text-center mb-4">Featured Beauty Products</h2>
        <div className="row g-4">
          {beautyProducts.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}
