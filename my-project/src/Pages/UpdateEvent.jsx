import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import '../Utills/eventupdate.css'
import firebase from "firebase/compat/app";
import 'firebase/compat/storage'


function UpdateEvent(){
    const { id } = useParams();
    const [img_url,setImg_url] = useState("")

    const [updateorder,setupdateorder]=useState({
      event:"",
      des:"",
      venue:"",
      date:"",
      time:"",
      img_url:"",
    })

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:8080/api/order_event/${id}`);
            const data = await response.json();
            console.log(data);
    
            if (data.success) {
              setupdateorder(data.data);
            } else {
              console.error(data.message);
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);


      const handleUpload = (e) => {
        const selectedFile = e.target.files[0];
    
        if (selectedFile) {
          const storageRef = firebase.storage().ref();
          const fileRef = storageRef.child(selectedFile.name);
    
          fileRef.put(selectedFile).then((snapshot) => {
            console.log(snapshot);
            snapshot.ref.getDownloadURL().then((downloadURL) => {
              console.log(downloadURL);
              setImg_url(downloadURL);
    
              // Update the state with the image URL
              setupdateorder({
                ...updateorder,
                img_url: downloadURL,
              });
            });
          });
        } else {
          console.log('no file selected');
        }
      };
    

      const handleInputChange = (e) => {
        setupdateorder({
          ...updateorder,
          [e.target.name]: e.target.value,
        });
      };
      const handleUpdate = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/update_event`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: updateorder._id,
              ...updateorder,
            }),
          });
    
          const data = await response.json();
    
          if (data.success) {
            console.log('Order updated successfully');
            alert('Updated successfully');
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error('Error updating user:', error);
        }
      };


    return(
        <div className='order-update'>

<h2> Update Details</h2><br></br>
<lable>Event Name:</lable>
    <input type="text" id="event" name="event"     onChange={handleInputChange} value={updateorder?.eventname }/><br></br>
    <lable>Description  :</lable>
    <input type="text" id="des" name="des"     onChange={handleInputChange} value={updateorder?.description }/><br></br>
    <lable>Venue:</lable>
    <input type="text" id="venue" name="venue"     onChange={handleInputChange} value={updateorder?.venue }/><br></br> 
    <lable>Date:</lable>
    <input type="text" id="date" name="date"     onChange={handleInputChange} value={updateorder?.date }/><br></br> 
    <lable>Time:</lable>
    <input type="text" id="time" name="time"    onChange={handleInputChange} value={updateorder?.time }/><br></br> 
  
    <lable>Image:</lable>
    <input type="file" id="img_url" name="img_url" onChange={handleUpload} />

    
    <button onClick={handleUpdate} >Update</button><br></br> <br></br> 
  

        </div>
    )
}
export default UpdateEvent;