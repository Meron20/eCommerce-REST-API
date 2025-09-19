
import Order from "../models/orders.model.js";
import Message from "../models/message.model.js";
import asyncHandler from 'express-async-handler'
import Product from "../models/product.model.js";

export const createOrder = asyncHandler(async (req, res) => {
 const {  products } = req.body;
 const user = req.user._id;

 if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Products are required."})
 }
  
 const order = await Order.create({ user, products })
 res.status(201).json(order)

})

export const getOrders = asyncHandler(async(req, res) => {
  const orders = await Order.find({ user: req.user._id })
  .populate('user', 'name')
  .populate({
    path: "products.productId",
    select: "name price category descripton images"
  }).exec()
 
  res.status(200).json(orders);

})

export const updateOrder = asyncHandler ( async ( req, res) => { 
    const { id } = req.params
    const {  products } = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).json({ message: "Invalid id" })
    }

    const toUpdate = {}
    if (user) toUpdate.user = user
    if(products) toUpdate.products = products

    if(Object.keys(toUpdate).length === 0) {
        res.status(400).json({ message: "No changes provided"})
    }

    const order = await Order.findOneAndUpdate({_id: id, user: req.user._id }, toUpdate, { new: true}).exec()
    
    if (!order) {
       return res.status(404).json({ message: "Order not found"})

    }

    res.status(200).json(order)

 })
export const deleteOrder = asyncHandler ( async ( req, res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({ message: "Invalid id" })
      }

    const order = await Order.findByIdAndDelete(id ).exec()
    if(!order) {
        return res.status(404).json({ message: "Order not found"})
    
    }

    res.sendStatus(204)
  

 })
