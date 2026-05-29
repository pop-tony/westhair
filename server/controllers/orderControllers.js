import consultModel from "../models/consultationModel.js";
import orderAModel from "../models/orderAModel.js";

export const createOrderA = async (req, res) => {
  try {
    const { orderData } = req.body;
    console.log(req.body)

    //const { name, email, phone } = clientData;
    //const { price } = selectedPackage;
    //const pname = selectedPackage.name;

    // Validate required fields
    if (!orderData) {
      return res.status(400).json({ success: false, message: 'Missing Required Details' });
    }
    return res.json({ success: true, message: "Order successfully created" });

    const order = new orderAModel({formData});
    await order.save();

    return res.json({ success: true, message: "Order successfully created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const createConsult = async (req, res) => {
  try {
    
    const { service, barber, date, time, customer, amount, paymentRef, status } = req.body;
    const { name, email, phone } = customer;
    
    // Validate required fields
    if (!service || !customer || !amount || !date || !paymentRef || !status || !barber || !time) {
      return res.status(400).json({ success: false, message: 'Missing Required Details' });
    }

    const consult = new consultModel({name, email, phone, date, service, barber, time, amount, paymentRef, status });
    await consult.save();

    return res.json({ success: true, message: "Section successfully booked" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const createOrder = async (req, res) => {

  try {
    const { customer, items, total, paymentRef, status } = req.body.orderData;
    const { name, email, phone, address } = customer;
    const { price, quantity } = items[0];
    const customerName = name;
    const itemName = items[0].name
    // Validate required fields
    if (!customerName || !email || !phone || !address || !itemName || !price || !quantity || !total || !paymentRef || !status) {
      return res.status(400).json({ success: false, message: 'Missing Required Details' });
    }
    
    const order = new orderAModel({ customerName, email, phone, address, itemName, price, quantity, total, paymentRef, status });
    await order.save();

    return res.json({ success: true, message: "Order successfully created" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const updateOrder = async (req, res) => {
    let updatedOrder;
    
  try {
    const { name, price, orderId, quantity, description, brand, color, buyer, address, number, city, email } = req.body;

    updatedOrder = await orderModel.findByIdAndUpdate(orderId,
        { name, price, orderId, quantity, description, brand, color, buyer, address, number, city, email },
        { new: true });
    

    if (!updatedOrder) {
      return res.json({ success: false, message: 'Order not found' });
    }

    return res.json({ success: true, product: updatedOrder });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: 'Failed to update product' });
  }
}

export const deleteOrder = async (req, res) => {

    const { orderId } = req.body

  try {
    await orderModel.deleteOne({ _id: orderId });
    return res.json({ success: true, message: "Order Deleted!" });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: 'Failed to delete order' });
  }
}

export const getOrderData = async (req, res) => {
  try {
    const orders = await orderModel.find();

    if (!orders.length) {
      return res.json({ success: false, message: "No orders found!" });
    }

    return res.json({ success: true, orders });
  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: 'Failed to get orders' });
  }
}