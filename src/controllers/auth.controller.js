import { User } from '../dao/models/user.model.js'
import { Cart } from '../dao/models/cart.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const JWT_SECRET = process.env.JWT_SECRET

export const register = async (req, res) => {
    try {
        const {username, email, password} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(!username || !email || !password) return res.status(400).json({status:"failed", message:"Complete todos los campos"})
        if(username.length < 4) return res.status(400).json({status:"failed", message:"El usuario debe tener mas de 3 caracteres"})
        if(!emailRegex.test(email)) return res.status(400).json({status:"failed", message:"Ingrese un email valido"})
        if(password.length < 6) return res.status(400).json({status:"failed", message:"La contraseña debe tener al menos 6 caracteres"})
        
        const hashed_password = bcrypt.hashSync(password, 12)

        const new_cart = await Cart.create()
        await User.create({username, email, password:hashed_password, cart_id: new_cart.id})
        return res.status(200).json({status:"success", message:"Usuario registrado exitosamente."})
    } catch (error) {
        return res.status(500).json({status:"failed", message:error.message})
    }
}

export const login = async (req, res) => {
    try {
        const {username, password} = req.body;

        if(!username || !password) return res.status(400).json({status:"failed", message:"Complete todos los campos"})
        
        const user = await User.findOne({where:{username}})
        if(!user) return res.status(404).json({status:"failed", message:"Credenciales invalidas"})
        
        const isValid = bcrypt.compareSync(password, user.password)
        if(!isValid) return res.status(404).json({status:"failed", message:"Credenciales invalidas"})
        
        const access_token = jwt.sign({id:user.id, username, role: user.role, cart_id: user.cart_id}, JWT_SECRET, {expiresIn:'1h'})

        return res
            .status(200)
            .cookie('access_token', access_token, {
                httpOnly: true,
                secure: false,
                maxAge: 1000 * 60 * 60 //1h 
            })
            .json({status:"success", message:"Login exitoso", payload:{id:user.id, username, role:user.role, cart_id:user.cart_id}})

    } catch (error) {
        return res.status(500).json({status:"failed", message:error.message})
    }
}