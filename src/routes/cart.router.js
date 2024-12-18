import { Router } from "express";
import * as controllers from '../controllers/cart.controllers.js'

const router = Router();

router.get("/", controllers.getAll);

router.get("/:id", controllers.getById);

router.post("/", controllers.create);

router.put("/:cid", controllers.update);

router.delete("/:id", controllers.remove);

router.delete("/:cartId/product/:prodId", controllers.removeProductFromCart);

router.post("/:cartId/product/:prodId", controllers.addProdToCart);

router.put("/:cid/products/:pid", controllers.updateProductQuantity);




export default router;