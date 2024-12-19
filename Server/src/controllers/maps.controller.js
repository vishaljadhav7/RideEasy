const { validationResult } = require('express-validator');
const ApiError = require('../utils/ApiError');
const ApiResponse = require('../utils/ApiResponse')
const { fetchAddressCoordinates, fetchDistanceAndTime, fetchSuggestions} = require('../services/maps.service');



const getCoordinates = async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          return res.status(400).json( new ApiError(400, errors.array()));
      }
       const { address } = req.query;
       const coordinates = await fetchAddressCoordinates(address);
        res.status(200).json(new ApiResponse(200, coordinates, "retrieved coordinates successfully")) 
   } catch (error) {
      return res.status(400).json( new ApiError(400, error.message || "Something went wrong"));
   }    

}

const getDistanceAndTime = async (req, res) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( new ApiError(400, errors.array()));
    }

    const { pickup , destination } = req.query; 
    const distanceAndTime = await fetchDistanceAndTime(pickup, destination);
    res.status(200).json(new ApiResponse(200, distanceAndTime, "retrieved distance and time successfully")) 
   } catch (error) {
    return res.status(400).json( new ApiError(400, error.message || "Something went wrong"));
   }
}

const getSuggestions = async (req, res) => {
   try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json( new ApiError(400, errors.array()));
    }

    const { input } = req.query;

    const suggestions = await fetchSuggestions(input);

    res.status(200).json(new ApiResponse(200, suggestions, "retrieved suggestions successfully")) 

   } catch (error) {
    return res.status(400).json( new ApiError(400, error.message || "Something went wrong"));
   }
}


module.exports = {getCoordinates, getDistanceAndTime, getSuggestions}