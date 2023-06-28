import { Router } from "express";
import fs from 'fs'
import {
  getVendorInfo,
  checkVendor,
  addInvoice,
  updateVendorInfo,
} from "../Controllers/VendorControllers.js";
import vendorsModel from "../Database/VendorsModel.js";

const vendorRoutes = Router();


import multer from 'multer'

const controlledUpload = multer.diskStorage({
  destination:(req,file,cb)=>{
    var folderName = req.vendor.PrimaryEmailID
    var dir = `files/${folderName}`;
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
  }
    cb(null,dir)
  },
  filename:(req,file,cb)=>{
  const ext = file.mimetype.split('/')[1];
    cb(null,`${file.originalname}.${ext}`)
  }
})



const upload = multer({storage:controlledUpload})



vendorRoutes.get('/getInfo',checkVendor,getVendorInfo)

vendorRoutes.post('/addInvoice', checkVendor, addInvoice);

vendorRoutes.patch("/addUserInfo", checkVendor, updateVendorInfo);

vendorRoutes.patch('/testingImg',checkVendor,upload.array('img',11),async(req,res)=>{
try{  
  var updates ={}
  var keyName = ''
  const files = req.files
  var ext = ''
files.forEach((i)=>{
  keyName = i.originalname
  ext = i.mimetype.split('/')[1];
  updates[keyName]  = `http://192.168.1.39:4000/${req.vendor.PrimaryEmailID}/${i.originalname}.${ext}`

})
const updateVendorInfo = await vendorsModel.findByIdAndUpdate(req.id,updates,{new:true});
return res.json({message:'Update Success',success:true})}
catch(error){res.status(500).json({error:error,success:false})}
})

export default vendorRoutes