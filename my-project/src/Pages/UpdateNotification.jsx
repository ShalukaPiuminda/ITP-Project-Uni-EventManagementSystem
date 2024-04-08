import React, { useEffect,useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2'

const UpdateNotification = () => {


const {id} = useParams()
const[notification, setNotification]=useState('')

const[Title,setTitle] = useState('')

const[description,setDescription] = useState('')

const[publishername,setPublishername] = useState('')
const navigate = useNavigate( )


useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`http://localhost:8080/admin/getnotification/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonData = await response.json();
        setNotification(jsonData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchEvents();
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/admin/updatenotification/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
          Title,
          description,
          publishername 
      
        }),
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
   
      if (responseData.status) {
        Swal.fire({
          title: "Updated successfully !",
          text: "You clicked the button!",
          icon: "success"
        });
        navigate('/notification')// Use the navigate function to redirect
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  return (
    <>
    <div className="bg-gray-200  ">
    <div className="bg-white " >
      <form className="space-y-6" onSubmit={handleUpdate}>
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Add a new notification
        </h5>

        <div>
          <label
            htmlFor="eventname"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Notification Title
          </label>
          <input
            type="text"
            name="Title"
            id="Title"
            defaultValue={notification.Title}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            onChange={(e)=>setTitle(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Description
          </label>
          <textarea
            type="text"
            name="description"
            id="description"
            defaultValue={notification.description}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            onChange={(e)=>setDescription(e.target.value)}
          />
        </div>

        <div>
          <label
            htmlFor="publishername"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Published by
          </label>
          <input
            type="text"
            name="publishername"
            id="publishername"
            defaultValue={notification.publishername}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
            onChange={(e)=>setPublishername(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className=" text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Update
        </button>
      </form>
      </div>
      </div>
    </>
  );
};

export default UpdateNotification;
