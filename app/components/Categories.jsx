// app/components/Categories.jsx
'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './categories.css'; // Or your CSS file

export default function Categories() {
  const router = useRouter();
  
  const categories = [
    {
      id: 1,
      name: "Fashion",
      description: "Clothing, Footwear & Accessories",
      image: "/Fashion.jpeg",
      link: "/fashion",
      color: "#FF6B6B"
    },
    {
      id: 2,
      name: "Electronics",
      description: "Phones, Laptops & Gadgets",
      image: "/Electronics.jpeg",
      link: "/electronics",
      color: "#4ECDC4"
    },
    {
      id: 3,
      name: "Home & Kitchen",
      description: "Furniture, Appliances & More",
      image: "/Home & Kitchen.jpeg",
      link: "/home-kitchen",
      color: "#45B7D1"
    },
    {
      id: 4,
      name: "Beauty",
      description: "Cosmetics & Personal Care",
      image: "/Skincare.jpeg",
      link: "/beauty",
      color: "#FFA5A5"
    },
    {
      id: 5,
      name: "Sports",
      description: "Fitness Equipment & Gear",
      image: "/Sports.jpeg",
      link: "/sports",
      color: "#96CEB4"
    },
    {
      id: 6,
      name: "Books",
      description: "All Genres & Categories",
      image: "/Books.jpeg",
      link: "/books",
      color: "#FFEAA7"
    }
  ];

  const handleCategoryClick = (categoryLink) => {
    router.push(categoryLink);
  };

  return (
    <section id="shop-by-category" className="categories-section">
      <div className="categories-header">
        <h2>Shop by Category</h2>
        <p>Explore our wide range of products</p>
      </div>
      
      <div className="categories-grid">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="category-card"
            onClick={() => handleCategoryClick(category.link)}
            style={{ '--category-color': category.color }}
          >
            <div className="category-image">
              {/* Use actual images if available, otherwise colored placeholders */}
              {category.image.startsWith('/') ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-img"
                  style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}
                />
              ) : (
                <div
                  className="image-placeholder"
                  style={{
                    backgroundColor: category.color,
                    width: '100%',
                    height: '200px',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    fontWeight: 'bold',
                    color: 'white',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}
                >
                  {category.name.charAt(0)}
                </div>
              )}
            </div>
            
            <div className="category-content">
              <h3 className="category-name">{category.name}</h3>
              <p className="category-description">{category.description}</p>
              <div className="category-footer">
                <span className="shop-now-text">Shop Now</span>
                <span className="arrow">→</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
