// Navbar.js
import React, { useState } from "react";

const Navbar = () => {

  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <>
      <div>
        <nav className="bg-blue-900 border-b-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center gap-10 justify-end mx-auto p-4">
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-blue-900 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-blue  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="/home"
                    className="block py-2 px-3 text-white bg-blue-900 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-white bg-blue-900 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                    aria-current="page"
                  >
                    Events
                  </a>
                </li>

            
                <li
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className="relative">
                    <a
                      href="/userreservation"
                      className="block py-2 px-3 text-white bg-blue-900 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                      aria-current="page"
                    >
                      Reservations
                    </a>
                    {showDropdown && (
                      <div className="absolute top-full left-0 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                        {/* Dropdown items */}
                        <a
                          href="/mywishlist"
                          className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        >
                         My Wish-list
                        </a>
                      
                      </div>
                    )}
                  </div>
                </li>
               
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-white bg-blue-900 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                    aria-current="page"
                  >
                    About Us
                  </a>
                </li>
               
                <li>
                  <a
                    href="/profile"
                    className="block py-2 px-3 text-white bg-blue-900 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                    aria-current="page"
                  >
                    Profile
                  </a>
                </li>
               
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-white bg-blue-900 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                    aria-current="page"
                  >
                    Feedback
                  </a>
                </li>
               
                <li>
                  <a
                    href="/pastevents"
                    className="block py-2 px-3 text-white bg-blue-900 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                    aria-current="page"
                  >
                    Past Events
                  </a>
                </li>
                <li>
                  <a
                    href="/usernotification"
                    className="block py-2 px-3 text-white bg-blue-900 rounded md:bg-transparent md:text-white md:p-0 dark:text-white md:dark:text-white"
                    aria-current="page"
                  >
                 Notification
                  </a>
                </li>
               
               
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
