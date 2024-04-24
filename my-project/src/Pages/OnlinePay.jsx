import React, { useState } from 'react';
import '../Utills/Payment.css';
import { useNavigate, Link } from "react-router-dom";
import Verification from './Verification';



function OnlinePay() {
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [nameOnCard, setNameOnCard] = useState('');
  const [cvn, setCvn] = useState('');
  const [saveCardDetails, setSaveCardDetails] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [formErrors, setFormErrors] = useState({
    creditCardNumber:'',
    fullName: '',
    email: '',
    zipCode: '',
    nameOnCard:'',
    cvn: '',
  });
  
  const navigate = useNavigate();

  const handleFullNameChange = (event) => {
    const value = event.target.value;
    setFullName(value);
    setFormErrors({ ...formErrors, fullName: value ? '' : 'Full Name is required' });
    if (!/^[a-zA-Z\s]*$/.test(value)) {
      setFormErrors({ ...formErrors, fullName: 'Full Name must contain only letters' });
    }
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    const isValidEmail = value.endsWith('@gmail.com');
    setFormErrors({ ...formErrors, email: isValidEmail ? '' : 'Email must end with @gmail.com' });
  };

  const handleAddressChange = (event) => {
    const value = event.target.value;
    setAddress(value);
  };

  const handleZipCodeChange = (event) => {
    const value = event.target.value;
    setZipCode(value);
    const isValidZipCode = /^\d*$/.test(value);
    setFormErrors({ ...formErrors, zipCode: isValidZipCode ? '' : 'Zip Code must contain only numbers' });
  };
  
  const handleNameOnCardChange = (event) => {
    const value = event.target.value;
    setNameOnCard(value);
    setFormErrors({ ...formErrors, nameOnCard: value ? '' : 'Name On Card is required' });
    if (value && !/^[a-zA-Z\s]*$/.test(value)) {
      setFormErrors({ ...formErrors, nameOnCard: 'Name must contain only letters' });
    } else {
      setFormErrors({ ...formErrors, nameOnCard: '' });
    }
  };

  
  const handleCreditCardNumberChange = (event) => {
    const formattedValue = event.target.value.replace(/\D/g, '');
    const formattedNumber = formattedValue.match(/.{1,4}/g)?.join('-');
    setCreditCardNumber(formattedNumber);
  };
  
  const handleCvnChange = (event) => {
    const value = event.target.value;
    setCvn(value);
    const isValidCvn = /^\d*$/.test(value);
    setFormErrors({ ...formErrors, cvn: isValidCvn ? '' : 'CVN must contain only numbers' });
  };

  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i <= currentYear + 6; i++) {
      years.push(i);
    }
    return years;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValidForm = fullName && email && zipCode && cvn && email.endsWith('@gmail.com');
    if (!isValidForm) {
      setFormErrors({
        fullName: fullName ? '' : 'Full Name is required',
        email: email ? (email.endsWith('@gmail.com') ? '' : 'Email must end with @gmail.com') : 'Email is required',
        zipCode: zipCode ? (/\d+/.test(zipCode) ? '' : 'Zip Code must contain only numbers') : 'Zip Code is required',
        nameOnCard: nameOnCard ? (/[a-zA-Z\s]+/.test(nameOnCard) ? '' : 'Name On Card must contain only letters') : 'Name On Card is required',
        cvn: cvn ? (/\d+/.test(cvn) ? '' : 'CVN must contain only numbers') : 'CVN is required',
      });
      alert('Please fill in all required fields correctly.');
    } else {
      console.log('Form submitted successfully!');
      if (saveCardDetails) {
        
      }
      navigate('/Verification');
      setShowVerification(true);
    }
  };

  const handlePayment = () => {
    navigate('/Payment');
  };

  const handleTermsAndConditions = () => {
    navigate('/TermsAndConditions');
  };
  

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <h3 className="title">Personal Details</h3>
            <div className="inputBox">
              <span>Full Name:</span>
              <input type="text" placeholder="Your name" value={fullName} onChange={handleFullNameChange} />
              {formErrors.fullName && <span className="error-message">{formErrors.fullName}</span>}
            </div>
            <div className="inputBox">
              <span>Email:</span>
              <input type="email" placeholder="example@gmail.com" value={email} onChange={handleEmailChange} />
              {formErrors.email && <span className="error-message">{formErrors.email}</span>}
            </div>
            <div className="inputBox">
              <span>Address:</span>
              <input type="text" placeholder="Street - Locality" value={address} onChange={handleAddressChange} />
            </div>
            <div className="flex">
              <div className="inputBox">
                <span>Zip Code:</span>
                <input type="text" placeholder="00000" value={zipCode} onChange={handleZipCodeChange} />
                {formErrors.zipCode && <span className="error-message">{formErrors.zipCode}</span>}
              </div>
            </div>
          </div>

          <div className="col">
            <h3 className="title">Payment</h3>
            <div className="inputBox">
              <span>Cards Accepted:</span>
              <img src="/img/visa.png" alt="visa" />
              <img src="/img/Mastercard.jpg" alt="Matercard" />
              <img src="/img/american_express.jpeg" alt="AmericanExpress" />
            </div>
            <div className="inputBox">
              <span>Name on Card:</span>
              <input type="text" placeholder="Cardholder's Name" value={nameOnCard} onChange={handleNameOnCardChange} />
              {formErrors.nameOnCard && <span className="error-message">{formErrors.nameOnCard}</span>}
            </div>
            <div className="inputBox">
              <span>Credit Card Number:</span>
              <input
                type="text"
                placeholder="1111-2222-3333-4444"
                value={creditCardNumber}
                onChange={handleCreditCardNumberChange}
                maxLength="19"
              />
            </div>
            <div className="inputBox1">
              <span>Exp Month:
              <select>
                <option value="01">January</option>
                <option value="02">February</option>
                <option value="03">March</option>
                <option value="04">April</option>
                <option value="05">May</option>
                <option value="06">June</option>
                <option value="07">July</option>
                <option value="08">August</option>
                <option value="09">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
              </span>
            </div>
            <div className="inputBox1">
              <span>Exp Year:
              <select>
                {generateYears().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              </span>
            </div>
            <div className="inputBox">
              <span>CVN:</span>
              <input type="text" placeholder="1234" value={cvn} onChange={handleCvnChange} />
              <span className="gray-text">This is the three-letter code printed behind your card</span>
              {formErrors.cvn && <span className="error-message">{formErrors.cvn}</span>}
            </div>
            <div className="row2">
            <div className="inputBox">
              <input
                type="checkbox"
                checked={saveCardDetails}
                onChange={() => setSaveCardDetails(!saveCardDetails)}
                id="saveCardDetails"
              />
              <label htmlFor="saveCardDetails">
                Save my card details for faster payments.
                <br/>
               I agree to <Link to="/TermsAndConditions" onClick={handleTermsAndConditions} className="terms-link">Terms and Conditions</Link>.
              </label>
            </div>
          </div>
          </div>
        </div>
        <div className="row">
          <button type="button" onClick={handlePayment} className="back-btn1">Back</button>
          <button type="submit" className="submit-btn" >Proceed to Pay</button>
        </div>
      </form>
      {showVerification && <Verification />}
    </div>
  );
}

export default OnlinePay;
