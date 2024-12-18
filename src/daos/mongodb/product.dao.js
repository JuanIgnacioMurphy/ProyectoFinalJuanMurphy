import { ProductModel } from './models/product.model.js';

class ProductDaoMongo {

    constructor(model) {
        this.model = model;
    }

    async getAll(page = 1, limit = 10, category, sort) {
        try {
            const filter = category ? { category: { $regex: `^${category}$`, $options: 'i' } } : {};
            let sortOrder = {};
            if (sort) {
                sortOrder.price = sort === 'asc' ? 1 : sort === 'desc' ? -1 : null;
            }
            return await this.model.paginate(filter, { page, limit, sort: sortOrder });
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id) {
        try {
            return await this.model.findById(id);   
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
            return await this.model.findByIdAndUpdate(id, object, {new: true});
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

    async insertMany (products){
        try {
            const createdProducts = await this.model.insertMany(products);
            return createdProducts;
        } catch (error) {
            throw new Error(`Failed to insert products: ${error.message}`);
        }
    }

}

export const productDao = new ProductDaoMongo(ProductModel);
