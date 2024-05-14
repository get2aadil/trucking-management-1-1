import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import NavigationBar from '../components/navbar';
import { useAuth } from '../AuthContext';
import './styles.css';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const apiURL = `http://${window.location.hostname}:8080`;
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    let newErrors = {};

    if (!userId.trim()) {
      newErrors.userId = "User ID is required.";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(apiURL + '/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username: userId, password: password }),
        });

        if (response.ok) {
          console.log('Login successful');
          login();
          navigate('/landing');
          
        } else {
          const errorData = await response.json();
          console.error('Login failed:', errorData);
          setErrorMessage(errorData.errorMessage); // Set error message to display to the user
        }
      } catch (error) {
        console.error('Error during login:', error);
        setErrorMessage('Network error.', error.errorMessage); // Set a generic error message
      }
    }
  };

  return (
    <div>
      <NavigationBar />
      <div className="form-container">
        <h2 style={{ color: '#2E0C6A', fontWeight: 'bold' }}>LOGIN</h2>
        <input
          type="text"
          placeholder="Email ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        {errors.userId && <p className="error" style={{ color: 'red' }}>{errors.userId}</p>}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error" style={{ color: 'red' }}>{errors.password}</p>}
        {errorMessage && <p className="error" style={{ color: 'red' }}>{errorMessage}</p>}
        <button onClick={handleLogin}>Login</button>
        <p style={{ color: 'black' }}>
          New here? <Link to="/signup">Sign up now!</Link>
        </p>

        
      </div>
    </div>
  );
};

export default Login;
