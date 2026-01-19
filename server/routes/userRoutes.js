import express from 'express'
import {registerUser , loginUser, userCredits} from '../controllers/userController.js'
import userAuth from '../middlewares/auth.js'
import { paymentStripe} from '../controllers/userController.js'
import { verifyStripepay } from '../controllers/userController.js'

const userRouter = express.Router()

// inside this userRouter we have to create end point and we have to povide a controller function at that end point 

userRouter.post('/register' ,  registerUser)
userRouter.post('/login' , loginUser)
userRouter.get('/credits' , userAuth , userCredits)//middleware before
userRouter.post("/pay-stripe", userAuth, paymentStripe);
userRouter.post('/verify-stripe' , userAuth , verifyStripepay)

export default userRouter
