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





router.get("/_event",async(req,res)=>{
    const data= await Event.find({})
  
    res.json({success:true,data:data})
})


router.post("/create_event",async(req,res)=>{
    const data=new Event(req.body)
    await data.save()
    res.send({success:true,message:"data created successfuly"})
})


router.put("/update_event",async(req,res)=>{
    const {id,...rest}=req.body
    const data=await Event.updateOne({_id:id},rest)
    res.send({success:true,message:"updated successfuly",data:data})
})




router.delete("/delete_event/:id",async(req,res)=>{
const id=req.params.id
const data=await Event.deleteOne({_id:id})
res.send({success:true,message:"deleted successfully",data:data})
})




router.get("/count_event",async(req,res)=>{
    try{
        const users=await Event.find({});

        return res.status(200).json({
            count:users.length,
            data:users
        })

    }catch(err){
            console.log(err.message);
            res.json({success:true,message:"Order count successfully",data:data})
    }

})

router.get("/order_event/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const order = await Event.findById(id);

        if (!order) {
            return res.status(404).send({ success: false, message: "User not found" });
        }

        res.send({ success: true, message: "User fetched successfully", data: order });
    } catch (error) {
        console.error(error);
        res.status(500).send({ success: false, message: "Internal Server Error" });
    }
});

router.get("/searcheventsbydate", async (req, res) => {
    const { q } = req.query; 
    console.log(q)
    // Assuming q is the date string like "11/05/2024"
    try {
      const queryString = String(q).trim();
      const events = await Event.find({ date: queryString }); // Assuming 'date' is the field in your Event model
      /*if (!events || events.length === 0) {
        return res.json({ error: "No events found" });
      }*/
      res.json(events);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  router.get("/searchEvent", async (req, res) => {
    const { q } = req.query;
    console.log(q);
    try {
      const queryString = String(q).trim();
      const events = await Event.find({ eventname: { $regex: new RegExp(queryString, "i") } });
      if (!events || events.length === 0) {
        return res.status(404).json({ error: "No events found" });
      }
      res.json(events);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  
  
  
export default router;
