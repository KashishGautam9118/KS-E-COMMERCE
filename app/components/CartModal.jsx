'use client';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function CartModal({ show, onClose, product }) {
  const { cart, getTotalItems, getTotalPrice, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (show && product) {
      const productInCart = Array.isArray(cart) ? cart.find(item => item.id === product.id) : null;
      setQuantity(productInCart ? productInCart.quantity : 1);
    }
  }, [show, product, cart]);

  if (!show || !product) return null;

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
      updateQuantity(product.id, newQuantity);
    }
  };

  const productTotal = product.price * quantity;
  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 599;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Product Added to Cart</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-8">
                <h5>Cart Items</h5>
                {!Array.isArray(cart) || cart.length === 0 ? (
                  <p>Your cart is empty.</p>
                ) : (
                  <div className="cart-items" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {cart.map((item) => (
                      <div key={item.id} className="d-flex align-items-center mb-3 border-bottom pb-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded me-3"
                          style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                        />
                        <div className="flex-grow-1">
                          <h6 className="mb-1">{item.name}</h6>
                          <p className="text-muted small mb-1">₹{item.price.toLocaleString('en-IN')}</p>
                          <div className="d-flex align-items-center">
                            <button
                              className="btn btn-outline-secondary btn-sm me-2"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <span className="fw-bold mx-2">{item.quantity}</span>
                            <button
                              className="btn btn-outline-secondary btn-sm ms-2"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <div className="text-end">
                          <p className="fw-bold mb-0">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="col-md-4">
                <div className="border-start ps-3">
                  <h6>Order Summary</h6>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Total Items:</span>
                    <span className="fw-bold">{getTotalItems()}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Subtotal:</span>
                    <span className="fw-bold">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Shipping:</span>
                    <span>₹{shipping.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="d-flex justify-content-between mb-2">
                    <span>Tax:</span>
                    <span>₹{tax.toLocaleString('en-IN')}</span>
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between">
                    <strong>Total:</strong>
                    <strong>₹{total.toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Continue Shopping
            </button>
            <Link href="/cart" className="btn btn-primary" onClick={onClose}>
              View Cart
            </Link>
            <Link href="/checkout" className="btn btn-success" onClick={onClose}>
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
