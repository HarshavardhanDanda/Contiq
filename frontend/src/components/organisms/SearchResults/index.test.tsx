import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import SearchResults from ".";

describe("SearchResults Component", () => {
  const fileData = [
    { id: 1, name: "File 1" },
    { id: 2, name: "File 2" },
  ];

  const onSearchResultClick = jest.fn();

  beforeEach(() => {
    render(
      <SearchResults
        fileData={fileData}
        onSearchResultClick={onSearchResultClick}
      />
    );
  });

  it("renders search results", () => {
    expect(screen.getByText("Search results")).toBeInTheDocument;

    fileData.forEach((file) => {
      expect(screen.getByText(file.name)).toBeInTheDocument;
    });
  });

  it("calls onSearchResultClick when a result is clicked", () => {
    fireEvent.click(screen.getByText("File 1"));

    expect(onSearchResultClick).toHaveBeenCalledWith(1);
  });
});
