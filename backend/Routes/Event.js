import express from 'express';
import Event from '../Models/Event.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/addevent', async (req, res) => {
    const { eventname, description, date, time, venue, ticketprice, imageUrl } = req.body;
    console.log(req.body);

    const newEvent = new Event({ eventname, description, date, time, venue, ticketprice, imageUrl });

    try {
        await newEvent.save();
        res.json({ status: true, message: "Event added successfully" });
    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).json({ status: false, message: "Error adding event" });
    }
});

router.get('/events', (req, res)=>{

    Event.find({}).then((events)=>{
      res.json(events)
    }).catch((err)=>{
      res.json(err)
    })

})

router.get('/getevent/:id', async (req, res) => {
  const eventId = req.params.id;

  // Validate that the eventId is a valid ObjectId
  if (!mongoose.isValidObjectId(eventId)) {
      return res.status(400).json({ error: 'Invalid event ID' });
  }

  try {
      // Query the Event model by ID
      const event = await Event.findById(eventId);

      // Check if event exists
      if (!event) {
          return res.status(404).json({ error: 'Event not found' });
      }

      // If event is found, return it in the response
      res.json(event);
  } catch (error) {
      // Handle any errors that occur during the query
      console.error('Error fetching event:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/geteventbyname/:eventname', async (req, res) => {
    const eventname = req.params.eventname; // Access event name correctly
    console.log(eventname);
  
    try {
        // Query the Event model by event name
        const event = await Event.findOne( eventname );
        console.log(event);
       
        // Check if event exists
        if (!event) {
            return res.status(404).json({ error: 'Event not found' });
        }
  
        // If event is found, return it in the response
        res.json(event);
    } catch (error) {
        // Handle any errors that occur during the query
        console.error('Error fetching event:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

 
export default router;
