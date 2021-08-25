
  const  fileFilter = (req, file, cb)=> {

        if(file.mimetype === "image/png" ||
            file.mimetype === "image/jpg"||
            file.mimetype === "image/jpeg"||
            file.mimetype === "image/gif"){
            cb(null, true);
        }
        else{
            cb(null, false);
        }
    }

export default fileFilter;