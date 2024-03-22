import express from 'express'
import Reservation from '../Models/Reservation.js'
import mongoose from 'mongoose'

const router = express.Router()

router.post('/addreservation', async (req, res) => {

    const { eventname, customername, reservationFee, currentDate, currentTime } = req.body;
    console.log(req.body);

    const newReservation = new Reservation({ eventname, customername, reservationFee, currentDate, currentTime });

    try {
        await newReservation.save();
        res.json({ status: true, message: "Reservation added successfully" });
    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).json({ status: false, message: "Error adding Reservation" });
    }

})

export default router;