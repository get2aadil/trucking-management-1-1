// LandingPage.jsx

import React from 'react';
import NavigationBar from '../components/navbar'; // Import the NavigationBar component
import './styles.css';

const LandingPage = () => {
  return (
    <div>
      <NavigationBar /> {/* Include the NavigationBar component */}
      <div className="landing-container">
        <h1>Welcome to HaulLog!</h1>
        {/* Add more content for the landing page */}
      </div>
    </div>
  );
};

export default LandingPage;
