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
          const module = req.decoded.module;
          console.log(req.decoded);
          if(!checkLoginType(module, req.url)){
            return res.status(403).json({ mensaje: 'Permiso denegado' });  
          }          
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

 const allowedUrlForLoginAssits = ["/sign/"];


 function checkLoginType(module, url)
 {
  console.log({module, url})
  if(module === 'Asissts'){
    return allowedUrlForLoginAssits.includes(url.replace(/\d+/g, ""));
  } else {
    return true;
  }
 }