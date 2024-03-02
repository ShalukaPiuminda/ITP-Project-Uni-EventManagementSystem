import express from 'express';
import dotrenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

dotrenv.config();

const app = express();

// initialize the middle-ware
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 4000;


// create connection with mongodb database

mongoose.connect(process.env.MONGODBURL).then(()=>{
    console.log('...Successfully connected with MongoDB ...');

    
// initial server configuration

app.listen(port,()=>{
    console.log(`app is running on port :${port}`);
});

})
.catch((error)=>{
    console.log(error);
})

