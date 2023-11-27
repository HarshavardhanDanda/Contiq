import React from "react";
import {
  render,
  screen,
  act,
  renderHook,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import UploadFromLocalOrganism, { UploadFromLocalProps } from "./index";
import { useFileUpload } from "./hooks";

describe("UploadFromLocalOrganism", () => {
  const defaultProps: UploadFromLocalProps = {
    isOpen: true,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    render(<UploadFromLocalOrganism {...defaultProps} />);
  });

  it("renders without crashing", () => {
    // test body if needed
  });

  it("displays the modal title correctly", () => {
    expect(screen.getByText("Upload Files")).toBeInTheDocument();
  });

  it("displays upload prompt if no files are selected", () => {
    expect(screen.getByTestId("choose-file")).toBeInTheDocument();
    expect(screen.getByText(/DROP YOUR FILES HERE/i)).toBeInTheDocument();
  });

  it("handles file input selection correctly", async () => {
    render(<UploadFromLocalOrganism {...defaultProps} />);

    let fileInput = screen.queryAllByTestId("file-input");
    if (!fileInput) {
      fileInput = await screen.findAllByTestId("file-input");
    }

    const mockFile = new File(["sample"], "sample.pdf");

    fireEvent.change(fileInput[0], {
      target: {
        files: [mockFile],
      },
    });
  });

  it("displays selected files correctly", () => {
    render(<UploadFromLocalOrganism {...defaultProps} />);

    // Assuming `file-input` is your input field's test ID
    const fileInputs = screen.queryAllByTestId("file-input");
    const mockFile = new File(["content"], "test.pdf", {
      type: "application/pdf",
    });

    if (fileInputs.length > 0) {
      fireEvent.change(fileInputs[0], { target: { files: [mockFile] } });
    }

    const uploadedFileName = screen.getByText("test.pdf");
    expect(uploadedFileName).toBeInTheDocument();
  });
});

describe("useFileUpload Hook", () => {
  it("initial values are set correctly", () => {
    const { result } = renderHook(() => useFileUpload());

    expect(result.current.selectedFiles).toEqual([]);
    expect(result.current.uploadModalOpen).toBe(false);
  });

  it("sets selected files correctly on file change", async () => {
    const { result } = renderHook(() => useFileUpload());

    act(() => {
      result.current.handleFileChange({
        target: {
          files: [
            new File(["pdf content"], "sample.pdf", {
              type: "application/pdf",
            }),
          ],
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.selectedFiles.length).toBe(1);
    expect(result.current.selectedFiles[0].name).toBe("sample.pdf");
  });
});
