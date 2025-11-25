import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"; // برای matchers مثل toBeInTheDocument و toHaveClass
import Spinner from "./Spinner";

describe("Spinner Component", () => {
  test("renders without crashing", () => {
    render(<Spinner />);
    const spinnerDiv = screen.getByRole("status"); // نقش status برای دسترسی آسان
    expect(spinnerDiv).toBeInTheDocument();
  });

  test("applies correct classes and styles", () => {
    render(<Spinner size="w-16 h-16" thickness="border-2" />);
    const spinner = screen.getByRole("status");

    // بررسی کلاس‌های Tailwind
    expect(spinner).toHaveClass("w-16");
    expect(spinner).toHaveClass("h-16");
    expect(spinner).toHaveClass("border-2");
    expect(spinner).toHaveClass("rounded-full");
  });
});
