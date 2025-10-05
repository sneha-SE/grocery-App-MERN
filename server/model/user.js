import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    email: {
        type:String,
        require: true,
        unique: true
    },
    password:{
        type:String,
        require:true
    },
    cartItems: {
        type:Object, default:{}
    }
}, {minimize:false})

export const User = mongoose.models.user || mongoose.model('user', userSchema);