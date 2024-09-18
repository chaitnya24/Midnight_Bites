import express from "express";
import { listAdmin, loginAdmin, registerAdmin, getShopName } from "../controllers/adminController.js";
import multer from "multer";
import authMeddleware from "../middleware/auth.js";

const adminRouter = express.Router()


//importing image
const storage = multer.diskStorage({
    destination: "shopsUploads",
    filename: (res, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
})

const upload = multer({ storage: storage });

adminRouter.post("/register", upload.single("image"), registerAdmin );
adminRouter.get("/list", listAdmin);
adminRouter.post("/login", loginAdmin);
adminRouter.post("/get", authMeddleware, getShopName);

export default adminRouter;