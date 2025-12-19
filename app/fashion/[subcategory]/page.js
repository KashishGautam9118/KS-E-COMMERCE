'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch, FaShoppingCart, FaUser, FaChevronDown, FaBox, FaHeart, FaGift, FaTrophy, FaCreditCard, FaRegUserCircle } from 'react-icons/fa';
import { FiUser, FiLogIn } from 'react-icons/fi';
import { HiOutlineSparkles } from 'react-icons/hi';
import { useCart } from '../../context/CartContext';

export default function Header() {
  const router = useRouter();
  const { cart, getTotalItems, getTotalPrice } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isHoveringProfile, setIsHoveringProfile] = useState(false);
  const [isHoveringDropdown, setIsHoveringDropdown] = useState(false);
  const cartRef = useRef(null);
  const profileRef = useRef(null);
  const profileButtonRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keep dropdown open when hovering over button or dropdown
  useEffect(() => {
    if (isHoveringProfile || isHoveringDropdown) {
      setIsProfileOpen(true);
    } else {
      const timer = setTimeout(() => {
        setIsProfileOpen(false);
      }, 300); // Delay to allow moving cursor between button and dropdown
      return () => clearTimeout(timer);
    }
  }, [isHoveringProfile, isHoveringDropdown]);

  const handleProfileClick = (e) => {
    const target = e.target;
    const isLoginText = target.closest('.login-text') !== null;
    const isUserIcon = target.closest('.user-icon-main') !== null;
    
    // If clicking directly on login text or user icon, navigate to login
    if (isLoginText || isUserIcon) {
      e.preventDefault();
      setIsProfileOpen(false);
      router.push('/login');
      return;
    }
    
    // Otherwise toggle dropdown
    setIsProfileOpen(!isProfileOpen);
  };

  const handleDirectLogin = () => {
    setIsProfileOpen(false);
    router.push('/login');
  };

  const profileItems = [
    { icon: <FaRegUserCircle />, label: 'My Profile', href: '/profile', color: '#667eea' },
    { icon: <HiOutlineSparkles />, label: 'KS Plus Zone', href: '/plus-zone', color: '#f59e0b' },
    { icon: <FaBox />, label: 'Orders', href: '/orders', color: '#10b981' },
    { icon: <FaHeart />, label: 'Wishlist', href: '/wishlist', color: '#ef4444' },
    { icon: <FaGift />, label: 'Rewards', href: '/rewards', color: '#8b5cf6' },
    { icon: <FaCreditCard />, label: 'Gift Cards', href: '/gift-cards', color: '#06b6d4' }
  ];

  return (
    <>
      <header className="sticky-header">
        <div className="header-container">
          {/* Logo */}
          <Link href="/" className="brand-logo">
            <div className="logo-wrapper">
              <div className="logo-icon">KS</div>
              <span className="brand-text">
                <span className="brand-primary">KS</span>
                <span className="brand-secondary">E-COMMERCE</span>
              </span>
            </div>
          </Link>

          {/* Search Bar */}
          <div className="search-container">
            <div className="search-wrapper">
              <input 
                type="text" 
                className="search-input" 
                placeholder="Search for products, brands and more..." 
              />
              <button className="search-button">
                <FaSearch />
              </button>
            </div>
          </div>

          {/* User Actions */}
          <div className="actions-container">
            {/* Profile Dropdown */}
            <div 
              className="profile-container" 
              ref={profileRef}
              onMouseEnter={() => setIsHoveringDropdown(true)}
              onMouseLeave={() => setIsHoveringDropdown(false)}
            >
              <button
                ref={profileButtonRef}
                onClick={handleProfileClick}
                onMouseEnter={() => setIsHoveringProfile(true)}
                onMouseLeave={() => setIsHoveringProfile(false)}
                className={`profile-button ${isProfileOpen ? 'active' : ''}`}
              >
                <div className="user-icon-wrapper">
                  <FaUser className="user-icon-main" />
                </div>
                <span className="login-text">Login</span>
                <FaChevronDown 
                  className={`chevron-icon ${isProfileOpen ? 'rotate' : ''}`} 
                />
              </button>

              {isProfileOpen && (
                <div className="profile-dropdown">
                  {/* Header with Welcome */}
                  <div className="dropdown-header">
                    <div className="welcome-section">
                      <div className="welcome-icon">
                        <FiUser size={20} />
                      </div>
                      <div className="welcome-text">
                        <p className="welcome-title">Welcome</p>
                        <p className="welcome-subtitle">Access account and manage orders</p>
                      </div>
                    </div>
                  </div>

                  {/* Login/Signup Section */}
                  <div className="auth-section">
                    <div className="auth-buttons">
                      <button 
                        onClick={handleDirectLogin}
                        className="login-main-button"
                      >
                        <FiLogIn className="auth-icon" />
                        Login
                      </button>
                      <Link 
                        href="/signup" 
                        className="signup-main-button"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="dropdown-divider">
                    <span className="divider-text">MY ACCOUNT</span>
                  </div>

                  {/* Menu Items */}
                  <div className="menu-section">
                    {profileItems.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        className="menu-item-hover"
                        onClick={() => setIsProfileOpen(false)}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateX(0)'}
                      >
                        <div className="menu-icon-wrapper" style={{ backgroundColor: `${item.color}15` }}>
                          <span className="menu-icon" style={{ color: item.color }}>
                            {item.icon}
                          </span>
                        </div>
                        <span className="menu-label">{item.label}</span>
                        <span className="menu-arrow">→</span>
                      </Link>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="dropdown-footer">
                    <div className="footer-content">
                      <span className="footer-text">New customer?</span>
                      <Link 
                        href="/signup" 
                        className="footer-link"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Create an account
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Cart Dropdown */}
            <div className="cart-container" ref={cartRef}>
              <button
                onClick={() => setIsCartOpen(!isCartOpen)}
                className={`cart-button ${isCartOpen ? 'active' : ''}`}
              >
                <FaShoppingCart className="cart-icon" />
                {getTotalItems() > 0 && (
                  <span className="cart-badge">{getTotalItems()}</span>
                )}
              </button>

              {isCartOpen && (
                <div className="cart-dropdown">
                  <div className="cart-header">
                    <h4>Shopping Cart</h4>
                    <span className="cart-count">{getTotalItems()} items</span>
                  </div>
                  
                  {cart.length === 0 ? (
                    <div className="empty-cart">
                      <div className="empty-icon">🛒</div>
                      <p className="empty-text">Your cart is empty</p>
                      <p className="empty-subtext">Add items to get started</p>
                      <Link 
                        href="/products" 
                        className="shop-button"
                        onClick={() => setIsCartOpen(false)}
                      >
                        Start Shopping
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="cart-items">
                        {cart.map((item) => (
                          <div key={item.id} className="cart-item-hover">
                            <div className="item-image">
                              <img
                                src={item.image || '/placeholder.jpg'}
                                alt={item.name}
                              />
                            </div>
                            <div className="item-details">
                              <h5 className="item-name">{item.name}</h5>
                              <p className="item-price">
                                ${item.price} × {item.quantity}
                              </p>
                              <div className="item-actions">
                                <button className="action-btn minus">−</button>
                                <span className="quantity">{item.quantity}</span>
                                <button className="action-btn plus">+</button>
                                <button className="action-btn remove">×</button>
                              </div>
                            </div>
                            <div className="item-total">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="cart-footer">
                        <div className="cart-summary">
                          <div className="summary-row">
                            <span>Subtotal</span>
                            <span>${getTotalPrice().toFixed(2)}</span>
                          </div>
                          <div className="summary-row">
                            <span>Shipping</span>
                            <span className="free-shipping">Free</span>
                          </div>
                          <div className="summary-divider"></div>
                          <div className="summary-row total">
                            <span>Total</span>
                            <span className="total-amount">${getTotalPrice().toFixed(2)}</span>
                          </div>
                        </div>
                        <div className="cart-actions">
                          <Link 
                            href="/cart" 
                            className="view-cart-button"
                            onClick={() => setIsCartOpen(false)}
                          >
                            View Cart
                          </Link>
                          <Link 
                            href="/checkout" 
                            className="checkout-button"
                            onClick={() => setIsCartOpen(false)}
                          >
                            Checkout
                          </Link>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <style jsx>{`
        /* Enhanced Dropdown Styles */
        .profile-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          right: 0;
          width: 360px;
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
          border: 1px solid #e8e8e8;
          overflow: hidden;
          z-index: 1001;
          animation: dropdownSlide 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.98);
        }

        @keyframes dropdownSlide {
          from {
            opacity: 0;
            transform: translateY(-20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        /* Dropdown Header */
        .dropdown-header {
          padding: 24px 24px 16px;
          background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
          border-bottom: 1px solid #f0f0f0;
        }

        .welcome-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .welcome-icon {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .welcome-text {
          flex: 1;
        }

        .welcome-title {
          font-size: 18px;
          font-weight: 700;
          color: #333;
          margin: 0 0 4px 0;
        }

        .welcome-subtitle {
          font-size: 13px;
          color: #666;
          margin: 0;
        }

        /* Auth Section */
        .auth-section {
          padding: 20px 24px;
        }

        .auth-buttons {
          display: flex;
          gap: 12px;
        }

        .login-main-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-main-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        .signup-main-button {
          flex: 1;
          padding: 14px 20px;
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
          border-radius: 12px;
          font-weight: 600;
          font-size: 15px;
          text-align: center;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .signup-main-button:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .auth-icon {
          font-size: 16px;
        }

        /* Divider */
        .dropdown-divider {
          padding: 16px 24px 8px;
          position: relative;
        }

        .divider-text {
          font-size: 11px;
          font-weight: 700;
          color: #999;
          text-transform: uppercase;
          letter-spacing: 1px;
          padding: 0 8px;
          background: white;
          position: relative;
          z-index: 1;
        }

        .dropdown-divider::before {
          content: '';
          position: absolute;
          left: 24px;
          right: 24px;
          top: 50%;
          height: 1px;
          background: linear-gradient(to right, transparent, #e8e8e8, transparent);
        }

        /* Menu Section */
        .menu-section {
          padding: 8px 20px;
        }

        .menu-item-hover {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 16px;
          text-decoration: none;
          color: #333;
          border-radius: 12px;
          transition: all 0.3s ease;
          background: white;
          margin-bottom: 4px;
          border: 1px solid transparent;
        }

        .menu-item-hover:hover {
          background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
          border-color: #e8e8e8;
          transform: translateX(8px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .menu-icon-wrapper {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
        }

        .menu-icon {
          font-size: 18px;
          transition: all 0.3s ease;
        }

        .menu-item-hover:hover .menu-icon-wrapper {
          transform: scale(1.1);
        }

        .menu-label {
          flex: 1;
          font-size: 15px;
          font-weight: 500;
          color: #333;
        }

        .menu-arrow {
          color: #999;
          font-size: 18px;
          font-weight: 300;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .menu-item-hover:hover .menu-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Dropdown Footer */
        .dropdown-footer {
          padding: 20px 24px;
          background: #fafafa;
          border-top: 1px solid #f0f0f0;
        }

        .footer-content {
          text-align: center;
        }

        .footer-text {
          font-size: 14px;
          color: #666;
          margin-right: 8px;
        }

        .footer-link {
          font-size: 14px;
          font-weight: 600;
          color: #667eea;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .footer-link:hover {
          color: #764ba2;
          text-decoration: underline;
        }

        /* Enhanced Cart Dropdown */
        .cart-item-hover {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px;
          border-bottom: 1px solid #f8f8f8;
          transition: all 0.3s ease;
          border-radius: 12px;
          margin: 4px 0;
        }

        .cart-item-hover:hover {
          background: linear-gradient(135deg, #f8f9ff 0%, #ffffff 100%);
          border-color: #e8e8e8;
          transform: translateX(4px);
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .item-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }

        .action-btn {
          width: 28px;
          height: 28px;
          border: 1px solid #e8e8e8;
          background: white;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.2s ease;
        }

        .action-btn.minus {
          color: #ef4444;
        }

        .action-btn.plus {
          color: #10b981;
        }

        .action-btn.remove {
          color: #999;
          margin-left: 12px;
        }

        .action-btn:hover {
          background: #f8f9ff;
          transform: scale(1.1);
        }

        .quantity {
          font-size: 14px;
          font-weight: 600;
          color: #333;
          min-width: 20px;
          text-align: center;
        }

        .cart-summary {
          padding: 16px;
          background: #fafafa;
          border-radius: 12px;
          margin-bottom: 16px;
        }

        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
          font-size: 14px;
          color: #666;
        }

        .summary-row.total {
          margin-bottom: 0;
          font-size: 16px;
          font-weight: 600;
          color: #333;
        }

        .summary-divider {
          height: 1px;
          background: linear-gradient(to right, transparent, #e8e8e8, transparent);
          margin: 12px 0;
        }

        .free-shipping {
          color: #10b981;
          font-weight: 600;
        }

        .cart-actions {
          display: flex;
          gap: 12px;
        }

        .view-cart-button {
          flex: 1;
          padding: 14px;
          background: white;
          color: #667eea;
          border: 2px solid #667eea;
          border-radius: 12px;
          text-align: center;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .view-cart-button:hover {
          background: #667eea;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }

        .checkout-button {
          flex: 1;
          padding: 14px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border: none;
          border-radius: 12px;
          text-align: center;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .checkout-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
        }

        .shop-button {
          display: inline-block;
          padding: 12px 24px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border-radius: 10px;
          text-decoration: none;
          font-weight: 600;
          font-size: 14px;
          margin-top: 16px;
          transition: all 0.3s ease;
        }

        .shop-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
        }

        /* Enhanced Login Button Hover */
        .login-text {
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .login-text:hover {
          color: #667eea;
        }

        .user-icon-main {
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .user-icon-main:hover {
          color: #667eea;
          transform: scale(1.1);
        }
      `}</style>
    </>
  );
}