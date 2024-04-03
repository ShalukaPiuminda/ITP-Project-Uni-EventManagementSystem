    import mongoose from "mongoose"



    const wishlistSchema = new mongoose.Schema({

        eventname:{type:String},
    
        customername:{type:String},
        userId:{type:String},
        useremail:{type:String},
        reservationFee:{type:Number},

        currentDate:{type:String},
        currentTime:{type:String},
        status:{type:String, default:'waiting for the approval'},
        imageUrl:{type:String}

    },{timestamps:true})

    const Wishlist = mongoose.model("wishlist",wishlistSchema);

    export default Wishlist;