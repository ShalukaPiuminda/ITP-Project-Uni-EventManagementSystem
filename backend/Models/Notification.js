import mongoose from "mongoose"


const notificationSchema = new mongoose.Schema({
    Title: { type: String, required: true },
    description: { type: String, required: true },
    publishername: { type: String, required: true },
}, { timestamps: true });

const Notification = mongoose.model('notification', notificationSchema);

export default Notification;
