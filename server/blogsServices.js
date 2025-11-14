import axios from "axios";

const SERVER_URL="http://localhost:9000";
//-----------users url
export const getAllUsers=()=>{
    const url=`${SERVER_URL}/users`;
    return axios.get(url);
}

export const getUser=(userId)=>{
    const url=`${SERVER_URL}/users/${userId}`;
    return axios.get(url);
}

export const createUser=(user)=>{
    const url=`${SERVER_URL}/users`;
    return axios.post(url,user);
}

export const deleteUser=(userId)=>{
    const url=`${SERVER_URL}/users/${userId}`;
    return axios.delete(url);
}
//-----------blogs url
export const getAllBlogs=()=>{
    const url=`${SERVER_URL}/blogs`;
    return axios.get(url);
}

export const getBlog=(blogId)=>{
    const url=`${SERVER_URL}/blogs/${blogId}`;
    return axios.get(url);
}
//------------create blog
export const createBlog=(blog)=>{
    const url=`${SERVER_URL}/blogs`;
    return axios.post(url,blog);
}

//------------update blog
export const updateBlog=(blog,blogId)=>{
    const url=`${SERVER_URL}/blogs/${blogId}`;
    return axios.put(url,blog);
}

//------------delete blog
export const deleteBlog=(blogId)=>{
    const url=`${SERVER_URL}/blogs/${blogId}`;
    return axios.delete(url);
}