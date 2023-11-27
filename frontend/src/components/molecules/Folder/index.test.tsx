import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Folder } from ".";
import "@testing-library/jest-dom";
import fileDrive from "../../../../public/assets/images/file drive.svg";
import arrowIcon from "../../../../public/assets/images/chevron.svg";

describe("FolderComponent", () => {
  test("should render Folder component with provided props", () => {
    const onClickMock = jest.fn();
    render(
      <Folder
        startIcon={fileDrive}
        startAlt="file-drive-icon"
        endIcon={arrowIcon}
        endAlt="arrow-icon"
        text={"Zemoso decks"}
        onClick={onClickMock}
      />
    );

    expect(screen.getByText("Zemoso decks")).toBeInTheDocument();

    expect(screen.getByAltText("file-drive-icon")).toBeInTheDocument();
    expect(screen.getByAltText("arrow-icon")).toBeInTheDocument();
  });
  test("should trigger onClick when clciked", () => {
    const onClickMock = jest.fn();
    render(
      <Folder
        startIcon={fileDrive}
        startAlt="file-drive-icon"
        endIcon={arrowIcon}
        endAlt="arrow-icon"
        text={"Zemoso decks"}
        onClick={onClickMock}
      />
    );

    fireEvent.click(screen.getByTestId("folder"));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});
