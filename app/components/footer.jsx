'use client';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { 
  FaFacebook, FaInstagram, FaTwitter, FaLinkedin, 
  FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex,
  FaTruck, FaShieldAlt, FaHeadset, FaHeart,
  FaStar, FaSnowflake
} from 'react-icons/fa';

// Snowflake component for Christmas effect
const Snowflake = () => {
  const snowflakeRef = useRef(null);

  useEffect(() => {
    if (!snowflakeRef.current) return;

    const snowflake = snowflakeRef.current;
    const duration = Math.random() * 5 + 5;
    const delay = Math.random() * 5;
    const size = Math.random() * 4 + 2;
    const startX = Math.random() * 100;
    
    snowflake.style.left = `${startX}vw`;
    snowflake.style.width = `${size}px`;
    snowflake.style.height = `${size}px`;
    snowflake.style.animationDuration = `${duration}s`;
    snowflake.style.animationDelay = `${delay}s`;
    snowflake.style.opacity = `${Math.random() * 0.3 + 0.1}`;

  }, []);

  return (
    <div 
      ref={snowflakeRef}
      className="snowflake"
      style={{
        position: 'absolute',
        top: '-10px',
        background: 'white',
        borderRadius: '50%',
        pointerEvents: 'none',
        animation: 'fall linear infinite',
      }}
    />
  );
};

// AnimatedVerticalLine component
const AnimatedVerticalLine = () => {
  return (
    <div className="position-relative h-100 ms-4" style={{ width: '1px' }}>
      <div 
        className="position-absolute top-0 start-0 w-100"
        style={{
          height: '0%',
          background: 'linear-gradient(to bottom, transparent, #3498db, transparent)',
          animation: 'drawLine 1.5s ease-out forwards',
        }}
      />
      <div 
        className="position-absolute top-0 start-0 w-100"
        style={{
          height: '100%',
          background: 'linear-gradient(to bottom, #3498db, transparent)',
          opacity: 0.3,
        }}
      />
    </div>
  );
};

// Generate multiple snowflakes
const generateSnowflakes = (count) => {
  const snowflakes = [];
  for (let i = 0; i < count; i++) {
    snowflakes.push(<Snowflake key={i} />);
  }
  return snowflakes;
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const isChristmasSeason = new Date().getMonth() === 11; // December

  return (
    <>
      <style jsx>{`
        @keyframes drawLine {
          0% {
            height: 0%;
          }
          100% {
            height: 100%;
          }
        }

        @keyframes fall {
          0% {
            transform: translateY(-10px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }

        .animated-line-container {
          position: relative;
          min-height: 100px;
        }

        .snow-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
        }

        .christmas-decoration {
          animation: twinkle 2s ease-in-out infinite;
        }

        .header-with-line {
          position: relative;
          padding-bottom: 10px;
          margin-bottom: 15px;
        }

        .header-with-line::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #3498db, transparent);
        }
      `}</style>

      <footer className="position-relative overflow-hidden" style={{ 
        backgroundColor: '#0a1929', 
        borderTop: '2px solid #1e3a5f',
        color: '#cbd5e1'
      }}>
        {/* Christmas Snowfall Effect */}
        {isChristmasSeason && (
          <div className="snow-container">
            {generateSnowflakes(30)}
          </div>
        )}

        <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
          {/* Main Footer Content */}
          <div className="row">
            {/* Company Info */}
            <div className="col-lg-3 col-md-6 mb-4 d-flex">
              <div className="flex-grow-1">
                <div className="header-with-line">
                  <h5 className="mb-3 d-flex align-items-center gap-2" style={{ color: '#ffffff', fontWeight: '600' }}>
                    KS E-COMMERCE
                    {isChristmasSeason && (
                      <FaStar className="christmas-decoration" style={{ color: '#FFD700', fontSize: '0.8em' }} />
                    )}
                  </h5>
                </div>
                <p className="small" style={{ color: '#94a3b8' }}>
                  Your trusted online shopping destination. Quality products, secure payments, and exceptional customer service.
                </p>
                <div className="mt-3">
                  <a href="mailto:support@ksecommerce.com" className="text-decoration-none d-flex align-items-center mb-2" style={{ color: '#94a3b8' }}>
                    <FaEnvelope className="me-2" style={{ color: '#3498db' }} />
                    <span>support@ksecommerce.com</span>
                  </a>
                  <div className="d-flex align-items-center mb-2" style={{ color: '#94a3b8' }}>
                    <FaPhone className="me-2" style={{ color: '#3498db' }} />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="d-flex align-items-center" style={{ color: '#94a3b8' }}>
                    <FaMapMarkerAlt className="me-2" style={{ color: '#3498db' }} />
                    <span>123 Business St, City, Country</span>
                  </div>
                </div>
              </div>
              <AnimatedVerticalLine />
            </div>

            {/* Quick Links */}
            <div className="col-lg-2 col-md-6 mb-4 d-flex">
              <div className="flex-grow-1">
                <div className="header-with-line">
                  <h6 className="mb-3" style={{ color: '#ffffff', fontWeight: '600' }}>
                    Shop
                    {isChristmasSeason && (
                      <FaSnowflake className="christmas-decoration ms-2" style={{ color: '#87CEEB', fontSize: '0.8em' }} />
                    )}
                  </h6>
                </div>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link href="/products/men" className="text-decoration-none d-flex align-items-center" style={{ color: '#94a3b8' }}>
                      <span className="me-2">→</span>
                      <span>Men's Fashion</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/products/women" className="text-decoration-none d-flex align-items-center" style={{ color: '#94a3b8' }}>
                      <span className="me-2">→</span>
                      <span>Women's Fashion</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/products/electronics" className="text-decoration-none d-flex align-items-center" style={{ color: '#94a3b8' }}>
                      <span className="me-2">→</span>
                      <span>Electronics</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/products/home" className="text-decoration-none d-flex align-items-center" style={{ color: '#94a3b8' }}>
                      <span className="me-2">→</span>
                      <span>Home & Garden</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/products/all" className="text-decoration-none d-flex align-items-center" style={{ color: '#94a3b8' }}>
                      <span className="me-2">→</span>
                      <span>All Products</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <AnimatedVerticalLine />
            </div>

            {/* Customer Service */}
            <div className="col-lg-2 col-md-6 mb-4 d-flex">
              <div className="flex-grow-1">
                <div className="header-with-line">
                  <h6 className="mb-3" style={{ color: '#ffffff', fontWeight: '600' }}>
                    Support
                    {isChristmasSeason && (
                      <FaSnowflake className="christmas-decoration ms-2" style={{ color: '#87CEEB', fontSize: '0.8em' }} />
                    )}
                  </h6>
                </div>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link href="/contact" className="text-decoration-none d-flex align-items-center" style={{ color: '#94a3b8' }}>
                      <span className="me-2">→</span>
                      <span>Contact Us</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/faq" className="text-decoration-none d-flex align-items-center" style={{ color: '#94a3b8' }}>
                      <span className="me-2">→</span>
                      <span>FAQ</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/shipping" className="text-decoration-none d-flex align-items-center" style={{ color: '#94a3b8' }}>
                      <span className="me-2">→</span>
                      <span>Shipping Info</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/returns" className="text-decoration-none d-flex align-items-center" style={{ color: '#94a3b8' }}>
                      <span className="me-2">→</span>
                      <span>Returns & Exchanges</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/size-guide" className="text-decoration-none d-flex align-items-center" style={{ color: '#94a3b8' }}>
                      <span className="me-2">→</span>
                      <span>Size Guide</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <AnimatedVerticalLine />
            </div>

            {/* Account & Legal */}
            <div className="col-lg-2 col-md-6 mb-4 d-flex">
              <div className="flex-grow-1">
                <div className="header-with-line">
                  <h6 className="mb-3" style={{ color: '#ffffff', fontWeight: '600' }}>
                    Legal
                    {isChristmasSeason && (
                      <FaSnowflake className="christmas-decoration ms-2" style={{ color: '#87CEEB', fontSize: '0.8em' }} />
                    )}
                  </h6>
                </div>
                <ul className="list-unstyled">
                  <li className="mb-2">
                    <Link href="/privacy" className="text-decoration-none d-flex align-items-center" style={{ color: '#94a3b8' }}>
                      <span className="me-2">→</span>
                      <span>Privacy Policy</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/terms" className="text-decoration-none d-flex align-items-center" style={{ color: '#94a3b8' }}>
                      <span className="me-2">→</span>
                      <span>Terms of Service</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/cookies" className="text-decoration-none d-flex align-items-center" style={{ color: '#94a3b8' }}>
                      <span className="me-2">→</span>
                      <span>Cookie Policy</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/account" className="text-decoration-none d-flex align-items-center" style={{ color: '#94a3b8' }}>
                      <span className="me-2">→</span>
                      <span>My Account</span>
                    </Link>
                  </li>
                  <li className="mb-2">
                    <Link href="/wishlist" className="text-decoration-none d-flex align-items-center" style={{ color: '#94a3b8' }}>
                      <span className="me-2">→</span>
                      <span>Wishlist</span>
                    </Link>
                  </li>
                </ul>
              </div>
              <AnimatedVerticalLine />
            </div>

            {/* Newsletter */}
            <div className="col-lg-3 col-md-6 mb-4">
              <div className="header-with-line">
                <h6 className="mb-3" style={{ color: '#ffffff', fontWeight: '600' }}>
                  Stay Updated
                  {isChristmasSeason && (
                    <FaSnowflake className="christmas-decoration ms-2" style={{ color: '#87CEEB', fontSize: '0.8em' }} />
                  )}
                </h6>
              </div>
              <p className="small mb-3" style={{ color: '#94a3b8' }}>
                Subscribe for exclusive deals and new arrivals
                {isChristmasSeason && (
                  <span className="d-block mt-1" style={{ color: '#FF6B6B', fontSize: '0.9em' }}>
                    🎄 Special Christmas Offers Inside!
                  </span>
                )}
              </p>
              <div className="input-group mb-3">
                <input 
                  type="email" 
                  className="form-control bg-dark border-dark text-light" 
                  placeholder="Your email address"
                  aria-label="Email for newsletter"
                  style={{ fontSize: '0.9rem' }}
                />
                <button
                  className="btn"
                  type="button"
                  style={{
                    background: isChristmasSeason ? 'linear-gradient(135deg, #dc143c, #228b22)' : 'linear-gradient(135deg, #3498db, #2c3e50)',
                    color: 'white',
                    border: 'none',
                    animation: isChristmasSeason ? 'twinkle 2s ease-in-out infinite' : 'none'
                  }}
                >
                  Subscribe {isChristmasSeason && <FaSnowflake className="ms-1" style={{ fontSize: '0.9em' }} />}
                </button>
              </div>
              
              {/* Social Media */}
              <div className="mt-4">
                <h6 className="mb-3" style={{ color: '#ffffff', fontWeight: '600' }}>Follow Us</h6>
                <div className="d-flex gap-3">
                  <a href="https://facebook.com" className="text-decoration-none" style={{ color: '#3b5998' }}>
                    <FaFacebook size={20} />
                  </a>
                  <a href="https://instagram.com" className="text-decoration-none" style={{ color: '#e4405f' }}>
                    <FaInstagram size={20} />
                  </a>
                  <a href="https://twitter.com" className="text-decoration-none" style={{ color: '#1da1f2' }}>
                    <FaTwitter size={20} />
                  </a>
                  <a href="https://linkedin.com" className="text-decoration-none" style={{ color: '#0077b5' }}>
                    <FaLinkedin size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges & Payment Methods */}
          <div className="row py-4 border-top" style={{ borderColor: '#1e3a5f' }}>
            <div className="col-md-6 mb-3 mb-md-0">
              <h6 className="mb-3" style={{ color: '#ffffff', fontWeight: '600' }}>Secure Payment</h6>
              <div className="d-flex gap-3 align-items-center flex-wrap">
                <FaCcVisa size={30} style={{ color: '#ffffff' }} />
                <FaCcMastercard size={30} style={{ color: '#eb001b' }} />
                <FaCcPaypal size={30} style={{ color: '#003087' }} />
                <FaCcAmex size={30} style={{ color: '#2e77bc' }} />
                <span className="ms-2 small" style={{ color: '#94a3b8' }}>+ More</span>
              </div>
            </div>
            <div className="col-md-6">
              <h6 className="mb-3" style={{ color: '#ffffff', fontWeight: '600' }}>Why Shop With Us</h6>
              <div className="d-flex flex-wrap gap-4">
                <div className="d-flex align-items-center">
                  <FaTruck className="me-2" style={{ color: '#27ae60' }} />
                  <span className="small" style={{ color: '#94a3b8' }}>Free Shipping</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaShieldAlt className="me-2" style={{ color: '#e74c3c' }} />
                  <span className="small" style={{ color: '#94a3b8' }}>Secure Payment</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaHeadset className="me-2" style={{ color: '#3498db' }} />
                  <span className="small" style={{ color: '#94a3b8' }}>24/7 Support</span>
                </div>
                <div className="d-flex align-items-center">
                  <FaHeart className="me-2" style={{ color: '#e74c3c' }} />
                  <span className="small" style={{ color: '#94a3b8' }}>Quality Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright & Bottom Links */}
          <div className="row pt-4">
            <div className="col-md-6 mb-3 mb-md-0">
              <p className="mb-0 small" style={{ color: '#94a3b8' }}>
                &copy; {currentYear} KS E-COMMERCE. All rights reserved.
                {isChristmasSeason && (
                  <span className="ms-2" style={{ color: '#FFD700' }}>🎅 Merry Christmas!</span>
                )}
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <Link href="/sitemap" className="text-decoration-none small me-3" style={{ color: '#94a3b8' }}>
                Sitemap
              </Link>
              <Link href="/affiliate" className="text-decoration-none small me-3" style={{ color: '#94a3b8' }}>
                Affiliate Program
              </Link>
              <Link href="/careers" className="text-decoration-none small me-3" style={{ color: '#94a3b8' }}>
                Careers
              </Link>
              <Link href="/blog" className="text-decoration-none small" style={{ color: '#94a3b8' }}>
                Blog
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}