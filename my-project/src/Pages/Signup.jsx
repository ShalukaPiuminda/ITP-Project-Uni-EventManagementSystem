import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import background from "../Images/backgroundImage.jpg";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const Signup = () => {

const [Username , setUsername] =useState('');
const [email , setEmail] =useState('');
const [password , setPassword] =useState('');
const [mobilenumber , setMobilenumber] =useState('');
const navigate = useNavigate();

const handleSignup = async (e) => {
  e.preventDefault();
  try {
      const response = await fetch('http://localhost:8080/auth/signup', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ 
              username: Username, 
              email, 
              password, 
              mobilenumber 
          })
      });
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      console.log(responseData);
      if(responseData.status){
        navigate('/login');
      }

  } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
  }
}



  return (
    <>
      <Header/>
      <Navbar />
      <div
        className="flex justify-center items-center h-screen"
        style={{
          backgroundImage: `url(${background})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          opacity:0.75
         
        }}
      >
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSignup}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Sign Up 
            </h5>
            <div>
              <label
                htmlFor="Username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                 Username
              </label>
              <input
                type="text"
                name="Username"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                required
                onChange={(e)=>setUsername(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                 Email
              </label>
              <input
                type="email"
                name="email"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                 Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
           
            <div>
              <label
                htmlFor="mobilenumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mobile Number
              </label>
              <input
                type="text"
                name="mobilenumber"
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={(e)=>setMobilenumber(e.target.value)}
              />
            </div>
           
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Sign Up Proceed
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
              Already have an account ?{" "}
              <a
                href="#"
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

export default Signup ;
