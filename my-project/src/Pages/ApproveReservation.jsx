import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ApproveReservation = () => {
 
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        
        axios.post(`http://localhost:8080/Api/approve-reservation/${id}`)
    .then((res)=>{

        if(res.data.status){
            
            navigate('/reservation-admin')
        }

    })
  .catch(err=>console.log(err))   



    },[])

}

export default ApproveReservation