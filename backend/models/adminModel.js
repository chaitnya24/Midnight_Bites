import mongoose from"mongoose"

const adminSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
    image: { type: String, required: true },
    shop:{type:String, required: true},
    cartData:{type:Object, default:{}}
},{minimize:false})

const adminModel = mongoose.model.user || mongoose.model("admin",adminSchema);

export default adminModel;