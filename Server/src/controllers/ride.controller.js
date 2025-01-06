const Ride = require('../models/ride.model');
const {validationResult} = require('express-validator');
const {createNewRide, getFare, updateRideStatusWithAccepted, updateRideStatusWithConfirm, updateRideStatusWithCompleted} = require('../services/ride.service');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse');
const {emitMessageToSocketId} = require('../socket');
const {fetchDriverInTheRadius, fetchAddressCoordinates} = require('../services/maps.service')
// const Driver = require('../models/driver.model');

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

const createRide = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { pickup, destination, vehicleType } = req.body;
        const userId = req?.user?._id;

        // Create a new ride
        const newRide = await createNewRide({
             userId,
            pickup,
            destination,
            vehicleType,
        });


        // Fetch coordinates for the pickup address
        const { ltd, lng } = await fetchAddressCoordinates(pickup);

        // Fetch nearby drivers
        const allNearByDrivers = await fetchDriverInTheRadius(ltd, lng, 1000);

        // Populate ride with user details
        const rideWithUser = await Ride.findById(newRide._id)
            .populate('user', "-password")
            .select('-otp');
            
        if(!rideWithUser){
            throw new Error('ride not found')
        }

        // Notify nearby drivers via socket
        if (allNearByDrivers.length > 0) {
            allNearByDrivers.forEach(driver => {
                emitMessageToSocketId(driver.socketId, {
                    event: 'new-ride',
                    data: rideWithUser,
                });
            });
        }

        // Send a successful response after all operations
        res.status(200).json(new ApiResponse(200, newRide, "Ride created successfully"));
    } catch (error) {
        return res.status(400).json( new ApiError(400, error.message || "Something went wrong"));
    }
};


const confirmRide = async (req, res) => {  // for driver
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json(new ApiError(400, errors.array()));
      };

      const { rideId } = req.body;

      const rideBooked = await updateRideStatusWithConfirm({rideId, driver : req.driver});
            
      emitMessageToSocketId(rideBooked.user.socketId, {
        event: 'ride-confirmed',
        data: rideBooked
      })

      return res.status(200).json(new ApiResponse(200, rideBooked, "ride booked successfully") );
    } catch (error) {
        return res.status(400).json( new ApiError(400, error.message || "Something went wrong"));
    }
}


const startRide = async (req, res) => {  // for driver
    try {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
           return res.status(400).json(new ApiError(400, errors.array()));
       }
  
       const { rideId, otp } = req.query;
    
       const rideUpdated = await updateRideStatusWithAccepted({rideId, otp, driver : req.driver});

       
       emitMessageToSocketId(rideUpdated.user.socketId, {
        event: 'ride-started',
        data: rideUpdated
    })

    return res.status(200).json(new ApiResponse(200, rideUpdated, "ride updated with status ongoing successfully") );
    } catch (error) {
        return res.status(400).json( new ApiError(400, error.message || "Something went wrong"));
    }
}

const endRide = async (req, res) => { // for driver
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(new ApiError(400, errors.array()));
        }
    
        const { rideId } = req.body;

        const rideUpdated = await updateRideStatusWithCompleted({rideId, driver : req.driver});
        emitMessageToSocketId(rideUpdated.user.socketId, {
            event : 'ride-ended',
            data : rideUpdated
        });
    
        return res.status(200).json(new ApiResponse(200, rideUpdated, "ride updated successfully") );
    } catch (error) {
        return res.status(400).json( new ApiError(400, error.message || "Something went wrong"));
    }
}

const bookedRides = async (req, res) => {
    try {
        const userId = req.user._id;

        const allRides = await Ride.find({}).populate('user','-password -socketId').populate('driver','-password -socketId')
        const bookedRides = allRides.filter((ride) => {
           if(ride.user._id.toString() === userId.toString() && ride.status === 'completed'){
              return ride
           }
        })
        return res.status(200).json(new ApiResponse(200, bookedRides, "rides found successfully") );
    } catch (error) {
        return res.status(400).json( new ApiError(400, error.message || "Something went wrong"));
    }
}


const completedRides = async (req, res) => {
    try {
        const driverId = req.driver._id;

        const allRides = await Ride.find({}).populate('user','-password -socketId').populate('driver','-password -socketId')
        const completedOnes = allRides.filter((ride) => {
           if(ride.driver?._id.toString() === driverId.toString() && ride.status === 'completed'){
              return ride
           }
        })
        return res.status(200).json(new ApiResponse(200, completedOnes, "rides found successfully") );
    } catch (error) {
        return res.status(400).json( new ApiError(400, error.message || "Something went wrong"));
    }
}

module.exports = {createRide, getFareForRide, confirmRide, startRide, endRide, bookedRides, completedRides};



