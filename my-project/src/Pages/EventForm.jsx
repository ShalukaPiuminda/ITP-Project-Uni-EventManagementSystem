import { useState } from "react";
import axios from "axios";
import '../Utills/event.css'

function EventForm() {
    const [order, setOrder] = useState({
        event: "",
        des: "",
        venue: "",
        date: "",
        time: "",
        img_url: "",
    });

    const handleOnChange = (e) => {
        const { value, name } = e.target;
        setOrder(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = await axios.post("http://localhost:8080/api/create_event", order);
        console.log(data);
        alert("Submitted successfully!");
    }

    return (
        <div className="add-order">
            <h2>Event Form</h2>
            <form onSubmit={handleSubmit}>
                <label>Event Name:</label>
                <input type="text" id="event" name="event" onChange={handleOnChange} /><br></br>
                <label>Description:</label>
                <input type="text" id="des" name="des" onChange={handleOnChange} /><br></br>
                <label>Venue:</label>
                <input type="text" id="venue" name="venue" onChange={handleOnChange} /><br></br>
                <label>Date:</label>
                <input type="text" id="date" name="date" onChange={handleOnChange} /><br></br>
                <label>Time:</label>
                <input type="text" id="time" name="time" onChange={handleOnChange} /><br></br>
                <label>Image:</label>
                <input type="file" id="img_url" name="img_url" onChange={handleOnChange} /><br></br>
                <button type="submit">Submit</button>
            </form><br></br>
        </div>
    );
}

export default EventForm;
