import { configureStore } from "@reduxjs/toolkit";
import userReducer from './Slices/userSlice'
import imageReducer from './Slices/imageSlice'

const Store = configureStore({
    reducer:{
        user: userReducer,
        image: imageReducer

    }
})

export type RootState = ReturnType<typeof Store.getState>
export type AppDispatch = typeof Store.dispatch
export default Store