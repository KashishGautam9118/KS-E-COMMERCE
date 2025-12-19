'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import { MdEmail, MdLock, MdPerson, MdPhone } from 'react-icons/md';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../context/AuthContext';

export default function SignUp() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const emailInputRef = useRef(null);
  const router = useRouter();

  // Auto-focus email field
  useEffect(() => {
    if (emailInputRef.current) {
      emailInputRef.current.focus();
    }
  }, []);

  // Password strength calculation
  useEffect(() => {
    let strength = 0;
    if (formData.password.length >= 8) strength += 1;
    if (/[A-Z]/.test(formData.password)) strength += 1;
    if (/[0-9]/.test(formData.password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    } else if (passwordStrength < 2) {
      newErrors.password = 'Password is too weak. Add uppercase letters, numbers or symbols';
    }
    
    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    // Phone validation (optional)
    if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    if (!validateForm()) return;
    
    setLoading(true);

    try {
      const result = await register({
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        phone: formData.phone || undefined
      });

      if (result.success) {
        // Show success toast
        toast.success(`Welcome to KS E-COMMERCE, ${formData.name.trim()}! 🎉`, {
          position: "top-right",
          autoClose: 3000,
        });

        // Redirect to home page
        setTimeout(() => {
          router.push('/');
        }, 1500);

      } else {
        setErrors({ submit: result.message || 'Signup failed' });
        toast.error(result.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      const errorMessage = 'Signup failed. Please try again.';
      setErrors({ submit: errorMessage });
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    });
    setErrors({});
  };

  const handleSocialSignup = (provider) => {
    toast.info(`${provider} signup will be available soon!`);
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return '#dc3545';
    if (passwordStrength === 1) return '#fd7e14';
    if (passwordStrength === 2) return '#ffc107';
    if (passwordStrength === 3) return '#20c997';
    return '#198754';
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return 'Very Weak';
    if (passwordStrength === 1) return 'Weak';
    if (passwordStrength === 2) return 'Fair';
    if (passwordStrength === 3) return 'Good';
    return 'Strong';
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  return (
    <>
      <ToastContainer />
      
      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #5C2CA2 0%, #764ba2 100%)',
        }}
      >
        <div
          className="card shadow-lg border-0"
          style={{
            width: '100%',
            maxWidth: '520px',
            borderRadius: '20px',
            overflow: 'hidden',
          }}
        >
          {/* Gradient Header */}
          <div
            className="py-4 text-center text-white"
            style={{
              background: 'linear-gradient(135deg, #5C2CA2 0%, #764ba2 100%)',
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
              Create Your Account
            </h4>
            <p className="mb-0 opacity-75" style={{ fontSize: '0.9rem' }}>
              Join KS E-COMMERCE and get 10% off your first order!
            </p>
          </div>

          <div className="card-body px-4 px-md-5 py-5">
            {/* Error Message */}
            {errors.submit && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {errors.submit}
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setErrors(prev => ({ ...prev, submit: '' }))}
                ></button>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="form-label mb-2"
                  style={{ fontWeight: 600, fontSize: '0.95rem', color: '#374151' }}
                >
                  Full Name *
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <MdPerson />
                  </span>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className={`form-control border-start-0 ${errors.name ? 'is-invalid' : ''}`}
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    style={{ 
                      fontSize: '0.95rem', 
                      borderRadius: '8px',
                      paddingLeft: '10px'
                    }}
                    disabled={loading}
                  />
                </div>
                {errors.name && (
                  <div className="invalid-feedback d-block mt-1">
                    <small>{errors.name}</small>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="form-label mb-2"
                  style={{ fontWeight: 600, fontSize: '0.95rem', color: '#374151' }}
                >
                  Email Address *
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <MdEmail />
                  </span>
                  <input
                    ref={emailInputRef}
                    id="email"
                    name="email"
                    type="email"
                    className={`form-control border-start-0 ${errors.email ? 'is-invalid' : ''}`}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ 
                      fontSize: '0.95rem', 
                      borderRadius: '8px',
                      paddingLeft: '10px'
                    }}
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <div className="invalid-feedback d-block mt-1">
                    <small>{errors.email}</small>
                  </div>
                )}
              </div>

              {/* Phone (Optional) */}
              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="form-label mb-2"
                  style={{ fontWeight: 600, fontSize: '0.95rem', color: '#374151' }}
                >
                  Phone Number <span className="text-muted" style={{ fontSize: '0.85rem' }}>(Optional)</span>
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <MdPhone />
                  </span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className={`form-control border-start-0 ${errors.phone ? 'is-invalid' : ''}`}
                    placeholder="9876543210"
                    value={formData.phone}
                    onChange={handleChange}
                    style={{ 
                      fontSize: '0.95rem', 
                      borderRadius: '8px',
                      paddingLeft: '10px'
                    }}
                    disabled={loading}
                  />
                </div>
                {errors.phone && (
                  <div className="invalid-feedback d-block mt-1">
                    <small>{errors.phone}</small>
                  </div>
                )}
                <div className="form-text mt-1" style={{ fontSize: '0.85rem' }}>
                  We'll use this for order updates and delivery
                </div>
              </div>

              {/* Password */}
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <label
                    htmlFor="password"
                    className="form-label mb-0"
                    style={{ fontWeight: 600, fontSize: '0.95rem', color: '#374151' }}
                  >
                    Password *
                  </label>
                  {formData.password && (
                    <span style={{ 
                      fontSize: '0.85rem', 
                      fontWeight: 500,
                      color: getStrengthColor() 
                    }}>
                      {getStrengthText()}
                    </span>
                  )}
                </div>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <MdLock />
                  </span>
                  <input
                    id="password"
                    name="password"
                    type={showPassword.password ? "text" : "password"}
                    className={`form-control border-start-0 pe-5 ${errors.password ? 'is-invalid' : ''}`}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ 
                      fontSize: '0.95rem', 
                      borderRadius: '8px',
                      paddingLeft: '10px'
                    }}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="input-group-text bg-light border-start-0 position-absolute end-0 h-100 bg-transparent border-0"
                    onClick={() => togglePasswordVisibility('password')}
                    style={{ 
                      cursor: 'pointer',
                      zIndex: 5,
                      backgroundColor: 'transparent !important'
                    }}
                    disabled={loading}
                  >
                    {showPassword.password ? (
                      <FaEyeSlash className="text-muted" />
                    ) : (
                      <FaEye className="text-muted" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <div className="invalid-feedback d-block mt-1">
                    <small>{errors.password}</small>
                  </div>
                )}
                
                {/* Password Strength Indicator */}
                {formData.password && (
                  <div className="mt-2">
                    <div className="progress" style={{ height: '6px', borderRadius: '3px' }}>
                      <div
                        className="progress-bar"
                        role="progressbar"
                        style={{
                          width: `${(passwordStrength / 4) * 100}%`,
                          backgroundColor: getStrengthColor(),
                          borderRadius: '3px'
                        }}
                      ></div>
                    </div>
                    <div className="mt-1 d-flex justify-content-between">
                      <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {passwordStrength === 0 && 'Too short'}
                        {passwordStrength === 1 && 'Weak password'}
                        {passwordStrength === 2 && 'Fair password'}
                        {passwordStrength === 3 && 'Good password'}
                        {passwordStrength === 4 && 'Strong password!'}
                      </small>
                      <small className="text-muted" style={{ fontSize: '0.75rem' }}>
                        {formData.password.length}/8 chars
                      </small>
                    </div>
                  </div>
                )}
                
                <div className="form-text mt-1" style={{ fontSize: '0.85rem' }}>
                  Use at least 8 characters with uppercase, numbers, or symbols
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="form-label mb-2"
                  style={{ fontWeight: 600, fontSize: '0.95rem', color: '#374151' }}
                >
                  Confirm Password *
                </label>
                <div className="input-group">
                  <span className="input-group-text bg-light border-end-0">
                    <MdLock />
                  </span>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword.confirmPassword ? "text" : "password"}
                    className={`form-control border-start-0 pe-5 ${errors.confirmPassword ? 'is-invalid' : ''}`}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    style={{ 
                      fontSize: '0.95rem', 
                      borderRadius: '8px',
                      paddingLeft: '10px'
                    }}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="input-group-text bg-light border-start-0 position-absolute end-0 h-100 bg-transparent border-0"
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                    style={{ 
                      cursor: 'pointer',
                      zIndex: 5,
                      backgroundColor: 'transparent !important'
                    }}
                    disabled={loading}
                  >
                    {showPassword.confirmPassword ? (
                      <FaEyeSlash className="text-muted" />
                    ) : (
                      <FaEye className="text-muted" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <div className="invalid-feedback d-block mt-1">
                    <small>{errors.confirmPassword}</small>
                  </div>
                )}
              </div>

              {/* Terms and Conditions */}
              <div className="form-check mb-4">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="terms"
                  style={{ cursor: 'pointer' }}
                  required
                />
                <label 
                  className="form-check-label" 
                  htmlFor="terms"
                  style={{ fontSize: '0.9rem', cursor: 'pointer' }}
                >
                  I agree to the{' '}
                  <Link href="/terms" style={{ color: '#5C2CA2', textDecoration: 'none' }}>
                    Terms & Conditions
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" style={{ color: '#5C2CA2', textDecoration: 'none' }}>
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="d-flex gap-3 mb-4">
                <button
                  type="submit"
                  className="btn flex-grow-1 py-3"
                  style={{
                    background: 'linear-gradient(135deg, #5C2CA2 0%, #764ba2 100%)',
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
                      e.target.style.boxShadow = '0 8px 25px rgba(92, 44, 162, 0.4)';
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
                      Creating Account...
                    </>
                  ) : (
                    'Create Account & Get 10% Off'
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn flex-grow-1 py-3"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#5C2CA2',
                    border: '2px solid #5C2CA2',
                    fontWeight: 600,
                    borderRadius: '10px',
                    transition: 'all 0.3s ease',
                  }}
                  disabled={loading}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 25px rgba(92, 44, 162, 0.2)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }
                  }}
                >
                  Clear Form
                </button>
              </div>

              {/* Divider */}
              <div className="position-relative text-center mb-4">
                <hr className="my-4" />
                <span 
                  className="position-absolute top-50 start-50 translate-middle px-3 bg-white"
                  style={{ fontSize: '0.85rem', color: '#6b7280' }}
                >
                  Or sign up with
                </span>
              </div>

              {/* Social Signup Buttons */}
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
                    onClick={() => handleSocialSignup('google')}
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
                    onClick={() => handleSocialSignup('facebook')}
                    disabled={loading}
                  >
                    <FaFacebook style={{ color: '#4267B2' }} />
                    <span>Facebook</span>
                  </button>
                </div>
              </div>

              {/* Login Link */}
              <div className="text-center pt-3 border-top">
                <p className="mb-0" style={{ fontSize: '0.95rem', color: '#6b7280' }}>
                  Already have an account?{' '}
                  <Link 
                    href="/login" 
                    style={{ 
                      color: '#5C2CA2',
                      fontWeight: 600,
                      textDecoration: 'none'
                    }}
                    className="hover-underline"
                  >
                    Sign In
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
          background-color: #5C2CA2;
          transition: width 0.3s ease;
        }
        
        .hover-underline:hover::after {
          width: 100%;
        }
        
        .input-group:focus-within {
          box-shadow: 0 0 0 3px rgba(92, 44, 162, 0.1);
          border-radius: 8px;
        }
        
        .form-control:focus {
          box-shadow: none;
          border-color: #5C2CA2;
        }
        
        .btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .btn:hover:not(:disabled) {
          transform: translateY(-2px);
        }
        
        /* Password strength meter */
        .progress {
          background-color: #e9ecef;
        }
        
        /* Custom checkbox */
        .form-check-input:checked {
          background-color: #5C2CA2;
          border-color: #5C2CA2;
        }
        
        .form-check-input:focus {
          border-color: #5C2CA2;
          box-shadow: 0 0 0 0.25rem rgba(92, 44, 162, 0.25);
        }
      `}</style>
    </>
  );
}