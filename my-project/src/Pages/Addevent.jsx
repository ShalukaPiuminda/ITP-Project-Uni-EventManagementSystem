import React, { useState } from "react";
import firebase from "firebase/compat/app";
import 'firebase/compat/storage'
import axios from "axios";
import {useNavigate} from "react-router-dom"

const Addevent = () => {

const [imageUrl,setImageUrl] = useState()  

const [eventname,setEventName] = useState('')

const[description,setDescription]= useState('')
const[date,setDate]= useState('')
const[time,setTime]= useState('')
const[venue,setVenue]= useState('')
const[ticketprice,setTicketPrice]= useState('')
const navigate = useNavigate();

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
                setImageUrl(downloadURL)
 
            })
        })
        
    }
    else{
        console.log('no file selected')
    }
}


const handleEvent = async (e) => {
    e.preventDefault();
   /* try {
        const response = await fetch('http://localhost:8080/api/addevent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                eventname: eventname,
                description :description,
                date : date,
                time : time,
                venue :venue,
                ticketprice :ticketprice,
                imageUrl
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        console.log(responseData);
        if(responseData.status){
            // Redirect or handle success
        }
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }*/

    console.log(eventname, description, date, time, venue, ticketprice, imageUrl);

    axios.post('http://localhost:8080/api/addevent',{
        eventname: eventname,
        description :description,
        date : date,
        time : time,
        venue :venue,
        ticketprice :ticketprice,
        imageUrl
    }).then((res)=>{
        console.log(res.data);
        if(res.data.status){
            navigate('/registerdetails')
        }
    }).catch(error=>{
        console.log(error)
    })
}

  return (
    <>
      <div className="flex justify-center items-center mt-10">
        <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleEvent}>
            <h5 className="text-xl font-medium text-gray-900 dark:text-white">
              Add New Event
            </h5>
            <div>
              <label
                htmlFor="enentname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Event Name
              </label>
              <input
                type="text"
                name="eventname"
                id="eventname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={(e)=>setEventName(e.target.value)}
              />
            </div>
     

            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Event Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                onChange={(e)=>setDescription(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="date"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Event Date
              </label>
              <input
                type="date"
                name="date"
                id="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={(e)=>setDate(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="time"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Event Time
              </label>
              <input
                type="time"
                name="time"
                id="time"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={(e)=>setTime(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="venue"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Event venue
              </label>
              <input
                type="text"
                name="venue"
                id="venue"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={(e)=>setVenue(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="ticketprice"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Ticket Price
              </label>
              <input
                type="text"
                name="ticketprice"
                id="ticketprice"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={(e)=>setTicketPrice(e.target.value)}
              />
            </div>

            <div class="flex items-center justify-center w-full">
              <label
                for="dropzone-file"
                class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span class="font-semibold">Click to upload</span> or drag
                    and drop
                  </p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
                <input id="dropzone-file" type="file" class="hidden" onChange={handleUpload} />
              </label>
            </div>
            <p>img  : {imageUrl}</p>
           
            <button
              type="submit"
              className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Addevent;
