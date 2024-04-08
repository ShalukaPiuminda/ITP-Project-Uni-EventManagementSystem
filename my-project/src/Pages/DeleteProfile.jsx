import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const DeleteProfile = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {

    axios.defaults.withCredentials = true;
    axios
      .delete(`http://localhost:8080/auth/deleteprofile/${id}`)
      .then((res) => {
        if (res.data.status) {
          Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "Deleted!",
                text: "Your profile has been deleted.",
                icon: "success"
              }).then(() => {
                navigate('/login');
              });
            } else {
              navigate('/home'); // Navigate to some other page if deletion is canceled
            }
          });
        }
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        // Optionally, you can display an error message or handle the error in another way
      });
  }, [id]);

  return (
    <div>DeleteProfile</div>
  )
}

export default DeleteProfile;
