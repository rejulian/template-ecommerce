import { Category } from "../dao/models/category.model.js";

export const create_category = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) return res.status(400).json({ status: "failed", message: "Debe proporcionar un nombre para la categoria." })

        const new_category = await Category.create({ name })

        return res.status(200).json({ status: "success", message: "Categoria creada exitosamente.", payload: new_category })
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
}

export const get_categories = async (req, res) => {
    try {
        const categories = await Category.findAll()

        if (!categories) return res.status(404).json({ status: "failed", message: "No se encontraron categorias." })

        return res.status(200).json({ status: "success", payload: categories })
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
}

export const update_category = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const category = await Category.findByPk(id);

        if (!name) return res.status(400).json({ status: "failed", message: "Debe ingresar un nuevo nombre." })
        if (!category) return res.status(404).json({ status: "failed", message: "No se encontro la categoria." })

        const category_updated = await category.update({ name: name.toLowerCase() })

        return res.status(200).json({ status: "success", message: "Categoria actualizada exitosamente.", payload: category_updated })
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })

    }
}

export const delete_category = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findByPk(id)

        if (!category) return res.status(404).json({ status: "failed", message: "No se encontro la categoria." })

        await category.destroy()

        return res.status(200).json({ status: "success", message: "Categoria eliminada exitosamente." })
    } catch (error) {
        return res.status(500).json({ status: "failed", message: error.message })
    }
}