import React, { useState, useEffect } from "react";
import axios from "axios";
import '../Utills/Payment.css'
import PaymentHeader from "./PaymentHeader";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";

function AddCashPayment() {
    const [order, setOrder] = useState({
        first_name: "",
        address: "",
        email: "",
        imageURL: "",
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

    const [formErrors, setFormErrors] = useState({
        first_name: '',
        email: '',
        zip_code: '',
        imageURL: '',
    });

    const handleOnChange = (e) => {
        const { value, name, type } = e.target;

        // If it's an image input, handle file upload
        if (type === 'file') {
            const file = e.target.files[0];
            if (file && !['image/jpeg', 'image/png'].includes(file.type)) {
                setFormErrors({ ...formErrors, imageURL: 'Please upload a JPG or PNG file' });
            } else {
                setFormErrors({ ...formErrors, imageURL: '' });

                // Read the file and convert it to a data URL
                const reader = new FileReader();
                reader.onloadend = () => {
                    setOrder(prevState => ({
                        ...prevState,
                        imageURL: reader.result // Set the data URL as the imageURL
                    }));
                };
                reader.readAsDataURL(file);
            }
        } else {
            // For other input fields, update order state normally
            setOrder(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValidForm = order.first_name && order.email && order.email.endsWith('@gmail.com') && /^\d+$/.test(order.zip_code) && order.imageURL;
        if (!isValidForm) {
            alert('Please fill in all required fields correctly.');
            return;
        }
        
        try {
            await axios.post("http://localhost:8080/cashpay/create_users", order);
            alert("Cash Payment Successfully!");
        } catch (error) {
            console.error('Error adding cash payment:', error);
        }
    };

    return (
        <>
            <Header/>
            <Navbar/>
            <PaymentHeader/>

            <div className="container">
                <form onSubmit={handleSubmit} className="form">
                    <div className="Amount">Event: {event}</div> 
                    <div className="Amount">Amount: Rs {amount}/=</div> 
                    <div className="row">
                        <div className="col">
                            <h1>Add Payment</h1>
                            <h3 className="title">PAY BY CASH</h3>
                            <img src="/img/cashpay.png" alt="Payment_Options" className="img-center" />
                            <br></br>
                            <label className="inputBox">Full Name:</label>
                            <input type="text" placeholder="Your name" id="first_name" name="first_name" onChange={handleOnChange} className={`inputBox ${formErrors.first_name ? 'error' : formErrors.first_name === '' ? 'valid' : ''}`} />
                            {formErrors.first_name && <span className="error-message">{formErrors.first_name}</span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="inputBox">Address:</label>
                            <input type="text" placeholder="street-locality" id="address" name="address" onChange={handleOnChange} className="inputBox" />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="inputBox">Email:</label>
                            <input type="text" placeholder="name@gmail.com"  id="email" name="email" onChange={handleOnChange} className={`inputBox ${formErrors.email ? 'error' : formErrors.email === '' ? 'valid' : ''}`} />
                            {formErrors.email && <span className="error-message">{formErrors.email}</span>}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <label className="inputBox">Zip Code:</label>
                            <input type="text" placeholder="00000"  id="zip_code" name="zip_code" onChange={handleOnChange} className={`inputBox ${formErrors.zip_code ? 'error' : formErrors.zip_code === '' ? 'valid' : ''}`} />
                            {formErrors.zip_code && <span className="error-message">{formErrors.zip_code}</span>}
                        </div>
                    </div>
                    <br/>
                    <div className="col">
                        <label className="inputBox" >Upload Payment Slip (JPG/PNG only): </label>
                        <input type="file" id="image" name="image" accept=".jpg, .png"   onChange={handleOnChange} className={`inputBox ${formErrors.image ? 'error' : formErrors.image === '' ? 'valid' : ''}`} />
                        {formErrors.imageURL && <span className="error-message">{formErrors.imageURL}</span>}
                    </div>
                    <button className="submit-btn">Add Payment</button>
                </form>
            </div>
        </>
    );
}

export default AddCashPayment;
