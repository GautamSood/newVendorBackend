import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from './Utils/cors.js'
import vendorAuthenticate from "./routes/Authentication/VendorAuthenticate.js";
import vendorRoutes from "./routes/VendorRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const myapp = express();
myapp.use(cors(corsOptions));


myapp.use(express.json());
myapp.use(cookieParser());
myapp.use("/api/v1/vendors/auth", vendorAuthenticate);
myapp.use("/api/v1/vendors", vendorRoutes);

const connectDB = async () => {
  return new Promise((res, rej) => {
    mongoose
      .connect("mongodb+srv://dudejagarvit3:Garvit1839@cluster0.aa2bbme.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
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
// myapp.get("/", (req, res) => {
//   res.cookie("jwt", "21323", { httpOnly: true, maxAge: 86400000 });
//   res.json({ message: "Request Accepted" });
// });
myapp.listen(process.env.PORT || 4000, () => {
  console.log("server up and Running");
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  // let port = 4000;
  myapp.use(express.static("./vendor-frontend/build"));
  console.log("App running in Production Mode!");

  // console.log(`${__dirname}/../Frontend/build/index.html`);
  console.log(
    path.resolve(__dirname, "vendor-frontend", "build", "index.html")
  );
  myapp.get("*", (req, res) => {
    console.log("req: ", req.url);
    res.sendFile(
      path.resolve(__dirname, "vendor-frontend", "build", "index.html")
    );
  });
}


export { myapp };
