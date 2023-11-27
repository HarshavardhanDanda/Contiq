import React from "react";
import { render, screen } from "@testing-library/react";
import FileCard from ".";
import "@testing-library/jest-dom";

describe("FileCard", () => {
  const onDoubleClick = jest.fn();
  it("renders with default props", () => {
    render(
      <FileCard
        image={{ src: "path_to_test_image.jpg", alt: "Test Image" }}
        textIcon={{ src: "path_to_test_icon.jpg", alt: "Test Icon" }}
        text={{ variant: "body1", children: "Test Text" }}
        onDoubleClick={onDoubleClick}
      />
    );

    const imageElement = screen.getByAltText("Test Image");
    const iconElement = screen.getByAltText("Test Icon");
    const textElement = screen.getByText("Test Text");

    expect(imageElement).toBeInTheDocument();
    expect(iconElement).toBeInTheDocument();
    expect(textElement).toBeInTheDocument();
  });

  it("renders with custom styles", () => {
    const customImageStyle = {
      width: "100px",
    };

    const customIconStyle = {
      height: "50px",
    };

    render(
      <FileCard
        image={{
          src: "path_to_test_image.jpg",
          alt: "Test Image",
          style: customImageStyle,
        }}
        textIcon={{
          src: "path_to_test_icon.jpg",
          alt: "Test Icon",
          style: customIconStyle,
        }}
        text={{
          variant: "body1",
          children: "Styled Text",
        }}
        onDoubleClick={onDoubleClick}
      />
    );

    const imageElement = screen.getByAltText("Test Image");
    const iconElement = screen.getByAltText("Test Icon");
    expect(imageElement).toHaveStyle("width: 258px");
    expect(iconElement).toHaveStyle("height: 24px");
  });
});
