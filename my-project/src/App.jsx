import React, { Children, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./App.css";
import Home from "./Pages/Home";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import ForgotPassword from "./Pages/ForgotPassword";
import Resetpassword from "./Pages/Resetpassword";
import AdminDashboard from "./Pages/AdminDashboard";
import Reservation from "./Pages/Reservation";
import Addevent from "./Pages/Addevent";
import AdminEvents from "./Pages/AdminEvents";

import ReservationDetails from "./Pages/ReservationDetails";
import Addnotification from "./Pages/Addnotification";
import NotigicationAdmin from "./Pages/NotigicationAdmin";
import UpdateNotification from "./Pages/UpdateNotification";
import ReservationAdmin from "./Pages/ReservationAdmin";
import DeleteNotification from "./Pages/DeleteNotification";
import ApproveReservation from "./Pages/ApproveReservation";

import UploadVideo from "./Pages/UploadVideo";
import MyWishlist from "./Pages/MyWishlist";
import Pastevents from "./Pages/Pastevents";
import UpdateVideo from "./Pages/UpdateVideo";
import Profile from "./Pages/Profile";
import EditProfile from "./Pages/EditProfile";
import DeleteUser from "./Pages/DeleteUser";
import PasteventsAdmin from "./Pages/PasteventsAdmin";
import Deletevideo from "./Pages/Deletevideo";
import UserNotification from "./Pages/UserNotification";
import UserReservations from "./Pages/UserReservations";
import Updatereservation from "./Pages/Updatereservation";
import DeleteReservation from "./Pages/DeleteReservation";
import DeleteProfile from "./Pages/DeleteProfile";
import axios from "axios";

import Heropage from "./Pages/Heropage";
import Aboutus from "./Pages/Aboutus";
import Contactus from "./Pages/Contactus";
import TermsAndConditions from "./Pages/TermsAndConditions";

import Deactivatedmsg from "./Pages/Deactivatedmsg";
import EventForm from "./Pages/EventForm";
import Eventdetails from "./Pages/Eventdetails";
import UpdateEvent from "./Pages/UpdateEvent";
import AddCashPayment from "./Pages/cash";
import AddPayment from "./Pages/addpayment";
import CashDetails from "./Pages/cashdetails";
import UpdateCash from "./Pages/Updatecash";
import UpdatePayment from "./Pages/UpdatePayment";
import PaymentDetails from "./Pages/paymentdetails";
import AddFeedback from "./Pages/AddFeedback";
import ViewAllFeedbacks from "./Pages/ViewAllFeedbacks";
import UpdateFeedback from "./Pages/UpdateFeedback";
import ViewAllAdminFeedbacks from "./Pages/ViewAllAdminFeedbacks";

function App() {
  const [paymentOption, setPaymentOption] = useState(null);

  const handlePayByCard = () => {
    setPaymentOption("card");
  };

  const handlePayByCash = () => {
    setPaymentOption("cash");
  };

  const fetchUserData = async () => {
    try {
      const token = Cookies.get("token");
      const response = await axios.get("http://localhost:8080/auth/userdata", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const UserRoute = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      const getUserData = async () => {
        try {
          const userData = await fetchUserData();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      getUserData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return user && (user.role === "user" || user.role === "admin") ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  };

  const AdminRoute = ({ children }) => {
    const [user, setUser] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
      const getUserData = async () => {
        try {
          const userData = await fetchUserData();
          setUser(userData);
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          setLoading(false);
        }
      };

      getUserData();
    }, []);

    if (loading) return <div>Loading...</div>;

    return user && user.role === "admin" ? children : <Navigate to="/home" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Heropage />}></Route>
        <Route
          path="/home"
          element={
            <UserRoute>
              <Home />
            </UserRoute>
          }
        ></Route>
        <Route path="/login" element={<Signin />}></Route>

        <Route path="/Signup" element={<Signup />}></Route>
        <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
        <Route path="/resetpassword/:token" element={<Resetpassword />}></Route>
        <Route
          path="/admindashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        ></Route>
        <Route path="/reservation/:id" element={<Reservation />}></Route>
        <Route path="/addevent" element={<Addevent />}></Route>
        <Route path="/evnt-admin" element={<AdminEvents />}></Route>
        <Route
          path="/reservationdetails/:customername/:eventname"
          element={<ReservationDetails />}
        ></Route>
        <Route path="/addnotification" element={<Addnotification />}></Route>
        <Route path="/notification" element={<NotigicationAdmin />}></Route>
        <Route
          path="/updatenotification/:id"
          element={<UpdateNotification />}
        ></Route>
        <Route path="/reservation-admin" element={<ReservationAdmin />}></Route>
        <Route
          path="/deletenotification/:id"
          element={<DeleteNotification />}
        ></Route>
        <Route
          path="/approvereservation/:id"
          element={<ApproveReservation />}
        ></Route>
        <Route
          path="/mywishlist"
          element={
            <UserRoute>
              <MyWishlist />
            </UserRoute>
          }
        ></Route>
        <Route
          path="/pastevents"
          element={
            <UserRoute>
              <Pastevents />
            </UserRoute>
          }
        ></Route>
        <Route path="/uploadvideo" element={<UploadVideo />}></Route>
        <Route path="/updatevideo/:id" element={<UpdateVideo />}></Route>
        <Route
          path="/profile"
          element={
            <UserRoute>
              <Profile />
            </UserRoute>
          }
        ></Route>
        <Route path="/editprofile/:userId" element={<EditProfile />}></Route>
        <Route path="/deleteuser/:id" element={<DeleteUser />}></Route>
        <Route path="/pastevents-admin" element={<PasteventsAdmin />}></Route>
        <Route path="/deletevideo/:id" element={<Deletevideo />}></Route>
        <Route path="/deletevideoadmin/:id" element={<Deletevideo />}></Route>
        <Route
          path="/usernotification"
          element={
            <UserRoute>
              <UserNotification />
            </UserRoute>
          }
        ></Route>
        <Route
          path="/userreservation"
          element={
            <UserRoute>
              <UserReservations />
            </UserRoute>
          }
        ></Route>
        <Route
          path="/aboutus"
          element={
            <UserRoute>
              <Aboutus />
            </UserRoute>
          }
        ></Route>
        <Route
          path="/contactus"
          element={
            <UserRoute>
              <Contactus />
            </UserRoute>
          }
        ></Route>
        <Route
          path="/updatereservation/:id"
          element={<Updatereservation />}
        ></Route>
        <Route
          path="/deletereservation/:id"
          element={<DeleteReservation />}
        ></Route>
        <Route path="/deleteprofile/:id" element={<DeleteProfile />}></Route>

        <Route
          path="./TermsandConditions"
          element={
            <UserRoute>
              <TermsAndConditions />
            </UserRoute>
          }
        />

        <Route path="/deactivatedmsg" element={<Deactivatedmsg />} />

        <Route
          path="/event"
          element={
            <UserRoute>
              <EventForm />
            </UserRoute>
          }
        ></Route>
        <Route path="/registerdetails" element={<Eventdetails />}></Route>
        <Route path="/updateuser/:id" element={<UpdateEvent />}></Route>

        <Route path="/pay/:id" element={<AddCashPayment />}></Route>
        <Route path="/addpayment" element={<AddPayment />}></Route>

        <Route path="/paymentdetails" element={<PaymentDetails />}></Route>
        <Route path="/cashdetails" element={<CashDetails />}></Route>
        <Route path="/updatecash/:id" element={<UpdateCash />}></Route>
        <Route
          path="/updateorder_payment/:id"
          element={<UpdatePayment />}
        ></Route>

        <Route path="/add-feedback" element={<AddFeedback />} />
        <Route path="/feedback" element={<ViewAllFeedbacks />} />
        <Route path="/update-feedback/:id" element={<UpdateFeedback />} />
        <Route path="/feedbackadmin" element={<ViewAllAdminFeedbacks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
