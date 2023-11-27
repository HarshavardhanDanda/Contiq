import { fireEvent, render, screen } from "@testing-library/react";
import ChooseDriveFolder, { ChooseDriveFolderProps } from ".";
import * as hooksModule from "./hooks";

const mockProps: ChooseDriveFolderProps = {
  folders: [
    {
      id: "1",
      name: "folder1",
      files: [{ id: "1", name: "file1", parents: "" }],
    },
  ],
  setTitle: jest.fn(),
  setIsDriveFolderSelectModal: jest.fn(),
};

beforeEach(() => {
  jest.spyOn(hooksModule, "useChooseDriveFolder").mockImplementation(() => ({
    folderData: {
      id: "",
      name: "",
      files: [{ id: "1", name: "file1", parents: "" }],
    },
    setFolderData: jest.fn(),
    navigateBackToTabs: jest.fn(),
    handleNavigateBack: jest.fn(),
  }));
});

describe("ChooseDriveFolder component", () => {
  it("renders the component with sync options when folderData is empty", () => {
    render(<ChooseDriveFolder {...mockProps} />);

    expect(screen.getByText(/Choose the folders to sync with contiq/i))
      .toBeInTheDocument;
    expect(screen.getByText(/Sync entire drive/i)).toBeInTheDocument;
    expect(screen.getByText(/Sync folders/i)).toBeInTheDocument;
    expect(screen.getByText("folder1")).toBeInTheDocument;
    fireEvent.click(screen.getByText("folder1"));
  });

  it("renders the back and sync buttons", () => {
    render(<ChooseDriveFolder {...mockProps} />);

    expect(screen.getByText("Sync")).toBeInTheDocument;
    expect(screen.getByText("Back")).toBeInTheDocument;
    fireEvent.click(screen.getByText("Sync"));
    fireEvent.click(screen.getByText("Back"));
  });

  it("renders the radio buttons", () => {
    render(<ChooseDriveFolder {...mockProps} />);

    const entireDrive = screen.getAllByRole("radio")[0];
    const syncFolders = screen.getAllByRole("radio")[1];
    fireEvent.click(entireDrive);
    fireEvent.click(syncFolders);
    expect(screen.getByText(/Sync folders/i)).toBeInTheDocument;
  });

  it("renders files when clicked on a folder", () => {
    jest.spyOn(hooksModule, "useChooseDriveFolder").mockImplementation(() => ({
      folderData: {
        id: "abcd",
        name: "folder1",
        files: [{ id: "1", name: "file1", parents: "" }],
      },
      setFolderData: jest.fn(),
      navigateBackToTabs: jest.fn(),
      handleNavigateBack: jest.fn(),
    }));
    render(<ChooseDriveFolder {...mockProps} />);

    expect(screen.getByText("file1")).toBeInTheDocument;
    expect(screen.getByText("Back")).toBeInTheDocument;
    fireEvent.click(screen.getByText("Back"));
    expect(screen.getByText("Sync")).toBeInTheDocument;
  });
});
