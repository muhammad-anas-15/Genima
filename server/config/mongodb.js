import mongoose from "mongoose"

const connectDB = async () => {
    
    // added an event which will called when db connected inside function executed.
    mongoose.connection.on('connected' , ()=>{
        console.log("Database Connected")
    })

    await mongoose.connect(`${process.env.MONGODB_URI}/genima`)
}

export default connectDB