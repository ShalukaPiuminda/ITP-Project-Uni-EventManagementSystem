import mongoose from "mongoose"



const reservationSchema = new mongoose.Schema({

    eventname:{type:String},
    customername:{type:String},
    reservationFee:{type:Number},
    currentDate:{type:String},
    currentTime:{type:String},
    status:{type:String, default:'waiting for the approval'},

},{timestamps:true})

const Reservation = mongoose.model("reservation",reservationSchema);

export default Reservation;