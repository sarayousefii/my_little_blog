import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectAllUsers,
  useAddNewUserMutation,
  useDeleteUserMutation
} from "../reducers/userSlice";
import { nanoid } from "@reduxjs/toolkit";
import { AiOutlineClose } from "react-icons/ai";

const UsersList = () => {
  const [user, setUser] = useState("");
  const [message, setMessage] = useState(null);

  const users = useSelector(selectAllUsers);
  const [addNewUser, { isLoading: isAdding, error: addError }] = useAddNewUserMutation();
  const [deleteApiUser, { isLoading: isDeleting, error: deleteError }] = useDeleteUserMutation();

  const onUserChange = (e) => setUser(e.target.value);
  const canSave = Boolean(user.trim()) && !isAdding && !isDeleting;

  const handleSubmitForm = async () => {
    if (!canSave) return;
    try {
      await addNewUser({ id: nanoid(), fullname: user }).unwrap();
      setUser("");
      setMessage({ type: "success", text: "نویسنده با موفقیت اضافه شد!" });
    } catch (err) {
      setMessage({ type: "error", text: "خطا در اضافه کردن نویسنده." });
    }
  };

  const handleDelete = async (userId) => {
    if (isDeleting) return;
    try {
      await deleteApiUser(userId).unwrap();
      setMessage({ type: "success", text: "نویسنده با موفقیت حذف شد!" });
    } catch (err) {
      setMessage({ type: "error", text: "خطا در حذف نویسنده." });
    }
  };

  return (
    <section className="max-w-2xl mx-auto mt-10 p-6 bg-white text-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">👤 ساخت نویسنده جدید</h2>

      {message && (
        <div
          className={`mb-4 p-2 rounded ${
            message.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {message.text}
        </div>
      )}

      <form
        autoComplete="off"
        className="flex flex-col sm:flex-row gap-3 mb-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitForm();
        }}
      >
        <input
          type="text"
          placeholder="نام نویسنده را وارد کنید"
          value={user}
          onChange={onUserChange}
          className="flex-1 border border-gray-300 rounded-md p-2 focus:ring focus:ring-blue-300"
          disabled={isAdding || isDeleting}
        />
        <button
          type="submit"
          disabled={!canSave}
          className={`px-4 py-2 rounded-md text-white font-semibold transition-colors
            ${canSave ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
        >
          {isAdding ? "در حال افزودن..." : "افزودن"}
        </button>
      </form>

      <h2 className="text-xl font-semibold mb-3 border-b pb-2">لیست نویسندگان</h2>
      <ul className="space-y-2">
        {users.map((u) => (
          <li
            key={u.id}
            className="flex justify-between items-center bg-gray-100 rounded-md px-4 py-2 transition-colors hover:bg-gray-200"
          >
            <Link to={`/users/${u.id}`} className="hover:underline">
              {u.fullname}
            </Link>
            <button
              onClick={() => handleDelete(u.id)}
              className="text-red-500 hover:text-red-700 transition-colors"
              title="حذف نویسنده"
              disabled={isDeleting}
            >
              {isDeleting ? "..." : <AiOutlineClose />}
            </button>
          </li>
        ))}
      </ul>

      {(addError || deleteError) && (
        <div className="mt-4 text-red-600">
          {addError?.data?.message || deleteError?.data?.message || "خطایی رخ داده است."}
        </div>
      )}
    </section>
  );
};

export default UsersList;
