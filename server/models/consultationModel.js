import mongoose from "mongoose";

const ordersShema = new mongoose.Schema({
    name: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    date: {type: Date, required: true},
    service: {type: String, required: true}, 
    barber: {type: String, required: true}, 
    time: {type: String, required: true}, 
    amount: {type: Number, required: true}, 
    paymentRef: {type: String, required: true}, 
    status: {type: String, default: "booking made"},
},{timestamps: true},)

const consultModel = mongoose.models.hconsult || mongoose.model('hconsult', ordersShema);

export default consultModel;