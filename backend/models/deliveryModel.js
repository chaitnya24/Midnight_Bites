import mongoose from"mongoose"

const deliverySchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true},
},{minimize:false})

const deliveryModel = mongoose.model.user || mongoose.model("delivery",deliverySchema);

export default deliveryModel;