const jwt = require("jsonwebtoken");

const verifyToken = async(req,res,next)=>{
    try{
        let token = req.headers['authorization'];
        // console.log(token,req.headers)
        if(!token){
            return res.status(403).send("Access denied")
        }

        if(token.startsWith("Bearer ")){
            const bearer = token.split(' ');
            token = bearer[1];
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

module.exports = {verifyToken};