import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Profile = () => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [mobilenumber, setMobilenumber] = useState();
  const [profileimg, setProfileimg] = useState();
  const [status, setStatus] = useState("");
  const [reservations, setReservations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/userdata", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setUserId(userData.userId);
          setUsername(userData.username);
          setEmail(userData.email);
          setMobilenumber(userData.mobilenumber);
          setProfileimg(userData.profileimg);
          setStatus(userData.status);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchreservations = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/Api/getreservationbyid/${userId}`,
          {
            credentials: "include",
          }
        );
        if (response.ok) {
          const reservations = await response.json();
          console.log(reservations);
          setReservations(reservations);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchreservations();
  }, []);

  return (
    <>
      <Header />
      <Navbar />
      <div className="bg-gray-200 flex flex-col">
        <div class="mx-10 my-10 w-full max-w-7xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div class="flex justify-end px-4 pt-4"></div>
          <div className="mt-5 mb-4 flex items-center justify-center">
            <h4 className="text-2xl">My Profile</h4>
          </div>
          <div class="flex flex-col items-center pb-10">
            {profileimg ? (
              <div className="flex items-center justify-center">
                <img
                  className="w-52 h-52 rounded-full object-cover"
                  src={profileimg}
                  alt="Profile Image"
                />
              </div>
            ) : (
              <div className="w-52 h-52 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                <span className="flex-grow text-center text-xl">
                  {username && username.substring(0, 1).toUpperCase()}
                </span>
              </div>
            )}

            <div className="mx-10 mt-10">
              <h5 class="mt-7 mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Name : {username}
              </h5>
              <h5 class="mt-7 mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Emai : {email}
              </h5>
              <h5 class="mt-7 mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Mobile Number : {mobilenumber}
              </h5>
              <h5 class="mt-7 mb-1 text-xl font-medium text-gray-900 dark:text-white">
                Status : {status}
              </h5>
            </div>

            {status !== "Active" ? (
              <span className="flex-grow text-center text-md ">
                Your account has been de-activated
              </span>
            ) : (
              <div class="flex mt-4 md:mt-6">
                <Link
                  to={`/editprofile/${userId}`}
                  class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit Profile
                </Link>
                <a
                  href={`/deleteprofile/${userId}`}
                  class="py-2 px-4 ms-2 text-sm font-medium text-white focus:outline-none bg-red-700 rounded-lg border border-gray-200 hover:bg-red-900 hover:text-white focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-red-700 dark:hover:bg-gray-700"
                >
                  De-activate Account
                </a>
              </div>
            )}
          </div>
        </div>

        <div class="mx-10 my-10 w-full max-w-7xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <div className="mt-5 mb-4 flex items-center justify-center">
            <h4 className="text-2xl">My Reservations</h4>
          </div>

          <div>
            {reservations.map((reservation) =>
              reservation && reservation.status === "approved" ? (
                <a
                  href="#"
                  class="mx-72 my-5 flex flex-col   items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <img
                    class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                    src={reservation.imageUrl}
                    alt=""
                  />
                  <div class="flex flex-col justify-between p-4 leading-normal">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                      {reservation.eventname}
                    </h5>
                    <p class=" font-normal text-gray-700 dark:text-gray-400">
                      Reserved for :{reservation.customername}
                    </p>
                    <p class=" font-normal text-gray-700 dark:text-gray-400">
                      customer Email :{reservation.useremail}
                    </p>
                    <p class=" font-normal text-gray-700 dark:text-gray-400">
                      Ticket Price :{reservation.reservationFee}
                    </p>
                    <p class=" font-normal text-gray-700 dark:text-gray-400">
                      Reserved Date :{reservation.currentDate}
                    </p>
                  </div>
                </a>
              ) : null
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
