import express from 'express'
import cors from "cors"
import { connectDB } from './config/db.js';
import foodRouter from './routes/foodRoute.js';
import userRouter from './routes/userRoute.js';
import 'dotenv/config'
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';
import adminRouter from './routes/adminRoute.js';
import deliveryRouter from './routes/deliveryRoute.js';


//app config
const app = express();
const port = 4000;


//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images",express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/admin",adminRouter);
app.use("/shop-images",express.static("shopsUploads"));
app.use("/api/delivery",deliveryRouter);


app.get("/", (req, res) => {
    res.send("API WORKING....");
})

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})
