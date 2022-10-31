import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ImagesTypes } from '../../types';

interface InitialStateImages {
    images : ImagesTypes[] | null
}

const initialState : InitialStateImages = {
    images : null
}

export const imageSlice = createSlice({
    initialState,
    name:"images",
    reducers:{
        initialize:(state:InitialStateImages, action:PayloadAction<ImagesTypes[]>) =>{
            state.images = action.payload
        }
    }
})

export const {initialize} = imageSlice.actions
export default imageSlice.reducer

