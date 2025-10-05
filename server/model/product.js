import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        require:true
    },
    description: {
        type: Array,
        require: true
    },
    price:{
        type:Number,
        require:true
    },
    offerPrice:{
        type:Number,
        require:true
    },
    image:{
        type:Array,
        require:true
    },
    category:{
        type:Array,
        require:true
    },
    inStock:{
        type:Boolean,
        require:true
    },
    cartItems: {
        type:Object, default:{}
    }
}, {timestamps: true})

export const Product = mongoose.models.product || mongoose.model('product', productSchema);