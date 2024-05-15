import mongoose from "mongoose"


const eventSchema = new mongoose.Schema({
    eventname: { type: String },
    description: { type: String },
    date: { type: String },
    time: { type: String },
    venue: { type: String },
    ticketprice: { type: Number }, 
    imageUrl: { type: String } 
}, { timestamps: true });


const Event = mongoose.model("Events",eventSchema);

export default Event;