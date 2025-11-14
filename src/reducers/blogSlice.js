import { createSlice, nanoid ,createAsyncThunk ,createSelector ,createEntityAdapter } from "@reduxjs/toolkit";
import { getAllBlogs,createBlog,deleteBlog ,updateBlog} from "../../server/blogsServices";

const blogsAdapter=createEntityAdapter({
    sortComparer:(a,b) => b.date.localeCompare(a.date)
});

const initialState=blogsAdapter.getInitialState({
    status:"idle",
    error:null
});

export const fetchBlogs=createAsyncThunk("blogs/fetchBlogs",async()=>{
    const respons=await getAllBlogs();
    return respons.data;
});

export const addNewBlog=createAsyncThunk("blogs/addNewBlog",async (initialBlog)=>{
    const respons=await createBlog(initialBlog);
    return respons.data;
});

export const deleteApiBlog=createAsyncThunk("blogs/deleteApiBlog",async (initialBlogId)=>{
    
    await deleteBlog(initialBlogId);
    return initialBlogId;
});

export const updateApiBlog=createAsyncThunk("blog/updateApiBlog",async (initialblog)=>{
    const respons=await updateBlog(initialblog,initialblog.id);
    return respons.data;
})

const blogSlice=createSlice({
    name:"blogs",
    initialState:initialState,
    reducers:{
        blogReactions:(state,action)=>{
            const {blogId,reaction}=action.payload;
            const hasBlog=state.blogs.find((blog)=>blogId===blog.id);
            if(hasBlog){
                hasBlog.reactions[reaction]++;
            }
        }
    },
    extraReducers:builder =>{
        builder
            .addCase(fetchBlogs.pending,(state,_)=>{
                state.status="loading";
            })
            .addCase(fetchBlogs.fulfilled,(state,action)=>{
                //state.blogs=action.payload;
                blogsAdapter.upsertMany(state,action.payload);
                state.status="complated";
            })
            .addCase(fetchBlogs.rejected,(state,action)=>{
                state.error=action.error.message;
            }).addCase(addNewBlog.fulfilled,blogsAdapter.addOne)
            .addCase(deleteApiBlog.fulfilled,blogsAdapter.removeOne)
            .addCase(updateApiBlog.fulfilled,blogsAdapter.updateOne)
    }
})

export const{
    selectAll : selectAllBlogs,
    selectById : selectBlogById,
    selectIds : selectBlogIds
}=blogsAdapter.getSelectors((state)=>state.blogs);

export const selectUserBlog=createSelector(
    [selectAllBlogs,(_,userId)=>userId],
    (blogs,userId)=>blogs.filter(blog=>blog.userId===userId)
);

export const {blogAdded,blogUpdated,blogDeleted,blogReactions}=blogSlice.actions; 
export default blogSlice.reducer;