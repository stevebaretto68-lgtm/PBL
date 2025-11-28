import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import "../pages/Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  // State for form inputs
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // State for handling errors and loading status
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing again
    if (error) setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      console.log("Attempting login with:", formData);

      // SIMULATION 
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // SIMULATE A RETURNING USER: providing mock initial data
      const mockUserData = { 
          id: 1, 
          fullName: 'Test User', 
          email: formData.email, 
          role: 'tenant',
          profile: {
            // Full schema data for a pre-existing user (ensuring full compatibility with the new profile schema)
            phone: '555-1234',
            gender: 'Female',
            age: 28,
            occupation: 'Professional',
            aboutMe: 'Software engineer who enjoys hiking and quiet evenings. Clean and respectful.',
            smoking: 'Never',
            drinking: 'Socially',
            foodPreference: 'Non-Vegetarian',
            petFriendly: true,
            sleepSchedule: 'Night Owl',
            cleanliness: 'Average',
            guestPolicy: 'Occasionally',
            budgetMin: 1000,
            budgetMax: 1500,
            preferredLocation: 'Williamsburg, Bushwick',
            isOnboardingComplete: true
          }
      };
      const mockAuthToken = 'mock-jwt-token-123';
      login(mockUserData, mockAuthToken);

      // After successful login, check if profile setup is required
      if (!mockUserData.profile || !mockUserData.profile.isOnboardingComplete) {
          navigate("/profile-setup");
      } else {
          navigate("/dashboard");
      }
      
    } catch (err) {
      console.error("Login Error:", err);
      setError(
        err.message || "Failed to login. Please check your credentials."
      );
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
        <p className="auth-subtitle">Welcome back! Please login to continue.</p>

        {/* Error Message Display */}
        {error && (
          <div
            className="error-message"
            style={{ color: "red", marginBottom: "1rem", fontSize: "0.9rem" }}
          >
            {error}
          </div>
        )}

        <form className="auth-form" onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="Enter your email"
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
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-link">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;