import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Auth0Button } from ".";
import googleLogo from "../../../../public/assets/images/google logo.svg";

describe("Auth0Button", () => {
  test("should render button with text and icon", () => {
    render(
      <Auth0Button
        text="Continue with google"
        src={googleLogo}
        alt="google-logo"
      />
    );

    const button = screen.getByText("Continue with google");
    const icon = screen.getByAltText("google-logo");

    expect(button).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  test("should trigger onClick when the button is clicked", () => {
    const onClickMock = jest.fn();
    render(
      <Auth0Button
        text="Continue with google"
        src={googleLogo}
        alt="google-logo"
        onClick={onClickMock}
      />
    );

    const button = screen.getByText("Continue with google");
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
