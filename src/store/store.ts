import { configureStore } from "@reduxjs/toolkit";
import { controlReducer } from "./slices";

import personalInfoReducer from './slices/personalInfoSlice'

export const store = configureStore({
    reducer: {
        control: controlReducer,
        personal: personalInfoReducer
    },
    
})

type AppStore = typeof store;
export type StoreType = ReturnType<AppStore["getState"]>