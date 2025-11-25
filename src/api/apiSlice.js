import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
    reducerPath: "api", 
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.MODE === "development"
  ? "http://localhost:10000"
  : "https://my-little-blog-api-3.onrender.com" }),
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
        }),
        updateReaction: builder.mutation({
            query: ({ blog }) => ({
                url: `/blogs/${blog.id}`,
                method: "PUT",
                body: blog,
            }),
            async onQueryStarted({ blog }, { dispatch, queryFulfilled }) {
                // optimistic update روی cache getBlogs
                const patchResult = dispatch(
                apiSlice.util.updateQueryData("getBlogs", undefined, (draft) => {
                    const blogToUpdate = draft.find((b) => b.id === blog.id);
                    if (blogToUpdate) {
                    blogToUpdate.reactions = { ...blog.reactions };
                    }
                })
                );

                // optimistic update روی cache getBlog (صفحه جزئیات)
                const patchDetail = dispatch(
                apiSlice.util.updateQueryData("getBlog", blog.id, (draft) => {
                    draft.reactions = { ...blog.reactions };
                })
                );

                try {
                await queryFulfilled;
                } catch {
                patchResult.undo();
                patchDetail.undo();
                }
            },
            invalidatesTags: (result, error, arg) => [{ type: "BLOG", id: arg.blog.id }],
            }),
    }),
});


export const {
    useGetBlogsQuery,
    useGetBlogQuery,
    useAddNewBlogMutation,
    useEditBlogMutation,
    useDeleteBlogMutation,
    useUpdateReactionMutation,
} = apiSlice;
