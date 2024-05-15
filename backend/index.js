import express from 'express';
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import  UserRouter  from './Routes/User.js';  
import EventRouter from './Routes/Event.js';
import ReservationRouter from './Routes/Reservation.js';
import NotificationRouter from './Routes/Notification.js';
import VideoRouter from './Routes/Video.js'
import cardRoute from './Routes/cardroutes.js'
import cashRoute from './Routes/cashroutes.js'
import FeedbackRoutes from './Routes/FeedbackRoute.js'
import bodyParser from 'body-parser';

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


// Increase the limit for request payload size
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cookieParser())

app.use('/auth',UserRouter);
app.use('/api',EventRouter);
app.use('/Api',ReservationRouter);
app.use('/admin',NotificationRouter)
app.use('/video',VideoRouter);
app.use('/cardpay',cardRoute);
app.use('/cashpay',cashRoute);
app.use('/feedback',FeedbackRoutes);


// initialize port 
const port = process.env.PORT ||8080;

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});

// create connection with mongodb
mongoose.connect(process.env.MONGODBURL).then(()=>{
    console.log("Connected to MongoDB");
})

