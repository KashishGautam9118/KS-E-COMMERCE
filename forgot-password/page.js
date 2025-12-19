// app/forgot-password/page.js
'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate email
    if (!email.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Please enter a valid email address');
      return;
    }
    
    setLoading(true);

    try {
      // Call forgot password API (temporary simulation)
      // In production, uncomment the axios call
      
      // const response = await axios.post('/api/auth/forgot-password', { email });
      // if (response.data.success) {
      //   setEmailSent(true);
      //   toast.success('Password reset email sent! Check your inbox.');
      // }
      
      // Temporary simulation (remove this in production)
      setTimeout(() => {
        setEmailSent(true);
        toast.success(`Password reset link sent to ${email}`);
        setLoading(false);
      }, 1500);
      
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error(error.response?.data?.message || 'Failed to send reset email');
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
              Reset Your Password
            </h4>
            <p className="mb-0 opacity-75 mt-2" style={{ fontSize: '0.9rem' }}>
              We'll help you get back into your account
            </p>
          </div>

          <div className="card-body px-4 px-md-5 py-5">
            {emailSent ? (
              <div className="text-center">
                {/* Success Icon */}
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
                
                <h5 className="text-success mb-3">Email Sent Successfully!</h5>
                <p className="text-muted mb-4">
                  We've sent password reset instructions to:<br />
                  <strong>{email}</strong>
                </p>
                <p className="text-muted small mb-4">
                  Please check your inbox and follow the link to reset your password.
                  The link will expire in 1 hour.
                </p>
                
                <div className="d-grid gap-3">
                  <button
                    onClick={handleBackToLogin}
                    className="btn"
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      fontWeight: 600,
                      borderRadius: '10px',
                      padding: '12px',
                    }}
                  >
                    Back to Login
                  </button>
                  
                  <p className="text-muted small mb-0">
                    Didn't receive the email?{' '}
                    <button
                      onClick={() => {
                        setEmailSent(false);
                        setEmail('');
                      }}
                      className="btn btn-link p-0"
                      style={{ color: '#667eea', textDecoration: 'none' }}
                    >
                      Resend
                    </button>
                  </p>
                </div>
              </div>
            ) : (
              <>
                <p className="text-muted text-center mb-4">
                  Enter the email address associated with your account and we'll send you a link to reset your password.
                </p>
                
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
                        <i className="bi bi-envelope"></i>
                      </span>
                      <input
                        id="email"
                        type="email"
                        className="form-control border-start-0"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ 
                          fontSize: '0.95rem', 
                          borderRadius: '8px',
                          paddingLeft: '10px'
                        }}
                        disabled={loading}
                      />
                    </div>
                    <div className="form-text mt-1" style={{ fontSize: '0.85rem' }}>
                      Enter the email you used to register your account
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="d-flex gap-3 mb-3">
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
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                          Sending...
                        </>
                      ) : (
                        'Send Reset Link'
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
                        transition: 'all 0.3s ease',
                      }}
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                  
                  {/* Help Text */}
                  <div className="alert alert-light mt-4" style={{ fontSize: '0.85rem' }}>
                    <div className="d-flex">
                      <div className="flex-shrink-0">
                        <i className="bi bi-info-circle text-primary"></i>
                      </div>
                      <div className="flex-grow-1 ms-3">
                        <small>
                          <strong>Note:</strong> If you don&apos;t see the email in your inbox, 
                          please check your spam or junk folder.
                        </small>
                      </div>
                    </div>
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
        
        .btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.2);
        }
        
        /* Bootstrap icon classes */
        .bi-envelope:before {
          content: "\\F32F";
        }
        
        .bi-info-circle:before {
          content: "\\F431";
        }
      `}</style>
    </>
  );
}