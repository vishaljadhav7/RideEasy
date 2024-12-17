import { createSlice } from "@reduxjs/toolkit";

const driverSlice = createSlice({
    name : "driver",
    initialState : null,
    reducers : {
        addDriver : (state, action) => {
            state = action.payload
            return state
        },
        removeDriver : () => {
            return null
        }
    }
})

export const {addDriver, removeDriver} = driverSlice.actions

export default driverSlice.reducer
