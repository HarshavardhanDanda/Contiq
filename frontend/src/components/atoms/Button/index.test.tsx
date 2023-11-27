import { fireEvent, render, screen } from "@testing-library/react";
import ButtonComponent from ".";
import "@testing-library/jest-dom";

describe("ButtonComponent", () => {
  it("renders with default button props", () => {
    render(<ButtonComponent>Default Button</ButtonComponent>);
    const buttonElement = screen.getByText("Default Button");
    expect(buttonElement).toBeInTheDocument();
  });

  it("renders with custom variant and color", () => {
    render(
      <ButtonComponent variant="contained" color="secondary">
        Custom Button
      </ButtonComponent>
    );
    const buttonElement = screen.getByText("Custom Button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass("MuiButton-contained");
    expect(buttonElement).toHaveClass("MuiButton-containedSecondary");
  });

  it("renders with the button disabled", () => {
    render(<ButtonComponent disabled>Disabled Button</ButtonComponent>);
    const buttonElement = screen.getByText("Disabled Button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeDisabled();
  });

  it("triggers the onClick event handler", () => {
    const handleClick = jest.fn();
    render(<ButtonComponent onClick={handleClick}>Click Me</ButtonComponent>);
    const buttonElement = screen.getByText("Click Me");
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
