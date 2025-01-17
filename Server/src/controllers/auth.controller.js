const ApiError = require('../utils/ApiError'); // standerdized API errors and response
const ApiResponse = require('../utils/ApiResponse');
const User = require('../models/user.model');
const Ride = require('../models/ride.model');

const signUpUser = async (req, res, next) => {
  try {
     // API level validations

    const {firstName, lastName, emailId, password} = req.body;

    if (firstName && !firstName || lastName && !lastName || emailId && !emailId ||  password && !password) {
        throw new ApiError(400, "All fields are required");
    } 

    const existingUser = await User.findOne({
        $or : [{firstName}, {emailId}]
    })

    if(existingUser){
        throw new ApiError(409, "User already exists")
    }

    const user = await User.create({
        firstName,
        lastName,
        emailId,
        password
    })
  
     
    const token = await user.generateAuthToken() 

    const registeredUser = await User.findById(user._id).select("-password")

    if(!registeredUser){
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    const options = {
        httpOnly: true,
        secure: true
      }

    const serverResponse = new ApiResponse(200, registeredUser, "User registered Successfully")
    serverResponse.token = token
       
    return res
        .status(201)
        .cookie("token",token, options)
        .json(serverResponse)

  } catch (error){ 
    return res
           .status(400)
           .json(new ApiError(error.statusCode, error.message));
  }
}


const signInUser = async (req, res) => {

    try {
        const {emailId, password} = req.body;

        if(!emailId || !password){
            throw new ApiError(400, "Email or Password is required")
        }
        
        const user = await User.findOne({emailId})
        
        if(!user){
            throw new ApiError(400, "Invalid Credentials");
        }

        const isValidPassword = await user.verifyPassword(password);

        if(!isValidPassword){
            throw new ApiError(400, "Invalid Credentials");
        }

        const token = await user.generateAuthToken(); 

        const loggedInUser = await User.findById(user._id).select("-password");

        const options = {
          httpOnly: true,
          secure: true
        }


        const serverResponse = new ApiResponse(200, loggedInUser, "User registered Successfully")
        serverResponse.token = token           
      
        res
        .status(200)
        .cookie("token", token, options)
        .json(serverResponse)

    } catch (error) {
    
        res.status(400).json(
            new ApiError(400, "Error " + error.message)
         )
    }
}


const signOutUser = async(req, res) => {

    const options = {
        httpOnly: true,
        secure: true
      }

     return res
     .status(200)
     .clearCookie("token", options)
     .json(new ApiResponse(200, {}, "User/Ride has logged Out"))
}


const getRidesCompletedByUser = async (req, res, next) => {
    try {
       const userId = req.user._id;
  
       const ridesBookedByUser = await Ride.find({
        user: userId,
        status: 'completed',
       }).populate('user', "-password").populate('driver', "-password");
  
       const serverResponse = new ApiResponse(200, ridesBookedByUser , "Rides Found Successfully")
  
       return res.status(200).json(serverResponse);
  
    } catch (error) {
      return res
      .status(400)
      .json(new ApiError(error.statusCode || 400, error.message));
    }
  }
  

module.exports = {
    signInUser,
    signOutUser,
    signUpUser,
    getRidesCompletedByUser
}
