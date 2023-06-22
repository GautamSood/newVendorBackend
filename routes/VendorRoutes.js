import { Router } from "express";
import {
  getVendorInfo,
  checkVendor,
  addInvoice,
  updateVendorInfo,
} from "../Controllers/VendorControllers.js";

const vendorRoutes = Router();




vendorRoutes.get('/getInfo',checkVendor,getVendorInfo)

vendorRoutes.post('/addInvoice', checkVendor, addInvoice);

vendorRoutes.patch("/addUserInfo/:id", checkVendor, updateVendorInfo);

export default vendorRoutes