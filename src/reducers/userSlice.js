import { createSlice, createSelector,createAsyncThunk,createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const userAdapter=createEntityAdapter();

const initialState=userAdapter.getInitialState()

export const extendApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getUsers:builder.query({
            query:() => "/users",
            transformResponse:responseData=>{
                return userAdapter.setAll(initialState,responseData);
            },
            providesTags:["USER"]
        }),
        addNewUser:builder.mutation({
            query:(initialUser)=>({
                url: "/users",
                method:"POST",
                body:initialUser
            }),
            invalidatesTags:["USER"]
        }),
        deleteUser:builder.mutation({
            query:userId=>({
                url:"/users/"+userId,
                method:"DELETE"
            }),
            invalidatesTags:["USER"]
        })
    })
})
export const selectUsersResult=extendApiSlice.endpoints.getUsers.select();

const selectUsersData =createSelector(selectUsersResult,(userResult)=>userResult.data);

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},

});

export const{
    selectAll : selectAllUsers,
    selectById :selectUserById,
    selectIds : selectUserIds
}=userAdapter.getSelectors((state)=>selectUsersData(state) ?? initialState);

export const{useAddNewUserMutation,useDeleteUserMutation,useGetUsersQuery}=extendApiSlice;

export default usersSlice.reducer;
