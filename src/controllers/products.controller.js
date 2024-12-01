import productManager from "../managers/products.manager.js";

export const getAllProducts = async (req, res, next) => {
try {
    const response = await productManager.getAllProducts();
    res.json(response)
} catch(error) {
    next(error);
}

};

export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await productManager.getProductById(id);
        if(!response) {
            throw new Error('Product not found');
        }
        res.json(response)
    } catch(error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    try {
        const newProduct = req.body;
        const response = await productManager.createProduct(newProduct);
        if (!response) {
            throw new Error('Error in validation');
        }
        res.status(201).json(response);
    } catch(error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedProduct = req.body;
        const response = await productManager.updateProduct(id, updatedProduct);
        if (!response) {
            throw new Error('Product not found');
        }
        res.json(response);
    } catch(error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await productManager.deleteProduct(id);
        if (!response) {
            throw new Error('Product not found');
        }
        res.json({message: 'Product deleted successfully'});
    } catch(error) {
        next(error);
    }
};