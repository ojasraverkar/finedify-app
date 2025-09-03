// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import './App.css'; // You can add basic styles here

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link>
        </nav>
        <main>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<h2>Welcome to FinEdify!</h2>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;