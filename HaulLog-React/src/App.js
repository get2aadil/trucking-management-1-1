// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/protected_route';
import Login from './screens/login'; // Adjust the path to import Login component
import Signup from './screens/signup'; // Adjust the path to import Signup component
import LandingPage from './screens/landing_page'; // Import the LandingPage component
import InvoicePage from './screens/invoice_page'; // Import the InvoicePage component
import LoginLandingPage from './screens/shipments_page';
import './App.css';

const App = () => {
  return (
    <Router>
      <AuthProvider>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<LandingPage />} /> 
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/invoice" element={<ProtectedRoute><InvoicePage /></ProtectedRoute>} />
          <Route exact path="/landing" element={<ProtectedRoute><LoginLandingPage/></ProtectedRoute>} />
        </Routes>
      </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
