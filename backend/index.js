import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import  UserRouter  from './Routes/User.js';  
import EventRouter from './Routes/Event.js';
import ReservationRouter from './Routes/Reservation.js';

dotenv.config();

const app = express();

// middllewares
app.use(express.json());
app.use(cors(
    {
        origin: ['http://localhost:5173'],
        credentials: true,
        methods:["GET", "POST", "PUT","DELETE"],
    }
));
app.use(cookieParser())

app.use('/auth',UserRouter);
app.use('/api',EventRouter);
app.use('/Api',ReservationRouter);

// initialize port 
const port = process.env.PORT ||8080;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

// create connection with mongodb
mongoose.connect(process.env.MONGODBURL).then(()=>{
    console.log("Connected to MongoDB");
})

