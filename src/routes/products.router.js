import { Router } from "express";
import * as controllers from '../controllers/products.controller.js'

const router = Router();

router.get("/", controllers.getAll);

router.get("/:id", controllers.getById);

router.post("/file", controllers.createProductsFromFile);

router.post("/", controllers.create);

router.put("/:id", controllers.update);

router.delete("/:id", controllers.remove);

export default router;