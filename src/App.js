import React from 'react';
import './LandingPageFixed.css';
import heroImage from './team-purple-hero.png'; // ✅ import image from src

function Home() {
  return (
    <div
      className="landing-container"
      style={{
        backgroundImage: `url(${heroImage})`, // ✅ use JS template string
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#4b2e83',
      }}
    >
      <h1 className="landing-header">Welcome to Team Purple</h1>
      <p className="landing-subtext">Helping military families save smarter.</p>
      <div className="landing-buttons">
        <a href="/signup">Join the Team</a>
        <a href="/login">Log In</a>
      </div>
    </div>
  );
}

export default Home;
