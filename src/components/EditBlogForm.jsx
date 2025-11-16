import { useNavigate, useParams } from "react-router-dom";
import { useEditBlogMutation, useGetBlogQuery } from "../api/apiSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import BackButton from "./BackButton";
import DEFAULT_IMAGE from "../assets/default_blog_image.jpg";

const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });


const EditBlogForm = () => {
  const { blogId } = useParams();
  const { data: blog, isLoading } = useGetBlogQuery(blogId);
  const [updateBlog] = useEditBlogMutation();
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(DEFAULT_IMAGE);

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else if (blog?.image) {
      setPreview(blog.image);
    } else {
      setPreview(DEFAULT_IMAGE);
    }
  }, [imageFile, blog]);

  if (isLoading) return <p className="text-center text-gray-500 mt-10">در حال بارگذاری...</p>;
  if (!blog) return <p className="text-center text-red-600 mt-10">پست یافت نشد 😅</p>;

  const validationSchema = Yup.object({
    title: Yup.string().required("عنوان پست الزامی است"),
    content: Yup.string().required("محتوای پست الزامی است"),
  });

  const handleSubmit = async (values) => {
    let finalImage = imageFile ? await convertToBase64(imageFile) : blog.image || null;

    const editedBlog = {
      id: blogId,
      date: blog.date,
      title: values.title,
      content: values.content,
      user: blog.user,
      image: finalImage,
      reactions: blog.reactions || { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
    };

    await updateBlog(editedBlog);
    navigate(`/blogs/${blogId}`);
  };

  return (
    <section className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <BackButton className="mb-4" />

      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">✏️ ویرایش پست</h2>

      <Formik
        initialValues={{ title: blog.title || "", content: blog.content || "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        <Form className="space-y-5">
          <div>
            <label className="block text-gray-700 mb-2">عنوان پست :</label>
            <Field name="title" type="text" className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"/>
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
          </div>

          <div>
            <label className="block text-gray-700 mb-2">محتوای اصلی :</label>
            <Field as="textarea" name="content" rows="6" className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"/>
            <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1"/>
          </div>

          <div>
            <label className="block text-gray-700 mb-2">تصویر پست :</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="w-full border p-2 rounded-md bg-white"/>
            <img src={preview} alt="preview" className="w-full h-48 sm:h-64 md:h-80 object-cover mt-3 rounded"/>
          </div>

          <button type="submit" className="w-full bg-[#403e3e] p-4 hover:bg-[#7b7878] focus:bg-gray-600 text-white font-semibold py-2 rounded-md transition-colors">
            ذخیره تغییرات
          </button>
        </Form>
      </Formik>
    </section>
  );
};

export default EditBlogForm;
