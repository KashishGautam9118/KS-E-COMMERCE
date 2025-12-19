// app/reset-password/page.js
'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get token from URL query parameters
    const tokenFromUrl = searchParams.get('token');
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      toast.error('Invalid or missing reset token');
      setTimeout(() => {
        router.push('/forgot-password');
      }, 2000);
    }
  }, [searchParams, router]);

  const validateForm = () => {
    if (!password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return false;
    }
    
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return false;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      // Call reset password API (temporary simulation)
      // In production, use:
      // const response = await axios.post('/api/auth/reset-password', {
      //   token,
      //   password
      // });
      
      // Temporary simulation
      setTimeout(() => {
        setSuccess(true);
        toast.success('Password reset successful!');
        setLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(error.response?.data?.message || 'Failed to reset password');
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '20px',
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
          {/* Header */}
          <div 
            className="py-4 text-center text-white"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <div className="d-flex align-items-center justify-content-center mb-3">
              <div className="logo-circle me-3">
                <Image
                  src="/logo.png"
                  alt="KS E-COMMERCE Logo"
                  width={40}
                  height={40}
                  style={{ 
                    objectFit: 'contain',
                    filter: 'brightness(0) invert(1)'
                  }}
                />
              </div>
              <span
                style={{
                  fontWeight: 800,
                  fontSize: '1.4rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                KS E-COMMERCE
              </span>
            </div>
            <h4 className="mb-0" style={{ fontWeight: 600 }}>
              Create New Password
            </h4>
            <p className="mb-0 opacity-75 mt-2" style={{ fontSize: '0.9rem' }}>
              Choose a strong, new password for your account
            </p>
          </div>

          <div className="card-body px-4 px-md-5 py-5">
            {success ? (
              <div className="text-center">
                <div className="mb-4">
                  <div className="success-circle mx-auto">
                    <svg 
                      width="60" 
                      height="60" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                </div>
                
                <h5 className="text-success mb-3">Password Reset Successful!</h5>
                <p className="text-muted mb-4">
                  Your password has been updated successfully.
                  You can now log in with your new password.
                </p>
                
                <button
                  onClick={handleBackToLogin}
                  className="btn w-100 py-3"
                  style={{
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: 'white',
                    fontWeight: 600,
                    borderRadius: '10px',
                  }}
                >
                  Go to Login
                </button>
              </div>
            ) : (
              <>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="password"
                      className="form-label mb-2"
                      style={{ fontWeight: 600, fontSize: '0.95rem', color: '#374151' }}
                    >
                      New Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-lock"></i>
                      </span>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="form-control border-start-0"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                        {showPassword ? (
                          <i className="bi bi-eye-slash"></i>
                        ) : (
                          <i className="bi bi-eye"></i>
                        )}
                      </button>
                    </div>
                    <div className="form-text mt-1" style={{ fontSize: '0.85rem' }}>
                      Password must be at least 6 characters
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label
                      htmlFor="confirmPassword"
                      className="form-label mb-2"
                      style={{ fontWeight: 600, fontSize: '0.95rem', color: '#374151' }}
                    >
                      Confirm Password
                    </label>
                    <div className="input-group">
                      <span className="input-group-text bg-light border-end-0">
                        <i className="bi bi-lock-fill"></i>
                      </span>
                      <input
                        id="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        className="form-control border-start-0"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={{ 
                          fontSize: '0.95rem', 
                          borderRadius: '8px',
                          paddingLeft: '10px'
                        }}
                        disabled={loading}
                      />
                    </div>
                  </div>
                  
                  {/* Password Requirements */}
                  <div className="alert alert-light mb-4" style={{ fontSize: '0.85rem' }}>
                    <small className="fw-bold mb-2 d-block">Password Requirements:</small>
                    <ul className="mb-0" style={{ paddingLeft: '20px' }}>
                      <li>At least 6 characters long</li>
                      <li>Use a mix of letters and numbers</li>
                      <li>Avoid common words or patterns</li>
                    </ul>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="d-flex gap-3">
                    <button
                      type="submit"
                      className="btn flex-grow-1 py-3"
                      style={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: '#ffffff',
                        fontWeight: 600,
                        borderRadius: '10px',
                        border: 'none',
                      }}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Resetting...
                        </>
                      ) : (
                        'Reset Password'
                      )}
                    </button>
                    
                    <button
                      type="button"
                      onClick={handleBackToLogin}
                      className="btn flex-grow-1 py-3"
                      style={{
                        backgroundColor: '#ffffff',
                        color: '#667eea',
                        border: '2px solid #667eea',
                        fontWeight: 600,
                        borderRadius: '10px',
                      }}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <style jsx global>{`
        .logo-circle {
          width: 50px;
          height: 50px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }
        
        .success-circle {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          margin: 0 auto;
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
        
        /* Bootstrap icon classes */
        .bi-lock:before {
          content: "\\F47A";
        }
        
        .bi-lock-fill:before {
          content: "\\F47B";
        }
        
        .bi-eye:before {
          content: "\\F341";
        }
        
        .bi-eye-slash:before {
          content: "\\F340";
        }
      `}</style>
    </>
  );
}