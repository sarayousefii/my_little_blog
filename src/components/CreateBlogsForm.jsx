import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAddNewBlogMutation } from "../api/apiSlice";
import { selectAllUsers } from "../reducers/userSlice";
import { useState, useEffect } from "react";
import { nanoid } from "@reduxjs/toolkit";

const convertToBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const CreateBlogForm = ({ onClose }) => {
  const users = useSelector(selectAllUsers);
  const [addNewBlog, { isLoading }] = useAddNewBlogMutation();
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!imageFile) return setPreview(null);
    const objectUrl = URL.createObjectURL(imageFile);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
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
    onClose?.();
  };

  const inputStyle =
    "w-full p-3 rounded-xl bg-black/40 backdrop-blur-md placeholder-gray-300 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 shadow-inner";

  return (
    <Formik
      initialValues={{ title: "", content: "", userId: "" }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isValid, dirty, setFieldValue }) => (
        <Form className="flex flex-col gap-5">
          <Field
            name="title"
            type="text"
            className={inputStyle}
            placeholder="عنوان پست را وارد کنید..."
          />
          <ErrorMessage name="title" component="div" className="text-red-400 text-sm" />

          <Field as="select" name="userId" className={inputStyle}>
            <option value="">انتخاب نویسنده</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.fullname}
              </option>
            ))}
          </Field>
          <ErrorMessage name="userId" component="div" className="text-red-400 text-sm" />

          <Field
            as="textarea"
            name="content"
            rows={6}
            className={inputStyle}
            placeholder="متن پست را وارد کنید..."
          />
          <ErrorMessage name="content" component="div" className="text-red-400 text-sm" />

          <div className="border-2 border-dashed rounded-xl p-4 text-center cursor-pointer bg-black/40 backdrop-blur-md">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              className="hidden"
              onChange={(e) => {
                setFieldValue("image", e.target.files[0]);
                setImageFile(e.target.files[0]);
              }}
            />
            <label htmlFor="fileInput" className="cursor-pointer text-gray-200">
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

          <button
            type="submit"
            disabled={!isValid || !dirty || isLoading}
            className={`w-full py-3 rounded-xl font-semibold transition ${
              !isValid || !dirty || isLoading
                ? "bg-gray-600 cursor-not-allowed text-gray-400"
                : "bg-gray-900 hover:bg-gray-800 text-white"
            }`}
          >
            {isLoading ? "در حال ذخیره..." : "ذخیره پست"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateBlogForm;
