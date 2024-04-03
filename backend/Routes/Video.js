import express from "express"
import Video from "../Models/Video.js";

const router = express.Router();

router.post('/uploadvideo', async (req, res) => {
    const { videotitle, videodescription, videourl, userId, username } = req.body;
    console.log(req.body);

    const newVideo = new Video({ videotitle, videodescription, videourl, userId, username });

    try {
        await newVideo.save();
        res.json({ status: true, message: "video uploaded successfully" });
    } catch (error) {
        console.error('Error saving event:', error);
        res.status(500).json({ status: false, message: "Error adding event" });
    }
});

router.get('/videos', (req, res)=>{

    Video.find({}).then((events)=>{
      res.json(events)
    }).catch((err)=>{
      res.json(err)
    })

})


router.get('/getvideo/:id', async(req, res)=>{

const id = req.params.id

try {
  
  const video = await Video.findById(id);

  res.json(video);

} catch (error) {
  console.log(error)
}


})


router.post('/updatevideo/:id', async(req, res)=>{

  const {id} = req.params
  const {videotitle,videodescription,videourl}=req.body;
  try{
    await Video.findByIdAndUpdate({_id:id},{videotitle:videotitle,videodescription:videodescription,videourl:videourl})
    return res.json({status:true,message:'video updated successfully'});

  }
  catch(error){
    console.log(error);
  }




})

router.delete('/deletevideo/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Check if the user exists
    const user = await Video.findById(id);
    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    // Delete the user
    await Video.findByIdAndDelete(id);
    return res.json({ status: true, message: 'video deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ status: false, message: 'Internal server error' });
  }
});



export default router;