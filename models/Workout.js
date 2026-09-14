
import mongoose from "mongoose";

const workoutschema = new mongoose.Schema({

   exercise : {type:String} ,
    sets :{type:Number},
    reps :{type: Number},
    weight :{type:Number},
    date :{type:Date },
    note :{type:String}

});
const Workout = mongoose.model("Workout", workoutschema);
export default Workout;