import { useEditBlogMutation, useGetBlogQuery } from "../api/apiSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState, useEffect } from "react";
import DEFAULT_IMAGE from "../assets/default_blog_image.jpg";
import Spinner from "./Spinner";

const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const EditBlogForm = ({ blogId, onClose }) => {
  const { data: blog, isLoading } = useGetBlogQuery(blogId);
  const [updateBlog] = useEditBlogMutation();
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(DEFAULT_IMAGE);

  useEffect(() => {
    if (imageFile) {
      const obj = URL.createObjectURL(imageFile);
      setPreview(obj);
      return () => URL.revokeObjectURL(obj);
    }
    setPreview(blog?.image || DEFAULT_IMAGE);
  }, [imageFile, blog]);

  if (isLoading) return <Spinner text="بارگذاری ..." />;
  if (!blog) return <p className="text-center mt-5 text-red-500">پست یافت نشد 😅</p>;

  const validationSchema = Yup.object({
    title: Yup.string().required("عنوان پست الزامی است"),
    content: Yup.string().required("محتوای پست الزامی است"),
  });

  const handleSubmit = async (values) => {
    const finalImage = imageFile ? await convertToBase64(imageFile) : blog.image || null;
    await updateBlog({ ...blog, title: values.title, content: values.content, image: finalImage }).unwrap();
    onClose?.();
  };

  const inputStyle =
    "w-full p-3 rounded-xl bg-black/40 backdrop-blur-md placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner";

  return (
    <Formik
      initialValues={{ title: blog.title || "", content: blog.content || "" }}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {({ dirty, isValid, setFieldValue }) => (
        <Form className="flex flex-col gap-5">
          <Field name="title" type="text" className={inputStyle} />
          <ErrorMessage name="title" component="div" className="text-red-400 text-sm" />

          <Field as="textarea" name="content" rows={6} className={inputStyle} />
          <ErrorMessage name="content" component="div" className="text-red-400 text-sm" />

          {/* Upload */}
          <div className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer bg-black/40 backdrop-blur-md">
            <input
              type="file"
              accept="image/*"
              id="fileInputEdit"
              className="hidden"
              onChange={(e) => {
                setFieldValue("image", e.target.files[0]);
                setImageFile(e.target.files[0]);
              }}
            />
            <label htmlFor="fileInputEdit" className="cursor-pointer text-gray-200">
              {preview ? (
                <img
                  src={preview}
                  className="w-24 h-24 object-cover rounded-lg mx-auto shadow-md"
                />
              ) : (
                "تصویر را انتخاب کنید یا اینجا کلیک کنید"
              )}
            </label>
          </div>

          <div className="flex justify-end gap-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-700/50 backdrop-blur-sm hover:bg-gray-700/70 text-white transition"
            >
              لغو
            </button>
            <button
              type="submit"
              disabled={!dirty || !isValid}
              className={`px-4 py-2 rounded-xl transition ${
                !dirty || !isValid
                  ? "bg-gray-600 cursor-not-allowed text-gray-400"
                  : "bg-gray-900 hover:bg-gray-800 text-white"
              }`}
            >
              ذخیره تغییرات
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditBlogForm;
