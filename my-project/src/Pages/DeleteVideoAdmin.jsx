import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const DeletevideoAdmin = () => {

    const { id } = useParams();

    const navigate = useNavigate();

useEffect (() => {
      axios
        .delete(`http://localhost:8080/video/deletevideo/${id}`)
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
                  text: "Your file has been deleted.",
                  icon: "success"
                });
              }
              navigate('/pastevents-admin');
            });
            navigate("/pastevents-admin");
          }
        })
        .catch((err) => {
          console.error("Error deleting user:", err);

        });
    }, []);
  };




  


export default DeletevideoAdmin;