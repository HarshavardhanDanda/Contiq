import React from "react";
import {  fireEvent, screen } from "@testing-library/react";
import { Logout } from ".";
import { USER, USER_ID, logoutItems } from "./logOutConstants";
import "@testing-library/jest-dom";
import { render } from "../../../test-setup";

describe("LogOut", () => {
  test("should render Logout component correcty and handle click event", () => {
    render(<Logout />);

    const userElement = screen.getByText(USER);
    expect(userElement).toBeInTheDocument();

    const userIdElement = screen.getByText(USER_ID);
    expect(userIdElement).toBeInTheDocument();

    logoutItems.forEach((item) => {
      const iconElement = screen.getByAltText(item.alt);
      expect(iconElement).toBeInTheDocument();

      const itemTextElement = screen.getByText(item.text);
      expect(itemTextElement).toBeInTheDocument();
    });

    const logoutItem = screen.getByText("Logout");
    fireEvent.click(logoutItem);
  });
});
