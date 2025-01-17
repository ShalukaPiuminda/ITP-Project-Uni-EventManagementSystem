import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


const DeleteUser = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    axios
      .delete(`http://localhost:8080/auth/deleteuser/${id}`)
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
          });
          navigate("/admindashboard");
        }
      })
      .catch((err) => {
        console.error("Error deleting user:", err);
        // Optionally, you can display an error message or handle the error in another way
      });
  }, []);
};

export default DeleteUser;
