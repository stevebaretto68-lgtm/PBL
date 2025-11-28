import React, { createContext, useState, useContext, useMemo } from 'react';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('authToken') || null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const updateProfile = (profileData) => {
    const newUser = {
        ...user,
        profile: {
            ...user?.profile, // Keep existing profile fields
            ...profileData,  // Update with new data
            isOnboardingComplete: true // Set flag when profile is saved
        },
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = (userData, authToken) => {
    // Ensure profile data is included and initialize profile if missing
    const userWithProfile = {
        ...userData,
        profile: userData.profile || null, 
    };
    
    localStorage.setItem('authToken', authToken);
    localStorage.setItem('user', JSON.stringify(userWithProfile));
    setToken(authToken);
    setUser(userWithProfile);
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    token,
    isAuthenticated: !!token,
    login,
    logout,
    updateProfile,
  }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};