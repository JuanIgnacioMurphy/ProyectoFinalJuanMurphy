import { ProductModel } from '../models/product.model.js';

class ProductManager {

    constructor(model) {
        this.model = model;
    }

    async getAllProducts() {
        try {
            return await this.model.find({})
        } catch (error) {
            throw new Error(error);
        }
    }

    async getProductById(id) {
        try {
            return await this.model.findById(id);
        } catch (error) {
            throw new Error(error);
        }
    }

    async createProduct(object) {
        try {
            return await this.model.create(object)
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateProduct(id, object) {
        try {
            return await this.model.findByIdAndUpdate(id, object, {new: true});
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteProduct(id) {
        try {
            return await this.model.findByIdAndDelete(id)
        } catch (error) {
            throw new Error(error);
        }
    }

}

const productManager = new ProductManager(ProductModel);

export default productManager;
