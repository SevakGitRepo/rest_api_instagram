import Photo from "../models/photo.js";
import UserService from "../service/user_service.js"
import PhotoService from "../service/photo_service.js"
import { v4 as uuidv4 } from 'uuid';

class PhotoController {
    //localhost:8080/photos/upload/:userId
    async uploads (req, res){
        const fileData = req.file;
        const id = req.params.id;
        console.log(UserService.getUserById(id))
        const token = UserService.getUserById(id).token;
        console.log(token)
        if(token){
            if(fileData){
                if(fileData.mimetype ==="image/jpeg" || fileData.mimetype ==="image/jpg" ||
                    fileData.mimetype ==="image/png"||fileData.mimetype ==="image/gif") {
                    const photo = new Photo(uuidv4(), fileData.originalname, fileData.path, id);
                    await PhotoService.savePhoto(photo);
                    res.status(200).json(fileData);
                }else{
                    res.status(409).json("File type is incorrect");
                }

                }else {
                res.status(409).json({message:"File is incorrect"});
            }
        }else {
            res.status(401).json({message:"Token is incorrect"});
        }

    }
}

export default new PhotoController();