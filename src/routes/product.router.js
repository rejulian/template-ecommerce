import { Router } from "express";
import { create_product, delete_product, get_product_by_id, get_products, update_product } from "../controllers/product.controller.js";
import { is_admin, verify_token } from "../middleware/auth.middleware.js";

export const product_router = Router()

//Admin routes
product_router.post('/', verify_token, is_admin, create_product)
product_router.put('/:id', verify_token, is_admin, update_product)
product_router.delete('/:id', verify_token, is_admin, delete_product)

//User routes
product_router.get('/', get_products)
product_router.get('/:id', get_product_by_id)