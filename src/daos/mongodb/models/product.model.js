import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

export const productsColection = 'product';

const productSchema = new Schema({
    name: {
        type: String, 
        required: [true, 'Product name is required'],
        index: true
    },
    description: {
        type: String,
        required: [true, 'Product description is required']
    },
    price: {
        type: Number,
        required: [true, 'Product price is required'],
        index: true
    },
    stock: {
        type: Number,
        required: [true, 'Product stock is required'],
        index: true
    },
    category: {
        type: String,
        required: [true, 'Product category is required'],
        index: true
    }
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = model(productsColection, productSchema);

