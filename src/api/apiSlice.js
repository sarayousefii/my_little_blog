import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
console.log(import.meta.env.MODE)
export const apiSlice = createApi({
    reducerPath: "api", 
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.MODE === "development"
  ? "http://localhost:10000"
  : "https://my-little-blog-api.onrender.com" }),
    tagTypes: ["BLOG","USER"],
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => "/blogs",
            providesTags: (result = [], error, arg) => [
                "BLOG",
                ...result.map(({ id }) => ({ type: "BLOG", id })),
            ],
        }),
        getBlog: builder.query({
            query: (initialBlogId) => `/blogs/${initialBlogId}`,
            providesTags: (result, error, arg) => [{ type: "BLOG", id: arg }],
        }),
        addNewBlog: builder.mutation({
            query: (initialBlog) => ({
                url: "/blogs",
                method: "POST",
                body: initialBlog,
            }),
            invalidatesTags: ["BLOG"],
        }),
        editBlog: builder.mutation({
            query: (blog) => ({
                url: `/blogs/${blog.id}`,
                method: "PUT",
                body: blog,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: "BLOG", id: arg.id },
            ],
        }),
        deleteBlog:builder.mutation({
            query:(blogId)=>({
                url : `/blogs/${blogId}`,
                method : "DELETE"
            }),
            invalidatesTags:["BLOG"]
        })
    }),
});


export const {
    useGetBlogsQuery,
    useGetBlogQuery,
    useAddNewBlogMutation,
    useEditBlogMutation,
    useDeleteBlogMutation
} = apiSlice;
