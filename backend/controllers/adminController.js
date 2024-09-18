import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import bycript from "bcrypt";
import validator from "validator";

// login admin
const loginAdmin = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await adminModel.findOne({email});

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

// register admin
const registerAdmin = async (req, res) => {

    const {name, password, email, shop} = req.body;

    try {
        // checking if the user already exists
        const exists = await adminModel.findOne({email});

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

        let image_filename = `${req.file.filename}`;

        const newAdmin = new adminModel({
            name:name,
            email:email,
            password:hashedPassword,
            image:image_filename,
            shop:shop
        });

        const admin = await newAdmin.save();
        const token = createToken(admin._id);
        res.json({success:true, token});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

const listAdmin = async (req, res) => {
    try {
        const admin = await adminModel.find({});
        res.json({ success: true, data: admin });
        
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

const getShopName = async (req, res) => {
    try {
            let adminData = await adminModel.findById(req.body.userId);
            let shop = await adminData.shop;
            res.json({success:true, shop}) 
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

export {loginAdmin, registerAdmin, listAdmin, getShopName }