import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function PaymentDetails({ amount, date, userEmail }) {
  const [email, setEmail] = useState(userEmail);
  const [tokenId, setTokenId] = useState(generateTokenId());

  useEffect(() => {
    // Generate a new Token ID only when the component mounts
    setTokenId(generateTokenId());
  }, []);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSendEmail = (event) => {
    event.preventDefault(); // Prevent the form from submitting
    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailPattern.test(email)) {
      alert('Please enter a valid Gmail address.');
      return;
    }
    // Logic to send email with receipt
    console.log(`Sending receipt to ${email}`);
    // Display alert message
    alert('Receipt has been sent to your email successfully!');
  };

  function generateTokenId() {
    // Generate a random Token ID
    return Math.floor(1000 + Math.random() * 9000);
  }

  return (
    <div>
      <div className="border">
        <h3 className="title1">Status</h3>
        <img src="/img/pay.png" alt="Payment Successful" className="img1-center" />
        <p className="success-message">Your payment is completed successfully.</p>
        <div className="bold">Payment Amount: Rs {amount} /=</div>
        <div className="bold">Token ID: {tokenId}</div>
        {date && <div className="bold">Payment Date: {date}</div>}
      </div>
      <p className="question">Do you want a receipt sent to your email?</p>
      <div className="container3">
        <form onSubmit={handleSendEmail}>
          <div className="row3">
            <input
              type="email"
              className="code"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              pattern="[a-zA-Z0-9._%+-]+@gmail\.com"
              title="Please enter a valid Gmail address"
              required
            />
            <button type="submit" className="resend">Send Email</button>
          </div>
        </form>
      </div>
      <div className="container3">
        <Link to="/Home" className="home-button">Home</Link>
      </div>
    </div>
  );
}

export default PaymentDetails;
