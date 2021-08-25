import express from "express";
import User from "./models/user.js"
import KEYS from "./config/keys.js";
import userRouter from "./routers/user_router.js";
import morgan from "morgan"
import photoRouter from "./routers/photo_router.js";
import multer from "multer";
import fileFilter from "./filter/filter.js"

const app = express();



app.use(express.json());
app.use(express.urlencoded({extended: true}));//postmani hamara
app.use(multer({dest:"uploads", fileFilter:fileFilter}).single("fileData"))
app.use(express.static("./uploads"));
app.use("/users", userRouter);
app.use("/photos", photoRouter);
app.use(morgan("short"))

app.listen(KEYS.PORT, ()=>console.log("Server listen port "+KEYS.PORT));