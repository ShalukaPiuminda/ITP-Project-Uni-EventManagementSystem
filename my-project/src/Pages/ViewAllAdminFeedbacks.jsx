import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import StarRatings from 'react-star-ratings';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import '../Utills/ViewAllAdminFeedbacks.css';
import Header from '../Components/Header';
import NavbarAdmin from '../Components/NavbarAdmin';
import Footer from '../Components/Footer';

const ViewAllAdminFeedbacks = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [filteredFeedbacks, setFilteredFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchText, setSearchText] = useState('');

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

    const filtered = feedbacks.filter(feedback =>
      feedback.fullname.toLowerCase().includes(searchText.toLowerCase()) ||
      feedback.event.toLowerCase().includes(searchText.toLowerCase()) ||
      feedback.rateCount.toString().includes(searchText.toLowerCase())
    );
    setFilteredFeedbacks(filtered);
  }, [searchText, feedbacks]);

  const handleDelete = async (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
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
          await axios.delete(`http://localhost:8080/deletefeedback/feedback/feedback/${id}`);
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

  const generateReport = () => {
    const doc = new jsPDF();
    doc.text("Feedback Report", 10, 10);

    const header = [['Name', 'Email', 'Event', 'Rate Description', 'Rate Count']];
    const data = [];

    filteredFeedbacks.forEach(feedback => {
      data.push([
        feedback.fullname,
        feedback.email,
        feedback.event,
        feedback.rateDescription,
        feedback.rateCount,
      ]);
    });

    const styles = {
      fontSize: 10,
      cellPadding: 2
    };

    const columnWidths = ['auto', 'auto', 'auto', 'auto', 'auto', 'auto'];

    doc.autoTable({
      head: header,
      body: data,
      startY: 20,
      styles: styles,
      columnStyles: {
        0: { fontStyle: 'bold' }
      },
      columnWidth: columnWidths,
      margin: { top: 30 }
    });

    doc.save("Feedback Report.pdf");
  };

  return (
 
    <>
   <Header/>
   <NavbarAdmin/>
    <div className="container2">
      <h2>All Feedbacks</h2>
      <div className="search">
        <input
          className="f-filter-search"
          value={searchText}
          type="text"
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <div className="isquare">
          <button className="f-filter-generate-btn" onClick={generateReport}>Generate Report</button>
        </div>
      </div>
      {error && <p>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Event</th>
                <th>Rate Description</th>
                <th>Rate Count</th>
                
              </tr>
            </thead>
            <tbody>
              {filteredFeedbacks.map((feedback) => (
                <tr key={feedback._id}>
                  <td>{feedback.fullname ? feedback.fullname.toLowerCase() : 'N/A'}</td>
                  <td>{feedback.email ? feedback.email.toLowerCase() : 'N/A'}</td>
                  <td>{feedback.event ? feedback.event.toLowerCase() : 'N/A'}</td>
                  <td>{feedback.rateDescription ? feedback.rateDescription.toLowerCase() : 'N/A'}</td>
                  <td>
                    {feedback.rateCount ? (
                      <StarRatings
                        rating={feedback.rateCount}
                        starRatedColor="#FFD700"
                        numberOfStars={5}
                        starDimension="20px"
                        starSpacing="2px"
                      />
                    ) : 'N/A'}
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default ViewAllAdminFeedbacks;
