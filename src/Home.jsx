import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h2>Welcome!!</h2>
        <p>Sign in or sign up to continue.</p>
      </div>
      <div className="home-links">
        <Link to="/signin">Sign In</Link>
        <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}

export default Home;
