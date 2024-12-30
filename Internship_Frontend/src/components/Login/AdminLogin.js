import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false); // State to track invalid password
  const navigate = useNavigate();


  useEffect(() => {
    // Set background image dynamically
    const bodyElement = document.body;
    bodyElement.style.backgroundImage = "url('assets/img/adm.png')"; // Path to the background image
    bodyElement.style.backgroundSize = 'cover';
    bodyElement.style.backgroundRepeat = 'no-repeat';
    bodyElement.style.backgroundPosition = 'center';
    bodyElement.style.height = '100vh';
    bodyElement.style.margin = '0';
    bodyElement.style.padding = '0';

    return () => {
      // Cleanup styles on component unmount
      bodyElement.style.backgroundImage = '';
      bodyElement.style.backgroundSize = '';
      bodyElement.style.backgroundRepeat = '';
      bodyElement.style.backgroundPosition = '';
      bodyElement.style.height = '';
      bodyElement.style.margin = '';
      bodyElement.style.padding = '';
    };
  }, []);


  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
        setIsPasswordInvalid(false); // Reset the password field state
      }, 3000); // Error message will disappear after 3 seconds
      
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Make a POST request to the backend for admin login
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email: email,
        password: password
      });

      // Handle the response based on the role and login status
      if (response.data.status === 'OK') {
        if (response.data.message === 'Admin login successful') {
          alert('Admin login successful!');
          navigate('/admin-dashboard'); // Redirect to the admin dashboard
        } else if(response.data.message === 'Unauthorized role') {
          setError('Unauthorized role. Only Admins can log in.');
        }
      } else {
        setError(response.data.message || 'An unexpected error occurred.');
      }
    } catch (err) {
      if (err.response) {
        // Handle known HTTP error statuses
        if (err.response.status === 401) {
          setError('Unauthorized: Invalid email or password.');
          setIsPasswordInvalid(true);
        } else {
          setError(err.response.data.message || 'An error occurred.');
        }
      } else {
        setError('An error occurred. Please try again later.');
      }
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Login</h2>
      {error && <div className="error-message">{error}</div>}  {/* Show error message */}

      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Admin's Email *</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Admin's Password *</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className={isPasswordInvalid ? 'invalid-password' : ''} // Apply red border if invalid
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
