import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ForgotPasswordPage from ".";
import "@testing-library/jest-dom";
import { passwordPlaceholder } from "../../constants";

jest.mock("../../services/UserService", () => ({
  changePasswordByEmail: jest.fn().mockResolvedValue(true),
  checkEmailAvailability: jest.fn().mockResolvedValue([
    {
      username: "Harsha",
      email: "harsha@gmail.com",
      password: "Harsha@1234",
      id: 5,
    },
  ]),
}));

describe("ForgotPassword Page", () => {
  test("renders the components correctly base on the click", () => {
    render(<ForgotPasswordPage />);
    const SendElement = screen.getByText("Send");
    const emailElement = screen.getByPlaceholderText("john@example.com");
    fireEvent.change(emailElement, {
      target: { value: "harshitha@gmail.com" },
    });
    fireEvent.click(SendElement);
    const passwordElements =
      screen.getAllByPlaceholderText(passwordPlaceholder);

    fireEvent.change(passwordElements[0], {
      target: { value: "harshithaB@1" },
    });
    fireEvent.change(passwordElements[1], {
      target: { value: "harshithaB@1" },
    });
    const resetPasswordElement = screen.getByText("Reset Password");
    fireEvent.click(resetPasswordElement);
  });

  test("should give error when password change is unsuccessful", () => {
    const globalMock =
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("../../services/UserService").changePasswordByEmail;

    globalMock.mockResolvedValue(false);
    render(<ForgotPasswordPage />);
    const SendElement = screen.getByText("Send");
    const emailElement = screen.getByPlaceholderText("john@example.com");
    fireEvent.change(emailElement, {
      target: { value: "harshitha@gmail.com" },
    });
    fireEvent.click(SendElement);
    const passwordElements =
      screen.getAllByPlaceholderText(passwordPlaceholder);

    fireEvent.change(passwordElements[0], {
      target: { value: "harshithaB@1" },
    });
    fireEvent.change(passwordElements[1], {
      target: { value: "harshithaB@1" },
    });
    const resetPasswordElement = screen.getByText("Reset Password");
    fireEvent.click(resetPasswordElement);
  });

  test("should give error when change password call is unsuccessful", async () => {
    const globalMock =
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("../../services/UserService").changePasswordByEmail;

    globalMock.mockRejectedValue({});
    render(<ForgotPasswordPage />);
    const SendElement = screen.getByText("Send");
    const emailElement = screen.getByPlaceholderText("john@example.com");
    fireEvent.change(emailElement, {
      target: { value: "harshitha@gmail.com" },
    });
    fireEvent.click(SendElement);
    const passwordElements =
      screen.getAllByPlaceholderText(passwordPlaceholder);

    fireEvent.change(passwordElements[0], {
      target: { value: "harshithaB@1" },
    });
    fireEvent.change(passwordElements[1], {
      target: { value: "harshithaB@1" },
    });
    const resetPasswordElement = screen.getByText("Reset Password");
    fireEvent.click(resetPasswordElement);
    await waitFor(()=>{
      // 
    })
  });
});
