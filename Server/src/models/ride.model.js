const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Updated to singular and capitalized
        required: true,
    },
    driver : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver', // Updated to singular and capitalized
    },
    pickup: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'ongoing', 'completed', 'cancelled'],
        default: 'pending',
    },
    duration: {
        type: Number, // in seconds
    },
    distance: {
        type: Number, // in meters
    },
    paymentID: {
        type: String,
    },
    orderId: {
        type: String,
    },
    signature: {
        type: String,
    },
    otp: {
        type: String,
        select: false, // required: true,
    },
});

const Ride =  mongoose.model('Ride', rideSchema); // Updated to singular and capitalized

module.exports = Ride;