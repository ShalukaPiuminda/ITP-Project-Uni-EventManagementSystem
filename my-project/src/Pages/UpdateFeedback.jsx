import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import StarRatings from 'react-star-ratings';
import '../Utills/AddFeedback.css';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const UpdateFeedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    event: '',
    rateDescription: '',
    rateCount: 0,
  });

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/feedback/feedback/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching feedback:', error);
      }
    };
  
    fetchFeedback();
  }, [id]);  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRatingChange = (newRating) => {
    setFormData((prevData) => ({
      ...prevData,
      rateCount: newRating,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/feedback/updatefeedback/${id}`, formData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Feedback updated successfully!",
        showConfirmButton: false,
        timer: 1500
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating feedback:', error);
    }
  };

  return (
    <div className="add-feedback-container" style={{marginTop: "25px"}}>
      <h2>Update Feedback</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label>Full Name:</label>
          <input type="text" name="fullname" value={formData.fullname} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Event:</label>
          <input type="text" name="event" value={formData.event} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Rate Description:</label>
          <input type="text" name="rateDescription" value={formData.rateDescription} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Rate Count:</label>
          <StarRatings
            rating={formData.rateCount}
            starRatedColor="#FFD700"
            changeRating={handleRatingChange}
            numberOfStars={5}
            name='rateCount'
            starDimension="25px"
            starSpacing="5px"
          />
        </div>
        <button type="submit" className="submit-button">Update Feedback</button>
      </form>
    </div>
  );
};

export default UpdateFeedback;