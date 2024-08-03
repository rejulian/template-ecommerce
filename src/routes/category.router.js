import { Router } from "express";
import { create_category } from "../controllers/category.controller.js";
import { is_admin, verify_token } from "../middleware/auth.middleware.js";

export const category_router = Router()

category_router.use(verify_token)
category_router.use(is_admin)

category_router.post('/', create_category)