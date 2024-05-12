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
      .post(`http://localhost:8080/auth/deactivateaccount/${id}`)
      .then((res) => {
        if (res.data.status) {
          Swal.fire({
            title: "Your account de-activated successfully !",
            text: "You clicked the button!",
            icon: "success"
          });
          navigate("/deactivatedmsg");
        }
      })
      .catch((err) => {
        console.error("Error deleting user:", err);

   
      });
  }, [id]);

  
}

export default DeleteProfile;
