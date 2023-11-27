import { render, screen } from "@testing-library/react";
import SyncDrive from ".";

describe("SyncDrive component", () => {
  test("renders the component with the loading icon", () => {
    render(<SyncDrive />);
    const loadingIcon = screen.getByAltText("drive-loader");
    expect(loadingIcon).toBeInTheDocument;
  });

  test("displays the 'Sync in progress' text", () => {
    render(<SyncDrive />);
    const syncText = screen.getByText("Sync in progress");
    expect(syncText).toBeInTheDocument;
  });

  test("displays the 'Closing this window will not interrupt your sync' text", () => {
    render(<SyncDrive />);
    const closingText = screen.getByText(
      "Closing this window will not interrupt your sync"
    );
    expect(closingText).toBeInTheDocument;
  });
});
