import { Category } from "../dao/models/category.model.js";

export const create_category = async (req, res) => {
    try {
        const { name } = req.body;

        if (!name) return res.status(400).json({ status: "failed", message: "Debe proporcionar un nombre para la categoria" })

        const new_category = await Category.create({name})

        return res.status(200).json({status:"success", message:"Categoria creada exitosamente", payload:new_category})
    } catch (error) {
        return res.status(500).json({status:"failed", message:error.message})
    }
}