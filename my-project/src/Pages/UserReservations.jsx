import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const UserReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [groupedReservations, setGroupedReservations] = useState({});
  const [userid, setUserid] = useState();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("http://localhost:8080/Api/reservations");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setReservations(jsonData);

        // Group reservations by event name
        const grouped = jsonData.reduce((acc, reservation) => {
          acc[reservation.eventname] = acc[reservation.eventname] || [];
          acc[reservation.eventname].push(reservation);
          return acc;
        }, {});
        setGroupedReservations(grouped);
      } catch (error) {
        console.log(error);
      }
    };

    fetchReservations();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/userdata', {
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setUserid(userData.userId);
        
        } else {
          // Handle error
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <Header />
      <Navbar />

      <div className="flex flex-col">
        <div className="mt-10 flex items-center justify-center">
          <h1 className="text-5xl font-bold tracking-tight">Reservations</h1>
        </div>

        {/* Display reservations grouped by event name */}
        {Object.entries(groupedReservations).map(
          ([eventName, reservations]) => (
            <div key={eventName}>
              <div className="mt-5 mx-14">
                <h2 className="text-3xl font-bold">{eventName}</h2>
              </div>
              {reservations.map((reservation, index) => (
                <div
                  key={index}
                  className="flex w-3/4 mx-14 my-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
                >
                  <div>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                      Ticket Price {reservation.reservationFee}
                    </p>
                    <p>Customer Name : {reservation.customername}</p>
                    <p>Customer Email : {reservation.useremail}</p>
                    <p>Reserved Date : {reservation.currentDate}</p>
                    <p>Reserved Time : {reservation.currentTime}</p>
                    <p>Reservation Status : {reservation.status}</p>
                  </div>
                  {reservation.status === "waiting for the approval" && userid == reservation.userId  ? (
                    <div className="w-1/2 h-1/2 mx-14 mt-14 flex justify-center">
                      <button
                        type="submit"
                        className="text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <Link to={`/updatereservation/${reservation._id}`}>
                          Update
                        </Link>
                      </button>

                      <button
                        type="submit"
                        className="mx-4 text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        <Link to={`/deletereservation/${reservation._id}`}>
                          Delete
                        </Link>
                      </button>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          )
        )}

        {/* Download button */}
      </div>
      <Footer />
    </>
  );
};

export default UserReservations;
