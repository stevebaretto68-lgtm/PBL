import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext'; 
import ProtectedRoute from './components/ProtectedRoute'; 

// Import all pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Listings from './pages/Listings'; 
import Profile from './pages/Profile';
import Matches from './pages/Matches';
import Messages from './pages/Messages'; // <-- NEW IMPORT

import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider> 
        <div className="App">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Listings /> 
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/matches"
              element={
                <ProtectedRoute>
                  <Matches />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            
            {/* MESSAGES ROUTE IMPLEMENTED */}
            <Route
              path="/messages"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;