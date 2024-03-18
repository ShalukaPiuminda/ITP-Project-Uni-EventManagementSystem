import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config();

const app = express();

// middllewares
app.use(express.json());

// initialize port 
const port = process.env.PORT ||8080;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

// create connection with mongodb
mongoose.connect(process.env.MONGODBURL).then(()=>{
    console.log("Connected to MongoDB");
})

