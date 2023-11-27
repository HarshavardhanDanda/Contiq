import { render, screen } from "@testing-library/react";
import NoFileInfo from ".";
import "@testing-library/jest-dom";

describe("NoFileInfo", () => {
  it("renders with default props", () => {
    render(
      <NoFileInfo
        iconSrc="path_to_test_icon.jpg"
        iconAlt="Test Icon"
        title={{
          variant: "h3",
          children: "Test Title",
          color: "textPrimary",
        }}
        subtitle={{
          variant: "body2",
          children: "Test Subtitle",
          color: "textSecondary",
        }}
      />
    );

    const iconElement = screen.getByAltText("Test Icon");
    const titleElement = screen.getByText("Test Title");
    const subtitleElement = screen.getByText("Test Subtitle");

    expect(iconElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass("MuiTypography-h3");
    expect(subtitleElement).toHaveClass("MuiTypography-body2");
  });
});
