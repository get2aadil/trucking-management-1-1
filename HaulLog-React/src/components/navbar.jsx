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
  const [truckId, setTruckId] = useState('');
  const [reportGenerating, setReportGenerating] = useState(false); // State to control report generation
  const [notificationOpen, setNotificationOpen] = useState(false);
  const apiURL = `http://${window.location.hostname}:8080`;
  const [openGenerateReportDialog, setOpenGenerateReportDialog] = useState(false);
  const [openAddExpenseDialog, setOpenAddExpenseDialog] = useState(false);
  const [cost, setCost] = useState('');
  const [description, setDescription] = useState('');
  const [employeeId] = useState(101); // Assuming employee ID is known
  const [notification, setNotification] = useState({open: false, message: ''});

  const handleLogout = () => {
    logout();
    navigate("/");
  }

  const handleGenerateReportDialogOpen = () => {
    setOpenGenerateReportDialog(true);
  }
  
  const handleGenerateReportDialogClose = () => {
    setOpenGenerateReportDialog(false);
  }
  
  const handleAddExpenseDialogOpen = () => {
    setOpenAddExpenseDialog(true);
  }

  const isValidNumber = (value) => {
    return /^\d+$/.test(value);
  }
  
  const isValidDescription = (value) => {
    return value.trim().length > 0;
  }

  

  const handleNotificationClose = () => {
    setNotification({ open: false, message: '' });
  }

  const handleAddExpense = async () => {
    if (!isValidNumber(truckId) || !isValidNumber(cost) || !isValidDescription(description)) {
      setNotification({open: true, message: 'Please enter valid inputs.'});
      return;
    }
  
    try {
      const response = await fetch(apiURL + '/expenses/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          truckId: parseInt(truckId),
          employeeId: employeeId,
          cost: parseInt(cost),
          description: description
        })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNotification({open: true, message: 'Expense successfully added!'});
      setOpenAddExpenseDialog(false);
      // Clear form fields
      setTruckId('');
      setCost('');
      setDescription('');
      setTimeout(handleNotificationClose,3000);
    } catch (error) {
      console.error('Error adding expense:', error);
      setNotification({open: true, message: 'Error adding expense.'});
      setTimeout(handleNotificationClose,3000);
    }
  }
  
  const handleAddExpenseDialogClose = () => {
    setOpenAddExpenseDialog(false);
  }
  const handleGenerateReports = async () => {
    if (!truckId) return;
  
    setReportGenerating(true);
    try {
      const response = await fetch(apiURL + '/expenses/truck/'+ truckId);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      // Store the data in local storage to pass it to the report page
      localStorage.setItem('reportData', JSON.stringify(data));
      navigate('/report');
    } catch (error) {
      console.error('Error fetching report data:', error);
    } finally {
      setReportGenerating(false);
    }
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
            <Link className="nav-item" onClick={handleGenerateReportDialogOpen}>Generate Reports</Link>
            <Link className="nav-item" onClick={handleAddExpenseDialogOpen}>Add Expense</Link>
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
      <Dialog open={openGenerateReportDialog} onClose={handleGenerateReportDialogClose}>
        <DialogTitle style={{ textAlign: 'center', color: '#2E0C6A', fontWeight: 'bold' }}>Generate Reports</DialogTitle>
        <DialogContent>
          <div className="input-container">
            <input type="text" placeholder="Enter Truck ID" value={truckId} onChange={(e) => setTruckId(e.target.value)} />
          </div>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: '#2E0C6A' }} onClick={handleGenerateReportDialogClose}>Cancel</Button>
          <Button style={{ color: '#2E0C6A' }} onClick={handleGenerateReports} disabled={reportGenerating}>
            {reportGenerating ? "Generating..." : "Generate Reports"}
          </Button>
        </DialogActions>
      </Dialog>
  
{/* Dialog for Add Expense */}
<Dialog open={openAddExpenseDialog} onClose={handleAddExpenseDialogClose}>
      <DialogTitle style={{ textAlign: 'center', color: '#2E0C6A', fontWeight: 'bold' }}>Add Expense</DialogTitle>
      <DialogContent>
        <div className="input-container">
          <input type="text" placeholder="Truck ID" value={truckId} onChange={(e) => setTruckId(e.target.value)} />
        </div>
        <div className="input-container">
          <input type="text" placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} />
        </div>
        <div className="input-container">
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
      </DialogContent>
      <DialogActions>
        <Button style={{ color: '#2E0C6A' }} onClick={handleAddExpenseDialogClose}>Cancel</Button>
        <Button style={{ color: '#2E0C6A' }} onClick={handleAddExpense}>
          Add Expense
        </Button>
      </DialogActions>
    </Dialog>

    {/* Notification */}
    {notification.open && (
      <div className="notification">
        {notification.message}
      </div>
    )}
  </div>
  );
};

export default NavigationBar;
