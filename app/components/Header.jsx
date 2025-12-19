// app/components/Header.jsx
'use client';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaShoppingBag, FaSearch, FaShoppingCart, FaUser, FaChevronDown } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Header() {
  const router = useRouter();
  const { cart, getTotalItems, getTotalPrice } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const searchRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close cart dropdown
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      // Close profile dropdown
      if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
        setIsProfileDropdownOpen(false);
      }
      // Close search results
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setTimeout(() => setShowResults(false), 200);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery.trim().length > 2) {
        performSearch();
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const performSearch = async () => {
    try {
      const response = await axios.get(`/api/products/search?q=${searchQuery}`);
      if (response.data.success) {
        setSearchResults(response.data.products);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to dummy results for testing
      setSearchResults([
        { _id: '1', name: 'Test Product 1', price: 1999, images: [{ url: '/placeholder.jpg' }] },
        { _id: '2', name: 'Test Product 2', price: 2999, images: [{ url: '/placeholder.jpg' }] },
      ]);
      setShowResults(true);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setShowResults(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="py-3 shadow position-fixed top-0 w-100 bg-white border-bottom" style={{ zIndex: 1030 }}>
      <div className="container d-flex align-items-center justify-content-between">

        {/* Brand */}
        <Link href="/" className="text-decoration-none fw-bold fs-3 text-dark d-flex align-items-center">
          <img src="/logo.png" alt="KS E-COMMERCE Logo" className="me-2" style={{ height: '40px', width: 'auto' }} />
          KS E-COMMERCE
        </Link>

        {/* Search - Updated with real-time search */}
        <div className="flex-grow-1 mx-4" style={{ maxWidth: '500px' }} ref={searchRef}>
          <div className="input-group position-relative">
            <input 
              type="text" 
              className="form-control border-end-0" 
              placeholder="Search products, brands and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchResults.length > 0 && setShowResults(true)}
            />
            <button className="btn btn-primary" onClick={handleSearchSubmit}>
              <FaSearch />
            </button>

            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="position-absolute top-100 start-0 end-0 mt-1 bg-white border rounded shadow-lg" style={{ zIndex: 1050 }}>
                {searchResults.slice(0, 5).map((product) => (
                  <div
                    key={product._id}
                    className="d-flex align-items-center p-2 border-bottom hover-bg-light cursor-pointer"
                    style={{ minHeight: '60px' }}
                    onClick={() => {
                      router.push(`/product/${product._id}`);
                      setShowResults(false);
                      setSearchQuery('');
                    }}
                  >
                    <img
                      src={product.images?.[0]?.url || '/placeholder.jpg'}
                      alt={product.name}
                      className="rounded me-2"
                      style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                    />
                    <div className="flex-grow-1">
                      <small className="fw-semibold d-block">{product.name}</small>
                      <small className="text-muted">₹{product.price}</small>
                    </div>
                  </div>
                ))}
                {searchResults.length > 5 && (
                  <div className="text-center p-2 border-top">
                    <small 
                      className="text-primary cursor-pointer"
                      onClick={() => {
                        router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
                        setShowResults(false);
                      }}
                    >
                      View all {searchResults.length} results
                    </small>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Profile + Cart */}
        <div className="d-flex align-items-center gap-3">
          {/* Profile Dropdown */}
          <div className="position-relative" ref={profileDropdownRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsProfileDropdownOpen(!isProfileDropdownOpen);
              }}
              className="btn p-2 rounded d-flex align-items-center gap-1 bg-light border profile-button"
            >
              <FaUser className="text-dark" />
              <span className="d-none d-md-inline fw-semibold text-dark">
                {isAuthenticated ? 'Profile' : 'Login'}
              </span>
              <FaChevronDown className="text-secondary" size={12} />
            </button>

            {isProfileDropdownOpen && (
              <div className="position-absolute top-100 end-0 mt-2 bg-white border rounded shadow-lg p-3" style={{ width: '250px', zIndex: 1050 }}>
                {isAuthenticated ? (
                  <>
                    <div className="mb-3">
                      <h6 className="fw-bold mb-2">Welcome, {user?.name || 'User'}!</h6>
                      <small className="text-muted">{user?.email}</small>
                    </div>

                    <hr className="my-2" />

                    <div>
                      <ul className="list-unstyled mb-0">
                        <li className="mb-1">
                          <Link
                            href="/profile"
                            className="text-decoration-none text-dark"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            My Profile
                          </Link>
                        </li>
                        <li className="mb-1">
                          <Link
                            href="/orders"
                            className="text-decoration-none text-dark"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            Orders
                          </Link>
                        </li>
                        <li className="mb-1">
                          <Link
                            href="/wishlist"
                            className="text-decoration-none text-dark"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            Wishlist
                          </Link>
                        </li>
                        <li className="mb-1">
                          <Link
                            href="/plus-zone"
                            className="text-decoration-none text-dark"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            KS Plus Zone
                          </Link>
                        </li>
                        <li className="mb-1">
                          <Link
                            href="/rewards"
                            className="text-decoration-none text-dark"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            Rewards
                          </Link>
                        </li>
                        <li className="mb-1">
                          <Link
                            href="/gift-cards"
                            className="text-decoration-none text-dark"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            Gift Cards
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <hr className="my-2" />

                    <div className="text-center">
                      <button
                        className="btn btn-outline-danger btn-sm w-100"
                        onClick={() => {
                          logout();
                          setIsProfileDropdownOpen(false);
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-3">
                      <h6 className="fw-bold mb-2">New customer?</h6>
                      <Link
                        href="/signup"
                        className="text-decoration-none text-primary fw-semibold"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Sign Up
                      </Link>
                    </div>

                    <hr className="my-2" />

                    <div>
                      <h6 className="fw-bold mb-2">Existing customers</h6>
                      <ul className="list-unstyled mb-0">
                        <li className="mb-1">
                          <Link
                            href="/profile"
                            className="text-decoration-none text-dark"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            My Profile
                          </Link>
                        </li>
                        <li className="mb-1">
                          <Link
                            href="/plus-zone"
                            className="text-decoration-none text-dark"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            KS Plus Zone
                          </Link>
                        </li>
                        <li className="mb-1">
                          <Link
                            href="/orders"
                            className="text-decoration-none text-dark"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            Orders
                          </Link>
                        </li>
                        <li className="mb-1">
                          <Link
                            href="/wishlist"
                            className="text-decoration-none text-dark"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            Wishlist
                          </Link>
                        </li>
                        <li className="mb-1">
                          <Link
                            href="/rewards"
                            className="text-decoration-none text-dark"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            Rewards
                          </Link>
                        </li>
                        <li className="mb-1">
                          <Link
                            href="/gift-cards"
                            className="text-decoration-none text-dark"
                            onClick={() => setIsProfileDropdownOpen(false)}
                          >
                            Gift Cards
                          </Link>
                        </li>
                      </ul>
                    </div>

                    <hr className="my-2" />

                    <div className="text-center">
                      <Link
                        href="/login"
                        className="btn btn-outline-primary btn-sm w-100"
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        Login
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Cart Dropdown */}
          <div className="position-relative" ref={dropdownRef}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDropdownOpen(!isDropdownOpen);
              }}
              className="btn p-2 rounded-circle bg-light border position-relative cart-button"
            >
              <FaShoppingCart className="text-dark" />
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {getTotalItems()}
                <span className="visually-hidden">items in cart</span>
              </span>
            </button>

            {isDropdownOpen && (
              <div className="position-absolute top-100 end-0 mt-2 bg-white border rounded shadow-lg p-3" style={{ width: '300px', zIndex: 1050 }}>
                <h6 className="fw-bold mb-3">Your Cart</h6>
                {cart.length === 0 ? (
                  <p className="text-muted mb-0">Your cart is empty</p>
                ) : (
                  <>
                    <div className="max-h-200 overflow-auto mb-3">
                      {cart.map((item) => (
                        <div key={item.id} className="d-flex align-items-center mb-2">
                          <img
                            src={item.image || '/placeholder.jpg'}
                            alt={item.name}
                            className="rounded me-2"
                            style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                          />
                          <div className="flex-grow-1">
                            <small className="fw-semibold">{item.name}</small>
                            <br />
                            <small className="text-muted">
                              ₹{item.price.toLocaleString('en-IN')} x {item.quantity}
                            </small>
                          </div>
                          <small className="fw-bold">₹{(item.price * item.quantity).toLocaleString('en-IN')}</small>
                        </div>
                      ))}
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <strong>Total:</strong>
                      <strong>₹{getTotalPrice().toFixed(2)}</strong>
                    </div>
                    <Link href="/cart" className="btn btn-primary w-100" onClick={() => setIsDropdownOpen(false)}>
                      View Cart
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}
