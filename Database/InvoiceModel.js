import mongoose from 'mongoose';

const invoiceSchema = mongoose.Schema({
    invoicenumber:Number,
    currency: String,
    description: String,
    vendorid:{type:mongoose.Schema.Types.ObjectId,ref:'vendors'},
    date:String,
    netAmount:{
        type: Number,
        required: [true, "Please Add invoice amount"]
    },
    invoicestatus:{
        type: String,
        default: "pending"
    },
    attachment: String,
    quantity: String
})


invoiceSchema.pre('save', function (next) {

    // Only increment when the document is new
    if (this.isNew) {
        invoiceModel.count().then(res => {
            this.invoicenumber = res; // Increment count
            next();
        });
    } else {
        next();
    }
});

const invoiceModel = mongoose.model("invoices", invoiceSchema);
export default invoiceModel;