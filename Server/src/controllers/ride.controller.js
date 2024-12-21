const Ride = require('../models/ride.model');
const {validationResult} = require('express-validator');
const {createNewRide, getFare} = require('../services/ride.service');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');

const createRide = async (req, res) => {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {pickup, destination, vehicleType } = req.body;

        const userId = req?.user?._id.toString() 
        const newRide = await createNewRide({
            userId,
            pickup,
            destination,
            vehicleType,
        })

       return res.status(200).json(new ApiResponse(200, newRide, "ride created successfully") )
    } catch (error) {
        res.status(400).json(400, error.message || "ride creation was unsuccessfull")
    }
}

const getFareForRide = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json( new ApiError(400, errors.array()));
      }
      const { pickup, destination } = req.query; 
      const fare = await getFare(pickup, destination);
      return res.status(200).json(new ApiResponse(200, fare, "fare calculated successfully") );
    } catch (error) {
       res.status(400).json(400, error.message || "ride creation was unsuccessfull")
    }
}


module.exports = {createRide, getFareForRide}