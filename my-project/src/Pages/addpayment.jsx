import { useState , useEffect} from "react";
import axios from "axios";
import '../Utills/addorder.css'
import '../Utills/Payment.css'
import PaymentHeader from "./PaymentHeader";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function AddPayment() {
    const [payment, setPayment] = useState({
        U_name: "",
        card_number: "",
        card_holder: "",
        expir_date: "",
        cvc: "",
        coupon_code: "",
        save_card_details: false,
        
    });
    const [event, setEvent] = useState('');
        const [amount, setAmount] = useState(0);
        useEffect(() => {
            fetch(``)
              .then(response => response.json())
              .then(data => {
                setAmount(data.amount);
                setEvent(data.event);
              })
              .catch(error => console.error('Error fetching reservation data:', error));
          }, []);

    const [errors, setErrors] = useState({});

    const handleOnChange = (e) => {
        const { value, name } = e.target;

        // Validation for user name (only letters)
        if (name === "U_name" && !/^[a-zA-Z\s]+$/.test(value)) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: "Please enter only letters for the user name" }));
        }
        // Validation for card holder name (only letters)
        else if (name === "card_holder" && !/^[a-zA-Z\s]+$/.test(value)) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: "Please enter only letters for the card holder name" }));
        }
        // Validation for card number format
        else if (name === "card_number") {
            const formattedCardNumber = value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ");
            setPayment(prevState => ({
                ...prevState,
                [name]: formattedCardNumber.trim()
            }));
        }
        // Validation for CVN (only numbers)
        else if (name === "cvc" && !/^\d*$/.test(value)) {
            setErrors(prevErrors => ({ ...prevErrors, [name]: "CVN must contain only numbers" }));
        }
        // Reset errors if no validation error
        else {
            setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
            setPayment(prevState => ({
                ...prevState,
                [name]: value
            }));
        }

        // Check if all required fields are filled for enabling the button
        const isValidForm = Object.values(payment).every(value => value !== "");
        setPayment(prevState => ({
            ...prevState,
            agree_terms: isValidForm
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await axios.post("http://localhost:8080/cardpay/create_payment", payment);
        console.log(data);
        alert("Payment confirmed!");
    };

    // Function to generate a random 4-digit coupon code
    const generateCouponCode = () => {
        const code = Math.floor(1000 + Math.random() * 9000);
        setPayment(prevState => ({
            ...prevState,
            coupon_code: code.toString()
        }));
    };

    return (
       <>
 <Header/>
 <Navbar/>

     <PaymentHeader/>

        <div className="container">
            <form onSubmit={handleSubmit}>
            <div className="Amount">Event: {event}</div> 
      <div className="Amount">Amount: Rs {amount}/=</div> 
            <h1>Add Payment</h1>
              <h3 className="title">PAY BY CARD</h3>
            <img src="/img/card.png" alt="Payment_Options" className="img-center1" />
<div className="row">
          <div className="col">
            <div className="inputBox">
            
                    <span>Full Name:</span>
                    <input type="text" id="U_name" placeholder="Your name" name="U_name" onChange={handleOnChange} />
                    {errors.U_name && <span className="error">{errors.U_name}</span>}
                
</div>        

           
            <div className="inputBox">
              <span>Cards Accepted:</span>
              <img src="/img/visa.png" alt="visa" className="img" />
              <img src="/img/Mastercard.jpg" alt="Matercard" className="img"/>
              <img src="/img/american_express.jpeg" alt="AmericanExpress" className="img" />
            </div>

<div className="inputBox">
              <span>Name on Card:</span>
                        <input type="text" id="card_holder" name="card_holder" onChange={handleOnChange} />
                        {errors.card_holder && <span className="error">{errors.card_holder}</span>}
                    </div>

<div className="inputBox">
              <span>Credit Card Number:</span>
                        <input type="text" placeholder="1111-2222-3333-4444" id="card_number" name="card_number" onChange={handleOnChange} />
                    </div>
                    
                
                <div className="input-group">
                    <div>
                        <label>Expiry Date:</label>
                        <input type="date" id="expir_date" name="expir_date" onChange={handleOnChange} />
                    </div>
                    <br></br>
                    <div>
                        <label>CVC:</label>
                        <input type="text" id="cvc" name="cvc" onChange={handleOnChange} />
                        {errors.cvc && <span className="error">{errors.cvc}</span>}
                    </div>
                </div>
                <br></br>
                <div className="input-group">
                    <label>Coupon Code:</label>
                    <input type="text"  id="coupon_code" name="coupon_code" value={payment.coupon_code} onChange={handleOnChange} />
                    <button type="button" className="generate" onClick={generateCouponCode}>Generate</button>
                </div>
                <br></br>
                <div className="input-group">
                        <input type="checkbox" name="save_card_details" checked={payment.save_card_details} onChange={handleOnChange} />
                        <label>Save card details.
                        I agree to the terms and conditions
                    </label>
                </div>
                <br></br>
               
                <button id="cbtn" className="proceed-btn" disabled={!payment.agree_terms}>Confirm Payment</button>
                </div>
                </div>
            </form>
            </div>
            <Footer/>
            </>
    );
}

export default AddPayment;
