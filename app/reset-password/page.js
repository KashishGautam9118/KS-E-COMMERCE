// app/reset-password/page.js
"use client";

import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ResetPasswordContent() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [token, setToken] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const tokenFromUrl = searchParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      toast.error("Invalid or missing reset token");
      setTimeout(() => {
        router.push("/forgot-password");
      }, 2000);
    }
  }, [searchParams, router]);

  const validateForm = () => {
    if (!password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    try {
      setTimeout(() => {
        setSuccess(true);
        toast.success("Password reset successful!");
        setLoading(false);
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to reset password"
      );
      setLoading(false);
    }
  };

  const handleBackToLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <div
        className="d-flex align-items-center justify-content-center"
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "20px",
        }}
      >
        <div
          className="card shadow-lg border-0"
          style={{
            width: "100%",
            maxWidth: "480px",
            borderRadius: "20px",
            overflow: "hidden",
          }}
        >
          <div className="card-body px-4 px-md-5 py-5">
            {success ? (
              <div className="text-center">
                <h5 className="text-success mb-3">
                  Password Reset Successful!
                </h5>
                <button
                  onClick={handleBackToLogin}
                  className="btn w-100 py-3"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    fontWeight: 600,
                    borderRadius: "10px",
                  }}
                >
                  Go to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label">New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  className="btn w-100 py-3"
                  disabled={loading}
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "#fff",
                    fontWeight: 600,
                  }}
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function ResetPassword() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPasswordContent />
    </Suspense>
  );
}
