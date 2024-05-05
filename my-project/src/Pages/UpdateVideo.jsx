import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import firebase from "firebase/compat/app";
import 'firebase/compat/storage'
import Swal from "sweetalert2"

const UpdateVideo = () => {

const {id} = useParams();
const [videotitle,setVideotitle] =useState();

const [videodescription,setVideodescription] =useState();

const [videourl,setVideourl] =useState();

const navigate =useNavigate()


const handleUpload = (e) => {

    const selectedFile = e.target.files[0]
    
    if(selectedFile){
        const storageRef = firebase.storage().ref()
        const fileRef = storageRef.child(selectedFile.name)
  
        fileRef.put(selectedFile)
        .then((snapshot) => {
            console.log(snapshot)
            snapshot.ref.getDownloadURL()
            .then((downloadURL) => {
                console.log(downloadURL)
                setVideourl(downloadURL)
  
            })
        })
        
    }
    else{
        console.log('no file selected')
    }
  }
  


useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/video/getvideo/${id}`, {
          credentials: 'include'
        });
        if (response.ok) {
          const videoData = await response.json();
          console.log(videoData);

          setVideotitle(videoData.videotitle);
          setVideodescription(videoData.videodescription);
          setVideourl(videoData.videourl);
        } 
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };

    fetchVideo();
  }, [id]); 

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/video/updatevideo/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          videotitle,
          videodescription,
          videourl
      
        }),
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
   
      if (responseData.status) {

        Swal.fire("Update video successfully");
        navigate('/pastevents')
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };


  return (
    <div className="flex justify-center items-center mt-10">
    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form className="space-y-6" onSubmit={handleUpdate} >
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Add New Video
        </h5>
        <div>
          <label
            htmlFor="videotitle"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Video Title
          </label>
          <input
            type="text"
            name="videotitle"
            id="videotitle"
            value={videotitle}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            onChange={(e)=>{setVideotitle(e.target.value)}}
          />
        </div>

        <div>
          <label
            htmlFor="videodescription"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Video description
          </label>
          <textarea
            type="text"
            name="videoDescription"
            id="videoDescription"
            value={videodescription}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            onChange={(e)=>{setVideodescription(e.target.value)}}
          />
        </div>

        
        <div class="flex items-center justify-center w-full">
          <label
            for="dropzone-video"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Click to upload</span> or
                drag and drop video
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                MP4, AVI, MOV, or other video formats
              </p>
            </div>
            <input id="dropzone-video" type="file" 
            onChange={handleUpload}
            className="hidden" />
          </label>
         
        </div>
        <p>video :{videourl}</p>

        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          update
        </button>
      </form>
    </div>
  </div>
  )
}

export default UpdateVideo
