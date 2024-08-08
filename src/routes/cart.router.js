import { Router } from "express";
import { add_product_to_cart, clear_cart, delete_product_from_cart, get_cart_by_id } from "../controllers/cart.controller.js";

export const cart_router = Router()

//EL CARRITO SE CREA AL MOMENTO DE REGISTRAR UN USUARIO

cart_router.get('/:id', get_cart_by_id)
cart_router.post('/:cid/:pid', add_product_to_cart)
cart_router.delete('/:id', clear_cart)
cart_router.delete('/:cid/:pid', delete_product_from_cart)