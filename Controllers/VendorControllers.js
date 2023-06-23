import jwt from 'jsonwebtoken'
import invoiceModel from "../Database/InvoiceModel.js";
import vendorsModel from "../Database/VendorsModel.js";
import mongoose from 'mongoose';

//checking the Venodr from the cookies received from the frontend
const checkVendor = async (req,res,next)=>{
    try{
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null) return res.status(401).json({ error: "please Login First" });

        jwt.verify(token, process.env.JWTSecret);
    
    const id =jwt.verify(token, process.env.JWTSecret).id;
    req.id = id;
    next();
    }catch(error){
        return res.status(401).json({error:error.message,"success":false})
    }
}


const filterObject = (obj, ...allowedFields) => {
  let newObject = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObject[el] = obj[el]; //add desired fields to new obj
    }
  });
  return newObject;
};




//Getting the Vendor Info from the database by Id
const getVendorInfo = async(req,res)=>{
try{
const response = await  vendorsModel.findById({_id: req.id});
if (!response){
    return res.status(400).json({error: "No Vendor Found Please Login First"});
}
return res.json({data: response,success: true})
}
catch(error){
return res.status(400).json({message: error.message})
}    
}

//updating the vendor info with all the things
const updateVendorInfo = async (req, res) => {
    try {
        const {
          Address,
          Street,
          Floor,
          City,
          NearestTrainStation,
          PinCode,
          County,
          Country,  
          SecondaryMobileNumber,
          CompanyEmail, 
          SecondaryEmailID,
          BankName,
          BankAddress,
          BankAccountNumber,
          BankIFSCCode,
          SwiftCode,
          WireCode,
          BankCustomerSupportEmail,
          BankCustomerSupportMobile,
          OtherDetails1,
          OtherDetails2,
          OtherDetails3,
          OtherDetails4,
          Pan,
          GST,
          VAT,
          TINNumber,
          SalesTax,
          GSTEligibility,
          TDSApplicabilityOnVendor,
          MSEDRegisteration,
          LowerTaxDeductionCertificate,

        } = {
          ...req.body.data,
        };
        console.log(req.id);
        const updatedVendor = await vendorsModel.findByIdAndUpdate(
          {_id: req.id},
          {
            Address,
            Street,
            Floor,
            City,
            NearestTrainStation,
            PinCode,
            County,
            Country,
            SecondaryMobileNumber,
            CompanyEmail,
            SecondaryEmailID,
            BankName,
            BankAddress,
            BankAccountNumber,
            BankIFSCCode,
            SwiftCode,
            WireCode,
            BankCustomerSupportEmail,
            BankCustomerSupportMobile,
            OtherDetails1,
            OtherDetails2,
            OtherDetails3,
            OtherDetails4,
            Pan,
            GST,
            VAT,
            TINNumber,
            SalesTax,
            GSTEligibility,
            TDSApplicabilityOnVendor,
            MSEDRegisteration,
            LowerTaxDeductionCertificate,
          },
          { new: true }
        );
      console.log(updatedVendor);
        return res.status(200).json({
            message: "user info added",
            updatedVendor
        })

    } catch (error) {
        // session.abortTransaction();
        return res.status(406).json({ error: error.message });
    }
}


//Adding a invoice
const addInvoice = async(req,res)=>{
const session = await mongoose.startSession();

    try{
        session.startTransaction();
        const getUserInfo = await vendorsModel.findById({_id: req.id}).session(session);
        const { invoiceamount, invoicecurrency, invoicedate} = {...req.body.data}
        const addInvoice = await invoiceModel.create([{invoiceamount,invoicecurrency,vendorid:req.id,invoicedate}],{session});
        const addToVendor = await vendorsModel.findByIdAndUpdate({_id:req.id},{$push:{Invoices: addInvoice[0]._id}},{new:true}).session(session);
        if(addToVendor==null){
            throw new Error("No Such User Exist");
        }
        session.commitTransaction();
    res.json({message:"Invoice sucessfully added",response:addToVendor})
    }catch(error){
        // console.log("here")
        session.abortTransaction();
        return res.status(406).json({error:error.message})
    }finally{
        // session.endSession()
    }

}

export { getVendorInfo, checkVendor, addInvoice, updateVendorInfo };