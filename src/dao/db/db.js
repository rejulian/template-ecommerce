import { Sequelize } from "sequelize";
import 'dotenv/config'

const DATABASE = process.env.DATABASE
const DATABASE_HOST = process.env.DATABASE_HOST
const DATABASE_USER = process.env.DATABASE_USER
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD

export const sequelize = new Sequelize(DATABASE, DATABASE_USER, DATABASE_PASSWORD, {
    host: DATABASE_HOST,
    dialect: 'mysql',
    logging: false
});

