import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPasswordInvalid, setIsPasswordInvalid] = useState(false);
  const [rememberMe, setRememberMe] = useState(false); // State for Remember Me checkbox
  const navigate = useNavigate();

  useEffect(() => {
    // Check if email and password are saved in localStorage
    const savedEmail = localStorage.getItem('email');
    const savedPassword = localStorage.getItem('password');
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true); // If saved, remember user is checked
    }

    // Clear the error message after 3 seconds
    if (error) {
      const timer = setTimeout(() => {
        setError('');
        setIsPasswordInvalid(false);
      }, 3000);

      return () => clearTimeout(timer);
    }

    // Add background image via JavaScript
    const bodyElement = document.body;
    bodyElement.style.backgroundImage = "url('assets/img/doctorBgg.png')";
    bodyElement.style.backgroundSize = 'cover';
    bodyElement.style.backgroundRepeat = 'no-repeat';
    bodyElement.style.backgroundPosition = 'center';
    bodyElement.style.height = '100vh';
    bodyElement.style.margin = '0';
    bodyElement.style.padding = '0';
    bodyElement.style.overflow = 'hidden';

    return () => {
      // Cleanup background styles when component unmounts
      bodyElement.style.backgroundImage = '';
      bodyElement.style.backgroundSize = '';
      bodyElement.style.backgroundRepeat = '';
      bodyElement.style.backgroundPosition = '';
      bodyElement.style.height = '';
      bodyElement.style.margin = '';
      bodyElement.style.padding = '';
      bodyElement.style.overflow = '';
    };
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        email: email,
        password: password,
      });

      if (response.data.status === 'OK') {
        if (response.data.message === 'Doctor login successful') {
          alert('Doctor login successful!');

          // Save credentials in localStorage if Remember Me is checked
          if (rememberMe) {
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);
          } else {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
          }

          navigate('/doctor-dashboard');
        } else {
          setError('Unauthorized role. Only Doctors can log in.');
        }
      } else {
        setError(response.data.message || 'An unexpected error occurred.');
      }
    } catch (err) {
      if (err.response) {
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

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  const handleRegister = () => {
    navigate('/registration');
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  return (
    <div className="login-container">
      <h2>Doctor Login</h2>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Doctor's Email *</label>
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
          <label htmlFor="password">Doctor's Password *</label>
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

        <div className="remember-forgot-row">
          <div className="remember-me">
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>

          <span onClick={handleForgotPassword} className="forgot-password-link">
            Forgot Password?
          </span>
        </div>

        <button type="submit">Login</button>
      </form>

      <div className="register-link-container">
        <p>
          Don't have an account?{' '}
          <span onClick={handleRegister} className="register-link">
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default DoctorLogin;
