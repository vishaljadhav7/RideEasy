import { createSlice } from "@reduxjs/toolkit";

const rideSlice = createSlice({
    name : "ride",
    initialState : null,
    reducers : {
        addRide : (state, action) => {
            return action.payload
        },
        removeRide : () => {
            return null
        }
    }
})

export const {addRide, removeRide} = rideSlice.actions;

export default rideSlice.reducer;