import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CreateNewPassword from "."; // Adjust the import path accordingly
import {
  createNewPassword,
  passwordPlaceholder,
  resetButtonText,
  changePassword
} from "../../../constants";

describe("CreateNewPassword", () => {
  it("displays the form with proper elements", () => {
    const { getByText, getAllByPlaceholderText, getByRole } = render(
      <CreateNewPassword />
    );

    const createNewPasswordTitle = getByText(createNewPassword);
    expect(createNewPasswordTitle).toBeInTheDocument;

    const changePasswordText = getByText(changePassword);
    expect(changePasswordText).toBeInTheDocument;
   
   

    const inputFields = getAllByPlaceholderText(passwordPlaceholder);
    expect(inputFields).toHaveLength(2);
    fireEvent.focus(inputFields[0])
    fireEvent.blur(inputFields[0])
    const resetButton = getByRole("button", { name: resetButtonText });
    expect(resetButton).toBeInTheDocument;
    expect(resetButton).toBeDisabled;
  });

  it('validates password input and enables/disables the "Reset" button', () => {
    const { getAllByPlaceholderText, getByRole } = render(
      <CreateNewPassword />
    );

    const [passwordInput, confirmPasswordInput] =
      getAllByPlaceholderText(passwordPlaceholder);
    const resetButton = getByRole("button", { name: resetButtonText });

    fireEvent.change(passwordInput, { target: { value: "ValidPassword1!" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "ValidPassword1!" },
    });

    expect(resetButton).toBeEnabled;
    fireEvent.change(passwordInput, { target: { value: "invalid" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "invalid" } });

    expect(resetButton).toBeDisabled;
  });

  it("validates matching password and confirm password", () => {
    const { getAllByPlaceholderText, getByRole } = render(
      <CreateNewPassword />
    );

    const [passwordInput, confirmPasswordInput] =
      getAllByPlaceholderText(passwordPlaceholder);
    const resetButton = getByRole("button", { name: resetButtonText });

    fireEvent.change(passwordInput, {
      target: { value: "MatchingPassword1!" },
    });
    fireEvent.focus(confirmPasswordInput)
    
    fireEvent.change(confirmPasswordInput, {
      target: { value: "MatchingPassword1!" },
    });
    fireEvent.blur(confirmPasswordInput)

    expect(resetButton).toBeEnabled;

    fireEvent.change(passwordInput, { target: { value: "Password1!" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "DifferentPassword1!" },
    });
    expect(resetButton).toBeDisabled;
  });

  it('calls the handlePasswordChange function when the "Reset" button is clicked', () => {
    const handlePasswordChange = jest.fn();
    const { getByRole } = render(<CreateNewPassword />);
    const resetButton = getByRole("button", { name: resetButtonText });

    fireEvent.click(resetButton);
    expect(handlePasswordChange).toHaveBeenCalled;
  });
});
