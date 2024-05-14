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

  return (
    <div className="navbar">
      <Link to='/' className='logo-link'>
        <img src={logo} alt="Logo" className="logo" />
      </Link>
      
      <div className="nav-links">
        {
          isLoggedIn && (
            <>
            <Link to="/landing" className="nav-item">Shipments</Link>
            <Link to="/reports" className="nav-item">Generate Reports</Link>
            <Link onClick={handleDialogOpen} className="nav-item">Add Expense</Link> {/* Button instead of Link */}
            </>
          )
        }
      </div>
      <div className="login-signup-links">
        {
          !isLoggedIn ? (
            <>
            <Link to="/login" className="nav-item">Login</Link>
            <span className="nav-item"> | </span>
            <Link to="/signup" className="nav-item">Signup</Link>
            </>
          ) : (
            <Link onClick={handleLogout} className='nav-item'>Logout</Link>
          )
        }
        
      </div>
      {/* Dialog for Add Expense */}
      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle style={{ textAlign: 'center', color: '#2E0C6A', fontWeight: 'bold' }}>Add Expense</DialogTitle>
        <DialogContent>
          <div className="input-container">
            <input type="text" placeholder="Truck ID" /> {/* Truck ID input */}
          </div>
          <div className="input-container">
            <input type="text" placeholder="Cost" /> {/* Cost input */}
          </div>
          <div className="input-container">
            <input type="text" placeholder="Description" /> {/* Description input */}
          </div>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: '#2E0C6A' }} onClick={handleDialogClose}>Cancel</Button>
          <Button style={{ color: '#2E0C6A' }} onClick={handleDialogClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default NavigationBar;
