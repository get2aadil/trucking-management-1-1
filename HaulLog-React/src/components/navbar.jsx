import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'; // Import Link for routing
import { useAuth } from '../AuthContext';
import './components.css';
import logo from '../Assets/logo.png'; // Import the logo image
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'; // Import Material-UI components

const NavigationBar = () => {
  // Check to make sure user is logged in before showing Shipments and Generate Reports
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false); // State for controlling dialog open/close
  const [truckId, setTruckId] = useState('');
  const [reportGenerating, setReportGenerating] = useState(false); // State to control report generation
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  const handleDialogOpen = () => {
    setOpenDialog(true);
  }

  const handleDialogClose = () => {
    setOpenDialog(false);
  }

  const handleGenerateReports = async () => {
    // Simulate report generation
    setReportGenerating(true);
    // Simulate delay
    setTimeout(() => {
      setReportGenerating(false);
      setNotificationOpen(true); // Open notification for successful report generation
    }, 2000);
  }

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  }

  return (
    <div className="navbar">
      <Link to='/' className='logo-link'>
        <img src={logo} alt="Logo" className="logo" />
      </Link>

      <div className="nav-links">
        {isLoggedIn && (
          <>
            <Link to="/landing" className="nav-item">Shipments</Link>
            <span className="nav-item" onClick={handleDialogOpen}>Generate Reports</span>
            <Link onClick={handleDialogOpen} className="nav-item">Add Expense</Link>
          </>
        )}
      </div>
      <div className="login-signup-links">
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="nav-item">Login</Link>
            <span className="nav-item"> | </span>
            <Link to="/signup" className="nav-item">Signup</Link>
          </>
        ) : (
          <Link onClick={handleLogout} className='nav-item'>Logout</Link>
        )}
      </div>
      {/* Dialog for Generate Reports */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle style={{ textAlign: 'center', color: '#2E0C6A', fontWeight: 'bold' }}>Generate Reports</DialogTitle>
        <DialogContent>
          <div className="input-container">
            <input type="text" placeholder="Enter Truck ID" value={truckId} onChange={(e) => setTruckId(e.target.value)} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: '#2E0C6A' }} onClick={handleDialogClose}>Cancel</Button>
          <Button style={{ color: '#2E0C6A' }} onClick={handleGenerateReports} disabled={reportGenerating}>
            {reportGenerating ? "Generating..." : "Generate Reports"}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Notification for report generation */}
      {notificationOpen && (
        <div className="notification">
          Reports successfully generated!
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
