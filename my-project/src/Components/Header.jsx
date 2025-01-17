import React, { useEffect, useState } from "react";
import logo from "../Images/LFN-logo3.png";
import profile1 from "../Images/profileimg.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const [user, setUser] = useState();
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchUserData = async (token) => {
      try {
        const response = await fetch("http://localhost:8080/auth/userdata", {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Include the token in the Authorization header
          },
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setUser(userData);
        } else {
          // Handle error
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

 const token = localStorage.getItem('token');
    fetchUserData(token);
  }, []);

  const handlelogin = () => {
    window.location.href = "/login";
  };
  const handlesignup = () => {
    window.location.href = "/Signup";
  };

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    axios.defaults.withCredentials = true;
    axios
      .get("http://localhost:8080/auth/logout")
      .then((res) => {
        if (res.data.status) {
          window.location.href = "/login";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <header className="bg-white text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="h-20 w-auto" />
        </div>
        {user ? (
          <div className="relative">
            <button
              className="flex items-center focus:outline-none"
              onClick={toggleDropdown}
            >
              <div>
                <p className="font-semibold text-black text-xl">
                  {user.username}
                </p>
              </div>

              {user.profileimg ? (
                <div className="mr-4 mx-6">
                  <img
                    src={user.profileimg}
                    alt="Profile"
                    className="h-16 w-16 rounded-full"
                  />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  <span className="flex-grow text-center text-xl">
                    {user.username &&
                      user.username.substring(0, 1).toUpperCase()}
                  </span>
                </div>
              )}
            </button>

            {showDropdown && (
              user.role=='admin' ? (
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Profile
                  </Link>
                  <Link
                    to="/admindashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Admin
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>

              ):(
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu"
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 w-full text-left"
                    role="menuitem"
                  >
                    Logout
                  </button>
                </div>
              </div>
              )
             
            )}
          </div>
        ) : (
          <div className="flex items-center">
            <button
              type="button"
              onClick={handlelogin}
              className="text-blue-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={handlesignup}
              className="text-blue-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
