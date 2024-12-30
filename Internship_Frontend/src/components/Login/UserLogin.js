import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const UserLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // State for "Remember Me"
  const navigate = useNavigate();

  useEffect(() => {
    // Apply background image to the entire page
    const bodyElement = document.body;
    bodyElement.style.backgroundImage = "url('assets/img/userl.png')";
    bodyElement.style.backgroundSize = 'cover';
    bodyElement.style.backgroundRepeat = 'no-repeat';
    bodyElement.style.backgroundPosition = 'center';
    bodyElement.style.margin = '0';
    bodyElement.style.padding = '0';
    bodyElement.style.height = '100vh';

    return () => {
      // Cleanup styles on component unmount
      bodyElement.style.backgroundImage = '';
      bodyElement.style.backgroundSize = '';
      bodyElement.style.backgroundRepeat = '';
      bodyElement.style.backgroundPosition = '';
      bodyElement.style.margin = '';
      bodyElement.style.padding = '';
      bodyElement.style.height = '';
    };
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('');
        setIsPasswordInvalid(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email: email,
        password: password,
        rememberMe: rememberMe, // Pass the rememberMe state to the backend if needed
      });

      if (response.data.status === 'OK') {
        if (response.data.message === 'User login successful') {
          alert('User login successful!');
          navigate('/user-dashboard');
        } else {
          setError('Unauthorized role. Only Users can log in.');
        }
      } else {
        setError(response.data.message || 'An unexpected error occurred.');
      }
    } catch (err) {
      if (err.response) {
        if (err.response.status === 401) {
          setError('Invalid email or password.');
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

  const handleForgotPassword = () => {
    // Redirect to Forgot Password page
    navigate('/forgot-password');
  };

  const handleRegister = () => {
    // Redirect to Register page for Users
    navigate('/registration');
  };

  return (
    <div className="login-container">
      <h2>User Login</h2>
      {error && <div className="error-message">{error}</div>}

      
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">User's Email *</label>
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
          <label htmlFor="password">User's Password *</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
            className={isPasswordInvalid ? 'invalid-password' : ''}
          />
        </div>

        {/* Remember Me and Forgot Password in Same Row */}
        <div className="remember-forgot-row">
          {/* Remember Me Checkbox */}
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          {/* Forgot Password Link */}
          <span 
            onClick={handleForgotPassword} 
            className="forgot-password-link"
          >
            Forgot Password?
          </span>
        </div>

        <button type="submit">Login</button>
      </form>

      {/* Register Link */}
      <div className="register-link-container">
        <p>Don't have an account? <span onClick={handleRegister} className="register-link">Register here</span></p>
      </div>
    </div>
  );
};

export default UserLogin;
