import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { auth_router } from './routes/auth.router.js';
import 'dotenv/config'
import { product_router } from './routes/product.router.js';
import { category_router } from './routes/category.router.js';

const app = express()
const PORT = process.env.PORT || 8080

//middlewares
app.use(express.json())
app.use(cors({origin:['http://localhost:5173'], credentials:true}))
app.use(cookieParser())

//routes
app.use('/api/v1/auth', auth_router)
app.use('/api/v1/products', product_router)
app.use('/api/v1/category', category_router)
app.get('/', (req,res) => {
    res.send('Hello world')
})

app.listen(PORT, (req, res)=>{
    console.log(`App running on: http://localhost:${PORT}`);
})