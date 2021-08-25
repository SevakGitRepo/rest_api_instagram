import FileUtils from "./file_utils.js";

class PhotoService {
    async savePhoto(photo){
        const getUserData = FileUtils.getData();
        getUserData["photos"].push(photo);
        await FileUtils.setData(getUserData);
    }
}

export default new PhotoService();