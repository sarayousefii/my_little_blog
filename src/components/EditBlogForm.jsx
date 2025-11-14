import { useNavigate, useParams } from "react-router-dom";
import { useEditBlogMutation, useGetBlogQuery } from "../api/apiSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const EditBlogForm = () => {
  const { blogId } = useParams();
  const { data: blog, isLoading: isBlogLoading } = useGetBlogQuery(blogId);
  const [updateBlog] = useEditBlogMutation();
  const navigate = useNavigate();

  if (isBlogLoading) {
    return <p className="text-center text-gray-500 mt-10">در حال بارگذاری...</p>;
  }

  if (!blog) {
    return (
      <section className="p-6 text-center">
        <h2 className="text-xl font-semibold text-red-600">
          پستی که دنبالش می‌گردی وجود نداره 😅
        </h2>
      </section>
    );
  }

  const validationSchema = Yup.object({
    title: Yup.string().required("عنوان پست الزامی است"),
    content: Yup.string().required("محتوای پست الزامی است"),
  });

  const handleSubmit = async (values) => {
    const editedBlog = {
      id: blogId,
      date: blog.date,
      title: values.title,
      content: values.content,
      user: blog.user,
      reactions: blog.reactions || {
        thumbsUp: 0,
        hooray: 0,
        heart: 0,
        rocket: 0,
        eyes: 0,
      },
    };

    await updateBlog(editedBlog);
    navigate(`/blogs/${blogId}`);
  };

  return (
    <section className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">✏️ ویرایش پست</h2>

      <Formik
        initialValues={{
          title: blog.title || "",
          content: blog.content || "",
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form className="space-y-5">
          <div>
            <label htmlFor="title" className="block text-gray-700 mb-2">
              عنوان پست :
            </label>
            <Field
              id="title"
              name="title"
              type="text"
              className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
              placeholder="عنوان پست را وارد کنید..."
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label htmlFor="content" className="block text-gray-700 mb-2">
              محتوای اصلی :
            </label>
            <Field
              as="textarea"
              id="content"
              name="content"
              rows="6"
              className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
              placeholder="متن پست را وارد کنید..."
            />
            <ErrorMessage
              name="content"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#403e3e] p-4 hover:bg-[#7b7878] focus:bg-gray-600 text-white font-semibold py-2 rounded-md transition-colors"
          >
            ذخیره تغییرات
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default EditBlogForm;
