// import { productDao } from "../daos/mongodb/product.dao.js";
import { productDao } from "../daos/mongodb/product.dao.js";
import fs from 'fs'
import path from 'path';


export const getAll = async(page, limit, category, sort) => {
    try {
        return await productDao.getAll(page, limit, category, sort);
    } catch (error){
        throw new Error(error)
    }
}

////////////////////
export const getById = async(id) => {
    try {
        const product = await productDao.getById(id);
        if (!product) {
            throw new Error('Product not found')
        } else return product;
    } catch (error){
        throw (error)
    }
} 

////////////////////
export const create = async(obj) => {
    try {
        const newProduct = await productDao.create(obj);
        if(!newProduct) throw new Error('Cannot create product');
        return newProduct;
    } catch (error){
        throw (error)
    }
} 

////////////////////
export const createProductsFromFile = async() => {
    try {
        const productsFile = await JSON.parse(fs.readFileSync(`${path.join(process.cwd(), 'src/data/Products.json')}`));
        const newProducts = await productDao.create(productsFile);
        if(!newProducts) throw new Error('Cannot create products from file');
        return newProducts.length;
    } catch (error){
        throw (error)
    }
} 

////////////////////
export const update = async(id, obj) => {
    try {
        const productToUpdate = await productDao.update(id, obj);
        if(!productToUpdate) throw new Error('Product not found or cannot be updated');
        return productToUpdate;
    } catch (error){
        throw (error)
    }
} 

////////////////////
export const remove = async(id) => {
    try {  
        const productToRemove = await productDao.delete(id);
        if(!productToRemove) throw new Error('Product not found or cannot be removed');
        return productToRemove;
    } catch (error){
        throw (error)
    }
} 