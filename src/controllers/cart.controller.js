import { Cart } from '../dao/models/cart.model.js'

export const get_cart_by_id = async (req, res) => {
    try {
        const { id } = req.params;

        const cart = await Cart.findByPk(id)
        if (!cart) return res.status(404).json({ status: "failed", message: "No se encontro el carrito" })

        return res.status(200).json({ status: "success", payload: cart })
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
}

export const add_product_to_cart = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity = 1 } = req.body;

        const cart = await Cart.findByPk(cid)
        if (!cart) return res.status(404).json({ status: "failed", message: "No se encontro el carrito" })

        const products = [
            ...cart.products, { product_id: pid, quantity: quantity }
        ]

        const cart_updated = await cart.update({products})

        return res.status(200).json({ status: "success", message: "Producto agregado al carrito exitosamente", payload: cart_updated })

    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
}

export const delete_product_from_cart = async (req, res) => {
    try {
        const {cid, pid} = req.params;

        const cart = await Cart.findByPk(cid)
        if (!cart) return res.status(404).json({ status: "failed", message: "No se encontro el carrito" })

        const products_filtered = cart.products.filter(p => p.product_id !== pid)

        const cart_updated = await cart.update({products: products_filtered})

        return res.status(200).json({ status: "success", message: "Producto eliminado del carrito exitosamente", payload: cart_updated })

    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
}

export const clear_cart = async (req, res) => {
    try {
        const { id } = req.params;

        const cart = await Cart.findByPk(id)
        if (!cart) return res.status(404).json({ status: "failed", message: "No se encontro el carrito" })

        await cart.update({products:[]})

        return res.status(200).json({status:"success", message:"El carrito se vació exitosamente"})

    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
}