'use client';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FaTrash, FaPlus, FaMinus, FaCreditCard, FaTruck, FaShieldAlt } from 'react-icons/fa';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const subtotal = getTotalPrice();
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the order to your backend
    alert('Order placed successfully! (This is a demo)');
    clearCart();
  };

  if (cart.length === 0) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <h2 className="mb-4">Your cart is empty</h2>
          <Link href="/" className="btn btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <h1 className="mb-4">Checkout</h1>

      <div className="row">
        {/* Cart Items */}
        <div className="col-lg-8 mb-4">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              {cart.map(item => (
                <div key={item.id} className="d-flex align-items-center border-bottom py-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="rounded me-3"
                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{item.name}</h6>
                    <p className="text-muted small mb-1">{item.description}</p>
                    <p className="text-primary fw-bold mb-0">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <FaMinus />
                    </button>
                    <span className="mx-2 fw-bold">{item.quantity}</span>
                    <button
                      className="btn btn-sm btn-outline-secondary me-3"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <FaPlus />
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="col-lg-4">
          <div className="card shadow mb-4">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">Order Total: ₹{total.toLocaleString('en-IN')}</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>₹{shipping.toLocaleString('en-IN')}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tax:</span>
                <span>₹{tax.toLocaleString('en-IN')}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>₹{total.toLocaleString('en-IN')}</strong>
              </div>
              <form onSubmit={handleSubmit}>
                <h6 className="mb-3">Shipping Information</h6>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Full Name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    placeholder="Email"
                    value={customerInfo.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    name="address"
                    placeholder="Address"
                    rows="3"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      placeholder="City"
                      value={customerInfo.city}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="zipCode"
                      placeholder="ZIP Code"
                      value={customerInfo.zipCode}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <h6 className="mb-3 mt-4">Payment Information</h6>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={customerInfo.cardNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="expiryDate"
                      placeholder="MM/YY"
                      value={customerInfo.expiryDate}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      name="cvv"
                      placeholder="CVV"
                      value={customerInfo.cvv}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  <FaCreditCard className="me-2" />
                  Place Order
                </button>
              </form>
            </div>
          </div>

          {/* Features */}
          <div className="row">
            <div className="col-4 text-center">
              <FaTruck className="text-primary mb-2" size={24} />
              <small className="text-muted">Free Shipping</small>
            </div>
            <div className="col-4 text-center">
              <FaShieldAlt className="text-primary mb-2" size={24} />
              <small className="text-muted">Secure Payment</small>
            </div>
            <div className="col-4 text-center">
              <FaCreditCard className="text-primary mb-2" size={24} />
              <small className="text-muted">Easy Returns</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
