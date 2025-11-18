// components/BlogsList.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBlogsQuery, useDeleteBlogMutation } from "../api/apiSlice";
import Spinner from "./Spinner";
import BlogCard from "./BlogCard";
import Modal from "./Modal";
import CreateBlogForm from "./CreateBlogsForm";
import EditBlogForm from "./EditBlogForm";

const BlogsList = () => {
  const { data: blogs = [], isLoading, isError, error } = useGetBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation();
  const [showCreate, setShowCreate] = useState(false);
  const [editBlogId, setEditBlogId] = useState(null);

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
  else if (isError)
    content = (
      <div className="text-red-500 p-4">خطا: {error?.message || "خطایی رخ داده است"}</div>
    );
  else content = sortedBlogs.map((blog) => (
    <BlogCard key={blog.id} blog={blog} onDelete={handleDelete} onEdit={() => setEditBlogId(blog.id)} />
  ));

  return (
    <section>
      <div className="m-5">
        <button
          className="w-full rounded-lg text-white bg-[#403e3e] p-4 hover:bg-[#7b7878] transition-colors"
          onClick={() => setShowCreate(true)}
        >
          ساخت پست جدید
        </button>
      </div>

      {content}

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="📝 ساخت پست جدید">
        <CreateBlogForm onClose={() => setShowCreate(false)} />
      </Modal>

      <Modal
        isOpen={!!editBlogId}
        onClose={() => setEditBlogId(null)}
        title="✏️ ویرایش پست"
      >
        {editBlogId && <EditBlogForm blogId={editBlogId} onClose={() => setEditBlogId(null)}/>}
      </Modal>
    </section>
  );
};

export default BlogsList;
