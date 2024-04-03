import mongoose from "mongoose"



const videoSchema = new mongoose.Schema({

    videotitle:{type:String},
  
    videodescription:{type:String},
    videourl:{type:String, required:true},
    userId:{type:String},
    username:{type:String}

},{timestamps:true})

const Video = mongoose.model("video",videoSchema);

export default Video;