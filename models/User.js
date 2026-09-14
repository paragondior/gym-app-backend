import mongoose from "mongoose";
const userschema = new mongoose.Schema({
    email :{ type:String, required:true},
    password:{type:String, required:true}
});
const User = mongoose.model("User", userschema);
export default User;
