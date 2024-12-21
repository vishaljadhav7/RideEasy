import { configureStore } from "@reduxjs/toolkit";
import rideReducer from '../utils/rideSlice'
import driverReducer from '../utils/driverSlice'
import suggestionsReducer from '../utils/suggestionsSlice';
import rideOrderReducer from '../utils/rideOrderSlice';

const appStore = configureStore({
    reducer: {
        ride : rideReducer,
        driver : driverReducer ,
        suggestions : suggestionsReducer,
        rideOrder : rideOrderReducer 
    },
  });
  
  export default appStore;