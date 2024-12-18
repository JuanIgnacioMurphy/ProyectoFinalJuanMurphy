import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

class ProductDaoFs {
    constructor(path) {
        this.path = path;
    }

    async getAll() {
        try {
            if (fs.existsSync(this.path)) {
                const prodsJson = await fs.promises.readFile(this.path, 'utf8');
                const products = JSON.parse(prodsJson);
                return products;
            } else return [];
        } catch (error) {
            console.log(error);
        }
    }

    async create(obj) {
        try {
            const product = {
                id: uuidv4(),
                ...obj
            }

            const products = await this.getProducts();

            const prodExist = products.find((i) => i.id === product.id);
            if (prodExist) throw new Error('That product already exists');


            products.push(product);
            await fs.promises.writeFile(this.path, JSON.stringify(products));

            return product;
        }
        catch (error) {
            throw new Error(error);
        }
    }


    async getById(id) {
        try {
            const products = await this.getProducts();
            if(products.length === 0) {
                throw new Error('Product list is empty')
            } else {
                const product = products.find((i) => i.id === id);
                if (!product) throw new Error('Product not found');
                return product;
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async update(obj, id) {
        try {
            const products = await this.getProducts();
            const prodId = await this.getProdById(id);

            const product = {...prodId, ...obj};

            const newProducts = products.filter((i) => i.id !== id);

            newProducts.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
            return product;
        } catch (error) {
            throw new Error(error);
        }
    }


    async delete(id) {
        try {
            const product = await this.getProdById(id);
            const products = await this.getProducts();
            const newProducts = products.filter((i) => i.id!== id);

            await fs.promises.writeFile(this.path, JSON.stringify(newProducts));
            return product;

        } catch (error) {
            throw new Error(error);
        }

}

    async deleteAll() {
        try {
            const products = await this.getProducts();
            if (products.length === 0) {
                return 'Product list is empty';
            }
            await fs.promises.writeFile(this.path, JSON.stringify([]));
            return 'All products deleted';
        } catch (error) {
            throw new Error(error);
        }
    }

}

export const productDao = new ProductDaoFs(path.join(process.cwd(), "src/daos/filesystem/data/products.json"));