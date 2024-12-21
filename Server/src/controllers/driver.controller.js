const Driver = require("../models/driver.model");
const { validationResult } = require('express-validator');
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const driverSignUp = async (req, res, next) => {
  try {
    const results = validationResult(req);

    if(!results.isEmpty()){
       return res.status(400).json(new ApiError(400, results.array())) 
    }
 
    const {fullName, emailId, password, vehicleDetails} = req.body;

    const driverExist = await Driver.findOne({emailId});

    if(driverExist){
        return res.status(400).json(new ApiError(400, "driver already exist")) 
    }

    const newDriver = await Driver.create({
        fullName : {
            firstName : fullName.firstName,
            lastName : fullName.lastName
        },
        emailId,
        password,
        vehicleDetails : {
          color : vehicleDetails.color,
          plateNumber : vehicleDetails.plateNumber,
          capacity : vehicleDetails.capacity,
          type : vehicleDetails.type
        },
    })

   const token = await newDriver.generateAuthToken(); 

   const resgisteredDriver = await Driver.findById(newDriver._id).select("-password")

   
   const options = {
    httpOnly: true,
    secure: true
  }

  const serverResponse = new ApiResponse(200, resgisteredDriver, "User registered Successfully")
    serverResponse.token = token

   return res
          .status(200)
          .cookie("token", token, options)
          .json(serverResponse) 
  } catch (error) {
    return res
           .status(400)
           .json(new ApiError(error.statusCode || 400, error.message));
  }
}

const driverSignIn = async (req, res, next) => {
    try {
       const results = validationResult(req);

       if(!results.isEmpty()){
          return res.status(400).json(new ApiError(400, results.array())) 
       }

       const { emailId, password} = req.body;

       const driverExist = await Driver.findOne({emailId});
        
       if(!driverExist){
         return res.status(400).json(new ApiError(400, "Invalid Credentials"))
       }
       
       const isPasswordCorrect = await driverExist.verifyPassword(password);
       
       console.log("isPasswordCorrect ", isPasswordCorrect)
       if(!isPasswordCorrect){
        return res.status(400).json(new ApiError(400, "Invalid Credentials"))
       }

       const token = await driverExist.generateAuthToken();

       const loggedInDriver = await Driver.findById(driverExist._id).select('-password');
       
       const options = {
        httpOnly: true,
        secure: true
      }

      const serverResponse = new ApiResponse(200, loggedInDriver , "User registered Successfully")
      serverResponse.token = token

       return res
             .status(200)
             .cookie("token", token, options)
             .json(serverResponse)
       
    } catch (error) {
        return res
        .status(400)
        .json(new ApiError(error.statusCode || 400, error.message));
    }
}

const driverSignOut = async (req, res, next) => {
    const options = {
        httpOnly: true,
        secure: true
      }

     return res
     .status(200)
     .clearCookie("token", options)
     .json(new ApiResponse(200, {}, "Driver/Captian has logged Out"))
}


module.exports = {driverSignUp, driverSignIn, driverSignOut}