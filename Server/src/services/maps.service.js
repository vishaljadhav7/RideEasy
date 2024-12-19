const axios = require('axios');

const fetchAddressCoordinates = async (address) => {
    const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.MAPS_API_KEY}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const fetchDistanceAndTime = async (pickup, destination) => {
   if(!pickup || !destination){
    throw new Error('Origin and destination are required');
   } 

   const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(pickup)}&destinations=${encodeURIComponent(destination)}&key=${process.env.MAPS_API_KEY}`;
   

   try {
      const response = await axios.get(url);
      if (response.data.status === 'OK') {
  
          if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
              throw new Error('No routes found');
          }
  
          return response.data.rows[ 0 ].elements[ 0 ];
      } else {
          throw new Error('Unable to fetch distance and time');
      }

    } catch (err) {
        console.error(err);
        throw err;
    }
}



const fetchSuggestions = async (query) => {
    if (!query) {
        throw new Error('query is required');
    }

    const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(query)}&key=${process.env.MAPS_API_KEY}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
}


module.exports = {
    fetchAddressCoordinates,
    fetchDistanceAndTime,
    fetchSuggestions
}