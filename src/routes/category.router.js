import { Router } from "express";
import { create_category, delete_category, get_categories, update_category } from "../controllers/category.controller.js";
import { is_admin, verify_token } from "../middleware/auth.middleware.js";

export const category_router = Router()

category_router.get('/', get_categories)

category_router.post('/', verify_token, is_admin, create_category)
category_router.put('/:id', verify_token, is_admin, update_category)
category_router.delete('/:id', verify_token, is_admin, delete_category)