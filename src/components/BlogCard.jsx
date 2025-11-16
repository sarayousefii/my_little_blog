import { useState } from "react";
import { Link } from "react-router-dom";
import ShowTime from "./ShowTime";
import ShowUser from "./ShowUser";
import ReactionButton from "./ReactionButton";
import { MdEdit, MdDelete, MdRemoveRedEye } from "react-icons/md";
import DEFAULT_IMAGE from "../assets/default_blog_image.jpg";

const BlogCard = ({ blog, onDelete }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirm(true);
  };

  const handleConfirmDelete = () => {
    onDelete(blog.id);
    setShowConfirm(false);
  };

  const handleCancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <article className="group bg-white rounded-2xl shadow-md overflow-hidden m-4 transition-transform duration-300 hover:scale-[1.01] flex flex-col sm:flex-row relative">
      {/* overlay hover */}
      <div className="hidden sm:block absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10 rounded-2xl pointer-events-none"></div>

      {/* تصویر */}
      <div className="sm:w-1/3 overflow-hidden relative">
        <img
          src={blog.image || DEFAULT_IMAGE}
          alt={blog.title}
          className="w-full h-48 sm:h-64 md:h-72 object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      {/* محتوا */}
      <div className="sm:w-2/3 p-4 flex flex-col gap-3 relative z-20">
        <h3 className="text-xl sm:text-2xl font-semibold truncate">{blog.title}</h3>
        <div className="flex flex-wrap items-center text-sm sm:text-base text-gray-500 gap-2">
          <ShowUser userId={blog.user} /> • <ShowTime timestamp={blog.date} />
        </div>
        <p className="text-gray-700 line-clamp-3 sm:line-clamp-4 text-sm sm:text-base">{blog.content}</p>

        {/* دسکتاپ */}
        <div className="hidden sm:flex absolute inset-0 items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ReactionButton blog={blog} />
          <Link
            to={`/blogs/${blog.id}`}
            className="p-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            title="دیدن پست"
          >
            <MdRemoveRedEye size={22} />
          </Link>
          <Link
            to={`/blogs/edit-blog/${blog.id}`}
            className="p-3 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            title="ویرایش"
          >
            <MdEdit size={22} />
          </Link>
          <button
            onClick={handleDeleteClick}
            className="p-3 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            title="حذف"
          >
            <MdDelete size={22} />
          </button>
        </div>

        {/* موبایل */}
        <div className="flex sm:hidden justify-center items-center gap-1 mt-3">
          <ReactionButton blog={blog} small />
          <Link
            to={`/blogs/${blog.id}`}
            className="flex justify-center items-center p-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            title="دیدن پست"
          >
            <MdRemoveRedEye size={16} />
          </Link>
          <Link
            to={`/blogs/edit-blog/${blog.id}`}
            className="flex justify-center items-center p-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors"
            title="ویرایش"
          >
            <MdEdit size={16} />
          </Link>
          <button
            onClick={handleDeleteClick}
            className="flex justify-center items-center p-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            title="حذف"
          >
            <MdDelete size={16} />
          </button>
        </div>
      </div>

      {/* Modal تایید حذف */}
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
};

export default BlogCard;
