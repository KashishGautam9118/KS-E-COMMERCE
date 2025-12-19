'use client';
import { useEffect, useState } from 'react';
import { getFeaturedProducts } from '../services/productService';
import ProductCard from './productcard';
import CartToast from './carttoast';
import { useCart } from '../context/CartContext';

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const { addToCart, message } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getFeaturedProducts();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <section id="featured-products" className="container mb-5">
      <CartToast message={message} />
      <div className="text-center mb-5">
        <h2
          className="fw-bold py-3 px-4 rounded shadow-lg d-inline-block snowfall"
          style={{
            background: 'linear-gradient(45deg, #4205d2ff, #210f67ff)',
            color: '#ffffffff',
            animation: 'pulse 2s infinite'
          }}
        >
          Featured products
        </h2>
      </div>
      <div className="row g-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>
    </section>
  );
}
