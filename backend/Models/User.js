import mongoose from "mongoose"



const userSchema = new mongoose.Schema({

    username:{type:String,unique:true},
    email:{type:String, required:true,unique:true},
    password:{type:String, required:true},
    mobilenumber:{type:Number},
    role:{type:String, default:"user"},
    profileimg:{type:String}

},{timestamps:true})

const User = mongoose.model("User",userSchema);

export default User;