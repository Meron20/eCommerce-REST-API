import Message from "../models/message.model.js";
import asyncHandler from 'express-async-handler'
import Order from "../models/orders.model.js";
import mongoose from "mongoose";



export const createMessage = asyncHandler(async (req, res) => {
    const { name, email, message } = req.body
    const user = req.user._id
    const orderId = req.params.orderId

    if (!name || !email || !message ) {
        return res.status(400).json({ message: 'Name, email and message are required.'})
    }

    const newMessage = await Message.create({ name, email,  message,  order: orderId, user})
    const order = await Order.findById(orderId).exec()
    order.messages.push(newMessage._id)

    await order.save()
    res.status(201).json(newMessage)

})


export const deleteMessage = asyncHandler(async( req, res) => {
   const { id } = req.params

   if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(400).json({ message: "Invalid id" })
   }

   const message = await Message.findById(id).exec()

   if (!message){
    return res.status(404).json({ message: "Message is not found."})
   }


   const order = await Order.findById(message.order).exec()
     order.messages = order.messages.filter( mes => mes.toString() !== id)

     await Message.deleteOne({ _id: id }).exec()
     await order.save()

     res.sendStatus(204)

})