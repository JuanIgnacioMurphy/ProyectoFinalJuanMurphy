import * as services from '../services/cart.services.js';

export const getAll = async (req, res, next) => {
    try {
        const response = await services.getAll();
        res.json(response)
    } catch (error) {
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await services.getById(id);
        res.json(response)
    } catch (error) {
        next(error);
    }
};

// export const create = async (req, res, next) => {
//     try {
//         const { userName } = req.body;

//         if (!userName) {
//             return res.status(400).json({ message: "User name is required." });
//         }

//         const newCart = await services.create({ userName, products: [] });
//         res.status(201).json(newCart);
//     } catch (error) {
//         next(error);
//     }
// };


export const create = async (req, res, next) => {
    try {
        const newCart = await services.create(req.body);
        res.status(201).json(newCart);
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { cid } = req.params;  // Obtener el ID del carrito
        const productsToUpdate = req.body;  // Obtener el array de productos a actualizar

        // Llamamos al servicio para actualizar el carrito
        const cartUpdated = await services.update(cid, productsToUpdate);
        
        // Enviar la respuesta con el carrito actualizado
        res.json(cartUpdated);
    } catch (error) {
        next(error);
    }
};


export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        await services.remove(id);
        res.json({ message: 'Cart deleted successfully' });
    } catch (error) {
        next(error);
    }
};

export const addProdToCart = async (req, res, next) => {
    try {
        const { cartId } = req.params;
        const { prodId } = req.params;

        const cartUpdated = await services.addProdToCart(cartId, prodId);
        res.json(cartUpdated);
    } catch (error) {
        next(error);
    }

};

export const removeProductFromCart = async (req, res, next) => {
    try {
        const { cartId, prodId } = req.params;

        const updatedCart = await services.removeProductFromCart(cartId, prodId);
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
};


export const updateProductQuantity = async (req, res, next) => {
    try {
        const { cid, pid } = req.params; // Obtener el ID del carrito y del producto
        const { quantity } = req.body; // Obtener la nueva cantidad desde el body

        // Llamamos al servicio para actualizar la cantidad del producto
        const updatedCart = await services.updateProductQuantity(cid, pid, quantity);
        
        // Enviar la respuesta con el carrito actualizado
        res.json(updatedCart);
    } catch (error) {
        next(error);
    }
};





