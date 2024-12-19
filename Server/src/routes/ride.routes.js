const {createRide, getFareForRide } = require('../controllers/ride.controller');
const {body, query} = require('express-validator');
const express = require('express');
const rideRouter = express.Router();
const {verifyUser} = require('../middlewares/auth.middleware')

console.log(verifyUser)

rideRouter.post('/create-ride', 
    verifyUser,   
    [
        body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
        body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
        body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
      ],
createRide)




rideRouter.get('/get-fare',
    verifyUser,
    [
        query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
        query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
      ],
    getFareForRide
);


module.exports = rideRouter