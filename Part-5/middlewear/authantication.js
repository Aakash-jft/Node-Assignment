const jwt = require("jsonwebtoken");
require("dotenv").config;

function varifyToken(token){
    new Promise((resolve, reject) => {
        jwt.verify(token,process.env.KEY,(err,decoded)=>{
            if(err) return reject(err);
            
            return resolve(decoded);
        })
    })
}


const authenticate = (req,res,next)=>{
    if (!req.headers.authorization)
    return res
      .status(400)
      .send({ message: "Authorization token not found or incorrect" });

      let token = req.headers.authorization.trim().split(" ")[1];

      let decoded 

      try {
        decoded = varifyToken(token)
      } catch (error) {
        console.log(err);
    return res
      .status(400)
      .send({ message: "Authorization token not found or incorrect" });
      }
     
      
      // req.user = decoded.user;
    
      return next();
}

module.exports = authenticate;