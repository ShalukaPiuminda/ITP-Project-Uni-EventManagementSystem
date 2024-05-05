import React, { useEffect, useState } from 'react'
import Header from '../Components/Header';
import NavbarAdmin from '../Components/NavbarAdmin';
import Footer from '../Components/Footer';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const PasteventsAdmin = () => {

const[videos ,setVideos] = useState([]);
const [profileimg,setProfileimg] = useState();



  useEffect(() => {
    const fetchvideo = async () => {
      try {
        const response = await fetch('http://localhost:8080/video/videos', {
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setVideos(userData);
        
        } 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchvideo();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/userdata', {
          credentials: 'include'
        });
        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setProfileimg(userData.profileimg);
        
        } 
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text("video Report", 10, 10);

    const tableData = videos.map((video) => [
    
      video.videotitle,
      video.videodescription,
      video.username,
   

    ]);
    doc.autoTable({
      startY: 20,
      head: [["video title", "video description", "user name"]],
      body: tableData,
    });

  
    doc.setFontSize(8); 

   

    doc.save("video_report.pdf");
  };


  return (
 
    <>
    <Header/>
    <NavbarAdmin/>
<div className=" bg-gray-100 ">
<div className="mt-10 flex items-center justify-center">
        <h1 className="text-5xl font-bold tracking-tight">All Videos</h1>
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
            
                <>
                  
                    
                  <a
                    href={`/deletevideoadmin/${video._id}`}
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
              
            </div>
          </div>
        ))}

        <div className="mx-10 my-10 flex flex-row">
        <span>Download the Video report</span>
        <button
          type="submit"
          onClick={generatePDF}  
          className="mx-10 text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Download as PDF
        </button>
      </div>
      </div>
    
    <Footer/>
    </>
  )
}

export default PasteventsAdmin