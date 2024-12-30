import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // 1 for entering email, 2 for OTP, 3 for setting new password
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'error' or 'success'
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setMessage('An OTP has been sent to your email.');
        setMessageType('success');
        setStep(2);
      } else {
        setMessage('User Not Found');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setMessageType('error');
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        setMessage('OTP verified. Please set your new password.');
        setMessageType('success');
        setStep(3);
      } else {
        setMessage('Invalid OTP. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      setMessageType('error');
    }
  };

  const handleSetNewPassword = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      setMessageType('error');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });
      if (response.ok) {
        setMessage('Your password has been reset successfully.');
        setMessageType('success');
        setStep(1); // Reset to the initial step
        setEmail('');
        setOtp('');
        setNewPassword('');
        setConfirmPassword('');
        navigate('/');
      } else {
        setMessage('An error occurred while resetting your password. Please try again.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('An error occurred while resetting your password. Please try again.');
      setMessageType('error');
    }
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>

      {step === 1 && (
        <div className="form-group">
          <label htmlFor="email">Enter your email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email"
          />
          <button onClick={handleResetPassword}>Send Email</button>
        </div>
      )}

      {step === 2 && (
        <div className="form-group">
          <label htmlFor="otp">Enter the OTP sent to your email</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            placeholder="Enter OTP"
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}

      {step === 3 && (
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Enter new password"
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="Confirm new password"
          />
          <button onClick={handleSetNewPassword}>Set New Password</button>
        </div>
      )}

      {message && (
        <div className={`message-box ${messageType === 'error' ? 'error-message' : 'success-message'}`}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
