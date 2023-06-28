import { Router } from "express";
import { signIn, signUp, signOut } from "../../Controllers/authControllers.js";


const vendorAuthenticate = Router();



vendorAuthenticate.post("/signUp", signUp);

vendorAuthenticate.post("/signIn", signIn);

vendorAuthenticate.delete('/signOut', signOut)

export default vendorAuthenticate;
