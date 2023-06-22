import mongoose from "mongoose";
import bcypt from "bcryptjs";

const VendorSchema = mongoose.Schema({
  NameOfTheCompany: {
    type: String,
    required: [true, "Please add Name of the Company"],
  },
  Address: String,
  Street: String,
  State: String,
  PinCode: {
    type: Number,
  },
  ContactPersonName: String,
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
  SecondaryEmailID: String,
  BankName: String,
  BankAddress: String,
  BankAccountNumber: String,
  BankIFSCCode: {
    type: String,
  },
  TypeOfVendor: String,
  FrequencyBillSubmission: String,
  GSTInputCred: String,
  TDSApplicabilityType: String,
  LowerTDSCertificate: String,
  LowerTaxDeductionCertificate: String,
  PurchaseOfService: String,
  Password: {
    type: String,
    required: true,
  },
  Invoices:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'invoices'
  }]
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
