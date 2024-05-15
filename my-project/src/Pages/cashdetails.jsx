import  { useEffect, useState,useRef } from 'react'
import axios from "axios"
import '../Utills/orderdetails.css'
import {useReactToPrint} from "react-to-print";
import AdminHeader from './adminheader';
import Header from '../Components/Header';
import NavbarAdmin from '../Components/NavbarAdmin';
import Footer from '../Components/Footer';

function CashDetails(){
    const componentPDF=useRef();
    const [showdiscounts,setshowdiscounts]=useState([]);
    const [searchkey,setsearchkey]=useState('');

//read
const getfetchdata=async()=>{
    try{
    const data=await axios.get("http://localhost:8080/cashpay/_users")
    console.log(data.data.success)
    if(data.data.success){
        setshowdiscounts(data.data.data)
    }
}catch(err){
    alert(err)
}
}
useEffect(()=>{
    getfetchdata()   
},[])

//delete
const handledelete= async(id)=>{
    const data=await axios.delete("http://localhost:8080/cashpay/delete_users/"+id)
    if(data.data.success){
        getfetchdata()
        console.log(data.data.message)
        alert(" deleted Successfully!")
    }
}
//generatePDF
const generatePDF=useReactToPrint({
    content:()=>componentPDF.current,
    documentTitle:"show services ",
    onAfterPrint:()=>alert("data save in pdf")
})
//search
const handlesearch = (e) => {

    filterdata(searchkey);
}
const filterdata = (searchKey) => {
    const filteredData = showdiscounts.filter(customer =>
        customer.first_name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setshowdiscounts(filteredData);
}

    return(

        <>
        <Header/>
        <NavbarAdmin/>
       <AdminHeader/>
        <div className="showorders">
             <div className='searchbtn'>
        <input  type="search" onChange={(e)=>setsearchkey(e.target.value)} placeholder='search' className='in'/> <t></t> 
       
        <button  id='search-btn'  onClick={(e)=>handlesearch(e)}> search </button>
        </div>   
                <div ref={componentPDF} style={{width:'100%'}}>
 <table>
              
              <tr>
              <th>Full Name</th>
              <th>Address</th>
              <th>Email</th>
              <th>Image Url</th>
              <th>Action</th>
             

              </tr>

  
              <tbody>
                  { 
                     showdiscounts.map((e1)=>{
                      return(
                          <tr> 
                            <td> {e1.first_name}</td> 
                            <td> {e1.address}</td> 
                            <td> {e1.email}</td> 
                            <td> {e1.imageURL}</td> 
                          
                         
                           
                            <td>
                              <a href={`/updatecash/${e1._id}`}>Update</a>
                              <button onClick={()=>handledelete(e1._id)}>Delete </button>
                            </td>
                          </tr>
                      )

              })
                  }
              </tbody>
  </table>
  </div>
  <button onClick={generatePDF}>Download Report</button>
        </div>
        <Footer/>
        </>
    )
}
export default CashDetails;