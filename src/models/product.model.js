import { Schema, model } from "mongoose";

export const productsColection = 'product';

const productSchema = new Schema({
    name: {type: String, required: [true, 'Product name is required']},
    description: {type: String, required: [true, 'Product description is required']},
    price: {type: Number, required: [true, 'Product price is required']},
    stock: {type: Number, required: [true, 'Product stock is required']}
});

export const ProductModel = model(productsColection, productSchema);