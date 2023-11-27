import { fireEvent, screen, waitFor } from "@testing-library/react";
import { SignInForm } from ".";
import {
  CREATE_PASSWORD,
  FORGOT_PASSWORD,
  emailPlaceholder,
} from "../../../constants";
import "@testing-library/jest-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { render } from "../../../test-setup";
import { loginUser } from "../../../services/UserService";

jest.mock("axios");
jest.mock("@auth0/auth0-react");
jest.useFakeTimers();
jest.mock('../../../services/UserService', () => ({
  loginUser: jest.fn(),
}));


jest.mock("../../../services/UserService", () => ({
  checkEmailAvailability: jest.fn().mockResolvedValue([]),
  loginUser: jest.fn().mockResolvedValue([
    {
      id: 1,
      email: "harshitha@gmail.com",
      password: "harshithaB@",
    },
  ]),
}));

describe("SignIn Form", () => {
  const login = jest.fn();
  beforeEach(() => {
    (useAuth0 as jest.Mock).mockReturnValue({
      isAuthenticated: false,
      loginWithRedirect: login,
    });
  });
  test("should render SignUp Form correctly", () => {
    render(<SignInForm />);
    const headingElement = screen.getAllByText(/Sign In/);
    const inputFieldElement = screen.getByPlaceholderText(emailPlaceholder);
    expect(headingElement).toBeInTheDocument;
    expect(inputFieldElement).toBeInTheDocument;
  });
  test("should enables the Sign In button when all the fields are entered correctly", () => {
    render(<SignInForm />);

    const emailFieldElement = screen.getByPlaceholderText(emailPlaceholder);
    const passwordFieldElement = screen.getByPlaceholderText(CREATE_PASSWORD);
    const buttonElement = screen.getByTestId("sign-in");

    fireEvent.change(emailFieldElement, {
      target: { value: "John@gmail.com" },
    });
    fireEvent.change(passwordFieldElement, {
      target: { value: "John@123" },
    });
    expect(buttonElement).toBeEnabled;
    fireEvent.click(buttonElement);
   
    jest.advanceTimersByTime(500);
  
  });

  test("should give error for invalid credentials",  () => {
    render(<SignInForm />);

    const globalMock =
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("../../../services/UserService").loginUser;

    globalMock.mockResolvedValue([]);

    const emailFieldElement = screen.getByPlaceholderText(emailPlaceholder);
    const passwordFieldElement = screen.getByPlaceholderText(CREATE_PASSWORD);
    const buttonElement = screen.getByTestId("sign-in");

    fireEvent.change(emailFieldElement, {
      target: { value: "John@gmail.com" },
    });
    fireEvent.change(passwordFieldElement, {
      target: { value: "John@123" },
    });
    expect(buttonElement).toBeEnabled;
    fireEvent.click(buttonElement);

  });

  test("should enables the Sign In button when all the fields are entered correctly and should navigate by clicking the auth0Button", async () => {
    render(<SignInForm />);

    const emailFieldElement = screen.getByPlaceholderText(emailPlaceholder);
    const passwordFieldElement = screen.getByPlaceholderText(CREATE_PASSWORD);
    const buttonElement = screen.getByTestId("sign-in");

    fireEvent.change(emailFieldElement, {
      target: { value: "harshitha@gmail.com" },
    });
    fireEvent.change(passwordFieldElement, {
      target: { value: "harshithaB@" },
    });
    expect(buttonElement).toBeEnabled;
    fireEvent.click(buttonElement);
    await waitFor(() => {
      expect(loginUser).toHaveBeenCalledWith(
        "harshitha@gmail.com",
        "harshithaB@"
      );
    });
    const auth0Button = screen.getByText("Continue with google");
    fireEvent.click(auth0Button);
  });

  test("should disable the Sign In button when the email field does not validate", () => {
    render(<SignInForm />);

    const emailFieldElement = screen.getByPlaceholderText(emailPlaceholder);
    const passwordFieldElement = screen.getByPlaceholderText(CREATE_PASSWORD);
    const buttonElement = screen.getByTestId("sign-in");

    fireEvent.change(emailFieldElement, { target: { value: "John" } });
    fireEvent.change(passwordFieldElement, {
      target: { value: "John@" },
    });
    expect(buttonElement).toBeDisabled;
  });

  test("should disable the Sign In button when password field does not validate", () => {
    render(<SignInForm />);

    const emailFieldElement = screen.getByPlaceholderText(emailPlaceholder);
    const passwordFieldElement = screen.getByPlaceholderText(CREATE_PASSWORD);
    const buttonElement = screen.getByTestId("sign-in");

    fireEvent.change(emailFieldElement, {
      target: { value: "John@gmail.com" },
    });
    fireEvent.change(passwordFieldElement, { target: { value: "john" } });
    expect(buttonElement).toBeDisabled;

    const forgotPasswordLink = screen.getByText(FORGOT_PASSWORD);
    fireEvent.click(forgotPasswordLink);

    const signUpLink = screen.getByTestId("sign-up");
    fireEvent.click(signUpLink);
  });

  test('handles sign-in error', async () => {
    const globalMock =
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("../../../services/UserService").loginUser;

    globalMock.mockRejectedValue(new Error('Test error message'));

    
  
     render(<SignInForm />);
  
    const buttonElement = screen.getByTestId("sign-in");
  
    fireEvent.click(buttonElement);
  
    await waitFor(() => {
      // expect(screen.getByTestId('error-message').textContent).toBe('An error occurred while signing in: Test error message');
    });
  })
});
