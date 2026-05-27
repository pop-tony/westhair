import mongoose from "mongoose";

const ordersShema = new mongoose.Schema({
    name: {type: String, required: true},
    pname: {type: String, required: true},
    price: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    status: {type: String, default: "order made"},
},{timestamps: true},)

const orderAModel = mongoose.models.wordersH || mongoose.model('wordersH', ordersShema);

export default orderAModel;