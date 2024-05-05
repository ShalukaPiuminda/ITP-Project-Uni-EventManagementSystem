import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import logo1 from "../Images/logo1.png";
import logo2 from "../Images/LFN-logo3.png";
import backgroundImage2 from "../Images/backgroundImage2.jpg";
import event1 from "../Images/event1.jpg";

const Slideshow = ({ images }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); 

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="">
      <img
        src={images[index]}
        alt={`Slide ${index}`}
        className="w-auto h-auto object-cover"
      />
    </div>
  );
};

const Heropage = () => {
  const images = [logo1, logo2,backgroundImage2,event1];


  const handleClick = () => {
    window.location.href = "/login";
  }

  return (
    <>
      <Header />
      <Navbar />

      <div className="mt-10 mb-10 flex bg-gray-200">
        <div className="flex flex-col w-1/2  bg-gray-200 border border-gray-500">
          <Slideshow images={images} />
          <div className=" mt-48 flex flex-col justify-center items-center bg-white">
            <h3 className="font-bold">Get the better Experience </h3>
            <button class="relative inline-flex items-center justify-center p-0.5 mt-10 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
            onClick={handleClick}>
              <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Get Started
              </span>
            </button>
          </div>
        </div>

        <div className="w-1/2  bg-gray-200 border border-gray-500">
          <div className="p-8 bg-white">
            <h1 className="text-3xl font-bold mb-4">
              Welcome to thye premier planners event management system
            </h1>
            <p className="text-lg">
              The event management system for the Society of Food Science and
              Technology in the Faculty of Livestock Fisheries and Nutrition at
              Wayamba University, named Premier Planners, aims to streamline and
              enhance the overall organization of various events and functions
              with features like Event Creation and Management. This system
              empowers organizers to efficiently plan and coordinate gatherings.
              Ticket Booking functionality facilitates a seamless reservation
              process for attendees, while Video Upload and Management ensure
              that event recordings or promotional content can be easily shared
              and accessed. The inclusion of Event Details and Calendar provides
              a centralized platform for users to stay informed about upcoming
              activities, helping them plan their schedules accordingly. The
              Payment Handling feature facilitates smooth transactions for
              ticket purchases or event fees, contributing to a more convenient
              experience for participants. Additionally, Feedback Handling
              allows attendees to share their thoughts and suggestions, aiding
              organizers in improving future events. The Admin/User Management
              aspect ensures that the system is secure and well-controlled, with
              designated administrators overseeing the platform's overall
              functioning. This comprehensive event management system not only
              enhances the efficiency of event planning and execution but also
              fosters better communication between organizers and participants,
              ultimately enriching the university society's overall experience
            </p>
            {/* Add more text or components as needed */}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Heropage;
