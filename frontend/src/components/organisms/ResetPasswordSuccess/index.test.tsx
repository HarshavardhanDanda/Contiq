import {  fireEvent } from "@testing-library/react";
import ResetPasswordSuccess from ".";
import { resetSuccess, continueText } from "../../../constants";
import { render } from "../../../test-setup";

describe("ResetPasswordSuccess", () => {
  it("displays the success message and a continue button", () => {
    const { getByText, getByRole } = render(<ResetPasswordSuccess />);

    const successMessage = getByText(resetSuccess);
    expect(successMessage).toBeInTheDocument;

    const continueButton = getByRole("button", { name: continueText });
    expect(continueButton).toBeInTheDocument;
  });

  it('calls the handlePasswordReset function when the "Continue" button is clicked', () => {
    const handlePasswordReset = jest.fn();
    const { getByRole } = render(<ResetPasswordSuccess />);
    const continueButton = getByRole("button", { name: continueText });

    fireEvent.click(continueButton);
    expect(handlePasswordReset).toHaveBeenCalled;
  });
});
