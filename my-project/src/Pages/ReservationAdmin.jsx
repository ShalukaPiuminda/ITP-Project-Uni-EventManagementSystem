import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import NavbarAdmin from "../Components/NavbarAdmin";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const ReservationAdmin = () => {
  const [reservations, setReservations] = useState([]);
  const [groupedReservations, setGroupedReservations] = useState({});

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/reservations");
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

 
  const generatePDF = () => {
    const doc = new jsPDF();
  
    doc.text("Reservations Report", 10, 10);
  
    // Filter only approved reservations
    const approvedReservations = reservations.filter(
      (reservation) => reservation.status === "approved"
    );
  
    // Group approved reservations by event name
    const groupedReservations = approvedReservations.reduce((acc, reservation) => {
      acc[reservation.eventname] = acc[reservation.eventname] || [];
      acc[reservation.eventname].push(reservation);
      return acc;
    }, {});
  
    // Iterate over each group
    Object.entries(groupedReservations).forEach(([eventName, reservations]) => {
      // Event name
      doc.setFontSize(10); 
      doc.text(`Event Name : ${eventName}`, 10, doc.previousAutoTable ? doc.previousAutoTable.finalY + 20 : 20);
  
      // Number of reservations for the event
      doc.text(`Number of Reservations: ${reservations.length}`, 10, doc.previousAutoTable ? doc.previousAutoTable.finalY + 30 : 30);
  
      // Reservation table
      const tableData = reservations.map((reservation) => [
        reservation.customername,
        reservation.useremail,
        reservation.reservationFee,
        reservation.currentDate,
        reservation.currentTime,
        reservation.status,
      ]);
      doc.autoTable({
        startY: doc.previousAutoTable ? doc.previousAutoTable.finalY + 40 : 40,
        head: [["Customer Name", "Email", "Fee", "Date", "Time", "Status"]],
        body: tableData,
      });
    });
  
    doc.save("Reservation_Report.pdf");
  };
  
  return (
    <>
      <Header />
      <NavbarAdmin />

      <div className="flex flex-col">
      <div className="mt-10 flex items-center justify-center">
        <h1 className="text-5xl font-bold tracking-tight">Reservations</h1>
      </div>
      
      {/* Display reservations grouped by event name */}
      {Object.entries(groupedReservations).map(([eventName, reservations]) => (
        <div key={eventName}>
          <div className="mt-5 mx-14">
            <h2 className="text-3xl font-bold">{eventName}</h2>
          </div>
          {reservations.map((reservation, index) => (
            <div key={index} className="flex w-3/4 mx-14 my-5 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
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

              {/* Approve button */}
              {reservation.status === "waiting for the approval" ? (
                <div className="w-1/2 h-1/2 mx-14 mt-14 flex justify-center">
                  <button
                    type="submit"
                    className="text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <Link to={`/approvereservation/${reservation._id}`}>Approve</Link>
                  </button>
                </div>
              ) : (
                <span className="w-1/2 h-1/2 mx-36 mt-14 flex justify-center text-red-700 font-bold">
                  Verified
                </span>
              )}
            </div>
          ))}
        </div>
      ))}
      
      {/* Download button */}
      <div className="mx-10 my-10 flex flex-row">
        <span>Download the Reservation report</span>
        <button
          type="submit"
          onClick={generatePDF}  
          className="mx-10 text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Download as PDF
        </button>
      </div>
    </div>
      <Footer />
    </>
  );
};

export default ReservationAdmin;
