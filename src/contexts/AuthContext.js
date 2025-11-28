import React, { createContext, useState, useContext, useMemo } from 'react';

// 1. Create the Context object
const AuthContext = createContext(null);

// 2. Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// 3. Provider component to wrap your app
export const AuthProvider = ({ children }) => {
  // Check localStorage for token and user on initial load
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  // Function called upon successful login or signup
  const login = (userData, authToken) => {
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(authToken);
    setUser(userData);
  };

  // Function called upon logout
  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(() => ({
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};