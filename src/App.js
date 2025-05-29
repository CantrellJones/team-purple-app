import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Team Purple</h1>
      <p>Helping military families save smarter.</p>
      <Link to="/login">Team Member Login</Link>
      <br /><br />
      <Link to="/admin-login">
        <button style={{ padding: '0.5rem 1rem', background: '#5e3b76', color: 'white', border: 'none', borderRadius: '4px' }}>
          Partner & Admin Login
        </button>
      </Link>
    </div>
  );
}

function AdminLogin({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      u => u.email === email && u.password === password && (u.role === 'admin' || u.role === 'partner')
    );
    if (user) {
      localStorage.setItem('session', JSON.stringify(user));
      setUser(user);
      navigate(user.role === 'admin' ? '/admin' : '/partner-dashboard');
    } else {
      alert('Invalid admin or partner login credentials');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin/Partner Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

function PartnerDashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Partner Dashboard</h2>
      <p>Welcome, partner! This area will include coupon performance and analytics.</p>
    </div>
  );
}

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('session', JSON.stringify(user));
      setUser(user);
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    } else {
      alert('Invalid login credentials');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} /><br />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br />
      <button onClick={handleLogin}>Log In</button>
    </div>
  );
}

function SignUp() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'member', status: 'active' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(form);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created! Please log in.');
    navigate('/login');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" onChange={handleChange} required /><br />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required /><br />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required /><br />
        <select name="role" onChange={handleChange}>
          <option value="member">Team Member</option>
          <option value="partner">Partner</option>
          <option value="admin">Admin</option>
        </select><br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

function Dashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Team Member Dashboard</h2>
      <p>This is the protected Team Member dashboard view.</p>
    </div>
  );
}

function Admin() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard</h2>
      <p>This is the protected Admin dashboard view.</p>
    </div>
  );
}

function Settings() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>User Settings</h2>
    </div>
  );
}

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
            <Link to="/settings" style={{ marginRight: '1rem', color: 'white' }}>Settings</Link>
            {user.role === 'admin' && <Link to="/admin" style={{ marginRight: '1rem', color: 'white' }}>Admin</Link>}
            {user.role === 'partner' && <Link to="/partner-dashboard" style={{ marginRight: '1rem', color: 'white' }}>Partner</Link>}
            <button onClick={logout} style={{ marginLeft: '1rem', color: 'white' }}>Log Out</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={user?.role === 'member' ? <Dashboard /> : <Home />} />
        <Route path="/admin" element={user?.role === 'admin' ? <Admin /> : <Home />} />
        <Route path="/partner-dashboard" element={user?.role === 'partner' ? <PartnerDashboard /> : <Home />} />
        <Route path="/settings" element={user ? <Settings /> : <Home />} />
        <Route path="/admin-login" element={<AdminLogin setUser={setUser} />} />
      </Routes>
    </Router>
  );
}

export default App;
