import { render, screen } from "@testing-library/react";
import { SignUpTemplate } from ".";

describe("SignUp Template", () => {
  test("should render SignUp Template correctly", () => {
    render(
      <SignUpTemplate>
        <div>SignUp Template</div>
      </SignUpTemplate>
    );
    expect(screen.getByAltText("left-image")).toBeInTheDocument;
    expect(screen.getByText("SignUp Template")).toBeInTheDocument;
  });
});
