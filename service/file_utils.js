//FILE I HET ASHXATELU HAMAR
import fs from "fs";
import KEYS from "../config/keys.js";

class FileUtils {
    // async getData(){
    //     const data = await fs.readFile(KEYS.FILE_PATH,  function (err,data){
    //         if(err){
    //             console.log("Error when read file");
    //             console.log(err);
    //         }
    //     });
    //     return JSON.parse(data);
    // }
    getData(){
        const data =  fs.readFileSync(KEYS.FILE_PATH)
        return JSON.parse(data);
    }
    // async setData(data){
    //     const stringify = JSON.stringify(data);
    //     await fs.writeFile(KEYS.FILE_PATH, stringify, (err, data)=>{
    //         if(err){
    //             console.log("Error when write file");
    //             console.log(err)
    //         }
    //     });
    // }
    setData(data){
        const stringify = JSON.stringify(data);
         fs.writeFileSync(KEYS.FILE_PATH, stringify);
    }
}

export default new FileUtils();

