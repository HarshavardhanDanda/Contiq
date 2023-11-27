import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import SnackBar from ".";
import completeIcon from "../../../../public/assets/images/complete.svg";
import closeIcon from "../../../../public/assets/images/close.svg";

describe("<SnackBar />", () => {
  it("renders the SnackBar component", () => {
    render(
      <SnackBar
        text={{ variant: "body1", children: "Test Snackbar Message" }}
        startIconSrc={completeIcon}
        endIconSrc={closeIcon}
      />
    );

    expect(screen.getByText("Test Snackbar Message")).toBeInTheDocument();
    expect(screen.getByAltText("complete-icon")).toBeInTheDocument();
    expect(screen.getByAltText("close-icon")).toBeInTheDocument();
  });

  it("triggers the onClose callback when the close icon is clicked", () => {
    const mockCallback = jest.fn();

    render(
      <SnackBar
        text={{ variant: "body1", children: "Test Snackbar Message" }}
        startIconSrc={completeIcon}
        endIconSrc={closeIcon}
        onClose={mockCallback}
      />
    );

    fireEvent.click(screen.getByAltText("close-icon"));
    expect(mockCallback).toHaveBeenCalledTimes(1);
  });
});
