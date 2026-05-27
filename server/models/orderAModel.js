import mongoose from "mongoose";

const ordersShema = new mongoose.Schema({
    name: {type: String, required: true},
    pname: {type: String, required: true},
    price: {type: String, required: true},
    eDate: {type: Date},
    wDate: {type: Date},
    bAddress: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    status: {type: String, default: "order made"},
},{timestamps: true},)

const orderAModel = mongoose.models.ordersA || mongoose.model('ordersA', ordersShema);

export default orderAModel;