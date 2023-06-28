import mongoose from "mongoose";
import bcypt from "bcryptjs";

const VendorSchema = mongoose.Schema({
  NameOfTheCompany: {
    type: String,
    required: [true, "Please add Name of the Company"],
  },
  Address: String,
  Street: String,
  Floor: String,
  City: String,
  NearestTrainStation: String,
  PinCode: {
    type: Number,
  },
  County: {
    type: Number,
  },
  Country: String,
  PrimaryMobileNumber: {
    type: Number,
  },
  SecondaryMobileNumber: {
    type: String,
  },
  PrimaryEmailID: {
    type: String,
    required: true,
    unique: true,
  },
  CompanyEmail: String,
  SecondaryEmailID: String,
  BankName: String,
  BankAddress: String,
  BankAccountNumber: String,
  BankIFSCCode: {
    type: String,
  },
  SwiftCode: String,
  WireCode: String,
  BankCustomerSupportEmail: String,
  BankCustomerSupportMobile: {
    type: Number,
  },
  OtherDetails1: String,
  OtherDetails2: String,
  OtherDetails3: String,
  OtherDetails4: String,
  Pan: String,
  GST: String,
  VAT: String,
  TINNumber: String,
  SalesTax: String,
  GSTEligibility: String,
  TDSApplicabilityOnVendor: String,
  MSEDRegisteration: String,
  LowerTaxDeductionCertificate: String,
  Password: {
    type: String,
    required: true,
  },

  Invoices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "invoices",
    },
  ],
  PAN_Attach: "String",
  GST_Attach: "String",
  VAT_Attach: "String",
  TIN_Attach: "String",
  SalesTax_Attach: "String",
  MSED__Attach: "String",
  CertificationOfIncorporation_Attach: "String",
  Memorandum_Attach: "String",
  ArticleOfAssociation_Attach: "String",
  CancelledCheque_Attach: "String",
  BankDetails_Attach: "String",
});

VendorSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();
  this.Password = bcypt.hashSync(this.Password, 12);
  return next()
});

VendorSchema.methods.comparePassword = function async(oldPassword,newPassword){
    return bcypt.compare(oldPassword,newPassword)
}

const vendorsModel = mongoose.model("vendors", VendorSchema);
export default vendorsModel;
