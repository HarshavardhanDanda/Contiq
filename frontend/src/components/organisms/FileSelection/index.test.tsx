import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import FileSelectionOrganism from ".";

describe("FileSelectionOrganism", () => {
  const mockPropsOrganism = {
    files: [{ filename: "Test File" }, { filename: "Test File 2" }],
  };

  it("renders correctly", () => {
    render(<FileSelectionOrganism {...mockPropsOrganism} />);
    mockPropsOrganism.files.forEach(() => {
      expect(screen.getByText("Zemoso decks")).toBeInTheDocument;
    });
  });

  it("renders correct number of FileSelect components", () => {
    render(<FileSelectionOrganism {...mockPropsOrganism} />);
    const fileSelectElements = screen.getAllByRole("checkbox");
    expect(fileSelectElements.length).toBe(mockPropsOrganism.files.length);
  });

  it("selects files when they are clicked", () => {
    render(<FileSelectionOrganism {...mockPropsOrganism} />);
    const firstFileCheckbox = screen.getAllByRole("checkbox")[0];

    fireEvent.click(firstFileCheckbox);
    expect(firstFileCheckbox).toBeChecked();
  });

  it("deselects files when they are clicked again", () => {
    render(<FileSelectionOrganism {...mockPropsOrganism} />);
    const firstFileCheckbox = screen.getAllByRole("checkbox")[0];

    fireEvent.click(firstFileCheckbox);
    fireEvent.click(firstFileCheckbox);
    expect(firstFileCheckbox).not.toBeChecked();
  });

  it("logs syncing message with correct files when Sync button is clicked", () => {
    const logSpy = jest.spyOn(console, "log");

    render(<FileSelectionOrganism {...mockPropsOrganism} />);
    const firstFileCheckbox = screen.getAllByRole("checkbox")[0];
    const syncButton = screen.getByText("Sync");

    fireEvent.click(firstFileCheckbox);
    fireEvent.click(syncButton);

    expect(logSpy).toHaveBeenCalledWith("Syncing the following files:", [
      "Test File",
    ]);

    logSpy.mockRestore();
  });

  it("logs back message when Back button is clicked", () => {
    const logSpy = jest.spyOn(console, "log");

    render(<FileSelectionOrganism {...mockPropsOrganism} />);
    const backButton = screen.getByText("Back");

    fireEvent.click(backButton);

    expect(logSpy).toHaveBeenCalledWith("Back Screen");

    logSpy.mockRestore();
  });
});
