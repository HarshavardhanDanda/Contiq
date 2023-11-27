import React from "react";
import { render, screen } from "@testing-library/react";
import { DividerComponent } from ".";

describe("DividerComponent", () => {
  test("should render divider component with text and color prop", () => {
    render(<DividerComponent text="OR" color="red"/>);
    expect(screen.getByText("OR")).toBeInTheDocument;
  });

  test("should render divider component without color prop", () => {
    render(<DividerComponent text="OR" />);
    expect(screen.getByText("OR")).toBeInTheDocument;
  });
});
