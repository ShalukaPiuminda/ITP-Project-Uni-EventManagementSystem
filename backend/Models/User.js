import mongoose from "mongoose"



const userSchema = new mongoose.Schema({

    username:{type:String,unique:true},
    email:{type:String, required:true,unique:true},
    password:{type:String},
    mobilenumber:{type:String},
    role:{type:String, default:"user"},
    profileimg:{type:String},
    status:{type:String,default:"Active"}

},{timestamps:true})

const User = mongoose.model("User",userSchema);

export default User;