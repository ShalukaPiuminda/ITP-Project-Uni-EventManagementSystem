import React, { useEffect,useState } from 'react'
import notification from '../Images/notification.png'
    
import Cookies from 'js-cookie';
import Header from '../Components/Header';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import NavbarAdmin from '../Components/NavbarAdmin';
import { useNavigate } from 'react-router-dom';

const Addnotification = () => {

  const [Title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [publishername, setPublishername] = useState('') 
  const navigate = useNavigate()

const hadlenotification =async (e) => {

    e.preventDefault();
    try {
        const response = await fetch('http://localhost:8080/admin/addnotification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                Title,
                description,
                publishername
            })
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const responseData = await response.json();
        console.log(responseData);
        if(responseData.status){
          navigate('/notification');
        }
  
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
    
    
   

   }




   

      return (

        <>
        <Header/>
        <NavbarAdmin/>
        <div className='flex flex-row'>
    <div className='w-1/2 p-5 mt-10' >
    <form className="space-y-6" onSubmit={hadlenotification} >
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
            
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                required
                onChange={(e)=>setPublishername(e.target.value)}
            
              />
            </div>
           
            
            
        
            <button
              type="submit"
              className=" text-white bg-green-700 hover:bg-green-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
             Publish
            </button>
           
          </form>
          </div>
    <div className='w-1/2 p-5 mt-7 h-full' > 
      <img src={notification} className='rounded'></img>

    </div>
    </div>
    <Footer/>
        </>
      );
    }
    



export default Addnotification;