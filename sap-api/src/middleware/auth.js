import express from 'express';
import jwt from 'jsonwebtoken';

const auth = express.Router(); 

auth.use((req, res, next) => {
    const token = req.headers['access-token'];
     if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {      
        if (err) {
          return res.status(401).json({ mensaje: 'Token invalido' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.status(401).json({ 
          mensaje: 'Token no encontrado.' 
      });
    }
 });

 export default auth;