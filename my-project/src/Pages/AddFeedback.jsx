import React, { useState } from 'react';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import '../Utills/AddFeedback.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useNavigate } from 'react-router-dom';


const MySwal = withReactContent(Swal)

function AddFeedback() {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [event, setEvent] = useState('');
    const [rateDescription, setRateDescription] = useState('');
    const [rateCount, setRateCount] = useState(0);
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8080/feedback/addfeedback', { fullname, email, event, rateDescription, rateCount });
            setFullname('');
            setEmail('');
            setEvent('');
            setRateDescription('');
            setRateCount(0);
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Feedback submitted successfully!",
                showConfirmButton: false,
                timer: 1500
              }).then(() => {
                navigate('/feedback'); // Redirect after the alert
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Error submitting feedback. Please try again.",
                
              });
              
        }
    };

    return (
        <div className="add-feedback-container" style={{marginTop: "25px"}}>
            <h2>Add Feedback</h2>
            <form onSubmit={handleSubmit} className="feedback-form">
                <div className="form-group">
                    <label>Full Name:</label>
                    <input type="text" value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Event:</label>
                    <input type="text" value={event} onChange={(e) => setEvent(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Rate Description:</label>
                    <input type="text" value={rateDescription} onChange={(e) => setRateDescription(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Rate Count:</label>
                    <StarRatings
                        rating={rateCount}
                        starRatedColor="#FFD700"
                        changeRating={(newRating) => setRateCount(newRating)}
                        numberOfStars={5}
                        name='rateCount'
                        starDimension="25px"
                        starSpacing="5px"
                    />
                </div>
                <button type="submit" className="submit-button">Submit Feedback</button>
            </form>
        </div>
    );
}

export default AddFeedback;