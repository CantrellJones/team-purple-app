import React, { useState, useEffect } from 'react';

function App() {
  const [teamMemberName, setTeamMemberName] = useState('Team Member'); // Default fallback
  const [showSettings, setShowSettings] = useState(false);
  const [showCongrats, setShowCongrats] = useState(false);
  const [goalReachedDate, setGoalReachedDate] = useState(null);

  // Simulate goal reached logic (for testing)
  useEffect(() => {
    // In real usage, replace this with actual goal-check logic
    const goalMet = true;
    if (goalMet && !goalReachedDate) {
      const now = new Date();
      setGoalReachedDate(now);
      setShowCongrats(true);
    }

    // Hide congrats message after 7 days
    if (goalReachedDate) {
      const now = new Date();
      const diffDays = (now - new Date(goalReachedDate)) / (1000 * 60 * 60 * 24);
      if (diffDays > 7) {
        setShowCongrats(false);
      }
    }
  }, [goalReachedDate]);

  useEffect(() => {
    // Simulate fetching name from login/session
    const storedName = sessionStorage.getItem('teamMemberName');
    if (storedName) {
      setTeamMemberName(storedName);
    }
  }, []);

  const toggleSettings = () => {
    setShowSettings(prev => !prev);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center' }}>{teamMemberName}'s Dashboard</h1>

      <div style={{ textAlign: 'center', margin: '1rem 0' }}>
        <button onClick={toggleSettings} style={{ padding: '0.5rem 1rem', fontSize: '1rem' }}>
          {showSettings ? 'Close Settings' : 'Settings'}
        </button>
      </div>

      {showSettings && (
        <div style={{ margin: '1rem auto', padding: '1rem', border: '1px solid #ccc', maxWidth: '400px' }}>
          <h2>Settings</h2>
          <p>Future options may include:</p>
          <ul>
            <li>Change password</li>
            <li>Edit email address</li>
            <li>Notification preferences</li>
            <li>Goal transfer percentage (25%, 50%, 75%, 100%)</li>
          </ul>
        </div>
      )}

      {showCongrats && (
        <div style={{
          margin: '1rem auto',
          padding: '1rem',
          maxWidth: '500px',
          backgroundColor: '#e6ffe6',
          border: '2px solid #4CAF50',
          borderRadius: '8px',
          textAlign: 'center',
          fontSize: '1.2rem'
        }}>
          🎉 Congratulations, {teamMemberName}! You reached your savings goal!
        </div>
      )}

      {/* More dashboard content can go here */}
    </div>
  );
}

export default App;
