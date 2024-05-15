import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import Swal from 'sweetalert2';
import '../Utills/ViewAllFeedbacks.css';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const ViewAllFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/feedback/feedback');
        setFeedbacks(response.data);
        setFilteredFeedbacks(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching feedbacks. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success swal2-confirm',
        cancelButton: 'btn btn-danger swal2-cancel',
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons.fire({
      title: 'Are you sure?',
      text: 'You want to delete the feedback from',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8080/feedback/deletefeedback/${id}`);
          setFeedbacks((prevFeedbacks) => prevFeedbacks.filter((feedback) => feedback._id !== id));
          setFilteredFeedbacks((prevFilteredFeedbacks) => prevFilteredFeedbacks.filter((feedback) => feedback._id !== id));
          swalWithBootstrapButtons.fire({
            title: 'Deleted!',
            text: 'Your feedback form has been deleted.',
            icon: 'success',
          });
        } catch (error) {
          console.error('Error deleting feedback:', error);
          alert('Error deleting feedback. Please try again later.');
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire({
          title: 'Cancelled',
          text: 'Your feedback form is safe!',
          icon: 'error',
        });
      }
    });
  };

  return (

    <>
    <Header/>
    <Navbar/>
    <div className="container1">
      <h2>All Feedbacks</h2>
      {error && <p>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
        
          <div className="feedbacks">
            {filteredFeedbacks.map((feedback) => (
              <div key={feedback._id} className="feedback-box">
                <div className="feedback-content">
                  <p><strong>Name:</strong> {feedback.fullname ? feedback.fullname.toLowerCase() : 'N/A'}</p>
                  <p><strong>Email:</strong> {feedback.email ? feedback.email.toLowerCase() : 'N/A'}</p>
                  <p><strong>Event:</strong> {feedback.event ? feedback.event.toLowerCase() : 'N/A'}</p>
                  <p><strong>Rate Description:</strong> {feedback.rateDescription ? feedback.rateDescription.toLowerCase() : 'N/A'}</p>
                  <div className="rating">
                    <strong>Rate Count:</strong>
                    {feedback.rateCount ? (
                      <StarRatings
                        rating={feedback.rateCount}
                        starRatedColor="#FFD700"
                        numberOfStars={5}
                        starDimension="20px"
                        starSpacing="2px"
                      />
                    ) : 'N/A'}
                  </div>
                </div>
                <div className="feedback-actions">
                  <Link to={`/update-feedback/${feedback._id}`}>
                    <button className="btn-warning">Update</button>
                  </Link>
                  <button className="btn-danger" onClick={() => handleDelete(feedback._id)}>Delete</button>
                </div>
              </div>
            ))}
             <Link to="/add-feedback" className="add-button">Give Feedback</Link>
          </div>
        </>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default ViewAllFeedbacks;
