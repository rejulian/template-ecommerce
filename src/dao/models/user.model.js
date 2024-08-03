import { DataTypes } from "sequelize";
import { sequelize } from "../db/db.js";
import { Cart } from "./cart.model.js";

export const User = sequelize.define(
    'User', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        role:{
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue:"user"
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        cart_id: {
            type: DataTypes.UUID,
            references: {
                model: Cart,
                key: 'id'
            }
        }
    }, {timestamps:false}
)

User.belongsTo(Cart, { foreignKey: 'cart_id' });
Cart.hasMany(User, { foreignKey: 'cart_id' });