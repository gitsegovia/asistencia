import db from "../models";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'

export const AuthenticationMethods = { 
    login: async (req, res) => {
        const {username, password, module} = req.body;
        let user = await db.User.findOne({where: {username: username}});
        if(!user) res.json({error: "Usuario no encontrado"})
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) res.json({error: "Contraseña invalida"})
        const token = jwt.sign(JSON.stringify({...user.dataValues, module}), process.env.JWT_SECRET);
        res.json({token, message: "Autenticado"})
    },
    register: async (req, res) => {
        try {
            const {username, password, firstName, surName, email, bussinessId} = req.body;
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(password, salt)
            const user = await db.User.create({username, firstName, surName, password: passwordHashed, email, bussinessId});
            res.json(user);
        } catch (error) {
            res.status(500).json({error});            
        }
    }
}
