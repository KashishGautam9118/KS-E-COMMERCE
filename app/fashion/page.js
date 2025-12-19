// app/fashion/page.js
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './style.css';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import { getProductsByCategory } from '../utils/product';

export default function FashionPage() {
  const { addToCart } = useCart();
  const [fashionProducts, setFashionProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [visibleProducts, setVisibleProducts] = useState(8); // Show only 8 products initially

  useEffect(() => {
    loadFashionProducts();
  }, [filter, sortBy]);

  const loadFashionProducts = async () => {
    setLoading(true);
    try {
      // Load limited number of products
      const staticProducts = getProductsByCategory('Fashion');
      // Limit to top 15 products maximum
      const limitedProducts = staticProducts.slice(0, 15);
      setFashionProducts(limitedProducts);
    } catch (error) {
      console.error('Error loading fashion products:', error);
      // Fallback minimal products
      setFashionProducts([
        {
          id: 1,
          name: 'Premium Cotton T-Shirt',
          price: 2073,
          image: '/products/tshirt.jpg',
          category: 'Fashion',
          subcategory: 'mens',
          rating: 4.5,
          discount: 15
        },
        {
          id: 2,
          name: 'Designer Summer Dress',
          price: 4979,
          image: '/products/dress.jpg',
          category: 'Fashion',
          subcategory: 'womens',
          rating: 4.7,
          discount: 20
        },
        {
          id: 3,
          name: 'Classic Sneakers',
          price: 7459,
          image: '/products/sneakers.jpg',
          category: 'Fashion',
          subcategory: 'footwear',
          rating: 4.8,
          discount: 10
        },
        {
          id: 4,
          name: 'Leather Handbag',
          price: 10779,
          image: '/products/handbag.jpg',
          category: 'Fashion',
          subcategory: 'accessories',
          rating: 4.6,
          discount: 25
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const subCategories = [
    {
      id: 1,
      name: "Men's Wear",
      description: "Formal, casual, and trendy clothing",
      link: "/fashion/mens",
      image: "/categories/mens-fashion.jpg",
      productCount: 12
    },
    {
      id: 2,
      name: "Women's Wear",
      description: "Elegant dresses and outfits",
      link: "/fashion/womens",
      image: "/categories/womens-fashion.jpg",
      productCount: 15
    },
    {
      id: 3,
      name: "Footwear",
      description: "Shoes for every occasion",
      link: "/fashion/footwear",
      image: "/categories/footwear.jpg",
      productCount: 8
    },
    {
      id: 4,
      name: "Accessories",
      description: "Bags, watches, and more",
      link: "/fashion/accessories",
      image: "/categories/accessories.jpg",
      productCount: 10
    }
  ];

  const filters = [
    { value: 'all', label: 'All Products' },
    { value: 'mens', label: "Men's" },
    { value: 'womens', label: "Women's" },
    { value: 'footwear', label: 'Footwear' },
    { value: 'accessories', label: 'Accessories' }
  ];

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' }
  ];

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
    setVisibleProducts(8); // Reset to 8 when filter changes
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const loadMoreProducts = () => {
    setVisibleProducts(prev => Math.min(prev + 4, filteredProducts.length));
  };

  // Filter and sort products
  const getFilteredAndSortedProducts = () => {
    let filteredProducts = [...fashionProducts];
    
    // Apply filter
    if (filter !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.subcategory && product.subcategory.toLowerCase().includes(filter)
      );
    }
    
    // Apply sort
    switch (sortBy) {
      case 'newest':
        filteredProducts.sort((a, b) => (b.id || 0) - (a.id || 0));
        break;
      case 'price-low':
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case 'featured':
      default:
        filteredProducts.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }
    
    return filteredProducts;
  };

  const filteredProducts = getFilteredAndSortedProducts();
  const displayedProducts = filteredProducts.slice(0, visibleProducts);

  return (
    <div className="fashion-container">
      {/* Hero Banner */}
      <section className="fashion-hero">
        <div className="hero-bg"></div>
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">Spring Fashion 2024</h1>
              <p className="hero-subtitle">Discover curated fashion pieces that define style</p>
              <div className="hero-cta">
                <Link href="#products" className="btn btn-primary">
                  Shop Collection
                </Link>
                <Link href="/fashion/sale" className="btn btn-outline">
                  View Sale Items
                </Link>
              </div>
            </div>
            <div className="hero-image">
              <Image
                src="/fashion/hero-fashion.jpg"
                alt="Fashion Collection"
                width={600}
                height={400}
                priority
                className="hero-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Browse Categories</h2>
            <p>Find your perfect style</p>
          </div>
          <div className="categories-grid">
            {subCategories.map((category) => (
              <Link href={category.link} key={category.id} className="category-card">
                <div className="category-image">
                  <Image
                    src={category.image}
                    alt={category.name}
                    width={280}
                    height={200}
                    className="cat-img"
                  />
                  <div className="category-overlay">
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">{category.productCount} items</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="products-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Handpicked fashion items just for you</p>
          </div>

          {/* Filters */}
          <div className="filters-row">
            <div className="filter-tabs">
              {filters.map((filterOption) => (
                <button
                  key={filterOption.value}
                  className={`filter-tab ${filter === filterOption.value ? 'active' : ''}`}
                  onClick={() => handleFilterChange(filterOption.value)}
                >
                  {filterOption.label}
                </button>
              ))}
            </div>
            <div className="sort-wrapper">
              <span className="sort-label">Sort by:</span>
              <select 
                className="sort-select" 
                value={sortBy} 
                onChange={handleSortChange}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Products */}
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading fashion items...</p>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {displayedProducts.map(product => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    addToCart={addToCart}
                    compact
                  />
                ))}
              </div>

              {/* Load More / No Products */}
              {filteredProducts.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">👕</div>
                  <h3>No products found</h3>
                  <p>Try selecting a different category</p>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => setFilter('all')}
                  >
                    Show All Products
                  </button>
                </div>
              ) : (
                visibleProducts < filteredProducts.length && (
                  <div className="load-more-section">
                    <button 
                      className="btn btn-outline"
                      onClick={loadMoreProducts}
                    >
                      Load More Products
                      <span className="btn-arrow">→</span>
                    </button>
                  </div>
                )
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="cta-banner">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text">
              <h2>Limited Time Offer</h2>
              <p>Get 20% off on your first purchase. Use code: <strong>FASHION20</strong></p>
            </div>
            <Link href="/fashion/all" className="btn btn-white">
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}