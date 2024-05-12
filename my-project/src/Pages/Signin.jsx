import Cookies from "js-cookie";
import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import background from "../Images/backgroundImage.jpg";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import firebase from "firebase/compat/app";
import {getAuth,GoogleAuthProvider,signInWithPopup} from "firebase/auth"
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const Signin = () => {

const auth = getAuth()
const authProvider = new GoogleAuthProvider()

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [recapcha, setRecapcha] = useState(null)

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const responseData = await response.json();
      // console.log(responseData.headers);
      console.log([...response.headers.entries()]);
      console.log(responseData);
      if (responseData.status) {
        navigate("/home");

        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "You have successfully login to the system.",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        alert(
          "There was a problem with your Login . check your email or password"
        );
      }
      if (responseData.type === "deactivated") {
        navigate("/deactivatedmsg");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

const signInWithGoogle =async()=>{
    
  signInWithPopup(auth,authProvider).then((result) => {
    // Handle successful sign-in
   console.log(result)

   axios.post("http://localhost:8080/auth/google",{
    username : result.user.displayName,
    email : result.user.email,
    profileimg : result.user.photoURL,
    mobilenumber:result.user.phoneNumber

   }).then(res=>{
    console.log(res.data)
    if(res.data.status){
      navigate('/home')
    }
   }).catch(err=>{
    console.log(err)
   })

  })
  .catch((error) => {
    // Handle errors
    console.error(error);
    
  });


}

const onChange = (value)=>{

setRecapcha(value);
  console.log(value)
}

  return (
    <>
      <Header />
      <Navbar />
      <div
        className="flex justify-center items-center h-screen"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSignin}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign in to our platform
            </h5>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-start">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="remember"
                    type="checkbox"
                    value=""
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                    required
                  />
                </div>
                <label
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                  Remember me
                </label>
              </div>
              <a
                href="/forgotpassword"
                className="ms-auto text-sm text-blue-700 hover:underline dark:text-blue-500"
              >
                Forgot Password?
              </a>
            </div>
            <ReCAPTCHA
 
    sitekey="6LdF7tQpAAAAAMQFEo3q0ObrHqa7w3DJI7j-oLyW"
    onChange={onChange}
  />
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              disabled={!recapcha}
           >
              Login to your account
            </button>
            <button
              type="button"
           
             class="text-white bg-[#353638] hover:bg-[#353638]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 me-2 mb-2"
              onClick={signInWithGoogle}
          >
              <svg
                class="w-4 h-4 me-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 18 19"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                  clip-rule="evenodd"
                />
              </svg>
              Sign in with Google
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Not registered?{" "}
              <a
                href="/Signup"
                className="text-blue-700 hover:underline dark:text-blue-500"
              >
                Create account
              </a>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signin;
