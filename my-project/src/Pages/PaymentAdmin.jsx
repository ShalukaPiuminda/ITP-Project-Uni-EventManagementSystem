import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";
import NavbarAdmin from "../Components/NavbarAdmin";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const PaymentAdmin = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/admin/Payments"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setPayments(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPayments();
  }, []);

  const generatePdf = () => {
    const doc = new jsPDF();

    doc.text("Payment Report", 10, 10);

    const tableData = payments.map((payment) => [
      payment.fullName,
      payment.address,
      payment.tokenID,
      payment.createdAt,
    ]);
    doc.autoTable({
      startY: 20,
      head: [["Full Name", "Address", "Token ID", "Date / Time"]],
      body: tableData,
    });

    doc.save("userpayment_report.pdf");
  };

  return (
    <>
    <Header/>
    <NavbarAdmin/>

      <div>
        {payments.map((payment) => (
          <div className=" mx-5 my-10 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key={payment._id}>
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {payment.fullName}
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              {payment.address}
            </p>

            <p>Created At : {payment.createdAt}</p>

            <Link to={`/updatePayment/${payment._id}`}>
              <button
                type="submit"
                className=" mt-5 text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Update
              </button>
            </Link>

            <Link to={`/deletepayment/${payment._id}`}>
              <button
                type="submit"
                className=" mx-6 text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Delete
              </button>
            </Link>
          </div>
        ))}

        <button
          type="submit"
          onClick={generatePdf}
          className=" mx-6 my-10 text-white bg-red-700 hover:bg-red-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Download As PDF
        </button>

        <button
          type="submit"
          className=" mx-6 my-10 text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <Link to="/addPayment">
            Add New Payment
          </Link>
        </button>
      </div>
      <Footer/>
    </>
  );
};

export default PaymentAdmin;
