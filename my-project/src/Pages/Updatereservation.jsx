import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Updatereservation = () => {

const {id} = useParams()

const [eventname,setEventname] = useState('')

const [customername,setCustomername] = useState('')

const [reservationFee,setReservationFee] = useState('')

const[useremail, setUseremail] = useState('')


const [currentDate,setCurrentDate] = useState('')

const [currentTime,setCurrentTime] = useState('')

const navigate = useNavigate()


useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      setCurrentDate(now.toLocaleDateString());
      setCurrentTime(now.toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

useEffect(() =>{

axios.get(`http://localhost:8080/Api/getreservation/${id}`).then(reservation =>{

    console.log(reservation.data)
    setEventname(reservation.data.eventname)
    setCustomername(reservation.data.customername)
    setReservationFee(reservation.data.reservationFee)
    setUseremail(reservation.data.useremail)

}).catch(err =>{
    console.log(err)
})


},[])
const handleUpdate = (e) => {

  e.preventDefault();
    axios
      .post(`http://localhost:8080/Api/updatereservation/${id}`, {
        customername: customername,
        useremail: useremail,
        currentDate: currentDate,
        currentTime: currentTime,
      })
      .then((res) => {
        if (res.data.status) {
          alert(" Reservation updated successfully ");
          navigate('/userreservation');
        } else {
          console.error('Error updating reservation:', res.data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating reservation:', error);
      });
  };
  


  return (
    <div className='flex '>
    <div className='w-1/2 p-5 mt-10' >
    <form className="space-y-6"  >
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
             Edit your reservation
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
               
                value={eventname}
                required
                readOnly="true"
               
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
              
               value={reservationFee}
               readOnly="true"
              />
            </div>
            <div>
              <p>Reserve Date : {currentDate}</p><br/>
              <p>Reserve Time :{currentTime} </p>
        

            </div>
            
            <div className='flex'>
            <button
              type="submit"
              onClick={handleUpdate}
              className="w-1/2 text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
           Update
              
            </button>
            
              </div>
          </form>
          </div>
  
    </div>
  )
}

export default Updatereservation