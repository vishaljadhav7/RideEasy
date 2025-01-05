const express  = require("express");
const driverRouter = express.Router();
const { body } = require("express-validator");
const {driverSignUp, driverSignIn, driverSignOut, getCompletedRidesByDriver} = require("../controllers/driver.controller")
const {verifyDriver} = require('../middlewares/auth.middleware')

driverRouter.post("/driver/signup",  
[
  body('emailId').isEmail().withMessage('Invalid Email'),
  body('fullName.firstName').isLength({ min: 3 }).withMessage('First name must be at least 3 characters long'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('vehicleDetails.color').isLength({ min: 3 }).withMessage('Color must be at least 3 characters long'),
  body('vehicleDetails.plateNumber').isLength({ min: 3 }).withMessage('Plate must be at least 3 characters long'),
  body('vehicleDetails.capacity').isInt({ min: 1 }).withMessage('Capacity must be at least 1'),
  body('vehicleDetails.type').isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type') 
],
driverSignUp
)

driverRouter.post("/driver/signin", 
[
  body('emailId').isEmail().withMessage('Invalid Email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
],
driverSignIn)

driverRouter.post("/driver/signout",verifyDriver,driverSignOut)

driverRouter.get("/driver/rides-completed", getCompletedRidesByDriver)

module.exports = driverRouter