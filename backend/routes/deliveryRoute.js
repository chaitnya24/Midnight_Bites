import express from "express";
import { loginDelivery, registerDelivery, getName, listDelivery } from "../controllers/deliveryController.js";
import authMeddleware from "../middleware/auth.js";

const deliveryRouter = express.Router()

deliveryRouter.post("/register", registerDelivery)
deliveryRouter.post("/login", loginDelivery)
deliveryRouter.post("/get", authMeddleware, getName)
deliveryRouter.get("/list", listDelivery);

export default deliveryRouter;