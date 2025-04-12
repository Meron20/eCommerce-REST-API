import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import asyncHandler from 'express-async-handler'

// post products

export const createNewProduct = asyncHandler (async (req, res, next) => {
    const  { name, price, category, description, images} = req.body
   

    if (!name || !price || !category){
        return res.status(400).json ({ message: "Name price and category are required"})
    }


    const newProduct = await Product.create({ name, price, category, description, images})

    res.status(201).json(newProduct)
 
})
// Get all products

export const getAllProducts = asyncHandler (async  (req, res) => {
    const allProducts = await Product.find()
    

    res.status(200).json(allProducts)
})


// Get a product by id

export const getProductById = asyncHandler (async (req, res) => {
    const { id } = req.params;

    if(!mongoose.Types.ObjectId.isValid (id)) {
        return res.status(400).json({ message: "Invalid id"})
    }

    const productById = await Product.findById(id)
    
    
        if(!productById){
        return res.status(404).json({ message: 'Product not found.'})

        }

    res.status(200).json(productById)
})

// update product

export const updateProduct = asyncHandler (async (req, res) => {
   
    const { id } = req.params ;
    const  { name, price, category, description, images} = req.body;
   
    if(!mongoose.Types.ObjectId.isValid (id)) {
        return res.status(400).json({ message: "Invalid id"})
    }
    
    const toUpdate = {}
    if (name) toUpdate.name = name
    if (price) toUpdate.price = price
    if (category) toUpdate.category = category
    if (description) toUpdate.description = description
    if (images) toUpdate.images = images

    if (Object.keys(toUpdate).length === 0) {
        res.status(400).json ({ message: "No changes provided" })
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, toUpdate, {new: true}).exec()

    if(!updatedProduct){
        return res.status(404).json({ message: "Product not found." })
    }
    
    res.status(200).json(updatedProduct)

})

export const deleteProduct = asyncHandler(async (req, res) => {
    const { id } = req.params ;

    if(!mongoose.Types.ObjectId.isValid (id)) {
        return res.status(400).json({ message: "Invalid id"})
    }

    const product  = await Product.findByIdAndDelete(id).exec()

    if(!product){
    return res.status(404).json({ message: "Product not found." })
    }

    res.sendStatus(204)
    

})