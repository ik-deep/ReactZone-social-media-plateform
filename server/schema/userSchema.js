const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:50
    },
    lastName:{
        type:String,
        required:true,
        minLength:2,
        maxLength:50
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:5,
        select:false,
    },
    picturePath:{
        type:String,
        default:"",
    },
    friends:{
        type:Array,
        default:[]
    },
    location:String,
    occupation:String,
    viewedProfile:Number,
    impressions:Number,
},{timestamps:true})


module.exports = mongoose.model("user",userSchema);
