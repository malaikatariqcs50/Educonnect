const jwt = require('jsonwebtoken');
const blTokenModel = require("../models/blacklistToken")
const userModel = require("../models/user")

const userAuth = async(req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if(!token){
        return res.status(401).json({message: 'Unauthorized'})
    }

    const blacklistToken = await blTokenModel.findOne({token})
    if(blacklistToken){
        return res.status(401).json({message: 'Unauthorized'});
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    }
    catch(error){
        return res.status(401).json({message: 'Unauthorized'})
    }
}

module.exports = userAuth;