import foodModel from "../models/foodModel.js";
import fs from 'fs';


// add food item

const addFood = async (req, res) => {

    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        shop: req.body.shop,
        image: image_filename
    })

    try {
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

// all food list

const listFood = async (req, res) => {
    try {
        const foods = await foodModel.find({});
        res.json({ success: true, data: foods });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
}

//remove food item
const removeFood = async (req, res) => {
    const foodId = req.body.id;
    try {
        const food = await foodModel.findById(foodId);
        fs.unlink(`uploads/${food.image}`, () => { });

        await foodModel.findByIdAndDelete(foodId);
        res.json({ success: true, message: "Food Removed" });

    } catch (error) {
        
        console.log(error);
        res.json({ success: false, message: "Error" });

    }
}

export { addFood, listFood, removeFood }