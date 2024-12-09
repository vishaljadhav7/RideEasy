const validator = require("validator");
const ApiError = require("../utils/ApiError")

const validateSignUpData = async (req) => {
    const {firstName, lastName, emailId, password} = req.body

    if (firstName && !firstName || lastName && !lastName || emailId && !emailId ||  password && !password) {
        throw new ApiError(400, "All fields are required");
    } 
    if (emailId && !validator.isEmail(emailId)) {
        throw new ApiError(400,"Email is not valid!");
    } 
     if (password && !validator.isStrongPassword(password)) {
        throw new ApiError(400,"Please enter a strong Password!");
    }  
}

module.exports = validateSignUpData;