'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './ProductCard.module.css';
import CartModal from './cartmodal';
export default function ProductCard({ product, addToCart }) {
  const [showModal, setShowModal] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigation when clicking add to cart
    addToCart(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="col-md-3">
        <div className={`${styles.card} card border-0 shadow-lg overflow-hidden`} style={{width: '227px'}}>
          <Link href={`/product/${product.id}`} className="text-decoration-none">
            <div className={`${styles.imageContainer} card-img-top position-relative d-flex align-items-center justify-content-center`} style={{width: '227px', height: '227px'}}>
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/300x200/FF6B6B/FFFFFF?text=${encodeURIComponent(product.name)}`;
                }}
              />
              <div className={styles.imageOverlay}></div>
            </div>
          </Link>

          <div className="card-body d-flex flex-column p-2 text-center">
            <Link href={`/product/${product.id}`} className="text-decoration-none">
              <h6 className="card-title fw-bold mb-1 text-dark text-truncate" style={{fontSize: '0.9rem'}}>
                {product.name}
              </h6>
            </Link>

            <div className="mt-auto">
              <div className="d-flex justify-content-center align-items-center mb-2">
                <span className="fw-bold text-primary me-2" style={{fontSize: '0.85rem'}}>₹{product.price.toLocaleString('en-IN')}</span>
                {product.originalPrice && (
                  <span className="text-muted text-decoration-line-through" style={{fontSize: '0.75rem'}}>₹{product.originalPrice.toLocaleString('en-IN')}</span>
                )}
              </div>
              <div className="d-flex justify-content-center gap-2">
                <Link href={`/product/${product.id}`} className="btn btn-outline-primary btn-sm">View</Link>
                <button
                  className={`btn btn-sm btn-outline-primary ${styles.addToCartBtn}`}
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CartModal show={showModal} onClose={handleCloseModal} product={product} />
    </>
  );
}
