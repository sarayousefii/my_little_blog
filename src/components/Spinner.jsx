import React from "react";
const Spinner = ({ size = "w-20 h-20", thickness = "border-4" }) => {
  return (
    <div className="flex items-center justify-center p-4">
      <div
        role="status"
        className={`${size} ${size} rounded-full ${thickness} animate-spin`}
        style={{
          borderStyle: "solid",
          borderWidth: "0.35em",
          borderColor: "transparent",
          borderTopColor: "#6b7280", // نقره‌ای
          borderRightColor: "#000000", // مشکی
        }}
      ></div>
    </div>
  );
};

export default Spinner;
