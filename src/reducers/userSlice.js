import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState();

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (responseData) => {
        // تبدیل آرایه به EntityState (ids, entities)
        return userAdapter.setAll(initialState, responseData);
      },
      providesTags: ["USER"],
    }),

    addNewUser: builder.mutation({
      query: (initialUser) => ({
        url: "/users",
        method: "POST",
        body: initialUser,
      }),
      invalidatesTags: ["USER"],
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `/users/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

// ----------- Selectors -----------
export const selectUsersResult = userApi.endpoints.getUsers.select();

const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data ?? initialState
);

// Entity Adapter Selectors
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
} = userAdapter.getSelectors((state) => selectUsersData(state));

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useDeleteUserMutation,
} = userApi;
