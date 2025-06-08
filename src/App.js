import './LandingPageFixed.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import heroImage from './team-purple-hero.png'; // ✅ Import image correctly

function Home() {
  return (
    <div
      className="landing-container"
      style={{
        backgroundImage: `url(${heroImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: "#4b2e83"
      }}
    >
      <h1 className="landing-header">Welcome to Team Purple</h1>
      <p className="landing-subtext">Helping military families save smarter.</p>
      <div className="landing-buttons">
        <Link to="/signup">Join the Team</Link>
        <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}

// ... other components (Login, SignUp, Dashboard) stay exactly as you have them ...

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem('session');
    if (session) {
      setUser(JSON.parse(session));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('session');
    setUser(null);
  };

  return (
    <Router>
      <nav style={{ padding: '1rem', backgroundColor: '#5e3b76', color: 'white' }}>
        <Link to="/" style={{ marginRight: '1rem', color: 'white' }}>Home</Link>
        {!user ? (
          <>
            <Link to="/login" style={{ marginRight: '1rem', color: 'white' }}>Login</Link>
            <Link to="/signup" style={{ color: 'white' }}>Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" style={{ marginRight: '1rem', color: 'white' }}>Dashboard</Link>
            <button onClick={logout} style={{ marginLeft: '1rem', color: 'white', background: 'transparent', border: 'none' }}>Log Out</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={user ? <Dashboard user={user} /> : <Home />} />
      </Routes>
    </Router>
  );
}

export default App;
