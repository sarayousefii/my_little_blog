import { useNavigate } from "react-router-dom";
import { useGetBlogsQuery, useDeleteBlogMutation } from "../api/apiSlice";
import Spinner from "./Spinner";
import BlogCard from "./BlogCard";
import { useMemo } from "react";

const BlogsList = () => {
  const { data: blogs = [], isLoading, isSuccess, isError, error } = useGetBlogsQuery();
  const navigate = useNavigate();
  const [deleteBlog] = useDeleteBlogMutation();

  const sortedBlogs = useMemo(() => {
    const sorted = blogs.slice();
    sorted.sort((a, b) => b.date.localeCompare(a.date));
    return sorted;
  }, [blogs]);

  const handleDelete = async (id) => {
    await deleteBlog(id);
  };

  let content;
  if (isLoading) content = <Spinner text="بارگذاری ..." />;
  else if (isSuccess)
    content = sortedBlogs.map((blog) => (
      <BlogCard key={blog.id} blog={blog} onDelete={handleDelete} />
    ));
  else if (isError)
    content = (
      <div className="text-red-500 p-4">
        خطا: {error?.message || "خطایی رخ داده است"}
      </div>
    );

  return (
    <section>
      <div className="m-5">
        <button
          className="w-full rounded-lg text-white bg-[#403e3e] p-4 hover:bg-[#7b7878] transition-colors"
          onClick={() => navigate("/blogs/create-blog")}
        >
          ساخت پست جدید
        </button>
      </div>

      {content}
    </section>
  );
};

export default BlogsList;
