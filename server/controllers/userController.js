import userModel from "../models/userModels.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Stripe from "stripe";
import transactionModel from "../models/transactionModels.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ success: false, message: 'Missing Details' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({ name, email, password: hashPassword });
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: 'User does not exist' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.json({ success: false, message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ success: true, token, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User Credits
const userCredits = async (req, res) => {
  try {

    const {userId} = req.body; 

    const user = await userModel.findById(userId);
    if (!user) return res.json({ success: false, message: "User not found" });

    res.json({ success: true, credits: user.creditBalance, user: { name: user.name } });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Stripe Payment Initialization
const paymentStripe = async (req, res) => {
  try {
    // 1. Correctly pull userId from req.body (per your auth middleware)
    const { planId, userId } = req.body; 

    if (!planId || !userId) {
        return res.json({ success: false, message: "Missing Details" });
    }

    let credits, amount;
    switch(planId){
      case "Basic": credits=100; amount=10; break;
      case "Advanced": credits=500; amount=50; break;
      case "Business": credits=5000; amount=250; break;
      default: return res.json({ success:false, message:"Invalid plan" });
    }

    // 2. Create Transaction (This will now appear in MongoDB)
    const transactionData = {
        userId, 
        plan: planId, 
        amount, 
        credits, 
        payment: false, 
        date: Date.now()
    };

    const newTransaction = new transactionModel(transactionData);
    await newTransaction.save(); 

    // 3. Create Stripe PaymentIntent using your .env CURRENCY
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe works in smallest currency units (cents/paisa)
      currency: process.env.CURRENCY || "usd", 
      metadata: { 
        transactionId: newTransaction._id.toString() 
      },
    });

    res.json({ 
        success: true, 
        clientSecret: paymentIntent.client_secret, 
        transactionId: newTransaction._id 
    });

  } catch(error) {
    console.log("Stripe Error:", error.message);
    res.json({ success: false, message: error.message });
  }
}

// Stripe Verification
const verifyStripepay = async (req, res) => {
    try {
        // userId is automatically provided by your userAuth middleware in req.body
        const { paymentIntentId, transactionId, userId } = req.body;

        if (!paymentIntentId || !transactionId || !userId) {
            return res.json({ success: false, message: "Missing verification details" });
        }

        // 1. Fetch the payment intent from Stripe to confirm success
        const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

        if (paymentIntent.status === 'succeeded') {
            
            // 2. Find the transaction in your MongoDB
            const transactionData = await transactionModel.findById(transactionId);

            if (!transactionData) {
                return res.json({ success: false, message: "Transaction record not found" });
            }

            // 3. Prevent double-crediting if the payment is already marked true
            if (transactionData.payment) {
                return res.json({ success: false, message: 'Payment already processed and credits added' });
            }

            // 4. Update the user's credit balance
            const userData = await userModel.findById(userId);
            const newCreditBalance = userData.creditBalance + transactionData.credits;
            
            await userModel.findByIdAndUpdate(userData._id, { creditBalance: newCreditBalance });

            // 5. Mark the transaction as paid so it cannot be reused
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

            res.json({ success: true, message: "Credits Added Successfully" });
        } else {
            res.json({ success: false, message: "Payment verification failed: Status " + paymentIntent.status });
        }
    } catch (error) {
        console.log("Verification Error:", error.message);
        res.json({ success: false, message: error.message });
    }
}

export { registerUser, loginUser, userCredits, paymentStripe, verifyStripepay };
