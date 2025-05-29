import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Welcome to Team Purple</h1>
      <p>Helping military families save smarter.</p>
      <Link to="/login">Team Member Login</Link>
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
  const [goal, setGoal] = useState(() => {
    return JSON.parse(localStorage.getItem('goal')) || {
      name: 'College Fund',
      target: 2000,
      saved: 1200,
    };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formGoal, setFormGoal] = useState({ ...goal });

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
      <h2>Team Member Dashboard</h2>

      <div style={{ margin: '2rem 0', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Goal Progress</h3>
        {isEditing ? (
          <div>
            <input
              name="name"
              value={formGoal.name}
              onChange={handleEditChange}
              placeholder="Goal Name"
            /><br />
            <input
              name="target"
              type="number"
              value={formGoal.target}
              onChange={handleEditChange}
              placeholder="Target Amount"
            /><br />
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
    </div>
  );
}

function PartnerDashboard() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Partner Dashboard</h2>
      <p>This is where partners will see coupon performance, engagement metrics, etc. (Placeholder)</p>
    </div>
  );
}

function Admin() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
  }, []);

  const filteredUsers = users.filter(user => {
    return (
      (filter === 'all' || user.role === filter) &&
      (filter === 'partner' || filter === 'admin' ? user.name.toLowerCase().includes(search.toLowerCase()) : true)
    );
  });

  const handleDeactivate = (email) => {
    const updatedUsers = users.map(user =>
      user.email === email ? { ...user, status: 'deactivated' } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const exportCSV = () => {
    const headers = ['Name', 'Email', 'Role', 'Status'];
    const rows = users.map(u => [u.name, u.email, u.role, u.status || 'active']);
    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "users.csv";
    link.click();
  };

  const countByRole = role => users.filter(u => u.role === role).length;
  const activeCount = users.filter(u => u.status !== 'deactivated').length;
  const deactivatedCount = users.length - activeCount;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Admin Dashboard</h2>

      <div style={{ marginBottom: '1rem' }}>
        <label>Filter by Role: </label>
        <select value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="member">Team Member</option>
          <option value="partner">Partner</option>
          <option value="admin">Admin</option>
        </select>
        {(filter === 'partner' || filter === 'admin') && (
          <input
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ marginLeft: '1rem' }}
          />
        )}
        <button onClick={exportCSV} style={{ marginLeft: '1rem' }}>Export CSV</button>
      </div>

      <div style={{ marginBottom: '2rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Quick Stats</h3>
        <p>Total Users: {users.length}</p>
        <p>Team Members: {countByRole('member')}</p>
        <p>Partners: {countByRole('partner')}</p>
        <p>Admins: {countByRole('admin')}</p>
        <p>Active Accounts: {activeCount}</p>
        <p>Deactivated Accounts: {deactivatedCount}</p>
      </div>

      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.status || 'active'}</td>
              <td>
                {user.status !== 'deactivated' && (
                  <button onClick={() => handleDeactivate(user.email)}>Deactivate</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function Settings() {
  return <div style={{ padding: '2rem' }}>User Settings (Protected)</div>;
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
            <button onClick={logout} style={{ marginLeft: '1rem', color: 'white' }}>Log Out</button>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={user ? <Dashboard /> : <Home />} />
        <Route path="/admin" element={user?.role === 'admin' ? <Admin /> : <Home />} />
        <Route path="/settings" element={user ? <Settings /> : <Home />} />
        <Route path="/admin-login" element={<AdminLogin setUser={setUser} />} />
        <Route path="/partner-dashboard" element={user?.role === 'partner' ? <PartnerDashboard /> : <Home />} />
      </Routes>
    </Router>
  );
}

export default App;
