import express from "express";
import Reservation from "../Models/Reservation.js";
import Wishlist from "../Models/Wishlist.js";
import nodemailer from "nodemailer"

const router = express.Router();

router.post("/addreservation", async (req, res) => {
  const {
    eventname,
    customername,
    userId,
    useremail,
    reservationFee,
    currentDate,
    currentTime,
    imageUrl
  } = req.body;
  console.log(req.body);

  const newReservation = new Reservation({
    eventname,
    customername,
    userId,
    useremail,
    reservationFee,
    currentDate,
    currentTime,
    imageUrl
  });

  try {
    await newReservation.save();
    res.json({ status: true, message: "Reservation added successfully" });
  } catch (error) {
    console.error("Error saving event:", error);
    res
      .status(500)
      .json({ status: false, message: "Error adding Reservation" });
  }
});

router.get("/reservations", (req, res) => {
  Reservation.find({})
    .then((reservations) => {
      res.json(reservations);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.post("/approve-reservation/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Reservation.findByIdAndUpdate({ _id: id }, { status: "approved" });
    res.json({ status: true, message: "Reservation Approved successfully" });

    const reservation = await Reservation.findById({ _id: id })
    
    const htmlBody = `
      <h1>Your Reservation Details</h1>
      <p><strong>Event Name:</strong> ${reservation.eventname}</p>
      <p><strong>Reserved For:</strong> ${reservation.customername}</p>
      <p><strong>Reservation Fee:</strong> ${reservation.reservationFee}</p>
      <p><strong>Status:</strong> ${reservation.status}</p>
      <p>Thank you for your reservation!</p>
    `;
    
  
var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'priyamanthabandara.en01@gmail.com',
    pass: 'apxs kcvx dvvz rnyg'
  }
});

var mailOptions = {
  from: 'priyamanthabandara.en01@gmail.com',
  to: `${reservation.useremail}`,
  subject: 'Reservation Added suceesfully - event management system',
  html: htmlBody,
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    return res.json({status:true,message:'email sent successfully'});
  }
});



  } catch (error) {
    console.log(error);
  }
});

router.get("/getreservation/:customername/:eventname", async (req, res) => {
  const { customername ,eventname} = req.params;
  console.log(customername);

  try {
   
    const reservation = await Reservation.findOne({ customername,eventname });
    console.log(reservation);

   
    if (!reservation) {
      return res.status(404).json({ error: "Event not found" });
    }

    res.json(reservation);
  } catch (error) {
    
    console.error("Error fetching event:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});




router.post('/addToWishlist', async (req, res) => {
  const {
    eventname,
    customername,
    userId,
    useremail,
    reservationFee,
    currentDate,
    currentTime,
    imageUrl
  } = req.body;

  // Create a new wishlist item
  const newWishlistItem = new Wishlist({
    eventname,
    customername,
    userId,
    useremail,
    reservationFee,
    currentDate,
    currentTime,
    imageUrl
  });

  try {
    // Save the new wishlist item to the database
    await newWishlistItem.save();
    // Respond with success message
    res.json({ status: true, message: "Reservation added successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error saving reservation:", error);
    res.status(500).json({ status: false, message: "Error adding reservation" });
  }
});

router.get("/wishlistdata/:id", (req, res) => {
  const { id } = req.params;

  Wishlist.find({ userId: id })
    .then((wishlist) => {
      console.log(wishlist);
      res.json(wishlist);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.delete('/deletewishlist/:id', async (req, res) => {

  const {id} = req.params
 console.log(id); 

  try {
   await Wishlist.findByIdAndDelete({_id:id})
   return res.json({status:true,message:'Reservation  deleted successfully'});

  }
  catch(error){
   console.log(error);
  }


})


router.get("/getreservationbyid/:id", (req, res) => {
  const { id } = req.params;

  Reservation.find({ userId: id })
    .then((reservations) => {
      console.log(reservations);
      res.json(reservations);
    })
    .catch((err) => {
      res.json(err);
    });
});

router.get("/getreservation/:id", (req, res) => {
  const { id } = req.params;

  Reservation.findById({ _id :id })
    .then((reservations) => {
      console.log(reservations);
      res.json(reservations);
    })
    .catch((err) => {
      res.json(err);
    });
});


router.post('/updatereservation/:id', async(req, res)=>{

  const {id} = req.params
  const { customername,
    useremail,
   currentDate,
   currentTime}=req.body;
  try{
    await Reservation.findByIdAndUpdate({_id:id},{
      customername:customername,
      useremail:useremail,
      currentDate:currentDate,
       currentTime:currentTime
    })
    return res.json({status:true,message:'Reservation updated successfully'});

  }
  catch(error){
    console.log(error);
  }




})


router.delete('/deletereservation/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the user exists
    const reservation = await Reservation.findById(id);
    if (!reservation) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    // Delete the user
    await Reservation.findByIdAndDelete(id);
    return res.json({ status: true, message: 'video deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
});



router.get("/searchreservation", async (req, res) => {
  const { q } = req.query;
  console.log(q);
  try {
  
    const queryString = String(q).trim();
    const reservations = await Reservation.find({ customername: { $regex: new RegExp(queryString, "i") } });
    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }
    res.json(reservations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});





export default router;
