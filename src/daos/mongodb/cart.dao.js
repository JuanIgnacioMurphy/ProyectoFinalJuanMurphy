import { CartModel } from './models/cart.model.js'
import mongoose from 'mongoose';

class CartDaoMongo {

    constructor(model) {
        this.model = model;
    }

    async getAll() {
        try {
            const carts = await this.model.find({})
                .populate({
                    path: 'products.productId',
                    select: 'name price description' 
                })
                .lean();

            return carts;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        try {
            const cart = await this.model.findById(id)
                .populate({
                    path: 'products.productId',
                    select: 'name price description'
                })
                .lean();

            if (!cart) throw new Error('Cart not found');

            return cart;
        } catch (error) {
            throw new Error(error);
        }
    }


    async create(object) {
        try {
            return await this.model.create(object)
        } catch (error) {
            throw new Error(error);
        }
    }

    async update(id, object) {
        try {
            const updatedCart = await this.model.findByIdAndUpdate(
                id, 
                { $set: object }, 
                { new: true, runValidators: true }
            ).populate('products.productId');
            return updatedCart;
        } catch (error) {
            throw new Error(error);
        }
    }
    

    async delete(id) {
        try {
            return await this.model.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(error);
        }
    }


    async addProdToCart(cartId, productId) {
        try {
            const cart = await this.model.findById(cartId);

            if (!cart) throw new Error('Cart not found');
            const productIdStr = new mongoose.Types.ObjectId(productId).toString();

            const existingProductIndex = cart.products.findIndex(
                p => new mongoose.Types.ObjectId(p.productId).toString() === productIdStr
            );


            if (existingProductIndex > -1) {
                cart.products[existingProductIndex].quantity += 1;
            } else {
                cart.products.push({ productId, quantity: 1 });
            }

            await cart.save();
            return await this.model.findById(cartId).populate('products.productId');
        } catch (error) {
            throw new Error(error);
        }
    }





}

export const cartDao = new CartDaoMongo(CartModel);