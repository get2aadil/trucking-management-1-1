import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavigationBar from '../components/navbar'; // Import the NavigationBar component
import './styles.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Initialize useNavigate
  const apiURL = `http://${window.location.hostname}:8080`;

  const handleSignup = async () => {
    let newErrors = {};

    if (!firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }
    if (!lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!email.match(/^[^@]+@\w+(\.\w+)+\w$/)) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!companyName.trim()) {
      newErrors.companyName = "Company name is required.";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8 || !password.match(/[a-z]/i) || !password.match(/[0-9]/) || !password.match(/[\^$*.\[\]{}()?\-"!@#%&/\\,><':;|_~`]/)) {
      newErrors.password = "Password must be at least 8 characters long and include a number, a lowercase letter, an uppercase letter, and a special character.";
    }
    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(apiURL + '/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
            companyName: companyName,
          }),
        });

        if (response.ok) {
          console.log('User successfully signed up!');
          alert('User successfully signed up!'); // Display success message
          navigate('/login'); // Redirect to the login page using navigate
        } else {
          console.error('Error signing up:', response.statusText);
          // Handle error (e.g., display error message)
        }
      } catch (error) {
        console.error('Error signing up:', error);
      
        if (error instanceof TypeError) {
          console.error('Network error. Please try again later.');
          // Handle network errors (e.g., display error message to user)
        } else if (error instanceof SyntaxError) {
          console.error('Error parsing JSON response.');
          // Handle JSON parsing errors (e.g., display error message to user)
        } else {
          console.error('Unexpected error:', error.message);
          // Handle other types of errors (e.g., display generic error message to user)
        }
      }
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="form-container">
        <h2 style={{ color: '#2E0C6A', fontWeight: 'bold' }}>SIGN UP</h2>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        {errors.firstName && <p className="error" style={{ color: 'red' }}>{errors.firstName}</p>}
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        {errors.lastName && <p className="error" style={{ color: 'red' }}>{errors.lastName}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error" style={{ color: 'red' }}>{errors.email}</p>}
        <input
          type="text"
          placeholder="Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        {errors.companyName && <p className="error" style={{ color: 'red' }}>{errors.companyName}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error" style={{ color: 'red' }}>{errors.password}</p>}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {errors.confirmPassword && <p className="error" style={{ color: 'red' }}>{errors.confirmPassword}</p>}
        <button onClick={handleSignup}>Signup</button>
        <p style={{ color: 'black' }}>
          Already a Member? <Link to="/login">Login</Link> here!
        </p>
      </div>
    </div>
  );
};

export default Signup;
