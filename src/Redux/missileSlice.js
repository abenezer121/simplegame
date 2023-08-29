import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    missileSpeed : 0,
    missileAngle : 0,
    missileX : 390,
    missileY : 610,
}

export const missileSlice = createSlice({
    name : 'missile',
    initialState,
    reducers : {
        updateMissileProperties : (state,action) => {
            state.missileSpeed = action.payload.speed
            state.missileAngle = action.payload.angle
            state.missileX = action.payload.missileX
            state.missileY = action.payload.missileY
            
        },

    }
})

//action creators are generated for each case reducer function
export const { updateMissileProperties} = missileSlice.actions

export default missileSlice.reducer