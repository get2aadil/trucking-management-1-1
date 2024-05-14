// src/screens/invoice_page.js

import React, { useState } from 'react';
import Navbar from '../components/navbar'; // Import the Navbar component
import './styles.css'; // Import the CSS styles

const InvoicePage = () => {
  // State variables to manage visibility of dropdown options and selected IDs
  const [showTruckOptions, setShowTruckOptions] = useState(false);
  const [showDriverOptions, setShowDriverOptions] = useState(false);
  const [selectedTruckId, setSelectedTruckId] = useState(null);
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  // Function to handle report generation
  const handleGenerateReport = () => {
    // Add your report generation logic here
    console.log('Generating report...');
  };

  // Check if both driver ID and truck ID are selected
  const canGenerateReport = selectedTruckId && selectedDriverId;

  return (
    <div className="container">
      <Navbar /> {/* Render the modified Navbar */}
      <div className="content">
        {/* Add content for the Invoice Page */}
        <h1 style={{ color: '#2E0C6A', fontSize: '50px', marginTop: '3cm' }}>Invoice Details</h1> {/* Apply styles to the heading */}
        <h2 style={{ color: '#2E0C6A', fontSize: '40px', marginTop: '2cm' }}>Generate Report By:</h2> {/* Apply styles to the heading */}

        {/* Add dropdown lists */}
        <div style={{ marginTop: '2cm' }}>
          {/* Truck ID dropdown */}
          <select
            style={{
              width: '3cm',
              height: '1cm',
              marginRight: '2cm',
              background: 'rgba(255, 255, 255, 0.5)', // Transparent background
              color: '#2E0C6A', // Text color
              fontWeight: 'bold', // Bold text
              textAlign: 'center', // Center-align text
              fontSize: '14px', // Increase font size
            }}
            onClick={() => setShowTruckOptions(!showTruckOptions)} // Toggle visibility on click
            onBlur={() => setShowTruckOptions(false)} // Hide options on blur
            value={selectedTruckId || 'Truck ID'}
            onChange={(e) => setSelectedTruckId(e.target.value)}
          >
            <option disabled>Truck ID</option>
            <option value="truck1">Truck ID 1</option>
            <option value="truck2">Truck ID 2</option>
            <option value="truck3">Truck ID 3</option>
          </select>

          {/* Driver ID dropdown */}
          <select
            style={{
              width: '3cm',
              height: '1cm',
              background: 'rgba(255, 255, 255, 0.5)', // Transparent background
              color: '#2E0C6A', // Text color
              fontWeight: 'bold', // Bold text
              textAlign: 'center', // Center-align text
              fontSize: '14px', // Increase font size
            }}
            onClick={() => setShowDriverOptions(!showDriverOptions)} // Toggle visibility on click
            onBlur={() => setShowDriverOptions(false)} // Hide options on blur
            value={selectedDriverId || 'Driver ID'}
            onChange={(e) => setSelectedDriverId(e.target.value)}
          >
            <option disabled>Driver ID</option>
            <option value="driver1">Driver ID 1</option>
            <option value="driver2">Driver ID 2</option>
            <option value="driver3">Driver ID 3</option>
          </select>
        </div>

        {/* Generate Report button */}
        <button
          style={{
            marginTop: '2cm',
            width: '6cm',
            height: '1cm',
            backgroundColor: canGenerateReport ? '#2E0C6A' : '#ccc', // Change color based on condition
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: canGenerateReport ? 'pointer' : 'not-allowed', // Change cursor based on condition
          }}
          onClick={handleGenerateReport} // Call function on click
          disabled={!canGenerateReport} // Disable button based on condition
        >
          Generate Report
        </button>

        {/* Add additional content as needed */}
      </div>
    </div>
  );
};

export default InvoicePage;
