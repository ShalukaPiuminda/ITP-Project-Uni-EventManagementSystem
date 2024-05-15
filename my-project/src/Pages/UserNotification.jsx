import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const UserNotification = () => {
  const [notifications, setNotifications] = useState([]);
  const [newNotificationCount, setNewNotificationCount] = useState(0); 

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/admin/notifications"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setNotifications(jsonData);
        setNewNotificationCount(jsonData.length);

      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <>
    <Header/>
    <Navbar newNotificationCount={newNotificationCount} />
      <div className=" bg-gray-100 ">
           <div className="mt-10 flex items-center justify-center " >
              <h2 className="text-3xl font-bold">All notifications</h2>
           </div>
    

        <div class="mx-40 my-10  max-w-5xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          {notifications.map((notification) => (
            <div class="p-5 my-10">
              <div className="flex my-10  max-w-5xl bg-red-200 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              
              
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-600  dark:bg-gray-700 dark:text-gray-400">
                {notification.publishername.substring(0, 1).toUpperCase()}
                </div>
                <h5 class="mb-3 mx-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {notification.publishername}
              </h5>
             
              </div>
              <h5 class="mb-3 mx-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {notification.Title}
              </h5>

              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {notification.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default UserNotification;
