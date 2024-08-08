import { Category } from '../dao/models/category.model.js';
import { Product } from '../dao/models/product.model.js'

export const create_product = async (req, res) => {
    try {
        const { name, description, price, categories, stock, status } = req.body;

        if (!name || !price || !categories) return res.status(400).json({ status: "failed", message: "Complete los campos obligatorios" })

        if (name.length < 5) return res.status(400).json({ status: "failed", message: "El nombre del producto debe tener al menos 5 caracteres" })

        const new_product = await Product.create({ name, description, price, stock, status })

        if (categories && categories.length > 0) {
            const categoryInstances = await Category.findAll({
                where: {
                    id: categories
                }
            });
            new_product.setCategories(categoryInstances)
        }

        return res.status(200).json({ status: "success", message: "Producto creado exitosamente.", payload: new_product })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

export const get_products = async (req, res) => {
    try {
        let { page = 1, limit = 12, category, sort } = req.query;

        page = parseInt(page);
        limit = parseInt(limit)

        const offset = (page - 1) * limit;

        const options = {
            limit: limit,
            offset: offset,
            include: {
                model: Category,
                through: {
                    attributes: []
                }
            }
        }

        if (category) {
            options.include.where = { name: category } // Busca en relacion a los nombres que recibe en category
        }

        if (sort) {
            options.order = [['price', sort]]
        }

        const products = await Product.findAll(options)

        const totalProducts = await Product.count(options.where ? { where: options.where } : {});
        const totalPages = Math.ceil(totalProducts / limit);

        const nextPage = page < totalPages ? `/api/v1/products?page=${page + 1}` : null
        const prevPage = page >= totalPages ? `/api/v1/products?page=${page - 1}` : null

        return res.status(200).json({ status: "success", payload: products, pagination: { page, limit, totalPages, nextPage, prevPage } })

    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
}

export const get_product_by_id = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id, {
            include: {
                model: Category,
                through: {
                    attributes: []
                }
            }
        })

        if (!product) return res.status(404).json({ status: "failed", message: "No se encontro el producto" })

        return res.status(200).json({ status: "success", payload: product })
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
}

export const update_product = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, price, categories, stock, status } = req.body;

        const product = await Product.findByPk(id);
        if (!product) return res.status(404).json({ status: "failed", message: "No se encontro el producto" })

        const data_to_update = {
            name: name !== undefined ? name : product.name,
            description: description !== undefined ? description : product.description,
            price: price !== undefined ? price : product.price,
            // categories: categories !== undefined ? categories : product.categories,
            stock: stock !== undefined ? stock : product.stock,
            status: status !== undefined ? stock : product.status
        }

        const product_updated = await product.update(data_to_update)

        return res.status(200).json({ status: "success", message: "Producto actualizado exitosamente", payload: product_updated })

    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
}

export const delete_product = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByPk(id)

        if (!product) return res.status(404).json({ status: "failed", message: "No se encontro el producto" })

        await product.destroy()

        return res.status(200).json({ status: "success", message: "Producto eliminado exitosamente." })

    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
}