import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://chaitanyavish2411:Jeetu123@cluster0.9ei2p8d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/food-del').then(() => console.log("db connected"));
}

