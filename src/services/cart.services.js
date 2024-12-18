import { cartDao } from "../daos/mongodb/cart.dao.js";
import * as productServices from './product.services.js'


export const getAll = async () => {
    try {
        const carts = await cartDao.getAll();

        return carts.map(cart => ({
            _id: cart._id,
            userName: cart.userName,
            products: cart.products.map(p => ({
                productId: p.productId ? p.productId._id : null,
                name: p.productId ? p.productId.name : "Producto no disponible",
                price: p.productId ? p.productId.price : 0,
                description: p.productId ? p.productId.description : "El producto ha sido eliminado o no existe.",
                quantity: p.quantity
            }))
        }));
    } catch (error) {
        throw error;
    }
};


////////////////////
export const getById = async (id) => {
    try {
        const cart = await cartDao.getById(id);
        if (!cart) {
            throw new Error('Cart not found');
        }
        const formattedCart = {
            _id: cart._id,
            userName: cart.userName,
            products: cart.products.map(p => ({
                productId: p.productId._id,
                name: p.productId.name,
                price: p.productId.price,
                description: p.productId.description,
                quantity: p.quantity
            }))
        };

        return formattedCart;
    } catch (error) {
        throw error;
    }
};

////////////////////
export const create = async (obj) => {
    try {
        const newCart = await cartDao.create(obj);
        if (!newCart) throw new Error('Cannot create cart');
        return newCart;
    } catch (error) {
        throw (error)
    }
}

////////////////////
export const update = async (id, productsToUpdate) => {
    try {

        const cart = await cartDao.getById(id);
        if (!cart) throw new Error('Cart not found');


        for (let { productId, quantity } of productsToUpdate) {
            const product = await productServices.getById(productId);
            if (!product) throw new Error(`Product with id ${productId} not found`);

            const existingProductIndex = cart.products.findIndex(
                p => p.productId.toString() === productId.toString()
            );

            if (existingProductIndex > -1) {
                cart.products[existingProductIndex].quantity += quantity;
            } else {
                cart.products.push({ productId, quantity });
            }
        }

        const updatedCart = await cartDao.update(id, { products: cart.products });

        const formattedCart = {
            _id: updatedCart._id,
            userName: updatedCart.userName,
            products: updatedCart.products.map(p => ({
                productId: p.productId._id,
                name: p.productId.name,
                price: p.productId.price,
                description: p.productId.description,
                quantity: p.quantity
            }))
        };

        return formattedCart;
    } catch (error) {
        throw error;
    }
};


////////////////////
export const remove = async (id) => {
    try {
        const cartToRemove = await cartDao.delete(id);
        if (!cartToRemove) throw new Error('Cart not found or cannot be removed');
        return cartToRemove;
    } catch (error) {
        throw (error)
    }
}

////////////////////
export const removeProductFromCart = async (cartId, prodId) => {
    try {
        const updatedCart = await cartDao.removeProductFromCart(cartId, prodId);
        if (!updatedCart) throw new Error('Cart or Product not found');
        return updatedCart;


    } catch (error) {
        throw error;
    }
};

////////////////////
export const addProdToCart = async (cartId, prodId) => {
    try {
        await productServices.getById(prodId);
        const cartUpdated = await cartDao.addProdToCart(cartId, prodId);
        if (!cartUpdated) throw new Error('Cart not found or cannot be updated');
        return cartUpdated;
    } catch (error) {
        throw error;
    }
};


export const updateProductQuantity = async (cid, pid, quantity) => {
    try {
        const cart = await cartDao.getById(cid);
        if (!cart) throw new Error('Cart not found');

        
        await productServices.getById(pid);


        const productIndex = cart.products.findIndex(
            p => p.productId.toString() === pid.toString() ||
                p.productId._id.toString() === pid.toString()
        );


        if (productIndex === -1) throw new Error('Product not found in cart');


        cart.products[productIndex].quantity = quantity;


        const updatedCart = await cartDao.update(cid, { products: cart.products });


        const formattedCart = {
            _id: updatedCart._id,
            userName: updatedCart.userName,
            products: updatedCart.products.map(p => ({
                productId: p.productId._id,
                name: p.productId.name,
                price: p.productId.price,
                description: p.productId.description,
                quantity: p.quantity
            }))
        };

        return formattedCart;
    } catch (error) {
        console.error('Error in updateProductQuantity:', error);
        throw error;
    }
};