import { configureStore } from "@reduxjs/toolkit";
import missileReducer from "./missileSlice"
import arrowReducer from "./arrowSlice"

export const store = configureStore({
    reducer : {
       missile : missileReducer ,
       arrow : arrowReducer
    }
})


