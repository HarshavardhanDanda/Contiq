import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import "@testing-library/jest-dom";
import InputField from "./index";

describe("InputField", () => {
  test("should show the textField", () => {
    render(<InputField placeHolder="john@gmail.com" width={"356px"} />);
    const textElement = screen.getByPlaceholderText("john@gmail.com");
    expect(textElement).toBeInTheDocument();
  });

  test("should handles the value change of the input field", () => {
    const handleChange = jest.fn((event) => {
      return {
        target: {
          value: event.target.value,
        },
      };
    });
    render(
      <InputField
        placeHolder="Test Input"
        onChange={handleChange}
        width={"356px"}
      />
    );
    const inputElement = screen.getByPlaceholderText("Test Input");
    const value = "test";
    fireEvent.change(inputElement, { target: { value: value } });
    expect(handleChange).toHaveBeenCalled();
  });

  test("should show the helper text id the errorMessage is true", () => {
    render(
      <InputField
        placeHolder="Test Input"
        errorMessage="email id is incorrect"
        width={"356px"}
      />
    );
    expect(screen.getByText("email id is incorrect")).toBeInTheDocument();
  });
});
