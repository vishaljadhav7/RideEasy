import { createSlice } from "@reduxjs/toolkit";

const rideInfoForUserSlice = createSlice({
    name : "rideForUser",
    initialState : {
            fare : {},
            tripLocations : {},
            confirmedTrip : {}, // API response -> after confirming the trip looking for driver
            bookedRide : {}, // will get data via sockets real time data used for waiting for driver panel 
            startedRide : {}
    },
    reducers : {
        addConfirmedTrip : (state, action) => {
            state.confirmedTrip =  action.payload;
        },
        addFareAndTripLocations :  (state, action) => {
           const details = action.payload;
           state.fare = details.fareDetails;
           state.tripLocations = details.locationDetails;
        },
        addBookedRide : (state, action) => {
            state.bookedRide = action.payload;
        },
        addStartedRide : (state, action) => {
            state.startedRide = action.payload;
        },
    }
})

export const {addConfirmedTrip, addFareAndTripLocations, addBookedRide, addStartedRide} = rideInfoForUserSlice.actions;

export default rideInfoForUserSlice.reducer