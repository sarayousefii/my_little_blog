import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../reducers/blogSlice";
import userReducer, { extendApiSlice } from "../reducers/userSlice";
import { apiSlice } from "../api/apiSlice";

export const store=configureStore({
    reducer:{
        blogs:blogReducer,
        users:userReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware)
})
//store.dispatch(fetchUsers());

store.dispatch(extendApiSlice.endpoints.getUsers.initiate())