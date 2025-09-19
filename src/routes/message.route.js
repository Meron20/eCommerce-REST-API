import express from 'express';
import { createMessage, deleteMessage } from '../controllers/message.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';


const router = express.Router();

router.post('/:id', verifyToken, createMessage)
router.delete('/:id', verifyToken, deleteMessage)


export default router;
