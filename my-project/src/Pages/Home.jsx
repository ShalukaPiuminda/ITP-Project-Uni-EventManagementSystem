import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import background from "../Images/backgroundImage.jpg";
import { Link } from "react-router-dom"
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from "axios";


const Home = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [q,setQ] = useState('');


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/events");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setEvents(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);

  const handleDateChange = async(date) => {
    setSelectedDate(date);
    const formattedDate = date.toLocaleDateString('en-GB');
    
    try {
      const response = await axios.get(`http://localhost:8080/api/searcheventsbydate?q=${formattedDate}`);
      setEvents(response.data);
      console.log(response.data)
    } catch (error) {
      console.log(error);
    }
  };



  const handleSearch = async (e) => {
     e.preventDefault()
    try {

      console.log(q)
      const response = await axios.get(`http://localhost:8080/api/searchEvent?q=${q}`);
      setEvents(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Navbar />

      <div className="flex flex-col bg-gray-100 ">
        <div className=""
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
         

        }}
        >
          <div className="mt-20 flex justify-center items-center font-bold">
          <span className="text-4xl">WelCome To Premier Planners </span>

          </div>
        
          <form class="max-w-md mx-auto mt-10 mb-10">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                onChange={(e)=>setQ(e.target.value)}
              />
              <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={handleSearch}

              >
                Search
              </button>
            </div>
          </form>
        </div>

        <div className="my-10 mx-10">
          <span className="font-bold text-4xl">Upcoming Events</span>
          </div>

         
       
       
        <div className="flex flex-wrap justify-between">
        {Array.isArray(events) && events.length > 0 ? (
          events.map((event) => (
            <div
              key={event.id}
              className="my-10 mx-6 max-w-sm bg-white border border-slate-600 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img className="rounded-t-lg" src={event.imageUrl} alt="" />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {event.eventname}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {event.description}
                </p>
                <p>Date: {event.date}</p>
                <p>Time: {event.time} </p>
                <p>Venue: {event.venue}</p>
                <p>Ticket Price: {event.ticketprice} LKR </p>

                <Link to={`/reservation/${event._id}`}>
                  {" "}
                  <button
                    type="button"
                    className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Book Now
                  </button>
                </Link>
              
              </div>
          
            </div>
          ))
          ) : (

            <div className="mt-10 mb-10 flex s justify-center items-center">
            <p className=" text-3xl">No events found</p>
            </div>
          )}
        </div>
       <div className="flex flex-row justify-end my-10 mx-24"
       style={{
             backgroundColor :"#5DE2E7",
             border : "2px solid"


       }}
       
       >

       <h2 className="text-xl  mx-64 my-32 font-bold">Search Events Using calender ? </h2>
        <div className="mx-10 my-10 ">
        <Calendar
        
          onChange={handleDateChange}
          value={selectedDate}
        />
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
