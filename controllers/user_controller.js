//HARCUMNER@ MSHAKELU HAMAR
import UserService from "../service/user_service.js"
import User from "../models/user.js";
import { v4 as uuidv4 } from 'uuid';
import bcrypt, {hash} from "bcrypt"
import emailValidator from "email-validator"
import KEYS from "../config/keys.js";


class UserController {
    //localhost:8080/users/register
    async register(req, res){
        const id = uuidv4();
        const userList = UserService.getAllUsers();
        const emails = userList.map(element => {return element.email});
        if(emails.includes(req.body.email)){
            res.status(409).json("Email is already exist")
        }else {
            if (emailValidator.validate(req.body.email) &&
                req.body.userName.length > 3 &&
                req.body.userName.length <= 20 &&
                req.body.password.length > 8 &&
                req.body.password.length <= 20) {

                bcrypt.genSalt(KEYS.SALT_ROUNDS, function (err, salt) {
                    bcrypt.hash(req.body.password, salt, async function (err, hash) {
                        if (!err) {
                            const user = new User(id, req.body.userName, req.body.email, hash, "")

                            await UserService.saveUser(user);
                            res.status(200).json(user);
                        } else {
                            res.status(401).json({message: "Unauthorized"});
                        }
                    });
                });
            } else {
                res.status(409).json("Մարդավարի տվյալնեեր տուր");
            }
        }
    }

    //localhost:8080/users/login
    async login(req, res){
        const userList = UserService.getAllUsers();
        const emails = userList.map(element => {return element.email});
        if(emails.includes(req.body.email)){
            let user = UserService.getUserByEmail(req.body.email)

            bcrypt.compare(req.body.password, user.password, function (err, result){
                if(result){
                    let index = emails.indexOf(user.email);
                    userList[index]["token"] = uuidv4();
                    UserService.saveAll(userList);

                    setTimeout(()=>{
                        userList[index]["token"] = "";
                        UserService.saveAll(userList);
                        },10000)
                    res.status(200).json("OK");
                }else{
                    res.status(401).json("Password is incorrect");
                }
            });
        }else {
            res.status(401).json("Email is incorrect");
        }
    }
}

export default new UserController();