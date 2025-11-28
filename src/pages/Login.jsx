import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';
import "./Auth.css";

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

      // ---------------------------------------------------------
      // --- API INTEGRATION POINT (LOGIN) ---
      // ---------------------------------------------------------
      // Example code for when you have a backend:
      /*
      const response = await fetch('https://your-api.com/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: formData.email, 
          password: formData.password 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Save the token received from server (e.g., JWT)
      // localStorage.setItem('authToken', data.token);
      // localStorage.setItem('user', JSON.stringify(data.user));
      // login(data.user, data.token); // Actual usage
      */
      // ---------------------------------------------------------

      // SIMULATION (Remove this timeout when using real API)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Call login function to update global state 
      const mockUserData = { id: 1, fullName: 'Test User', email: formData.email, role: 'tenant' };
      const mockAuthToken = 'mock-jwt-token-123';
      login(mockUserData, mockAuthToken);

      // Redirect to dashboard on success
      navigate("/dashboard");
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