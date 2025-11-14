
import {Link, useNavigate } from "react-router-dom";
import { useGetBlogsQuery } from "../api/apiSlice";
import ShowTime from "./ShowTime";
import ShowUser from "./ShowUser";
import ReactionButton from "./ReactionButton";
import { useMemo } from "react";
import Spinner from "./Spinner";
const Blog=({blog})=>{

    return (
        <>
            <article className="grid grid-rows-[auto_1fr_auto] sm:grid-rows-1 sm:grid-cols-3 m-5 rounded-lg shadow-[5px_3px_15px] h-full overflow-hidden hover:shadow-2xl hover:scale-[1.01]">

                <img class="rounded-lg" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/content-gallery-3.png" alt="image description"/>
                <div className="p-4 sm:col-span-2 flex flex-col justify-between">
                    <div>
                    <h3 className="text-lg font-semibold mb-2">{blog.title}</h3>
                    <div className="mb-3">
                        <ShowUser userId={blog.user} />{" "}
                        <ShowTime timestamp={blog.date} />
                    </div>
                    <p className="blog-content mb-4">
                        {blog.content.substring(0, 150) + "..."}
                    </p>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-2">
                    <Link
                        to={`/blogs/${blog.id}`}
                        className="button muted-button flex justify-center rounded-lg text-white bg-[#403e3e] p-2 hover:bg-[#7b7878] focus:bg-gray-600 active:bg-gray-500 w-full sm:w-auto"
                    >
                        دیدن کامل پست
                    </Link>
                    <div className="flex justify-center items-center gap-4">
                        <ReactionButton blog={blog} />
                    </div>
                    </div>
                </div>
            </article>

        </>
    );
};

const BlogsList = () => {
    const {
        data: blogs = [],
        isLoading,
        isSuccess,
        isError,
        error,
        // refetch,
    } = useGetBlogsQuery();

    const navigate = useNavigate();

    const sortedBlogs = useMemo(() => {
        const sortedBlogs = blogs.slice();
        sortedBlogs.sort((a, b) => b.date.localeCompare(a.date));
        return sortedBlogs;
    }, [blogs]);

    let content;

    if (isLoading) {
        content = <Spinner text="بارگذاری ..." />;
    } else if (isSuccess) {
        content = sortedBlogs.map((blog) => <Blog key={blog.id} blog={blog} />);
    } else if (isError) {
        content = <div>{error}</div>;
    }

    return (
        <section>
            <div className="m-5 ">
                <button
                    className="w-full rounded-lg text-white bg-[#403e3e] p-4 hover:bg-[#7b7878] focus:bg-gray-600 active:bg-gray-500 "
                    style={{"text-shadow":"rgba(0, 0, 0, 0.5) 0px 2px 3px"}}
                    onClick={() => navigate("/blogs/create-blog")}
                >
                    ساخت پست جدید
                </button>
            </div>
            
                {content}
            {/* <button onClick={refetch}>ریفرش پست ها</button> */}
        </section>
    );
};
export default BlogsList;



