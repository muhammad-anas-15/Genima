import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import userRouter from "./routes/userRoutes.js"
import imageRouter from "./routes/imageRoutes.js"


const PORT = process.env.PORT || 4000
const app = express()

// middlewares
app.use(express.json())
app.use(cors())

connectDB()

app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)

app.get('/', (req ,res)=>res.send("API IS WORKING"))

// Vercel Specific: Only listen if NOT in production (i.e., running locally)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => console.log("Server running on Port " + PORT))
}

// Vercel Specific: Export the app so Vercel can run it as a serverless function
export default app