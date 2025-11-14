import { useState } from "react";
import { Link } from "react-router-dom";
import { GiBookCover } from "react-icons/gi";
import { HiMenu, HiX } from "react-icons/hi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#403e3e] text-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">

          <div className="flex items-center gap-2">
            <GiBookCover className="text-3xl text-white" />
            <h1 className="text-lg sm:text-xl font-semibold">
               وبلاگ کوچک من
            </h1>
          </div>

          <div className="hidden sm:flex gap-2">
            <Link
              to="/"
              className="px-4 py-2 rounded-md hover:bg-gray-500 transition-colors"
              title="صفحه اصلی"
            >
              صفحه اصلی
            </Link>
            <Link
              to="/users"
              className="px-4 py-2 rounded-md hover:bg-gray-500 transition-colors"
              title="نمایش نویسندگان"
            >
              نمایش نویسندگان
            </Link>
          </div>

          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-gray-500 focus:outline-none"
            >
              {isOpen ? (
                <HiX className="text-2xl" />
              ) : (
                <HiMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="sm:hidden bg-[#403e3e] border-t border-gray-600">
          <div className="flex flex-col items-center space-y-2 py-3">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-2 hover:bg-gray-500 transition-colors"
            >
              صفحه اصلی
            </Link>
            <Link
              to="/users"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center py-2 hover:bg-gray-500 transition-colors"
            >
              نمایش نویسندگان
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
