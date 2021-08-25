import Router from "express";
import PhotoController from "../controllers/photo_controller.js"

const photoRouter = Router();

photoRouter.post("/upload/:id", PhotoController.uploads);

export default photoRouter;