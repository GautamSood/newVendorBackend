import vendorsModel from "../Database/VendorsModel.js";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

// const cookieOptions = {
//   httpOnly: true,
//   maxAge: 86400000,
//   sameSite: "None",
// };

function generateJWT(vendor) {
  return new Promise((resolve, reject) => {
    resolve(
      "Bearer " +
        jwt.sign({ id: vendor._id }, process.env.JWTSecret, {
          expiresIn: "10d",
        })
    );
  });
}

const signIn = async (req, res, next) => {
  try {
    const { Email, Password } = req.body.data;
    if(!Email||!Password) return res.status(401).json({error:"Add Email Address and Password In order to continue"})
    const vendor = await vendorsModel
      .findOne({ PrimaryEmailID: Email })
      .select("+Password");
    if (!vendor || !await vendor.comparePassword(Password, vendor.Password)) {
      return res
        .status(400)
        .json({ message: "Please check or Email address or Password" });
    }
    let token = await generateJWT(vendor);
    // res.cookie("jwt", token, cookieOptions);
    vendor.Password ="Dont't You Dare look for me"
    res.status(200)
      .json({
        message: "Successfully Loged in",
        token,
        vendor,
      });
      
  } catch (error) {
    return res.status(401).json({ error_message: error.message });
  }
};

const signUp = async (req, res, next) => {
  try {
    const {
      NameOfTheCompany,
      PrimaryEmailID,
      Password,
      PrimaryMobileNumber,
    } = { ...req.body.data };
    const vendor = await vendorsModel.create({
      NameOfTheCompany,
      PrimaryEmailID,
      Password,
      PrimaryMobileNumber,
    });
    await vendor.save();
    let token = await generateJWT(vendor);

    // res.cookie("jwt", token, cookieOptions);
    res.status(200).json({ message: vendor, token });
  } catch (error) {
    res.status(400).json({ error_message: error.message, sucess: false });
  }
};

const signOut = (req, res) => {
  res.clearCookie("jwt");
  res.end();
};

export { signIn, signUp, signOut };
