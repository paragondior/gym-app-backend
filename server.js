import  express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Workout from "./models/Workout.js";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
dotenv.config({quiet: true});

const app = express ();
app.use(express.json());
app.post( "/register", async (req,res)=>{
    try{
        const captureemail = req.body.email;
        const capturepassword = req.body.password;
        const capturedpassword = await bcrypt.hash(capturepassword,10);
        const createuser =  await User.create({email: captureemail, password: capturedpassword}
             );
        res.json({message:"User created successfully"});
    } catch(error){
        console.log("error creating user", error);
        res.status(500).json({error:"failed to create user"})
    }
});
app.post("/login", async(req,res) =>{ try{const validateuser = await User.findOne({ email: req.body.email }); if (validateuser == null) {
console.log("unable to fetch");
res.status(401).json({ error: "invalid credential" });
} else {const validateduser= await bcrypt.compare(req.body.password, validateuser.password); if (validateduser==false) {console.log("invalid credentials"); res.status(401).json({error:"invalid credentials"})}else{ res.json({message:"login successful"})}
} } catch(error){
    console.log("error logging in", error);
    res.status(500).json({error:"failed to login"});
}});
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
connectDB().then(() =>{app.listen(5000, () => {
     console.log("server is running on port 5000")});})
app.post("/workouts",async (req,res) =>{ try{const savedWorkout = await Workout.create(req.body); res.json(savedWorkout)}
catch (error){console.log("Error creating workout" ,error); res.status(500).json({ error:"failed to create workout"}) }})
app.get("/workouts", async (req,res) => {
    try{
        const workouts = await Workout.find();
        res.json(workouts);
    }
    catch(error){
        console.log("Unable to fetch data ",error
        ); res.status(500).json({error:"error retrieving data"})
    }
});
app.get("/workouts/:id", async (req,res)=>{ try{const workout = await Workout.findById(req.params.id);
     if (workout == null){ res.status(404).json({error: "Workout not found"});} 
     else{res.json(workout);}} 
     catch(error){ console.log("No Workout");
         res.status(500).json({error:"error fetching the workout "})}});
         app.delete("/workouts", async (req,res) => { try{ const deletedInfo = await Workout.deleteMany();
             console.log("Successfully deleted the data");
             res.json(deletedInfo)}
              catch(error)
              { console.log("error deleting" , error);res.status(500).json({error:"Error deleting"});}});
app.delete("/workouts/:id", async(req,res) => { try{const deletedone= await Workout.findByIdAndDelete(req.params.id);
     if (deletedone == null){ res.status(404).json({error:"workout not found "});} 
     else{ res.json(deletedone);}}
      catch(error){ console.log("Unable to delete", error); res.status(500).json({ error:"Unable to delete"})}});
      app.patch("/workouts/:id", async (req,res)=>{try{const updatedone = await Workout.findByIdAndUpdate(req.params.id, req.body, {new:true});
       if(updatedone== null){ res.status(400).json({error:"workout update not found"})}
        else{res.json(updatedone);}}
        catch(error)
        { console.log("Unable to update",error);res.status(500).json({ error: "you were unable to update "})}});