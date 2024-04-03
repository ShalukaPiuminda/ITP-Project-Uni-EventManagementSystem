import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const DeleteNotification = () => {

const {id} = useParams();
const navigate = useNavigate();

useEffect(()=>{

    /*fetch(`http://localhost:5000/deletenotifications/${id}`,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json'
        }
    })
   .then(res=>res.json())
   .then(data=>{
        console.log(data)
        navigate('/notification')
    })
   .catch(err=>console.log(err))*/
    axios.delete(`http://localhost:8080/admin/deletenotifications/${id}`)
    .then((res)=>{

        if(res.data.status){
            
            navigate('/notification')
        }

    })
  .catch(err=>console.log(err))   


},[])



}

export default DeleteNotification