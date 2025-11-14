import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserById } from "../reducers/userSlice";
import { useGetBlogsQuery } from "../api/apiSlice";

const User = () => {
  const { userId } = useParams();

  const user = useSelector((state) => selectUserById(state, userId));

  const { data: blogs = [] } = useGetBlogsQuery();

  const userBlogs = blogs.filter((blog) => blog.user === userId);

  return (
    <section className="max-w-3xl mx-auto mt-10 p-6 bg-white text-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">{user?.fullname || "کاربر ناشناس"}</h2>

      <h3 className="text-xl font-semibold mb-3 border-b pb-2">پست‌های منتشر شده:</h3>

      {userBlogs.length > 0 ? (
        <ul className="space-y-2">
          {userBlogs.map((blog) => (
            <li
              key={blog.id}
              className="bg-gray-100 rounded-md px-4 py-2 transition-colors hover:bg-gray-200"
            >
              <Link to={`/blogs/${blog.id}`} className="hover:underline">
                {blog.title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">این نویسنده تاکنون هیچ پستی منتشر نکرده 🤗</p>
      )}
    </section>
  );
};

export default User;
