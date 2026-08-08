import  express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({quiet: true});

const app = express ();
app.get("/" , (req, res) =>{ res.send("Gym App is Alive")});
async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Successfully connected to the database");
    }
    catch (error){
        console.log("Error connecting to database" , error)
    }
}
connectDB();
app.listen(5000, () => {
     console.log("server is running on port 5000")});