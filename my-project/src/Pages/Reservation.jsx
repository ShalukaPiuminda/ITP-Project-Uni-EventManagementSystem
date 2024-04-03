import React,{ useEffect, useState } from 'react'
import Footer from "../Components/Footer"
import Header from "../Components/Header"
import Navbar from "../Components/Navbar"
import { Link, useNavigate, useParams } from 'react-router-dom'





const Reservation = () => {

  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  // const [event,setEvent] = useState('');
  const {id} = useParams()
  const [userId,setUserId] = useState('');
  const [eventname, setEventname] = useState('')
  const [customername, setCustomername] = useState('')
  const [reservationFee, setReservationFee] = useState('')
  const[useremail, setUseremail] = useState('')
  const [imageUrl, setImageUrl] = useState('' )


  const navigate = useNavigate()






  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/getevent/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        // setEvent(jsonData);
        setEventname(jsonData.eventname);
        setReservationFee(jsonData.ticketprice);
        setImageUrl(jsonData.imageUrl);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);


  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString());
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/userdata', {
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          console.log(userData)
          setUserId(userData.userId);
          setCustomername(userData.username);
          setUseremail(userData.email);
        } else {
          // Handle error
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);
  

  


const  handelReservation = async(e)=>{
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:8080/Api/addreservation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        
        eventname : eventname, 
        customername,
        userId :userId,
        useremail,
        reservationFee : reservationFee,
        currentDate,
        currentTime,
        imageUrl:imageUrl

      }),
      credentials: 'include'
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.status) {

      navigate(`/reservationdetails/${customername}/${eventname}`);
    }
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
}

  return (
    <>

    <Header/>
    <Navbar/>
    <div className='flex flex-row'>
    <div className='w-1/2 p-5 mt-10' >
    <form className="space-y-6"  onSubmit={handelReservation}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Reserve your seat now
            </h5>
          
         
            <div>
              <label
                htmlFor="eventname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
               Event Name 
              </label>
              <input
                type="text"
                name="eventname"
                id="eventname"
                // defaultValue={event ? event.eventname : ''}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                onChange={(e)=>setEventname(e.target.value)}
                value={eventname}
                required
               
              />
            </div>
        
            
            <div>
              <label
                htmlFor="customername"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
              Customer name
              </label>
              <input
                type="text"
                name="customername"
                id="customername"
                value = {customername}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={(e)=>setCustomername(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="customeremail"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
              Customer Email
              </label>
              <input
                type="email"
                name="useremail"
                id="useremail"
                value = {useremail}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={(e)=>setUseremail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="reservationFee"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
            Reservation Fee
              </label>
              <input
                type="text"
                name="reservationFee"
                id="reservationFee"
               
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
              //  defaultValue={ event.ticketprice  }
               onChange={(e)=>setReservationFee(e.target.value)}
               value={reservationFee}
              />
            </div>
            <div>
              <p>Reserve Date : {currentDate}</p><br/>
              <p>Reserve Time :{currentTime} </p>
        

            </div>
            
            <div className='flex'>
            <button
              type="submit"
              className="w-1/2 text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Book Now
              
            </button>
            
              </div>
          </form>
          </div>
    <div className='w-1/2 p-5 mt-7 h-full' > 
      <img src={imageUrl} className='rounded'></img>

    </div>
    </div>
    <Footer/>
    
    </>
  )
}

export default Reservation