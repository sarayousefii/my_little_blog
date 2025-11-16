import { useNavigate } from "react-router-dom";

const BackButton = ({ className }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => (window.history.length > 1 ? navigate(-1) : navigate("/"))}
      className={`px-4 py-2 rounded-lg bg-[#403e3e] text-white hover:bg-[#7b7878] transition-colors ${className || ""}`}
    >
      ← برگشت
    </button>
  );
};

export default BackButton;
