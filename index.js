import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from './Utils/cors.js'
import vendorAuthenticate from "./routes/Authentication/VendorAuthenticate.js";
import vendorRoutes from "./routes/VendorRoutes.js";
// import path from "path";
// import { fileURLToPath } from "url";

const myapp = express();
myapp.use(cors(corsOptions));
myapp.use('/',express.static('files'))


myapp.use(express.json());
myapp.use(cookieParser());

myapp.get("/",(req,res)=>{
  return res.status(200).json({
    message: "simple get request working fine"
  })
})

myapp.use("/api/v1/vendors/auth", vendorAuthenticate);
myapp.use("/api/v1/vendors", vendorRoutes);

const connectDB = async () => {
  return new Promise((res, rej) => {
    mongoose
      .connect(
        "mongodb+srv://dudejagarvit3:Garvit1839@cluster0.aa2bbme.mongodb.net/?retryWrites=true&w=majority",
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => {
        console.log("DataBase Connected");
        res("working fine");
      })
      .catch((error) => {
        console.log(error);
      });
  });
};
await connectDB();
myapp.listen(process.env.PORT || 4000, () => {
  console.log("server up and Running");
});
export { myapp };
