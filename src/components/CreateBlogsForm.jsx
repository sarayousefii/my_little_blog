import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAddNewBlogMutation } from "../api/apiSlice";
import { selectAllUsers } from "../reducers/userSlice";
import { nanoid } from "@reduxjs/toolkit";

const CreateBlogForm = () => {
  const navigate = useNavigate();
  const users = useSelector(selectAllUsers);
  const [addNewBlog, { isLoading }] = useAddNewBlogMutation();


  const validationSchema = Yup.object({
    title: Yup.string().required("عنوان پست الزامی است"),
    content: Yup.string()
      .min(10, "محتوای پست باید حداقل ۱۰ کاراکتر باشد")
      .required("محتوا الزامی است"),
    userId: Yup.string().required("انتخاب نویسنده الزامی است"),
  });


  const handleSubmit = async (values, { resetForm }) => {
    try {
      await addNewBlog({
        id: nanoid(),
        date: new Date().toISOString(),
        title: values.title,
        content: values.content,
        user: values.userId,
        reactions: {
          thumbsUp: 0,
          hooray: 0,
          heart: 0,
          rocket: 0,
          eyes: 0,
        },
      }).unwrap();

      resetForm();
      navigate("/");
    } catch (error) {
      console.error("❌ خطا در ذخیره پست:", error);
    }
  };

  return (
    <section className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        📝 ساخت پست جدید
      </h2>

      <Formik
        initialValues={{ title: "", content: "", userId: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty }) => (
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
              <label htmlFor="userId" className="block text-gray-700 mb-2">
                نویسنده :
              </label>
              <Field
                as="select"
                id="userId"
                name="userId"
                className="w-full border rounded-md p-2 bg-white focus:ring focus:ring-blue-300"
              >
                <option value="">انتخاب نویسنده</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.fullname}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="userId"
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
              disabled={!isValid || !dirty || isLoading}
              className={`w-full font-semibold py-2 rounded-md transition-colors ${
                !isValid || !dirty || isLoading
                  ? "bg-gray-400 cursor-not-allowed text-gray-100"
                  : "bg-[#403e3e] p-4 hover:bg-[#7b7878] focus:bg-gray-600 text-white"
              }`}
            >
              {isLoading ? "در حال ذخیره..." : "ذخیره پست"}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default CreateBlogForm;
