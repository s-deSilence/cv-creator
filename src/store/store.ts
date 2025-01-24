import { configureStore } from "@reduxjs/toolkit";

import personalInfoReducer from './slices/personalInfoSlice'

export const store = configureStore({
    reducer: {
        personal: personalInfoReducer
    },
    
})

type AppStore = typeof store;
export type StoreType = ReturnType<AppStore["getState"]>