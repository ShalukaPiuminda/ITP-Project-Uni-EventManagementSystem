import React, { useState } from 'react';
import '../Utills/Payment.css';

function CashPay() {
  const [paymentSlip, setPaymentSlip] = useState(null);

  const handleFileChange = (e) => {
    setPaymentSlip(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Payment slip uploaded:', paymentSlip);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <h3 className="title">PAY BY CASH</h3>
            <div className="inputBox">
              <span>Full Name:</span>
              <input type="text" placeholder="Your name" />
            </div>
            <div className="inputBox">
              <span>Address:</span>
              <input type="text" placeholder="Your address" />
            </div>
            <div className="inputBox">
              <span>Email:</span>
              <input type="email" placeholder="example@example.com" />
            </div>
            <div className="inputBox">
              <span>Zip Code:</span>
              <input type="text" placeholder="00000" />
            </div>
          </div>

          <div className="col">
            <div className="inputBox">
              <span>Upload Payment Slip:</span>
              <input type="file" onChange={handleFileChange} />
            </div>
          </div>
        </div>
        <div className="row">
          <input type="submit" value="Back" className="back-btn" />
          <input type="submit" value="Submit" className="submit-btn" />
        </div>
      </form>
    </div>
  );
}

export default CashPay;
