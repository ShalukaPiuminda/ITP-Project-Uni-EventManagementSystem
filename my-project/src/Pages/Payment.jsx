import React from "react";
import '../Utills/Payment.css';


function Payment({ onPayByCard, onPayByCash }) {
  return (
    <div className="container">
      <form action="">
        <div className="Paymethod">Select a Payment Method</div>
        <img src="/img/online_payment.png" alt="Payment_Options" className="img-center" />
        <div className="row">
          <div className="Cash" onClick={onPayByCash}>Pay by cash</div>
          <div className="Card" onClick={onPayByCard}>Pay by card</div>
        </div>
      </form>
    </div>
  );
}

export default Payment;
