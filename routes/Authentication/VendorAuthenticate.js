import { Router } from "express";
import { signIn, signUp, signOut } from "../../Controllers/authControllers.js";
import multer from "multer";

// const fileStroage = multer.diskStorage({
//   destination: (req,file,cb)=>{
//     cb(null,'./images')
//   },
//   filename : (req,file,cb)=>{
//     cb(null, Date.now + '--'+ file.orignalname)
//   }
// })

// const upload  = multer({dest: "./images"})

const vendorAuthenticate = Router();

// vendorAuthenticate.post("/signUp", upload.array('images',9), signUp);
vendorAuthenticate.post("/signUp", signUp);

vendorAuthenticate.post("/signIn", signIn);

vendorAuthenticate.delete('/signOut', signOut)

export default vendorAuthenticate;
