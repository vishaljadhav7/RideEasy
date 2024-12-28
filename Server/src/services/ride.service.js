const Ride = require('../models/ride.model');
const crypto = require('crypto');
const { fetchAddressCoordinates, fetchDistanceAndTime, fetchSuggestions} = require('../services/maps.service');
// const ApiError = require('../utils/ApiError');
// const Driver = require('../models/driver.model');

const getOtp = (num) => {
    function generateOtp(num) {
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }
    return generateOtp(num);
}

const getFare = async (pickup, destination) => {
    
    if (!pickup || !destination) {
        throw new Error('Pickup and destination are required');
    }

    const distanceTime = await fetchDistanceAndTime(pickup, destination);

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3,
        moto: 1.5
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
    };

    return fare;
}

const createNewRide = async ({
    userId, pickup, destination, vehicleType
}) => {
  console.log("invoked createNewride service")

    if (!userId || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }

    const fare = await getFare(pickup, destination);

   console.log("got fare values " , fare)

    const ride = await Ride.create({
        user : userId,
        pickup,
        destination,
        otp: getOtp(6),
        fare: fare[ vehicleType ]
    })

    return ride;
}

const updateRideStatusWithConfirm = async ({rideId, driver}) => {
    
    if (!rideId) {
        throw new Error('Ride id is required');
    };

    await Ride.findOneAndUpdate({
      _id : rideId
    }, 
    {
      status : 'accepted', driver : driver.id
    });

    const bookedRide = await Ride.findOne({
        _id : rideId
    }).populate('user', "-password").populate('driver',"-password").select('+otp');

    console.log("updateRideStatusWithConfirm -> accecpted  ",  bookedRide.status)
     

    if (!bookedRide) {
        throw new Error('Ride not found');
    }
    
    return bookedRide;
}

const updateRideStatusWithAccepted = async ({ rideId, otp, driver }) => {
    if (!rideId || !otp) {
        throw new Error('Ride id and OTP are required');
    }

    const ride = await Ride.findOne({
        _id: rideId
    }).populate('user').populate('driver').select('+otp');

    console.log("updateRideStatusWithAccepted -> will set to ongoing ", ride.status);

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'accepted') {
        throw new Error('Ride not accepted');
    }

    if (ride.otp !== otp) {
        throw new Error('Invalid OTP');
    }

    await Ride.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    });

    return ride;
}

const updateRideStatusWithCompleted = async ({ rideId, driver}) => {
    if (!rideId) {
        throw new Error('Ride id is required');
    }

    const ride = await Ride.findOne({
        _id: rideId,
        driver: driver._id
    }).populate('user').populate('captain').select('+otp');

    if (!ride) {
        throw new Error('Ride not found');
    }

    if (ride.status !== 'ongoing') {
        throw new Error('Ride not ongoing');
    }

    await Ride.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}


module.exports = {createNewRide, getFare, updateRideStatusWithConfirm, updateRideStatusWithAccepted, updateRideStatusWithCompleted};