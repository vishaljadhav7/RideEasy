const {getCoordinates, getDistanceAndTime, getSuggestions} = require('../controllers/maps.controller')
const express = require('express');
const {query} = require('express-validator')
const {verifyUser} = require('../middlewares/auth.middleware')

const mapsRouter = express.Router();


mapsRouter.get('/get-coordinates',
    verifyUser ,
    query('address').isString().isLength({ min: 3 }),
    getCoordinates
);

mapsRouter.get('/get-distance-time',
    verifyUser ,
    [query('pickup').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 })],
    getDistanceAndTime
)

mapsRouter.get('/get-suggestions', 
    verifyUser ,
    query('input').isString().isLength({ min: 3 }),
    getSuggestions
)

module.exports = mapsRouter;