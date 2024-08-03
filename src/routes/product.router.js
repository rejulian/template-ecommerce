import { Router } from "express";
import { create_product, delete_product, get_product_by_id, get_products } from "../controllers/product.controller.js";
import { is_admin, verify_token } from "../middleware/auth.middleware.js";

export const product_router = Router()

//Middleware
product_router.use(verify_token)

//Admin routes
product_router.post('/', is_admin, create_product)
product_router.delete('/:id', is_admin, delete_product)

//User routes
product_router.get('/', get_products)
product_router.get('/:id', get_product_by_id)