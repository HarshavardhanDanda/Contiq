import { render, screen, fireEvent } from "@testing-library/react";
import ResetPassword from ".";
import {
  resetPassword,
  verificationMail,
  send,
  emailPlaceholder,
} from "../../../constants";

jest.mock("../../../services/UserService", () => ({
  checkEmailAvailability: jest.fn().mockResolvedValue([
    {
      username: "Harsha",
      email: "harsha@gmail.com",
      password: "Harsha@1234",
      id: 5,
    },
  ]),
}));

describe("ResetPassword", () => {
  const mockHandleResetClick = jest.fn();
  it("displays the form with proper elements", () => {
    const { getByText, getByPlaceholderText, getByRole } = render(
      <ResetPassword handleResetClick={mockHandleResetClick} />
    );

    const resetPasswordTitle = getByText(resetPassword);
    expect(resetPasswordTitle).toBeInTheDocument;

    const verificationMailText = getByText(verificationMail);
    expect(verificationMailText).toBeInTheDocument;

    const emailInput = getByPlaceholderText(emailPlaceholder);
    expect(emailInput).toBeInTheDocument;

    const sendButton = getByRole("button", { name: send });
    expect(sendButton).toBeInTheDocument;
    fireEvent.click(sendButton);
  });

  it('validates email input correctly and enables/disables the "Send" button', () => {
    const { getByPlaceholderText, getByRole } = render(
      <ResetPassword handleResetClick={mockHandleResetClick} />
    );

    const emailInput = getByPlaceholderText(emailPlaceholder);
    fireEvent.focus(emailInput);
    const sendButton = getByRole("button", { name: send });
    expect(sendButton).toBeDisabled;

    fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
    fireEvent.blur(emailInput);
    expect(sendButton).toBeEnabled;

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });
    expect(sendButton).toBeDisabled;
  });

  it("should set error if email is not found in records", () => {
    const { getByPlaceholderText, getByRole } = render(
      <ResetPassword handleResetClick={mockHandleResetClick} />
    );

    const globalCheckEmailAvailabilityMock =
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("../../../services/UserService").checkEmailAvailability;

    globalCheckEmailAvailabilityMock.mockResolvedValue([]);
    const emailInput = getByPlaceholderText(emailPlaceholder);
    fireEvent.focus(emailInput);
    const sendButton = getByRole("button", { name: send });
    expect(sendButton).toBeDisabled;

    fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
    fireEvent.blur(emailInput);
    expect(sendButton).toBeEnabled;
    fireEvent.click(sendButton);
    expect(
      screen.getByText(
        "The verification mail will be sent to the mailbox please check it."
      )
    ).toBeInTheDocument;
  });

  it("should set error if email is not found in records", () => {
    const { getByPlaceholderText, getByRole } = render(
      <ResetPassword handleResetClick={mockHandleResetClick} />
    );

    const globalCheckEmailAvailabilityMock =
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("../../../services/UserService").checkEmailAvailability;

    globalCheckEmailAvailabilityMock.mockRejectedValue([]);
    const emailInput = getByPlaceholderText(emailPlaceholder);
    fireEvent.focus(emailInput);
    const sendButton = getByRole("button", { name: send });
    expect(sendButton).toBeDisabled;

    fireEvent.change(emailInput, { target: { value: "valid@example.com" } });
    fireEvent.blur(emailInput);
    expect(sendButton).toBeEnabled;
    fireEvent.click(sendButton);
    expect(
      screen.getByText(
        "The verification mail will be sent to the mailbox please check it."
      )
    ).toBeInTheDocument;
  });
});
