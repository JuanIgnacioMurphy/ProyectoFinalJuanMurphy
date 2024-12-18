import * as services from '../services/product.services.js';

export const getAll = async (req, res, next) => {
try {
        const { page = 1, limit = 10, category = '', sort = '' } = req.query;
        const response = await services.getAll(page, limit, category, sort);

        res.json({
            status: "success",
            payload: response.docs, 
            totalPages: response.totalPages,
            prevPage: response.hasPrevPage ? response.page - 1 : null,
            nextPage: response.hasNextPage ? response.page + 1 : null,
            page: response.page,
            hasPrevPage: response.hasPrevPage,
            hasNextPage: response.hasNextPage,
            prevLink: response.hasPrevPage ? `http://localhost:8080/products?page=${response.page - 1}&limit=${limit}&category=${category}&sort=${sort}` : null,
            nextLink: response.hasNextPage ? `http://localhost:8080/products?page=${response.page + 1}&limit=${limit}&category=${category}&sort=${sort}` : null,
        });
    
} catch(error) {
    next(error);
}

};

export const getById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const response = await services.getById(id);
        res.json(response)
    } catch(error) {
        next(error);
    }
};

export const create = async (req, res, next) => {
    try {
        const newProduct = await services.create(req.body);
        res.status(201).json(newProduct);
    } catch(error) {
        next(error);
    }
};

export const createProductsFromFile = async (req, res, next) => {
    try {
        // console.log('Acá llega');

        const newProducts = await services.createProductsFromFile();
        res.json(`${newProducts} created successfully`);
    } catch(error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const { id } = req.params;
        const productUpdated = await services.update(id, req.body);
        res.json(productUpdated);
    } catch(error) {
        next(error);
    }
};

export const remove = async (req, res, next) => {
    try {
        const { id } = req.params;
        await services.remove(id);
        res.json({message: 'Product deleted successfully'});
    } catch(error) {
        next(error);
    }
};