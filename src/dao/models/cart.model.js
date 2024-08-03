import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";

export const Cart = sequelize.define(
    'Cart', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        products: {
            type: DataTypes.JSON,
            allowNull: false,
            defaultValue: []
        }
    }
)