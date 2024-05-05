import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

const DeleteReservation = () => {

const {id} =useParams();

const navigate = useNavigate();
  useEffect(() => {
    axios
      .delete(`http://localhost:8080/Api/deletereservation/${id}`)
      .then((res) => {
        if (res.data.status) {
          Swal.fire({
            title: "Are you sure?",
            text: "",
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
          });
          navigate("/userreservation");
        }
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
      
      });
  }, []);


}

export default DeleteReservation