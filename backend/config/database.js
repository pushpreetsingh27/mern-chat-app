
import mongoose from "mongoose";


const connectToDataBase = async () =>{
    await mongoose.connect(process.env.MONGOURL).then(()=>{
        console.log("Connected to MongoDB")
    }).catch((error)=>{
        console.log("Failed to connect to MongoDB and error is - " , error)
    })
}

export default connectToDataBase;