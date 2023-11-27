import { fireEvent, screen, waitFor } from "@testing-library/react";
import SignUpForm from ".";
import {
  CREATE_ACCOUNT,
  CREATE_PASSWORD,
  SIGNIN,
  SIGNUP,
  emailPlaceholder,
  namePlaceholder,
} from "../../../constants";
import "@testing-library/jest-dom";
import { render } from "../../../test-setup";
import {
  checkEmailAvailability,
  createUser,
} from "../../../services/UserService";
import { useAuth0 } from "@auth0/auth0-react";

jest.mock("axios");
jest.mock("@auth0/auth0-react");

jest.mock("../../../services/UserService", () => ({
  checkEmailAvailability: jest.fn().mockResolvedValue([]),
  createUser: jest.fn().mockResolvedValue({
    id: 1,
    username: "Harshitha",
    email: "harshitha@gmail.com",
    password: "harshithaB@",
  }),
}));

describe("SignUp form component", () => {
  const login = jest.fn();
  beforeEach(() => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: login,
    });
  });
  test("renders all the items as expected", () => {
    render(<SignUpForm />);
    const headingElement = screen.getByText(SIGNUP);
    const inputFieldElement = screen.getByPlaceholderText(namePlaceholder);
    expect(headingElement).toBeInTheDocument;
    expect(inputFieldElement).toBeInTheDocument;
  });
  test("Enables the create account button when all the fields are given correctly", () => {
    render(<SignUpForm />);
    const nameFieldElement = screen.getByPlaceholderText(namePlaceholder);
    const emailFieldElement = screen.getByPlaceholderText(emailPlaceholder);
    const passwordFieldElement = screen.getByPlaceholderText(CREATE_PASSWORD);
    const buttonElement = screen.getByText(CREATE_ACCOUNT);
    fireEvent.change(nameFieldElement, { target: { value: "Harshitha" } });
    fireEvent.change(emailFieldElement, {
      target: { value: "Harshitha@gmail.com" },
    });
    fireEvent.change(passwordFieldElement, {
      target: { value: "Harshitha@123" },
    });
    expect(buttonElement).toBeEnabled;
    fireEvent.click(buttonElement);
  });
  test("desables the create account button when the name field doesnot validate", () => {
    render(<SignUpForm />);
    const nameFieldElement = screen.getByPlaceholderText(namePlaceholder);
    const emailFieldElement = screen.getByPlaceholderText(emailPlaceholder);
    const passwordFieldElement = screen.getByPlaceholderText(CREATE_PASSWORD);
    const buttonElement = screen.getByText(CREATE_ACCOUNT);
    fireEvent.focus(nameFieldElement);
    fireEvent.change(nameFieldElement, { target: { value: "1Harshitha" } });
    fireEvent.blur(nameFieldElement);
    fireEvent.focus(emailFieldElement);
    fireEvent.change(emailFieldElement, {
      target: { value: "Harshitha@gmail.com" },
    });
    fireEvent.blur(emailFieldElement);
    fireEvent.focus(passwordFieldElement);
    fireEvent.change(passwordFieldElement, {
      target: { value: "harshithaB@" },
    });
    fireEvent.blur(passwordFieldElement);
    expect(buttonElement).toBeDisabled;
  });

  test("desables the create account button when the email field doesnot validate", () => {
    render(<SignUpForm />);
    const nameFieldElement = screen.getByPlaceholderText(namePlaceholder);
    const emailFieldElement = screen.getByPlaceholderText(emailPlaceholder);
    const passwordFieldElement = screen.getByPlaceholderText(CREATE_PASSWORD);
    const buttonElement = screen.getByText(CREATE_ACCOUNT);
    fireEvent.change(nameFieldElement, { target: { value: "1harshitha" } });
    fireEvent.change(emailFieldElement, { target: { value: "Harshitha" } });
    fireEvent.change(passwordFieldElement, {
      target: { value: "harshithaB@" },
    });
    expect(buttonElement).toBeDisabled;
    const SignInElement = screen.getByText(SIGNIN);
    fireEvent.click(SignInElement);
  });

  test("desables the create account button when  password field doesnot validate", () => {
    render(<SignUpForm />);
    const nameFieldElement = screen.getByPlaceholderText(namePlaceholder);
    const emailFieldElement = screen.getByPlaceholderText(emailPlaceholder);
    const passwordFieldElement = screen.getByPlaceholderText(CREATE_PASSWORD);
    const buttonElement = screen.getByText(CREATE_ACCOUNT);
    fireEvent.change(nameFieldElement, { target: { value: "Harshitha" } });
    fireEvent.change(emailFieldElement, {
      target: { value: "Harshitha@gmail.com" },
    });
    fireEvent.change(passwordFieldElement, { target: { value: "harshitha" } });
    expect(buttonElement).toBeDisabled;
  });

  test("handles create account when the button is clicked", async () => {
    const { getByText, getByPlaceholderText } = render(<SignUpForm />);

    const nameInput = getByPlaceholderText(namePlaceholder);
    const emailInput = getByPlaceholderText(emailPlaceholder);
    const passwordInput = getByPlaceholderText(CREATE_PASSWORD);

    fireEvent.change(nameInput, { target: { value: "Harshitha" } });
    fireEvent.change(emailInput, { target: { value: "harshitha@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "harshithaB@" } });
    fireEvent.click(getByText("Create account"));

    await waitFor(() => {
      expect(checkEmailAvailability).toHaveBeenCalledWith(
        "harshitha@gmail.com"
      );
      expect(createUser).toHaveBeenCalledWith({
        username: "Harshitha",
        email: "harshitha@gmail.com",
        password: "harshithaB@",
      });
      const auth0Button = screen.getByAltText("google-logo");
      fireEvent.click(auth0Button);
    });
  });

  test("should give error if a user with email is already present", async () => {
    const { getByText, getByPlaceholderText } = render(<SignUpForm />);

    const consoleErrorSpy = jest.spyOn(console, "error");
    const globalCheckEmailAvailabilityMock =
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("../../../services/UserService").checkEmailAvailability;

    globalCheckEmailAvailabilityMock.mockResolvedValue([
      { id: 1, name: "username" },
    ]);

    const nameInput = getByPlaceholderText(namePlaceholder);
    const emailInput = getByPlaceholderText(emailPlaceholder);
    const passwordInput = getByPlaceholderText(CREATE_PASSWORD);

    fireEvent.change(nameInput, { target: { value: "Harshitha" } });
    fireEvent.change(emailInput, { target: { value: "harshitha@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "harshithaB@" } });
    fireEvent.click(getByText("Create account"));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "User with email already exists"
      );
    });
  });

  test("should give error if emailAvailability call fails", async () => {
    const { getByText, getByPlaceholderText } = render(<SignUpForm />);

    const consoleErrorSpy = jest.spyOn(console, "error");
    const globalCheckEmailAvailabilityMock =
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("../../../services/UserService").checkEmailAvailability;

    globalCheckEmailAvailabilityMock.mockRejectedValue("something went wrong");

    const nameInput = getByPlaceholderText(namePlaceholder);
    const emailInput = getByPlaceholderText(emailPlaceholder);
    const passwordInput = getByPlaceholderText(CREATE_PASSWORD);

    fireEvent.change(nameInput, { target: { value: "Harshitha" } });
    fireEvent.change(emailInput, { target: { value: "harshitha@gmail.com" } });
    fireEvent.change(passwordInput, { target: { value: "harshithaB@" } });
    fireEvent.click(getByText("Create account"));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled;
    });
  });
});
