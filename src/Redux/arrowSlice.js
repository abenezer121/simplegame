import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    code : '',   
}

export const arrowSlice = createSlice({
    name : 'arrow',
    initialState,
    reducers : {
        updateArrow : (state,action) => {
            state.code = action.payload
        },
    }
})

//action creators are generated for each case reducer function
export const { updateArrow  } = arrowSlice.actions
export default arrowSlice.reducer