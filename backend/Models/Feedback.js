// feedback.model.js
import mongoose from "mongoose";
//const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    event: {
        type: String,
        required: true
    },
    rateDescription: {
        type: String,
        required: true
    },
    rateCount: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;