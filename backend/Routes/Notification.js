import express from 'express';
import Notification from '../Models/Notification.js';
import mongoose from 'mongoose';

const router = express.Router();

router.post('/addnotification', async (req, res) => {
    try {
        const { Title, description, publishername } = req.body;
        console.log(req.body);

        const newNotification = new Notification({ Title, description, publishername });

        await newNotification.save();
        res.json({ status: true, message: 'Notification added successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
});



router.get('/notifications', (req, res)=>{

    Notification.find({}).then((notifications)=>{
      res.json(notifications)
    }).catch((err)=>{
      res.json(err)
    })

})



router.get('/getnotification/:id', async (req, res) => {
  const notificationId = req.params.id;

  // Validate that the eventId is a valid ObjectId
  if (!mongoose.isValidObjectId(notificationId)) {
      return res.status(400).json({ error: 'Invalid notification ID' });
  }

  try {
      // Query the Event model by ID
      const notification = await Notification.findById(notificationId);

      // Check if event exists
      if (!notification) {
          return res.status(404).json({ error: 'notification not found' });
      }

      // If event is found, return it in the response
      res.json(notification);
  } catch (error) {
      // Handle any errors that occur during the query
      console.error('Error fetching notification:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/updatenotification/:id', async (req, res) => {

  const {id} = req.params
  const {Title,description,publishername}=req.body;
  try{
    await Notification.findByIdAndUpdate({_id:id},{Title:Title,description:description,publishername:publishername})
    return res.json({status:true,message:'notification  successfully'});

  }
  catch(error){
    console.log(error);
  }


})


export default router;
