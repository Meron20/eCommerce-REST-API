import { request } from "express";
import mongoose from "mongoose";
import Order from "./orders.model.js";

const messageSchema = new mongoose.Schema({
    
   name: { type: String, required: true },
   email: { type: String, required: true },
   message: { type: String, request: true },
   // user: {  type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true }

}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema)
export default Message;