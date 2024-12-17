import { configureStore } from "@reduxjs/toolkit";
import rideReducer from '../utils/rideSlice'
import driverReducer from '../utils/driverSlice'

const appStore = configureStore({
    reducer: {
        ride : rideReducer,
        driver : driverReducer  
    },
  });
  
  export default appStore;