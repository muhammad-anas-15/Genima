import express from 'express'
import {generateImage} from '../controllers/imageController.js'
import userAuth from '../middlewares/auth.js'

const imageRouter = express.Router()

// now in this router we have to add path and we will provide the controller function so that we can create api end-point

imageRouter.post('/generateImage' , userAuth ,  generateImage) 
// we have used middleware b/c it will add user id before generateImage has been called.

export default imageRouter
