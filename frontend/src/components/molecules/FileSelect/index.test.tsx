import { render, screen, fireEvent } from "@testing-library/react";
import FileSelect from ".";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../../theme/theme";

const mockOnSelect = jest.fn();

const renderComponent = (fileName: string) => {
  return render(
    <ThemeProvider theme={theme}>
      <FileSelect onSelect={mockOnSelect} fileName={fileName} />
    </ThemeProvider>
  );
};

describe("FileSelect component", () => {
  it("renders the component with folder name", () => {
    renderComponent("My Folder");
    expect(screen.getByText("My Folder")).toBeInTheDocument;
  });

  it('renders the checkbox with the "isFileCheckbox" prop', () => {
    renderComponent("My Folder");
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument;
  });

  it('calls the "onSelect" callback when the checkbox is clicked', () => {
    renderComponent("My Folder");
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(mockOnSelect).toHaveBeenCalledTimes(1);
  });
});
