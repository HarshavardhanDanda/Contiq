import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import SearchPanel, { SearchPanelProps } from ".";

Object.defineProperty(navigator, "clipboard", {
  value: {
    writeText: async () => ("copy text"),
  },
});

const mockProps: SearchPanelProps = {
  searchQuery: "Test Query",
  docName: "Test Document",
  searchResults: [
    [1, "Result 1"],
    [2, "Result 2"],
  ],
  totalPages: 2,
  currentPage: 1,
  handleNavigateSearch: jest.fn(),
};

describe("SearchPanel", () => {
  it("renders with the correct props", () => {
    render(<SearchPanel {...mockProps} />);

    expect(screen.getByText("Test Query")).toBeInTheDocument;
    expect(screen.getByText("Test Document")).toBeInTheDocument;
    expect(screen.getByText("Result 1")).toBeInTheDocument;
  });

  it("handles navigation correctly", () => {
    render(<SearchPanel {...mockProps} />);

    fireEvent.click(screen.getByAltText("up"));
    expect(mockProps.handleNavigateSearch).toHaveBeenCalledWith(2);
    fireEvent.click(screen.getByAltText("down"));
    expect(mockProps.handleNavigateSearch).toHaveBeenCalledWith(3);
  });

  it("minimizes and maximizes correctly", () => {
    render(<SearchPanel {...mockProps} />);

    fireEvent.click(screen.getByAltText("minimize"));
    expect(screen.getByText("Test Query")).toBeInTheDocument;
    fireEvent.click(screen.getByAltText("maximize"));
    expect(screen.getByText("Test Document")).toBeInTheDocument;
  });

  it("should copy text when clicked on copy icon", () => {
    render(<SearchPanel {...mockProps} />);

    fireEvent.click(screen.getByAltText("copy"));
    expect(screen.getByText("Text copied")).toBeInTheDocument;
    fireEvent.click(screen.getByAltText("close-icon"));
    expect(screen.queryByText("Text copied")).not.toBeInTheDocument;
  });
});
