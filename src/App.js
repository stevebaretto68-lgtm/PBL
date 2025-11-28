import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// UPDATED IMPORTS: Pointing to the 'pages' folder
import Login from './pages/Login';
import Signup from './pages/Signup';

import './App.css';

const Dashboard = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1>Welcome to RoomieFind Dashboard</h1>
    <p>Authentication Successful.</p>
    <a href="/" style={{ color: '#00AEEF' }}>Logout</a>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;