import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Team Purple</h1>
      <p>Helping military families save smarter.</p>
      <Link to="/login">Team Member Login</Link>
    </div>
  );
}

function Login() {
  return <div style={{ padding: '2rem' }}>Login Page Placeholder</div>;
}

function SignUp() {
  return <div style={{ padding: '2rem' }}>Sign Up Page Placeholder</div>;
}

function Dashboard() {
  return <div style={{ padding: '2rem' }}>Dashboard Placeholder (Protected)</div>;
}

function Admin() {
  return <div style={{ padding: '2rem' }}>Admin Dashboard Placeholder</div>;
}

function Settings() {
  return <div style={{ padding: '2rem' }}>Settings Placeholder</div>;
}

export default function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', backgroundColor: '#5e3b76', color: 'white' }}>
        <Link to="/" style={{ marginRight: '1rem', color: 'white' }}>Home</Link>
        <Link to="/login" style={{ marginRight: '1rem', color: 'white' }}>Login</Link>
        <Link to="/signup" style={{ color: 'white' }}>Sign Up</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}
