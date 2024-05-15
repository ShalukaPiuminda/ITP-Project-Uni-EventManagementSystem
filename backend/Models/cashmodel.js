import mongoose from "mongoose";
const orderschema=mongoose.Schema({
    first_name:String,
    address:String,
    email:String,
    imageURL:String,
    amount :Number,
   eventname:String
   
   
  
   
   
   

},{
    timestamps:true

})

const ordermodel=mongoose.model("offlinePayment",orderschema)
export default ordermodel;