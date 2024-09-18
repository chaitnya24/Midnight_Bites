import express from "express";
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js";
import authMeddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.post("/add", authMeddleware, addToCart);
cartRouter.post("/remove", authMeddleware, removeFromCart);
cartRouter.post("/get", authMeddleware, getCart);

export default cartRouter;