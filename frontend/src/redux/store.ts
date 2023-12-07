import { configureStore } from "@reduxjs/toolkit";
import breedReducer from "../redux/features/breed/breedSlice"
import authReducer from "../redux/features/auth/authSlice";



export const store = configureStore({
    reducer: {
        breed: breedReducer,
        auth: authReducer,
        
    }
})