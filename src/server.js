import express from 'express';
import productRouter from './routes/products.router.js'
import cartRouter from './routes/cart.router.js'
import errorHandler from './middlewares/errorHandler.js'

import { initMongoDB } from './daos/mongodb/db.conection.js'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/products', productRouter);
app.use('/carts', cartRouter);

app.use(errorHandler)

initMongoDB()
  .then(() => console.log('MongoDB database initialized'))
  .catch((error) => console.log(error));

const PORT = 8080;

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

