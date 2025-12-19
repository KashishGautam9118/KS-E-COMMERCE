'use client';
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function CartPage() {
  const { cart, getTotalItems, getTotalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity));
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <h2>Your Cart is Empty</h2>
          <p>Start shopping to add items to your cart!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-lg-8">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Shopping Cart</h2>
            <button 
              className="btn btn-outline-danger btn-sm"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
          
          {cart.map(item => (
            <div key={item.id} className="card mb-3">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="img-fluid rounded"
                      style={{ maxHeight: '80px', objectFit: 'cover' }}
                    />
                  </div>
                  <div className="col-md-4">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text text-muted">₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="col-md-3">
                    <div className="input-group">
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <input 
                        type="number" 
                        className="form-control text-center"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                        min="1"
                      />
                      <button 
                        className="btn btn-outline-secondary"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="col-md-2">
                    <h6>₹{(item.price * item.quantity).toLocaleString('en-IN')}</h6>
                  </div>
                  <div className="col-md-1">
                    <button 
                      className="btn btn-danger btn-sm"
                      onClick={() => removeFromCart(item.id)}
                    >
                      ×
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Order Summary */}
        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Order Summary</h5>
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal ({getTotalItems()} items):</span>
                <span>₹{getTotalPrice().toLocaleString('en-IN')}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping:</span>
                <span>₹0</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Tax:</span>
                <span>₹{(getTotalPrice() * 0.08).toLocaleString('en-IN')}</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <strong>Total:</strong>
                <strong>₹{(getTotalPrice() + (getTotalPrice() * 0.08)).toLocaleString('en-IN')}</strong>
              </div>
              <Link href="/checkout" className="btn btn-primary w-100">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
