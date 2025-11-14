import App from '../App.jsx';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import SingleBlog from '../components/SingleBlog.jsx';
import CreateBlogsForm from '../components/CreateBlogsForm.jsx';
import EditBlogForm from '../components/EditBlogForm.jsx';
import UserList from '../components/UserList.jsx';
import User from '../components/User.jsx';

const ErrorElement = () => (
  <div className="text-center p-10">
    <h3>چیزی پیدا نکردیم 😐 ...</h3>
    <p>لطفا مسیر را بررسی کنید یا به صفحه اصلی بازگردید.</p>
  </div>
);

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <ErrorElement />,
      children: [
        {
          path: "/",
          element: <App />
        },
        {
          path: "/blogs/:blogId",
          element: <SingleBlog />
        },
        {
          path: "/blogs/create-blog",
          element: <CreateBlogsForm />
        },
        {
          path: "/blogs/edit-blog/:blogId",
          element: <EditBlogForm />
        },
        {
          path: "/users",
          element: <UserList />
        },
        {
          path: "/users/:userId",
          element: <User />
        }
      ]
    }
  ],
  {
    basename: "/my_little_blog"
  }
);
