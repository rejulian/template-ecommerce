import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const Category = sequelize.define(
    'Category', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {timestamps:true}
)