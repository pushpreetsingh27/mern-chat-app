import express from "express";
import dotenv from "dotenv";
import connectToDataBase from "./config/database.js";
import userRoutes from "./routes/user.route.js"
import messageRoutes from './routes/message.route.js'
import cookieParser from "cookie-parser";
import cors from "cors";
import { server ,app } from "./socket/socket.js";


dotenv.config({})





// Add this line to use cookie-parser

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({extended :true}))

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
}
app.use(cors(corsOptions));

app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);



server.listen(PORT , ()=>{
    connectToDataBase()
    console.log(`Server is running on port ${PORT}`);
});
