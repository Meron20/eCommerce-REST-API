import express from 'express'
import { createNewProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/product.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';



const router = express.Router()


router.get('/', getAllProducts);

router.get('/:id', getProductById);

router.post('/',  createNewProduct);

router.put('/:id', updateProduct);

router.patch('/:id',  updateProduct);

router.delete('/:id', deleteProduct);




export default router