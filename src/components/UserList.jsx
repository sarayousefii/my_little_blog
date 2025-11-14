import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectAllUsers, useAddNewUserMutation, useDeleteUserMutation } from "../reducers/userSlice";
import { nanoid } from "@reduxjs/toolkit";
import { AiOutlineClose } from "react-icons/ai";

const UsersList = () => {
  const [user, setUser] = useState("");

  const users = useSelector(selectAllUsers);
  const [addNewUser] = useAddNewUserMutation();
  const [deleteApiUser] = useDeleteUserMutation();

  const onUserChange = (e) => setUser(e.target.value);
  const canSave = Boolean(user);

  const handleSubmitForm = async () => {
    if (canSave) {
      await addNewUser({ id: nanoid(), fullname: user });
      setUser("");
    }
  };

  const handleDelete = async (userId) => {
    await deleteApiUser(userId);
  };

  return (
    <section className="max-w-2xl mx-auto mt-10 p-6 bg-white text-gray-900 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">👤 ساخت نویسنده جدید</h2>
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
        />
        <button
          type="submit"
          disabled={!canSave}
          className={`px-4 py-2 rounded-md text-white font-semibold transition-colors
            ${canSave ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400 cursor-not-allowed"}`}
        >
          افزودن
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
            >
              <AiOutlineClose />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default UsersList;
