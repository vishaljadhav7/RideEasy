import { createSlice } from "@reduxjs/toolkit";

const rideOrderSlice = createSlice({
    name : "rideOrder",
    initialState : {
            fare : {},
            tripLocations : {},
            reservedRide : {} // API response
    },
    reducers : {
        addReservedRide : (state, action) => {
            const bookedRide = action.payload;
            state.reservedRide = bookedRide;
        },
        addFareAndTripLocations :  (state, action) => {
           const details = action.payload;
           state.fare = details.fareDetails;
           state.tripLocations = details.locationDetails;
        }
    }
})

export const {addReservedRide, addFareAndTripLocations} = rideOrderSlice.actions

export default rideOrderSlice.reducer