import express from 'express';
import { createOrder, deleteOrder, getOrders, updateOrder } from '../controllers/order.controller.js';
import { createMessage, deleteMessage } from '../controllers/message.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

 
router.route('/')
.post(createOrder)
.get(getOrders)


router.route('/:id')
  .put(updateOrder)
  .patch(updateOrder)
  .delete(deleteOrder)


router.route('/:orderId/message')
  .post(createMessage)

router.route('/:orderId/message/:id')
  .delete(deleteMessage)


export default router;
