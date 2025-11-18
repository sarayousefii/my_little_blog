import React, { useEffect } from "react";
import { MdClose } from "react-icons/md";

const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-neu max-w-3xl w-full mx-4 relative overflow-hidden border border-white/20 transition-transform transform scale-95 animate-scaleUp">
        <div className="flex justify-between items-center border-b border-white/30 p-4">
          <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800 transition-colors">
            <MdClose size={24} />
          </button>
        </div>
        <div className="p-6 max-h-[80vh] overflow-y-auto text-gray-900">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
