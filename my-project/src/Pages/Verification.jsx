import React, { useState, useEffect } from "react";
import '../Utills/Payment.css';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';



function Verification() {
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(299); // 4 minutes and 59 seconds in seconds
  

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (event) => {
    setVerificationCode(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle verification code submission
    try {
      // Make a request to your backend to send the email
      const response = await axios.post('/api/send-verification-email', { email: 'user@example.com' });
      console.log(response.data.message);
      
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  };

  const handleResendCode = async() => {
    try {
      // Make a request to your backend to resend the verification code
      const response = await axios.post('/api/resend-verification-code', { email: 'user@example.com' });
      console.log(response.data.message);
    } catch (error) {
      console.error('Error resending verification code:', error);
    }
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  const navigate = useNavigate();
  const handleProceed = () => {
    navigate('/PaymentDetails');
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="verify">Verification Code</div>
        <span>We will send you a verification code via mobile or email. Please enter your code within five minutes</span>
        <img src="/img/veri.jpg" alt="verification" className="img1-center" />
        <div className="row1">
          <input
            type="text"
            className="code"
            placeholder="Enter verification code"
            value={verificationCode}
            onChange={handleChange}
          />
          <button type="button" className="resend" onClick={handleResendCode}>Resend Code</button>
        </div>
        <div className="countdown">{formatTime(countdown)}</div>
        <button type="button" className="proceed-btn" onClick={handleProceed}>Proceed</button>

      </form>
      
    </div>
  );
}

export default Verification;
