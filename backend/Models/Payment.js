import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String },
    zipCode: { type: String },
    nameOnCard: { type: String, required: true },
    creditCardNumber: { type: String, required: true },
    expMonth: { type: String, required: true },
    expYear: { type: String, required: true },
    status: { type: String, default: "pending" }
}, { timestamps: true });

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;
