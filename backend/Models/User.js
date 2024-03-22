import mongoose from "mongoose"



const userSchema = new mongoose.Schema({

    username:{type:String,unique:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    mobilenumber:{type:String},
    role:{type:String, default:"user"}

},{timestamps:true})

const User = mongoose.model("User",userSchema);

export default User;