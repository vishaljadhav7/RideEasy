const User = require('../models/user.model');
const Driver = require('../models/driver.model');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError')

const verifyUser = async (req, res, next) => {
    try {  
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
     if(!token){
        return  res.status(401).json(new ApiError(400, "Unauthorized"));
     }

     const decodedMessage = await jwt.verify(token, process.env.TOKEN_KEY)
     const user = await User.findById(decodedMessage._id);
     req.user = user;
     return next();
    } catch (error) {
        res.status(401).json(new ApiError(400, "Unauthorized"));
    }
}


const verifyDriver = async (req, res, next) => {
    try {  
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];
     if(!token){
        return  res.status(401).json(new ApiError(400, "Unauthorized"));
     }

     const decodedMessage = await jwt.verify(token, process.env.TOKEN_KEY)
     const driver = await Driver.findById(decodedMessage._id);
     req.driver = driver;
     return next();
    } catch (error) {
        res.status(401).json(new ApiError(400, "Unauthorized"));
    }
}

module.exports = { verifyUser , verifyDriver}