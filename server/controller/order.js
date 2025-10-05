import Order from '../model/Order.js'
import {Product} from '../model/product.js'


export const placeOrder = async(req, res) => {
    try {

        const {userId, items, address} = req.body;
        if(!address || items.length === 0){
            return res.json({success:false, message:'invalid data'})
        }

        let amount = await items.reduce(async (acc, items) => {
            const product = await Product.findById(items.product);
            return (await acc) + product.offerPrice * items.quantity;
        }, 0)

        amount += Math.floor(amount * 0.02);

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType:"COD"
        });

        return res.json({message:'Order Placed Successfully', success:true})
        
    } catch (error) {
        console.log(error);
        res.json({message:"internal server error", success:false})
    }
}

export const getUserOrder = async (req, res) => {
    try {
        const {userId } = req.body;
        const orders = await Order.find({
            userId,
            $or:[{paymentType:"COD"}, {isPaid:true}]
        }).populate('items.product address').sort({create: -1});

        res.json({success:true, orders})
        
    } catch (error) {
        console.log(error);
        res.json({message:"internal server error", success:false})
    }
}

export const getAllOrders = async(req, res) => {
    try {
        const orders = await Order.find({
            userId,
            $or:[{paymentType:"COD"}, {isPaid:true}]
        }).populate('items.product address').sort({create: -1});

        res.json({success:true, orders})
        
    } catch (error) {
        console.log(error);
        res.json({message:"internal server error", success:false})
    }
}