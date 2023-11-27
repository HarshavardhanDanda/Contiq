import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { PaginationBar } from ".";
import "@testing-library/jest-dom";

const mockHandleZoomIn = jest.fn();
const mockHandleZoomOut = jest.fn();

const defaultProps = {
  totalPages: 10,
  pageNumber: 3,
  handleZoomIn: mockHandleZoomIn,
  handleZoomOut: mockHandleZoomOut,
  zoomPercent: 150,
};

describe("PaginationBar", () => {
  test("should render Pagination Bar", () => {
    render(<PaginationBar {...defaultProps} />);
    const pageText = screen.getByText("Page 3 of 10");
    expect(pageText).toBeInTheDocument();
  });

  test("should trigger handleZoomIn when the zoom-in button is clicked", () => {
    render(<PaginationBar {...defaultProps} />);
    const zoomInButton = screen.getByAltText("zoom-in-icon");
    fireEvent.click(zoomInButton);
    expect(mockHandleZoomIn).toHaveBeenCalled();
  });

  test("should trigger handleZoomOut when the zoom-out button is clicked", () => {
    render(<PaginationBar {...defaultProps} />);
    const zoomOutButton = screen.getByAltText("zoom-out-icon");
    fireEvent.click(zoomOutButton);
    expect(mockHandleZoomOut).toHaveBeenCalled();
  });
});
