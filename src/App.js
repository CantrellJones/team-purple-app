import './LandingPage.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function Home() {
  return (
    <div className="landing-container">
      <h1 className="landing-header">Welcome to Team Purple</h1>
      <p className="landing-subtext">Helping military families save smarter.</p>
      <div className="landing-buttons">
        <Link to="/signup">Join the Team</Link>
        <Link to="/login">Log In</Link>
        {/* Admin login route still exists but is not shown here */}
      </div>
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
      navigate('/dashboard');
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

function Dashboard({ user }) {
  const [goal, setGoal] = useState(() => {
    return JSON.parse(localStorage.getItem('goal')) || {
      name: 'College Fund',
      target: 2000,
      saved: 1200,
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formGoal, setFormGoal] = useState({ ...goal });
  const [showCongrats, setShowCongrats] = useState(false);
  const [goalReachedDate, setGoalReachedDate] = useState(() => {
    const savedDate = localStorage.getItem('goalReachedDate');
    return savedDate ? new Date(savedDate) : null;
  });

  useEffect(() => {
    const goalMet = goal.saved >= goal.target;

    if (goalMet && !goalReachedDate) {
      const now = new Date();
      setGoalReachedDate(now);
      localStorage.setItem('goalReachedDate', now.toISOString());
      setShowCongrats(true);
    }

    if (goalReachedDate) {
      const now = new Date();
      const diffDays = (now - new Date(goalReachedDate)) / (1000 * 60 * 60 * 24);
      if (diffDays > 7) {
        setShowCongrats(false);
      } else {
        setShowCongrats(true);
      }
    }
  }, [goal, goalReachedDate]);

  const handleEditChange = (e) => {
    setFormGoal({ ...formGoal, [e.target.name]: e.target.value });
  };

  const handleEditSave = () => {
    const updatedGoal = {
      ...goal,
      name: formGoal.name,
      target: parseFloat(formGoal.target) || goal.target,
    };
    setGoal(updatedGoal);
    localStorage.setItem('goal', JSON.stringify(updatedGoal));
    setIsEditing(false);
  };

  const percentComplete = Math.min((goal.saved / goal.target) * 100, 100);
  const recentActivity = [
    { date: 'May 22', source: 'Coupon at Fort Bragg', amount: 25 },
    { date: 'May 20', source: 'Weekly grocery discount', amount: 10 },
  ];

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h2 style={{ textAlign: 'center' }}>
        {user?.name ? `${user.name}'s Dashboard` : 'Team Member Dashboard'}
      </h2>

      {showCongrats && (
        <div style={{ padding: '1rem', margin: '1rem 0', backgroundColor: '#d4edda', color: '#155724', borderRadius: '8px' }}>
          🎉 Congratulations! You've reached your savings goal!
        </div>
      )}

      <div style={{ margin: '2rem 0', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Goal Progress</h3>
        {isEditing ? (
          <div>
            <input name="name" value={formGoal.name} onChange={handleEditChange} placeholder="Goal Name" /><br />
            <input name="target" type="number" value={formGoal.target} onChange={handleEditChange} placeholder="Target Amount" /><br />
            <button onClick={handleEditSave}>Save Goal</button>
          </div>
        ) : (
          <>
            <p><strong>{goal.name}</strong>: ${goal.saved} of ${goal.target}</p>
            <div style={{ height: '20px', background: '#eee', borderRadius: '10px' }}>
              <div style={{ width: `${percentComplete}%`, background: '#5e3b76', height: '100%', borderRadius: '10px' }}></div>
            </div>
            <button style={{ marginTop: '10px' }} onClick={() => setIsEditing(true)}>Edit Goal</button>
          </>
        )}
      </div>

      <div style={{ margin: '2rem 0', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Savings Summary</h3>
        <p>Total Saved: ${goal.saved}</p>
        <p>Average per Month: $145 (mock)</p>
        <p>Auto-Save: <strong>ON</strong></p>
      </div>

      <div style={{ margin: '2rem 0', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Recent Activity</h3>
        <ul>
          {recentActivity.map((item, idx) => (
            <li key={idx}>💵 {item.date} - ${item.amount} from {item.source}</li>
          ))}
        </ul>
      </div>

      <div style={{ margin: '2rem 0', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Settings</h3>
        <p>🚧 Coming soon: account preferences, goal alerts, and email notifications.</p>
      </div>
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
