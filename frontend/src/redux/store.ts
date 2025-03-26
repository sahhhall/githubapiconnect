import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import { persistStore } from "redux-persist";


const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
})

const persistConfig = {
    key: "root",
    storage,
}

const persistReudcer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistReudcer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(apiSlice.middleware),  
    }

})


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch