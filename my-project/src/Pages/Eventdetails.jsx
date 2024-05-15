import { useEffect, useState, useRef } from "react";
import axios from "axios";
import "../Utills/eventdetails.css";
import { useReactToPrint } from "react-to-print";
import Header from "../Components/Header";
import NavbarAdmin from "../Components/NavbarAdmin";
import Footer from "../Components/Footer";

function Eventdetails() {
  const componentPDF = useRef();
  const [showdiscounts, setshowdiscounts] = useState([]);
  const [searchkey, setsearchkey] = useState("");

  //read
  const getfetchdata = async () => {
    try {
      const data = await axios.get("http://localhost:8080/api/_event");
      console.log(data.data.success);
      if (data.data.success) {
        setshowdiscounts(data.data.data);
      }
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    getfetchdata();
  }, []);

  //delete
  const handledelete = async (id) => {
    const data = await axios.delete(
      "http://localhost:8080/api/delete_event/" + id
    );
    if (data.data.success) {
      getfetchdata();
      console.log(data.data.message);
      alert(" deleted Successfully!");
    }
  };
  //generatePDF
  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "show services ",
    onAfterPrint: () => alert("data save in pdf"),
  });
  //serach
  const handlesearch = (e) => {
    e.preventDefault()
    filterdata(searchkey);
  };
  const filterdata = (searchKey) => {
    const filteredData = showdiscounts.filter((customer) =>
      customer.fname?.toLowerCase().includes(searchKey.toLowerCase())
    );
    setshowdiscounts(filteredData);
  };
  

  return (
  
   <>
  <Header/>
  <NavbarAdmin/>
    <div className="showorders">
      <div className="searchbtn">
        <input
          type="search"
          onChange={(e) => setsearchkey(e.target.value)}
          placeholder="search"
          className="in"
        />{" "}
        <t></t>
        <button id="search-btn" onClick={(e) => handlesearch(e)}>
          {" "}
          search{" "}
        </button>
      </div>

      <div ref={componentPDF} style={{ width: "100%" }}>
        <table>
          <tr>
            <th>Event Name</th>
            <th>Description </th>
            <th>Venue</th>
            <th>Date</th>
            <th>Time</th>
            <th>Image</th>
          </tr>

          <tbody>
            {showdiscounts.map((e1) => {
              return (
                <tr>
                  <td> {e1.eventname}</td>
                  <td> {e1.description}</td>
                  <td> {e1.venue}</td>
                  <td> {e1.date}</td>
                  <td> {e1.time}</td>
                  <td> {e1.imageUrl}</td>

                  <td>
                    <a href={`/updateuser/${e1._id}`}>Edit Details</a>
                    <button onClick={() => handledelete(e1._id)}>
                      Delete Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button className="add-event-btn" onClick={() =>window.location.href = "/addevent"}>
                Add Event
            </button>
      </div>
      <button onClick={generatePDF}>Download Report</button>
    </div>
    <Footer/>
    </>
  );
}
export default Eventdetails;
