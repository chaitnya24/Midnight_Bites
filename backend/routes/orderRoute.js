import express from "express";
import authMiddleware from "../middleware/auth.js"
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder, updateDelivery } from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware,placeOrder );
orderRouter.post("/userorder", authMiddleware, userOrders);
orderRouter.post("/verify", verifyOrder);
orderRouter.get("/list",listOrders);
orderRouter.post("/status",updateStatus);
orderRouter.post("/update",updateDelivery);

export default orderRouter;