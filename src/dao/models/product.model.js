import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Category } from "./category.model.js";

export const Product = sequelize.define(
    'Product', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        price: {
            type: DataTypes.FLOAT(10,2),
            allowNull: false,
            defaultValue: 0
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        thumbnails: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: []
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 1 // 1 es true y 0 es false
        }
    }, {timestamps:true}
)

Product.belongsToMany(Category, { through: 'ProductCategory' });
Category.belongsToMany(Product, { through: 'ProductCategory' });