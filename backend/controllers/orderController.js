import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
// import Stripe from "stripe";


// const stripe = new Stripe(process.env.STRIP_SECRET_KEY)


// placing user order for frontend

const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5173";

    try {
        const newOrder = new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address,
            deliveryBy:req.body.deliveryBy
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const success_url = `${frontend_url}/verify?success=true&orderId=${newOrder._id}`;
        res.json({success:true, session_url:success_url});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

const verifyOrder = async (req, res) => {
    const {orderId, success} = req.body;
    try {
        if (success=='true') {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true, message:"Paid"})
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Not Paid"})
        }
    } catch (error) {
        consloge.log(error);
        res.json({success:false, message:"Error"})
    }
}

// user order for frontend
const userOrders = async (req, res) => {

    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true, data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

// listing order for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}   

// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status:req.body.status})
        res.json({success:true, message:"status updated"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

const updateDelivery = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.ordersId , {deliveryBy:req.body.deliveryBy})
        res.json({success:true, message:"Delivery Booked"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}


export { placeOrder, userOrders, verifyOrder, listOrders, updateStatus, updateDelivery }