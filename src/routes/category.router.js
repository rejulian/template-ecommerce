import { Router } from "express";
import { create_category, delete_category, get_categories, update_category } from "../controllers/category.controller.js";
import { is_admin, verify_token } from "../middleware/auth.middleware.js";

export const category_router = Router()

category_router.use(verify_token)

category_router.get('/', get_categories)
category_router.post('/', is_admin, create_category)
category_router.put('/:id', is_admin, update_category)
category_router.delete('/:id', is_admin, delete_category)