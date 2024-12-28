import { configureStore } from "@reduxjs/toolkit";
import rideReducer from '../utils/rideSlice'
import driverReducer from '../utils/driverSlice'
// import suggestionsReducer from '../utils/suggestionsSlice';
import rideForUserReducer from '../utils/rideInfoForUserSlice';
import rideForDriverReducer from '../utils/rideInfoForDriverSlice';

const appStore = configureStore({
    reducer: {
        ride : rideReducer,
        driver : driverReducer ,
        // suggestions : suggestionsReducer,
        rideForUser : rideForUserReducer ,
        rideForDriver : rideForDriverReducer
    },
  });
  
  export default appStore;