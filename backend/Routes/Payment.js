import express from "express";
import Payment from "../Models/Payment.js";

const router = express.Router();

// Route to add a new payment
router.post("/addpayment", async (req, res) => {
  const {
    fullName,
    email,
    address,
    zipCode,
    nameOnCard,
    creditCardNumber,
    expMonth,
    expYear
  } = req.body;

  const newPayment = new Payment({
    fullName,
    email,
    address,
    zipCode,
    nameOnCard,
    creditCardNumber,
    expMonth,
    expYear
  });

  try {
    await newPayment.save();
    res.json({ status: true, message: "Payment details added successfully" });
  } catch (error) {
    console.error("Error saving payment details:", error);
    res.status(500).json({ status: false, message: "Error adding payment details" });
  }
});

// Route to get all payments
router.get("/payments", (req, res) => {
  Payment.find({})
    .then((payments) => {
      res.json(payments);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

// Route to get payment by ID
router.get("/payment/:id", (req, res) => {
  const { id } = req.params;
  Payment.findById(id)
    .then((payment) => {
      res.json(payment);
    })
    .catch((err) => {
      res.status(404).json({ message: "Payment not found" });
    });
});

// Route to delete payment by ID
router.delete("/deletepayment/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Payment.findByIdAndDelete(id);
    res.json({ status: true, message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});


// Route to update payment by ID
router.put("/updatepayment/:id", async (req, res) => {
  const { id } = req.params;
  const {
    fullName,
    email,
    address,
    zipCode,
    nameOnCard,
    creditCardNumber,
    expMonth,
    expYear,
    status 
  } = req.body;

  try {
    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ status: false, message: "Invalid payment ID" });
    }

    // Check if the payment exists
    const existingPayment = await Payment.findById(id);
    if (!existingPayment) {
      return res.status(404).json({ status: false, message: "Payment not found" });
    }

    // Update the payment fields
    existingPayment.fullName = fullName;
    existingPayment.email = email;
    existingPayment.address = address;
    existingPayment.zipCode = zipCode;
    existingPayment.nameOnCard = nameOnCard;
    existingPayment.creditCardNumber = creditCardNumber;
    existingPayment.expMonth = expMonth;
    existingPayment.expYear = expYear;
    existingPayment.status = status;

    // Save the updated payment
    const updatedPayment = await existingPayment.save();

    // Return the updated payment
    res.json({ status: true, message: "Payment updated successfully", payment: updatedPayment });
  } catch (error) {
    console.error("Error updating payment:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
});

export default router;



