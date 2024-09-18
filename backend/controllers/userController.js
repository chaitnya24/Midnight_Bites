import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bycript from "bcrypt";
import validator from "validator";

// login user
const loginUser = async (req, res) => {
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});

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

// register user
const registerUser = async (req, res) => {

    const {name, password, email} = req.body;

    try {
        // checking if the user already exists
        const exists = await userModel.findOne({email});

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

        const newUser = new userModel({
            name:name,
            email:email,
            password:hashedPassword,
        });

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true, token});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"});
    }
}

export {loginUser, registerUser }