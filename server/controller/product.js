import {Product} from '../model/product.js'
import { v2 as cloudinary } from 'cloudinary';

export const addProduct = async (req, res) => {
    try{
        let productData = JSON.parse(req.body.productData);

        const images = req.files 
         
        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
                return result.secure_url
            })
        )

        await Product.create({
            ...productData, 
            image:imagesUrl
        })
        res.json({success:true, message:"Product Added"})

    }
    catch(error){
        res.json({message:"internal server error", success:false});
    }
}

export const ProductList = async (req, res) => {
    try{
        const products = await Product.find({})
        res.json({success:true, products})
    }
    catch(error){
        res.json({message:"internal server error", success:false});
    }
}

export const ProductById = async (req, res) => {
    try{
        const {id} = req.body
        const product = await Product.findById(id)
        res.json({success:true, product})
    }
    catch(error){
        res.json({message:"internal server error", success:false});
    }
}

export const ChangeStock = async (req, res) => {
    try{
        const {id, inStock} = req.body
        await Product.findByIdAndUpdate(id, {inStock})
        res.json({success:true, message:"Stock updated"})

    }
    catch(error){
        res.json({message:"internal server error", success:false});
    }
}



