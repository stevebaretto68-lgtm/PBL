import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import "../pages/Auth.css";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // State for user role
  const [role, setRole] = useState("tenant");

  // State for form data
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // State for UI feedback
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // 1. Client-side Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setIsLoading(false);
      return;
    }

    try {
      // Prepare the data payload for the API
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: role, // 'tenant' or 'owner'
      };

      console.log("Registering user with payload:", payload);

      // SIMULATION
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Call login function after successful simulation 
      const mockUserData = { 
          id: 2, 
          fullName: payload.fullName, 
          email: payload.email, 
          role: payload.role, 
          // Initialize profile: null, triggering setup after login
          profile: null
      };
      const mockAuthToken = 'mock-jwt-token-456';
      login(mockUserData, mockAuthToken);

      // Redirect to profile setup after success
      navigate("/profile-setup"); 
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err.message || "Failed to create account.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <span className="logo-icon">⬢</span> RoomieFind
        </div>
        <p className="auth-subtitle">
          Create an account to find your perfect match.
        </p>

        {error && (
          <div
            className="error-message"
            style={{ color: "red", marginBottom: "1rem", fontSize: "0.9rem" }}
          >
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleSignup}>
          <div className="form-group">
            <label>I am a:</label>
            <div className="role-selector">
              <div
                className={`role-option ${role === "tenant" ? "active" : ""}`}
                onClick={() => setRole("tenant")}
              >
                Tenant
              </div>
              <div
                className={`role-option ${role === "owner" ? "active" : ""}`}
                onClick={() => setRole("owner")}
              >
                Room Owner
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              className="form-input"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className="form-input"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/" className="auth-link">
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;