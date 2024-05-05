import axios from 'axios';
import React ,{useEffect, useState} from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import Swal from 'sweetalert2';


const ReservationDetails = () => {

const {customername,eventname} = useParams();
const [customeremail,setCustomeremail] =useState();
const [reservationFee,setReservationFee] =useState();
const[currentdate,setCurrentDate] = useState();
const[currenttime,setCurrenttime] = useState();
const [status,setStatus] = useState();
//const [eventname,setEventname] = useState();
const [id,setId] = useState();
const [imageUrl,setImageUrl] = useState();
const [userId,setUserId] = useState();
const navigate = useNavigate()



 

useEffect(() => {
  const fetchReservation = async () => {
    try {
      const reservation = await axios.get(`http://localhost:8080/Api/getreservation/${customername}/${eventname}`);
      console.log(reservation);
      setCustomeremail(reservation.data.useremail);
      setReservationFee(reservation.data.reservationFee);
      setCurrentDate(reservation.data.currentDate);
      setCurrenttime(reservation.data.currentTime);
      setStatus(reservation.data.status);
     // setEventname(reservation.data.eventname);
      setId(reservation.data._id);
      setImageUrl(reservation.data.imageUrl);
      setUserId(reservation.data.userId);


    } catch (error) {
      console.log(error);
    }
  };

  fetchReservation();

}, []); 


const addToWishlist =async ()=>{

try {

  const response = await axios.post('http://localhost:8080/Api/addToWishlist',{
    eventname :eventname,
    customername :customername,
    userId :userId,
    useremail:customeremail,
    reservationFee:reservationFee,
    currentDate :currentdate,
    currentTime :currenttime,
    imageUrl:imageUrl,
  });
  console.log(response);
  if(response.data.status){
    navigate('/mywishlist');
    Swal.fire({
      title: "successfully added to the wish-list!",
      text: "You clicked the button!",
      icon: "success"
    });
  }
  
} catch (error) {
  console.log(error);
}



}


  return (
    <>
    <Header/>
    <Navbar/>
    <div className='my-10 bg-gray-200 flex items-center justify-center h-screen'>
            <div className="max-w-lg w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="rounded-t-lg" src={imageUrl} alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{eventname}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Customer Name : {customername}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Customer Email : {customeremail}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Reservation Fee :{reservationFee} LKR</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Reservation Status: {status}</p>
              
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Date: {currentdate}</p>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Time: {currenttime}</p>

                    <p className="mb-3 font-light  text-sm text-red-500 dark:text-red-500"> your reservation will be approved after the payment </p>
                    <Link to={`/payments/${id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Pay Now
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </Link>
                    <button 
                    onClick={addToWishlist}
                    className="mx-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Add To WishList
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <Footer/>
        </>
  )
}

export default ReservationDetails