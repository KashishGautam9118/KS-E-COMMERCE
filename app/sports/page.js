// app/sports/page.js
'use client';
import Link from 'next/link';
import '../category-style.css';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

export default function SportsPage() {
  const { addToCart } = useCart();

  const subCategories = [
    {
      id: 1,
      name: "Fitness Equipment",
      description: "Weights, treadmills and gym equipment",
      link: "/sports/fitness",
      image: "/Fitness Equipment.jpeg"
    },
    {
      id: 2,
      name: "Outdoor Sports",
      description: "Camping, hiking and adventure gear",
      link: "/sports/outdoor",
      image: "/Outdoor Sports.jpeg"
    },
    {
      id: 3,
      name: "Team Sports",
      description: "Cricket, football and basketball",
      link: "/sports/team",
      image: "/Team Sports.png"
    },
    {
      id: 4,
      name: "Athletic Clothing",
      description: "Sportswear and athletic shoes",
      link: "/sports/clothing",
      image: "/Athletic Clothing.jpeg"
    },
    {
      id: 5,
      name: "Water Sports",
      description: "Swimming and water activities",
      link: "/sports/water",
      image: "/Water Sports.jpeg"
    },
    {
      id: 6,
      name: "Cycling",
      description: "Bikes and cycling accessories",
      link: "/sports/cycling",
      image: "/Cycling.jpeg"
    }
  ];

  const sportsProducts = [
    {
      id: 201,
      name: "Nike Air Zoom Pegasus",
      description: "Running shoes with responsive cushioning",
      price: 8999,
      image: "/Nike Air Zoom Pegasus.jpeg"
    },
    {
      id: 202,
      name: "Adidas Dumbbells Set",
      description: "Adjustable weight dumbbells for home workouts",
      price: 4999,
      image: "/Adidas Dumbbells Set.jpeg"
    },
    {
      id: 203,
      name: "Yoga Mat Premium",
      description: "Non-slip yoga mat with carrying strap",
      price: 1999,
      image: "/Yoga Mat Premium.jpeg"
    },
    {
      id: 204,
      name: "Wilson Tennis Racket",
      description: "Professional tennis racket for all levels",
      price: 7999,
      image: "/Wilson Tennis Racket.jpeg"
    },
    {
      id: 205,
      name: "Camping Tent 4-Person",
      description: "Waterproof camping tent with easy setup",
      price: 12999,
      image: "/Camping Tent 4-Person.jpeg"
    },
    {
      id: 206,
      name: "Swimming Goggles",
      description: "Anti-fog swimming goggles with UV protection",
      price: 899,
      image: "/Swimming Goggles.jpeg"
    }
  ];

  return (
    <div className="category-container">
      <div className="category-header">
        <h1>Sports & Fitness</h1>
        <p>Gear up for your active lifestyle</p>
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
                  e.target.src = `https://via.placeholder.com/300x200/96CEB4/FFFFFF?text=${encodeURIComponent(category.name)}`;
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
        <h2 className="text-center mb-4">Featured Sports Products</h2>
        <div className="row g-4">
          {sportsProducts.map(product => (
            <ProductCard key={product.id} product={product} addToCart={addToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}
