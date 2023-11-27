import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { IconComponent } from ".";
import search from "../../../../public/assets/images/search.svg";

describe("Icon", () => {
  test("should render with correct src and alt attributes", () => {
    render(<IconComponent src={search} alt="search-icon" />);
    const imageElement = screen.getByAltText("search-icon");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", search);
    expect(imageElement).toHaveAttribute("alt", "search-icon");
  });
});
