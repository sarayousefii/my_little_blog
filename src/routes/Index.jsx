import App from '../App.jsx';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout.jsx';
import SingleBlog from '../components/SingleBlog.jsx';
import CreateBlogsForm from '../components/CreateBlogsForm.jsx';
import EditBlogForm from '../components/EditBlogForm.jsx';
import UserList from '../components/UserList.jsx';
import User from '../components/User.jsx';

export const router=createBrowserRouter([
  {
    path:"/",
    element:<MainLayout />,
    errorElement:(<h3 className='text-center'>چیزی پیدا نکردیم 😐 ... </h3>),
    children:[
      {
        path:"/",
        element:<App />
      },
      {
        path:"/blogs/:blogId",
        element:<SingleBlog />

      },
      {
        path:"/blogs/create-blog",
        element:<CreateBlogsForm />
      },
      {
        path:"/blogs/edit-blog/:blogId",
        element:<EditBlogForm />
      },
      {
        path:"/users",
        element:<UserList />
      },
      {
        path:"/users/:userId",
        element:<User />
      }
    ]
  }
])