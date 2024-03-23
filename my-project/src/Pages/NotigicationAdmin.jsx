import React, { useEffect, useState } from "react";
import NavbarAdmin from "../Components/NavbarAdmin";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const NotigicationAdmin = () => {
  const [notifications, setNotifications] = useState([]);

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
      } catch (error) {
        console.log(error);
      }
    };

    fetchNotifications();
  }, []);

  const genaratePdf=()=>{
    const doc = new jsPDF();

    doc.text("Notification Report", 10, 10);

    const tableData = notifications.map((notification) => [
      notification.Title,
      notification.description,
      notification.publishername,
    ]);
    doc.autoTable({
      startY: 20,
      head: [["Title", "Description", "Publisher Name"]],
      body: tableData,
    });

    doc.save("user_report.pdf");

  }

  return (
    <>
      <Header />
      <NavbarAdmin />
      <div className="flex flex-col bg-gray-200">
        {notifications.map((notification) => (
          <div className=" mx-5 my-10 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {notification.Title}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {notification.description}
            </p>

            <p>published by : {notification.publishername}</p>
            <p>Created At : {notification.createdAt}</p>

            <Link to={`/updatenotification/${notification._id}`}>
              <button
                type="submit"
                className=" mt-5 text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
            </Link>
            <button
              type="submit"
              onClick={handleDelete(notification._id)}
              className=" mx-6 text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Delete
            </button>
          </div>
        ))}

        <button
          type="submit" 
          onClick={genaratePdf}
          className=" mx-6 my-10 text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Download As PDF
        </button>
      </div>
      <Footer />
    </>
  );
};

export default NotigicationAdmin;
