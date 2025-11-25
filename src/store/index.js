import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../reducers/blogSlice";
import { userApi } from "../reducers/userSlice";
import { apiSlice } from "../api/apiSlice";

export const store=configureStore({
    reducer:{
        blogs:blogReducer,
        [apiSlice.reducerPath]:apiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware)
})
//store.dispatch(fetchUsers());

store.dispatch(userApi.endpoints.getUsers.initiate())