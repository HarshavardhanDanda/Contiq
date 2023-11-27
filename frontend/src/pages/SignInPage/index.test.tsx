import { screen } from "@testing-library/react";
import { SignInPage } from ".";
import { render } from "../../test-setup";

describe("SignIn Page", () => {
  test("should render SignIn Page correctly", () => {
    render(<SignInPage />);
    expect(screen.getByTestId("sign-in")).toBeInTheDocument;
    expect(screen.getByAltText("left-image")).toBeInTheDocument;
  });
});
