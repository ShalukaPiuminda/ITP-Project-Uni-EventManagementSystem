import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { useNavigate } from 'react-router-dom';

const MyWishlist = () => {
  const [userId, setUserId] = useState();
  const [wishlistdata, setWishlistData] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/userdata', {
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setUserId(userData.userId);
        } else {
          // Handle error
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchwishlist = async () => {
      try {
        const response = await fetch(`http://localhost:8080/Api/wishlistdata/${userId}`, {
          credentials: 'include'
        });
        if (response.ok) {
          const wishlistdata = await response.json();
          console.log(wishlistdata);
          setWishlistData(wishlistdata);
        } else {
          // Handle error
        }
      } catch (error) {
        console.error('Error fetching wishlist data:', error);
      }
    };

    if (userId) {
      fetchwishlist();
    }
  }, [userId]);

  const deleteFromWishlist = (reservationId) => {
    axios.delete(`http://localhost:8080/Api/deletewishlist/${reservationId}`)
      .then((res) => {
        if (res.data.status) {
          navigate('/mywishlist');
        }
      })
      .catch(err => console.log(err));
  };
  


  return (
    <>
      <Header />
      <Navbar />

      <div className="bg-gray-100 flex flex-col">
        <div className="bg-white mt-10 flex items-center justify-center ">
          <h1 className="text-5xl font-bold tracking-tight">My Wish-List</h1>
        </div>

        {wishlistdata.length > 0 ? (
          wishlistdata.map((item) => (
            <div
              key={item._id}
              className="flex   mx-20 my-10 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
            >
              <div className="w-1/2 h-1/2 mx-20 mt-14 flex flex-col">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.eventname}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Ticket Price: {item.reservationFee}</p>
                <p>Customer Name: {item.customername}</p>
                <p>Customer Email: {item.useremail}</p>
                <p>Reserved Date: {item.currentDate}</p>
                <p>Reserved Time: {item.currentTime}</p>
                <p>Reservation Status: {item.status}</p>
              </div>

              <div className="w-1/2 h-1/2  mt-14 flex flex-col ">


                <img class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={item.imageUrl} alt="" />
               
                <div className='mt-10 flex items-center justify-center '>
              <button 
                 
                    className=" inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                       Pay 
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
                    <button 
                     onClick={() => deleteFromWishlist(item._id)}
                    className="mx-4 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                     
                      Delete
                      
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </button>
              </div>
              

              </div>
              
            </div>
          ))
        ) : (
          <p>No reservations found</p>
        )}

        
      </div>
      <Footer />
    </>
  );
};

export default MyWishlist;
