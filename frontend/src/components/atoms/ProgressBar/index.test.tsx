import { act, render, screen } from "@testing-library/react";
import ProgressBar, { ProgressBarProps } from ".";
import "@testing-library/jest-dom";

jest.useFakeTimers();

describe("Progress bar componenet", () => {
  const DefaultProgressBarProps: ProgressBarProps = {
    width: "207px",
    height: "8px",
  };
  test("renders the progress bar  with the  props", () => {
    render(<ProgressBar {...DefaultProgressBarProps} />);
    const progressBar = screen.getByRole("progressbar");

    expect(progressBar).toHaveStyle("width: 207px");
    expect(progressBar).toHaveStyle("height: 8px");
  });

  test("renders the progress bar with a specific value", () => {
    render(<ProgressBar width="207px" height="8px" />);
    const progressBar = screen.getByRole("progressbar");

    expect(progressBar).toHaveAttribute("aria-valuenow", "0");
  });

  it("should increment value over time", () => {
    render(<ProgressBar width="207px" height="8px" />);

    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "0"
    );

    act(() => {
      jest.advanceTimersByTime(25);
    });
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "1"
    );

    act(() => {
      jest.advanceTimersByTime(25 * 99);
    });
    expect(screen.getByRole("progressbar")).toHaveAttribute(
      "aria-valuenow",
      "2"
    );
  });
});
