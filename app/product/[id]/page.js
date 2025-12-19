'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { getProductById } from '../../utils/product';
import { useCart } from '../../context/CartContext';
import { FaArrowLeft, FaShoppingCart, FaCreditCard } from 'react-icons/fa';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;
  const product = getProductById(productId);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleBuyNow = () => {
    addToCart(product);
    router.push('/checkout');
  };

  if (!product) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2>Product not found</h2>
          <Link href="/" className="btn btn-primary">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <nav aria-label="breadcrumb" className="mb-4">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link href="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link href={`/${product.category.toLowerCase()}`}>{product.category}</Link>
          </li>
          {product.subcategory && (
            <li className="breadcrumb-item">
              <Link href={`/${product.category.toLowerCase()}/${product.subcategory}`}>{product.subcategory}</Link>
            </li>
          )}
          <li className="breadcrumb-item active" aria-current="page">
            {product.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card border-0 shadow">
            <div className="card-body p-0">
              <img
                src={product.image}
                alt={product.name}
                className="img-fluid rounded"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="card border-0 shadow">
            <div className="card-body">
              <h1 className="display-5 fw-bold mb-3">{product.name}</h1>
              <p className="text-muted mb-4">{product.description}</p>

              <div className="mb-4">
                <h2 className="text-primary fw-bold mb-3">₹{product.price.toLocaleString('en-IN')}</h2>
                <span className="badge bg-success fs-6 px-3 py-2">In Stock</span>
              </div>

              <div className="mb-4">
                <h5 className="mb-3">Product Details</h5>
                <p className="text-muted">{product.details}</p>
              </div>

              <div className="d-grid gap-3">
                <button
                  className="btn btn-primary btn-lg py-3"
                  onClick={handleAddToCart}
                >
                  <FaShoppingCart className="me-2" />
                  Add to Cart
                </button>

                <button
                  className="btn btn-success btn-lg py-3"
                  onClick={handleBuyNow}
                >
                  <FaCreditCard className="me-2" />
                  Buy Now
                </button>
              </div>

              <div className="mt-4 pt-4 border-top">
                <Link href={`/${product.category.toLowerCase()}`} className="btn btn-outline-secondary">
                  <FaArrowLeft className="me-2" />
                  Back to {product.category}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
