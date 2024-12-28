const {createRide, getFareForRide, confirmRide, startRide, endRide} = require('../controllers/ride.controller');
const {body, query} = require('express-validator');
const express = require('express');
const rideRouter = express.Router();
const {verifyUser, verifyDriver} = require('../middlewares/auth.middleware');

rideRouter.post('/create-ride', 
    verifyUser,   
    [
        body('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
        body('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
        body('vehicleType').isString().isIn(['auto', 'car', 'moto']).withMessage('Invalid vehicle type'),
      ],
createRide);


rideRouter.get('/get-fare',
    verifyUser,
    [
        query('pickup').isString().isLength({ min: 3 }).withMessage('Invalid pickup address'),
        query('destination').isString().isLength({ min: 3 }).withMessage('Invalid destination address'),
      ],
    getFareForRide
);


rideRouter.post('/confirm-ride',
  verifyDriver,
  body('rideId').isMongoId().withMessage('Invalid ride id'),
  confirmRide
);

rideRouter.get('/start-ride',
  verifyDriver,
  query('rideId').isMongoId().withMessage('Invalid ride id'),
  query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
 startRide
);

rideRouter.post('/end-ride',
  verifyDriver,
  body('rideId').isMongoId().withMessage('Invalid ride id'),
  endRide
);

module.exports = rideRouter;