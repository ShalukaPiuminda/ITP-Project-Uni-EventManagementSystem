import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

const Pastevents = () => {
  const [videos, setVideos] = useState([]);
  const [userid, setUserid] = useState([]);
  const [profileimg, setProfileimg] = useState([]);
  const [q,setQ] = useState("");

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch("http://localhost:8080/video/videos");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const videos = await response.json();
        console.log(videos);
        setVideos(videos);
   
      } catch (error) {
        console.log(error);
      }
    };

    fetchVideos();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("http://localhost:8080/auth/userdata", {
          credentials: "include",
        });
        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setUserid(userData.userId);
          setProfileimg(profileimg);
        } else {
          // Handle error
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8080/video/searchvideo?q=${q}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setVideos(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />
      <Navbar />
      <div className=" bg-gray-100 ">
        <div className="flex justify-end pt-5 pr-5">
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
            <Link to="/uploadvideo"> Upload Video</Link>
          </button>
        </div>

        <div className="mt-10 mx-20">
          
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              type="search"
              id="default-search"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter user name..."
              required
              onChange={(e)=>setQ(e.target.value)}
            />
            <button
              type="submit"
              class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
     
      </div>



        {videos.map((video) => (
          <div class="mx-40 my-10  max-w-5xl bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div class="p-5">
              <div className="flex ">

                {profileimg ?(
                  <div className="">
                  <img
                    className="w-10 h-10 rounded-full object-cover"
                    src={profileimg}
                    alt="Profile Image"
                  />
                </div>

                ) :(
                  <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-400">
                  {video.username.substring(0, 1).toUpperCase()}
                </div>
                )}
               

                <h5 class="mb-10 mx-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {video.username}
                </h5>
              </div>
              <h5 class="mb-3 mx-5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {video.videotitle}
              </h5>

              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {video.videodescription}
              </p>

              <video class="mt-10 w-full" autoplay controls>
                <source src={video.videourl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {userid && userid === video.userId && (
                <>
                  <a
                    href={`/updatevideo/${video._id}`}
                    className="my-10 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                  <a
                    href={`/deletevideo/${video._id}`}
                    className="my-10 mx-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Delete
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Pastevents;
