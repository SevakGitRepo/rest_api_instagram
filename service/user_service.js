import FileUtils from "./file_utils.js"

class UserService{
    async saveAll(users){
        const getUserData = FileUtils.getData();
        getUserData["users"]=users;
        await FileUtils.setData(getUserData);
    }
    async saveUser(user){
        const getUserData = FileUtils.getData();
        getUserData["users"].push(user);
        await FileUtils.setData(getUserData);
    }

    getAllUsers(){
        return FileUtils.getData()["users"];
    }

    getUserByEmail(email){
        return FileUtils.getData()["users"].find(user=>{
            if(user.email === email){
                return user;
            }
        });
    }

    getUserById(id){
        return FileUtils.getData()["users"].find(user=>{
            if(user.id === id){
                return user;
            }
        });
    }
}

export default new UserService();