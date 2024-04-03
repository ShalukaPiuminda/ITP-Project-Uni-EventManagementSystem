import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import User from "../Models/User.js";
import nodemailer from "nodemailer"


const router = express.Router();

router.post('/signup' ,async(req, res) => {

    const {username,email,password,mobilenumber} = req.body;

    console.log(req.body);

    /*const user = User.findOne({email})

    if(user){
        return res.json("User already exists")
    }*/

    const hashPassword =await bcrypt.hash(password,10)
    const newUser = new User({
        username,
        email,
        password:hashPassword,
        mobilenumber
    })

    await newUser.save();
    return res.json({status: true, message:"User registered successfully"});


})


router.post('/signin',async(req, res) => {

    const {email,password} = req.body;
    const user = await User.findOne({email});

    if(!user){
        return res.json({status: false, message:"User not found"});
    }

    const validPassword = await bcrypt.compare(password,user.password)

    if(!validPassword){
        return res.json({status: false, message:"Invalid password"});
    }

    const token = jwt.sign({username: user.username, email:user.email},"Secret-key",{expiresIn:'1h'})
    res.cookie('token',token,{httpOnly:true,maxAge:3600000})
    return res.json({status: true, message:"User logged in successfully",user});


})



router.post('/forgotpassword',async(req, res) => {

    const {email} = req.body;

    try{
    const user = await User.findOne({email});

    if(!user){
        return res.json({status: false, message:"User not found"});
    }

   const token = jwt.sign ({id:user._id},"Secret-key",{expiresIn:'5m'})

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'priyamanthabandara.en01@gmail.com',
    pass: 'apxs kcvx dvvz rnyg'
  }
});

var mailOptions = {
  from: 'priyamanthabandara.en01@gmail.com',
  to: `${email}`,
  subject: 'Reset password - event management system',
  text: `http://localhost:5173/resetpassword/${token}`,
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    return res.json({status:true,message:'email sent successfully'});
  }
});
   }


   catch(error){
    console.log(error);
   }

})

router.post('/forgotpassword/:token', async(req, res)=>{

  const {token} = req.params;
  const {password}=req.body;

  try {

    const decoded =await jwt.verify(token,"Secret-key")
    const id = decoded.id
    const hashPassword =await bcrypt.hash(password,10)
    await User.findByIdAndUpdate({_id:id},{password:hashPassword})
    return res.json({status:true,message:'password reset successfully'});

    
  }
   catch (error) {
    console.log(error);
  }
})

router.get('/users', (req, res)=>{

    User.find({}).then((users)=>{
      res.json(users)
    }).catch((err)=>{
      res.json(err)
    })

})



router.get('/userdata', async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, 'Secret-key');
    const user = await User.findOne({ email: decoded.email });
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send user information to the frontend
    return res.status(200).json({userId:user._id, username: user.username ,email: user.email,
      mobilenumber: user.mobilenumber,profileimg: user.profileimg});
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/getuserbyid/:userid', async (req, res) => {
  const  id  = req.params;
  console.log(req.params);

  try {
    const user = await User.findById({_id:id});
    console.log(user);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ username: user.username, email: user.email, mobilenumber: user.mobilenumber });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/updateprofile/:id', async(req, res)=>{

  const {id} = req.params
  const { username,
    email,
    mobilenumber,
    profileimg}=req.body;
  try{
    await User.findByIdAndUpdate({_id:id},{
      username:username,
      email:email,
      mobilenumber:mobilenumber,
      profileimg:profileimg

      })
    return res.json({status:true,message:'video updated successfully'});

  }
  catch(error){
    console.log(error);
  }

})



router.delete('/deleteuser/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    // Delete the user
    await User.findByIdAndDelete(id);
    return res.json({ status: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
});





export default router;