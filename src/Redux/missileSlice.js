import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    speed : 0,
    angle : 0
}

export const missileSlice = createSlice({
    name : 'missile',
    initialState,
    reducers : {
        updateSpeed : (state,action) => {
            state.speed += action.payload
        },

        updateAngle : (state,action) => {
            state.angle += action.payload
        }
    }
})

//action creators are generated for each case reducer function
export const { updateSpeed , updateAngle} = missileSlice.actions

export default missileSlice.reducer