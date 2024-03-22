import mongoose from "mongoose"


const eventSchema = new mongoose.Schema({
    eventname: { type: String },
    description: { type: String },
    date: { type: String },
    time: { type: String },
    venue: { type: String },
    ticketprice: { type: Number }, // Updated key name
    imageUrl: { type: String } // Updated key name
}, { timestamps: true });


const Event = mongoose.model("Events",eventSchema);

export default Event;