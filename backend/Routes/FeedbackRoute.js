// feedback.route.js
//const express = require('express');
//const router = express.Router();
//const Feedback = require('../model/feedback.model');

import express from "express"
import Feedback from "../Models/Feedback.js";


const router = express.Router();

// Create new feedback
router.post('/addfeedback', async (req, res) => {
    try {
        const feedback = new Feedback(req.body);
        await feedback.save();
        res.status(201).send(feedback);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all feedback
router.get('/feedback', async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.send(feedbacks);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Get feedback by ID
router.get('/feedback/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback) {
            return res.status(404).send();
        }
        res.send(feedback);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update feedback by ID
router.put('/updatefeedback/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!feedback) {
            return res.status(404).send();
        }
        res.send(feedback);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete feedback by ID
router.delete('/deletefeedback/:id', async (req, res) => {
    try {
        const feedback = await Feedback.findByIdAndDelete(req.params.id);
        if (!feedback) {
            return res.status(404).send();
        }
        res.send(feedback);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router