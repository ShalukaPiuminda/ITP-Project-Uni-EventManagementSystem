import React, { useEffect, useState } from "react";
import '../Utills/Payment.css';
import { useParams } from "react-router-dom";
import axios from "axios";

function Payment({ Amount, onPayByCard, onPayByCash }) {

  const {id} = useParams();
  const [amount, setAmount] = useState(0);

  useEffect(() => {
  
      axios.get(`http://localhost:8080/Api/getreservation/${id}`).then(res=>{
        console.log(res.data);
        setAmount(res.data.reservationFee);
      })
      .catch(err=>{
        console.log(err);
      })

  }, []);

  return (
    <div className="container">
      <form action="">
      <div className="Amount">Amount: Rs {amount}/=</div> 
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

function PaymentContainer() {
 

  const handlePayByCard = () => {
    // Handle payment by card
  };

  const handlePayByCash = () => {
    // Handle payment by cash
  };

  return (
    <Payment amount={amount} onPayByCard={handlePayByCard} onPayByCash={handlePayByCash} />
  );
}

export { Payment, PaymentContainer };
