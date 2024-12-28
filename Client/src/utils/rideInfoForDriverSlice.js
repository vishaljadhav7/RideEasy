import { createSlice } from "@reduxjs/toolkit";

const rideInfoForDriverSlice = createSlice({
    name: "rideForDriver",
    initialState: {
        newRide: null, // ridepopup (pending)
        confirmedRide : null, // confirm to start ride (start)
        startedRide : null, // addStartedRide (completed)
    },
    reducers: {
        addNewRide: (state, action) => {
            state.newRide = action.payload;
        },
        addConfirmedRide : (state, action) => {
            state.confirmedRide = action.payload;
        },
        addStartedRide : (state, action) => {
            state.startedRide = action.payload;
        } 
    }
});

export const { addNewRide, addConfirmedRide, addStartedRide} = rideInfoForDriverSlice.actions;
export default rideInfoForDriverSlice.reducer;
