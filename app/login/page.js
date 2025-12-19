'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import { MdEmail, MdLock } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const validateForm = () => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return false;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    if (!password) {
      setError('Please enter your password');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);

    try {
      const result = await login(email.trim().toLowerCase(), password);

      if (result.success) {
        // Show success toast
        toast.success(`Welcome back, ${result.user?.name || 'User'}!`, {
          position: "top-right",
          autoClose: 3000,
        });

        // Redirect to home page after 1 second
        setTimeout(() => {
          router.push('/');
        }, 1000);

      } else {
        setError(result.message || 'Login failed');
        toast.error(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      const errorMessage = 'Login failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setEmail('');
    setPassword('');
    setError('');
  };
  

  const handleSocialLogin = (provider) => {
    // For now, just show a message
    toast.info(`${provider} login will be available soon!`);
    // In production, implement OAuth flow
    // window.location.href = `/api/auth/${provider}`;
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  return (
    <>
      <ToastContainer />
      
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <div
          className="card shadow-lg border-0"
          style={{
            width: '100%',
            maxWidth: '480px',
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          {/* Gradient Header */}
          <div
            className="py-3 text-center text-white"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <div className="d-flex align-items-center justify-content-center mb-3">
              <div className="logo-circle me-3">
                <Image
                  src="/logo.png"
                  alt="KS E-COMMERCE Logo"
                  width={50}
                  height={50}
                  style={{
                    objectFit: 'contain'
                  }}
                />
              </div>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                KS E-COMMERCE
              </span>
            </div>
            <h4 className="mb-0" style={{ fontWeight: 600 }}>
              Welcome Back
            </h4>
            <p className="mb-0 opacity-75" style={{ fontSize: '0.9rem' }}>
              Sign in to continue shopping
            </p>
          </div>

          <div className="card-body px-4 px-md-5 py-5">
            {/* Error Message */}
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {error}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setError('')}
                ></button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="form-label mb-2"
                  style={{ fontWeight: 600, fontSize: '0.95rem', color: '#374151' }}
                >
                  Email Address
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <MdEmail />
                  </span>
                  <input
                    id="email"
                    type="email"
                    className="form-control border-start-0"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    style={{ 
                      fontSize: '0.95rem', 
                      borderRadius: '8px',
                      paddingLeft: '10px'
                    }}
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="mb-3">
                <label
                  htmlFor="password"
                  className="form-label mb-2"
                  style={{ fontWeight: 600, fontSize: '0.95rem', color: '#374151' }}
                >
                  Password
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <MdLock />
                  </span>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control border-start-0"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError('');
                    }}
                    style={{ 
                      fontSize: '0.95rem', 
                      borderRadius: '8px',
                      paddingLeft: '10px'
                    }}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="input-group-text bg-light border-start-0"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ cursor: 'pointer' }}
                    disabled={loading}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                <div className="form-text mt-1" style={{ fontSize: '0.85rem' }}>
                  Password must be at least 6 characters
                </div>
              </div>

              {/* Forgot Password Link - Moved below password field */}
              <div className="mb-4 text-end">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="btn btn-link p-0"
                  style={{ 
                    fontSize: '0.9rem', 
                    color: '#667eea',
                    textDecoration: 'none',
                    fontWeight: 500
                  }}
                  disabled={loading}
                >
                  Forgot your password?
                </button>
              </div>

              {/* Remember Me */}
              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rememberMe"
                  style={{ cursor: 'pointer' }}
                />
                <label 
                  className="form-check-label" 
                  htmlFor="rememberMe"
                  style={{ fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  Remember me for 30 days
                </label>
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-3 mb-4">
                <button
                  type="submit"
                  className="btn flex-grow-1 py-3"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#ffffff',
                    fontWeight: 600,
                    borderRadius: '10px',
                    border: 'none',
                    transition: 'all 0.3s ease',
                  }}
                  disabled={loading}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.4)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                      Signing In...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn flex-grow-1 py-3"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#667eea',
                    border: '2px solid #667eea',
                    fontWeight: 600,
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                  }}
                  disabled={loading}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(102, 126, 234, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  Cancel
                </button>
              </div>

              {/* Divider */}
              <div className="position-relative text-center mb-4">
                <hr className="my-4" />
                <span 
                  className="position-absolute top-50 start-50 translate-middle px-3 bg-white"
                  style={{ fontSize: '0.85rem', color: '#6b7280' }}
                >
                  Or continue with
                </span>
              </div>

              {/* Social Login Buttons */}
              <div className="row g-3 mb-4">
                <div className="col-6">
                  <button
                    type="button"
                    className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '10px',
                      fontWeight: 500,
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => handleSocialLogin('google')}
                    disabled={loading}
                  >
                    <FaGoogle style={{ color: '#DB4437' }} />
                    <span>Google</span>
                  </button>
                </div>
                <div className="col-6">
                  <button
                    type="button"
                    className="btn w-100 d-flex align-items-center justify-content-center gap-2 py-2"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #d1d5db',
                      borderRadius: '10px',
                      fontWeight: 500,
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => handleSocialLogin('facebook')}
                    disabled={loading}
                  >
                    <FaFacebook style={{ color: '#4267B2' }} />
                    <span>Facebook</span>
                  </button>
                </div>
              </div>

              {/* Register Link */}
              <div className="text-center pt-3 border-top">
                <p className="mb-0" style={{ fontSize: '0.95rem', color: '#6b7280' }}>
                  don&apos;t have an account?{' '}
                  <Link
                    href="/signup"
                    style={{
                      color: '#667eea',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                    className="hover-underline"
                  >
                    Create Account
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .logo-circle {
          width: 60px;
          height: 60px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }
        
        .hover-underline {
          position: relative;
        }
        
        .hover-underline::after {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: -2px;
          left: 0;
          background-color: #667eea;
          transition: width 0.3s ease;
        }
        
        .hover-underline:hover::after {
          width: 100%;
        }
        
        .input-group:focus-within {
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          border-radius: 8px;
        }
        
        .form-control:focus {
          box-shadow: none;
          border-color: #667eea;
        }
        
        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        
        /* Bootstrap icon classes */
        .bi-envelope:before {
          content: "\\f32f";
          font-family: "bootstrap-icons";
        }

        .bi-lock:before {
          content: "\\f470";
          font-family: "bootstrap-icons";
        }
      `}</style>
    </>
  );
}
