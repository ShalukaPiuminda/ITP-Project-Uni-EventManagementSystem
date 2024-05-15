import React from "react";
import facebookicon from "../Images/facebookicon.webp";
import youtubeicon from "../Images/youtubeicon.webp";
import instaicon from "../Images/instaicon.webp";
import linkdin from "../Images/linkdinicon.webp";
import callimg from "../Images/call.png"
import mailimg from "../Images/mail.png"

const Footer = () => {
  return (
    <footer className="bg-blue-900 dark:bg-gray-900 mt-10">
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="grid grid-cols-2 gap-8 px-4 py-6 lg:py-8 md:grid-cols-4">
          <div>
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="/home" className=" hover:underline text-white">
                  Home
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline text-white">
                  Events
                </a>
              </li>
              <li className="mb-4">
                <a href="/userreservation" className="hover:underline text-white">
                Reservations
                </a>
              </li>
              <li className="mb-4">
                <a href="/profile" className="hover:underline text-white">
                  Profile
                </a>
              </li>
              <li className="mb-4">
                <a href="/pastevents" className="hover:underline text-white">
                  Past Events
                </a>
              </li>
            </ul>
          </div>
          <div>
          
            <ul className="text-gray-500 dark:text-gray-400 font-medium">
              <li className="mb-4">
                <a href="/usernotification" className="hover:underline text-white">
                 Notifications
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline text-white ">
                  Feed Back
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline text-white">
                  About Us
                </a>
              </li>
              <li className="mb-4">
                <a href="#" className="hover:underline text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-6 text-sm font-semibold text-white uppercase dark:text-white">
              Contact Information
            </h2>
            <ul className="text-gray-500 dark:text-gray-400 font-normal">
              <li className="mb-4">
                <div className="flex mt-6 justify-center items-center space-x-4">
                  
                  <div>
                    <p>
                      Lionel Jayathilaka Mawatha, Kuliyapitiya, 60200 Sri Lanka.
                    </p>
                  </div>
                </div>
              </li>
              <li className="mb-4">
                <div className="flex mt-6 justify-center items-center space-x-4">
                  <div>
                    <img src={callimg} alt="Profile" className="h-8 w-8 " />
                  </div>

                  <div>
                    <p>+(94) 37 22 81412, +(94) 37 22 81414</p>
                  </div>
                </div>
              </li>
              <li className="mb-4">
                <div className="flex mt-6 justify-center items-center space-x-4">
                  <div>
                    <img
                      src={mailimg}
                      alt="Profile"
                      className="h-8 w-8 "
                    />
                  </div>

                  <div>
                    <p>info@wyb.ac.lk</p>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div>
            <div>
              <h4>Follow Us on :</h4>
            </div>
            <div className="flex mt-6 justify-center items-center space-x-4">
              <div>
                <img
                  src={facebookicon}
                  alt="Profile"
                  className="h-16 w-16 rounded-full"
                />
              </div>
              <div>
                <img
                  src={youtubeicon}
                  alt="Profile"
                  className="h-16 w-16 rounded-full"
                />
              </div>
              <div>
                <img
                  src={instaicon}
                  alt="Profile"
                  className="h-16 w-16 rounded-full"
                />
              </div>
              <div>
                <img
                  src={linkdin}
                  alt="Profile"
                  className="h-16 w-16 rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
