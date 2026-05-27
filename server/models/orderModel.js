import mongoose from "mongoose";

const ordersShema = new mongoose.Schema({
    name: {type: String, required: true},
    price: {type: String, required: true},
    quantity: {type: String, required: true},
    description: {type: String, required: true},
    brand: {type: String, required: true},
    color: {type: String, required: true},
    buyer: {type: String, required: true},
    address: {type: String, required: true},
    number: {type: String, required: true},
    city: {type: String, required: true},
    email: {type: String, required: true},
    status: {type: String, default: "order made"},
    buyerId: {type: String},
},{timestamps: true},)

const orderModel = mongoose.models.orders || mongoose.model('orders', ordersShema);

export default orderModel;