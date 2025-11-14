import { Link, useParams,useNavigate } from "react-router-dom";
import {  deleteApiBlog, selectBlogById } from "../reducers/blogSlice";
import ShowTime from "./ShowTime";
import ShowUser from "./ShowUser";
import ReactionButton from "./ReactionButton";
import { useDeleteBlogMutation, useGetBlogQuery } from "../api/apiSlice";
import Spinner from "./Spinner";

const SingleBlog=()=>{

    
    const navigate=useNavigate();

    const {blogId}=useParams();
    
    const {
        data : blog =[],
        isFetching,
        isSuccess
    }=useGetBlogQuery(blogId);
    
    if(!blog){
        return(
            <section>
                <h2>مسیر اشتباه است 😅</h2>
            </section>
        )
    }

    const [deleteBlog]=useDeleteBlogMutation();

    const handledDelete=async()=>{
        await deleteBlog(blog.id);
        navigate("/");
    };
    let content;
    if(isFetching){
        content=<Spinner />
    }else if(isSuccess){
        content=
        (<article
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mt-8 
            p-4 sm:p-8 transition-transform duration-300 "
            >
            <img
                className="w-full h-64 sm:h-96 object-cover rounded-xl mb-6"
                src={
                blog.image ||
                "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png"
                }
                alt={blog.title}
            />

            <header className="mb-6 text-center sm:text-start">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-800 mb-3 leading-snug">
                {blog.title}
                </h1>

                <div className="flex flex-wrap justify-center sm:justify-start items-center text-sm text-gray-500 gap-2">
                <ShowUser userId={blog.user} /> • <ShowTime timestamp={blog.date} />
                </div>
            </header>

            <section className="prose prose-gray max-w-none text-gray-800 leading-relaxed mb-8 text-justify">
                {blog.content}
            </section>

            <footer
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
                gap-4 pt-4 border-t border-gray-200"
            >
                <div className="flex justify-center sm:justify-start items-center gap-4">
                <ReactionButton blog={blog} />
                </div>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full sm:w-auto">
                <Link
                    to={`/blogs/edit-blog/${blog.id}`}
                    className="text-center rounded-lg text-white bg-gray-800 px-5 py-2 
                    hover:bg-gray-700 focus:ring-2 focus:ring-gray-400 w-full sm:w-auto transition-colors"
                >
                    ویرایش
                </Link>

                <button
                    onClick={handledDelete}
                    className="text-center rounded-lg text-white bg-red-600 px-5 py-2 
                    hover:bg-red-700 focus:ring-2 focus:ring-red-400 w-full sm:w-auto transition-colors"
                >
                    حذف
                </button>
                </div>
            </footer>
        </article>)
    }

    

    return(
        <section className="blog mb-4">
            {content}
        </section>
    )
}

export default SingleBlog;