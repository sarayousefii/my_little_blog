import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAddNewBlogMutation } from "../api/apiSlice";
import { selectAllUsers } from "../reducers/userSlice";
import { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";
import BackButton from "./BackButton";

const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const CreateBlogForm = () => {
  const navigate = useNavigate();
  const users = useSelector(selectAllUsers);
  const [addNewBlog, { isLoading }] = useAddNewBlogMutation();
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null); 

  useEffect(() => {
    if (imageFile) {
      const objectUrl = URL.createObjectURL(imageFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null); 
    }
  }, [imageFile]);

  const validationSchema = Yup.object({
    title: Yup.string().required("عنوان پست الزامی است"),
    content: Yup.string().min(10, "حداقل ۱۰ کاراکتر").required("محتوا الزامی است"),
    userId: Yup.string().required("انتخاب نویسنده الزامی است"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const base64Image = imageFile ? await convertToBase64(imageFile) : null;

    await addNewBlog({
      id: nanoid(),
      date: new Date().toISOString(),
      title: values.title,
      content: values.content,
      user: values.userId,
      image: base64Image,
      reactions: { thumbsUp: 0, hooray: 0, heart: 0, rocket: 0, eyes: 0 },
    }).unwrap();

    resetForm();
    setImageFile(null);
    navigate("/");
  };

  return (
    <section className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <BackButton className="mb-4" />

      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">📝 ساخت پست جدید</h2>

      <Formik
        initialValues={{ title: "", content: "", userId: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty }) => (
          <Form className="space-y-5">
            <div>
              <label className="block text-gray-700 mb-2">عنوان پست :</label>
              <Field
                name="title"
                type="text"
                className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                placeholder="عنوان پست را وارد کنید..."
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">نویسنده :</label>
              <Field
                as="select"
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
              <ErrorMessage name="userId" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">محتوای اصلی :</label>
              <Field
                as="textarea"
                name="content"
                rows="6"
                className="w-full border rounded-md p-2 focus:ring focus:ring-blue-300"
                placeholder="متن پست را وارد کنید..."
              />
              <ErrorMessage name="content" component="div" className="text-red-500 text-sm mt-1" />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">تصویر پست :</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files[0])}
                className="w-full border p-2 rounded-md bg-white"
              />
              {imageFile && (
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-48 sm:h-64 md:h-80 object-cover mt-3 rounded"
                />
              )}
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
