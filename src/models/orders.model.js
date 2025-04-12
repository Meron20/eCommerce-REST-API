import mongoose from "mongoose";
import Message from "./message.model.js";

const orderSchema = new mongoose.Schema(

    {
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        products: [
            {
                productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
                quantity: { type: Number,  default: 1 },
            },
        ],
        totalPrice: {type: Number},
        messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }]
    },
    {timestamps: true }
)

const Order = mongoose.model('Order', orderSchema)
export default Order
   

  