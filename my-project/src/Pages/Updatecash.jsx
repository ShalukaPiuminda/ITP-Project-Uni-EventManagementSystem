import {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import '../Utills/orderupdate.css'

function UpdateCash(){
    const { id } = useParams();
    const [updateorder,setupdateorder]=useState({
      first_name: "",
      address: "",
      email: "",
      imageURL: "",
     
    
    })

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`http://localhost:8080/cashpay/order_users/${id}`);
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



      const handleInputChange = (e) => {
        setupdateorder({
          ...updateorder,
          [e.target.name]: e.target.value,
        });
      };
      const handleUpdate = async () => {
        try {
          const response = await fetch(`http://localhost:8080/cashpay/update_users`, {
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
           alert("Order updated successfully");

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


<label>Full Name:</label>
                    <input type="text" id="first_name" name="first_name"   onChange={handleInputChange} value={updateorder?.first_name} />
                    <label>Address:</label>
                    <input type="text" id="address" name="address"   onChange={handleInputChange} value={updateorder?.address} />
                    <label>Email:</label>
                    <input type="text" id="email" name="email"   onChange={handleInputChange} value={updateorder?.email} />
                    <label>Image Url:</label>
                    <input type="text" id="image" name="zip_code"   onChange={handleInputChange} value={updateorder?.imageURL} />
              
            

    <button onClick={handleUpdate} >Update</button><br></br> <br></br> 
  
        </div>
    )
}
export default UpdateCash;