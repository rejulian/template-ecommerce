import jwt from 'jsonwebtoken'
import 'dotenv/config'

const JWT_SECRET = process.env.JWT_SECRET
const ADMIN_ROLE = process.env.ADMIN_ROLE

export const verify_token = (req, res, next) => {
    const { access_token } = req.cookies;

    if(access_token){
        jwt.verify(access_token, JWT_SECRET, (err, payload) => {
            if(err) return res.status(403).json({status:"failed", message:"Token no valido"})
            req.user = payload;
            next()
        })
    } else {
        return res.status(401).json({status:"failed", message:"Debe iniciar sesión"})
    }
}

export const is_admin = (req, res, next) => {
    const { role } = req.user;
    if(role !== ADMIN_ROLE) return res.status(403).json({status:"failed",message:"No esta autorizado para realizar esta acción"})
    next()
}