import deliveryModel from "../models/deliveryModel.js";
import jwt from "jsonwebtoken";
import bycript from "bcrypt";
import validator from "validator";

// login delivery boy
const loginDelivery = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await deliveryModel.findOne({email});

        if (!user) {
            return res.json({success:false, message:"User does not exists"})
        }

        const isMatch = await bycript.compare(password, user.password);

        if (!isMatch){
            return res.json({success: false, message: "Invalid Credentials"});
        }

        const token = createToken(user._id);
        res.json({success:true, token});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

// register delivery boy
const registerDelivery = async (req, res) => {

    const {name, password, email} = req.body;

    try {
        // checking if the user already exists
        const exists = await deliveryModel.findOne({email});

        if(exists) {
            return res.json({success:false, message:"User already exists"});
        }

        // validation email format and strong password
        if(!validator.isEmail(email)) {
            return res.json({success:false, message:"Please enter a valid email"});
        }

        if (password.length<5){
            return res.json({success:false, message:"Please enter a strong password"});
        }

        // hashing user password
        const salt = await bycript.genSalt(10);
        const hashedPassword = await bycript.hash(password, salt);

        const newBoy = new deliveryModel({
            name:name,
            email:email,
            password:hashedPassword,
        });

        const boy = await newBoy.save();
        const token = createToken(boy._id);
        res.json({success:true, token});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

const getName = async (req, res) => {
    try {
            let deliveryData = await deliveryModel.findById(req.body.userId);
            let name = await deliveryData.name;
            res.json({success:true, name});
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

const listDelivery = async (req, res) => {
    try {
        const delivery = await deliveryModel.find({});
        res.json({ success: true, data: delivery });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

export { loginDelivery, registerDelivery, getName, listDelivery }