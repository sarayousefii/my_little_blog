import { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useDeleteBlogMutation, useGetBlogQuery } from "../api/apiSlice";
import ShowTime from "./ShowTime";
import ShowUser from "./ShowUser";
import ReactionButton from "./ReactionButton";
import Spinner from "./Spinner";
import BackButton from "./BackButton";
import { MdEdit, MdDelete } from "react-icons/md";
import DEFAULT_IMAGE from "../assets/default_blog_image.jpg";

const SingleBlog = () => {
  const navigate = useNavigate();
  const { blogId } = useParams();
  const { data: blog = [], isFetching, isSuccess } = useGetBlogQuery(blogId);
  const [deleteBlog] = useDeleteBlogMutation();
  const [showConfirm, setShowConfirm] = useState(false);

  if (!blog) {
    return (
      <section>
        <h2>مسیر اشتباه است 😅</h2>
      </section>
    );
  }

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = async () => {
    await deleteBlog(blog.id);
    setShowConfirm(false);
    navigate("/");
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  let content;
  if (isFetching) {
    content = <Spinner />;
  } else if (isSuccess) {
    content = (
      <article className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden mt-8 p-4 sm:p-8 transition-transform duration-300">
        <BackButton className="mb-4" />

        <img
          className="w-full h-64 sm:h-96 object-cover rounded-xl mb-6"
          src={blog.image || DEFAULT_IMAGE}
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

        <footer className="hidden sm:flex flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-gray-200">
          <div className="flex justify-start items-center gap-4">
            <ReactionButton blog={blog} />
          </div>
          <div className="flex gap-3">
            <Link
              to={`/blogs/edit-blog/${blog.id}`}
              className="text-white bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors"
              title="ویرایش"
            >
              <MdEdit size={22} />
            </Link>

            <button
              onClick={handleDeleteClick}
              className="text-white bg-red-600 p-2 rounded-lg hover:bg-red-700 transition-colors"
              title="حذف"
            >
              <MdDelete size={22} />
            </button>
          </div>
        </footer>

        <footer className="flex flex-col sm:hidden gap-2 pt-4 border-t border-gray-200">
          <div className="flex justify-center gap-2">
            <ReactionButton blog={blog} />
          </div>
          <div className="flex justify-center gap-2">
            <Link
              to={`/blogs/edit-blog/${blog.id}`}
              className="text-white bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors"
              title="ویرایش"
            >
              <MdEdit size={18} />
            </Link>

            <button
              onClick={handleDeleteClick}
              className="text-white bg-red-600 p-2 rounded-lg hover:bg-red-700 transition-colors"
              title="حذف"
            >
              <MdDelete size={18} />
            </button>
          </div>
        </footer>

        {showConfirm && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50">
            <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg text-center">
              <p className="mb-4 text-gray-800">آیا از حذف این پست مطمئن هستید؟</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleConfirmDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  حذف
                </button>
                <button
                  onClick={handleCancelDelete}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition-colors"
                >
                  انصراف
                </button>
              </div>
            </div>
          </div>
        )}
      </article>
    );
  }

  return <section className="blog mb-4">{content}</section>;
};

export default SingleBlog;
