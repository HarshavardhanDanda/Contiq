import { render, screen, fireEvent } from "@testing-library/react";
import DropDown from ".";
import theme from "../../../theme/theme";
import { ThemeProvider } from "@mui/material";

describe("DropDown component", () => {
  const menuItems = { item1: "Item 1", item2: "Item 2" };
  const handleClear = jest.fn();
  const handleChange = jest.fn();

  beforeEach(() => {
    render(
      <ThemeProvider theme={theme}>
        <DropDown
          menuItems={menuItems}
          label="Select an item"
          placeholder="Choose an item"
          value=""
          handleClear={handleClear}
          handleChange={handleChange}
        />
      </ThemeProvider>
    );
  });

  it("renders the component with a placeholder", () => {
    expect(screen.getByText(/Choose an item/i)).toBeInTheDocument;
  });

  it("opens the dropdown on click", () => {
    const selectButton = screen.getByText(/Choose an item/i);
    fireEvent.mouseDown(selectButton);

    const selectAnItem = screen.getByText(/Select an item/i);
    expect(selectAnItem).toBeInTheDocument;
  });

  it("selects an item from the dropdown", () => {
    const selectButton = screen.getByText(/Choose an item/i);
    fireEvent.mouseDown(selectButton);

    const menuItem = screen.getByText(/Item 1/i);
    expect(menuItem).toBeInTheDocument;
  });

  it("clears the selected value", () => {
    render(
      <ThemeProvider theme={theme}>
        <DropDown
          menuItems={menuItems}
          label="Select an item"
          placeholder="Choose an item"
          value="value"
          handleClear={handleClear}
          handleChange={handleChange}
        />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByAltText("Close"));
    expect(handleClear).toBeCalledTimes(1);
  });
});
