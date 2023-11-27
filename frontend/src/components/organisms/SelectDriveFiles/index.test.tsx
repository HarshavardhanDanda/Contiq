import { render, screen, fireEvent } from "@testing-library/react";
import SelectDriveFiles, { ChooseDriveFolderProps } from ".";
import { Files } from "../UploadFiles/hooks";

jest
  .spyOn(Object.getPrototypeOf(window.localStorage), "getItem")
  .mockReturnValue(JSON.stringify({ id: 5, name: "name", email: "email" }));

jest.mock("../../../services/FileService", () => ({
  getFileById: jest.fn().mockResolvedValue({
    id: 2,
    name: "Company profile.pdf",
    type: "pdf",
    created_at: "2023-10-20 11:10:00",
    updated_at: "2023-10-20 11:50:00",
    uploaded_by: 1,
  }),
  downloadDriveFile: jest.fn().mockResolvedValue(new Blob()),
}));

jest.mock("../../../utils/functions", () => ({
  getCurrentDateTime: jest.fn().mockResolvedValue("2023-11-07 04:40:45"),
  downloadDriveFile: jest.fn().mockResolvedValue(new Blob()),
}));

const mockUseSelectDriveFiles = () => {
  const selectedFiles: Files[] = [];
  const setSelectedFiles = (files: Files[]) => {
    selectedFiles.length = 0;
    selectedFiles.push(...files);
  };
  return { selectedFiles, setSelectedFiles };
};

const mockProps: ChooseDriveFolderProps = {
  folder: {
    id: "1",
    name: "folder1",
    files: [
      { id: "1", name: "file1.txt", parents: "" },
      { id: "2", name: "file2.txt", parents: "" },
    ],
  },
  navigateBack: jest.fn(),
  onClose: jest.fn()
};

test("renders SelectDriveFiles component", () => {
  jest.mock("./hooks", () => ({
    useSelectDriveFiles: mockUseSelectDriveFiles,
  }));

  render(<SelectDriveFiles {...mockProps} />);
  expect(screen.getByText("Sync")).toBeInTheDocument;
  expect(screen.getByText("Back")).toBeInTheDocument;
});

test("selects and deselects files", () => {
  jest.mock("./hooks", () => ({
    useSelectDriveFiles: mockUseSelectDriveFiles,
  }));

  render(<SelectDriveFiles {...mockProps} />);
  fireEvent.click(screen.getByText("file1.txt"));
  expect(mockProps.folder.files).toContainEqual({
    id: "1",
    name: "file1.txt",
    parents: "",
  });
  fireEvent.click(screen.getAllByRole("checkbox")[0]);
  fireEvent.click(screen.getAllByRole("checkbox")[0]);
  fireEvent.click(screen.getAllByRole("checkbox")[0]);
  fireEvent.click(screen.getByText("Sync"));
  expect(mockProps.folder.files).not.toContainEqual({ name: "file1.txt" });
});

test("should log if no user found in local storage", () => {
  jest.mock("./hooks", () => ({
    useSelectDriveFiles: mockUseSelectDriveFiles,
  }));
  jest
    .spyOn(Object.getPrototypeOf(window.localStorage), "getItem")
    .mockReturnValue(undefined);

  render(<SelectDriveFiles {...mockProps} />);
  fireEvent.click(screen.getByText("file1.txt"));
  expect(mockProps.folder.files).toContainEqual({
    id: "1",
    name: "file1.txt",
    parents: "",
  });
  fireEvent.click(screen.getAllByRole("checkbox")[0]);
  fireEvent.click(screen.getByText("Sync"));
  expect(mockProps.folder.files).not.toContainEqual({ name: "file1.txt" });
});

test("navigates back", () => {
  jest.mock("./hooks", () => ({
    useSelectDriveFiles: mockUseSelectDriveFiles,
  }));

  render(<SelectDriveFiles {...mockProps} />);
  fireEvent.click(screen.getByText("Back"));
  fireEvent.click(screen.getByText("Sync"));
  expect(mockProps.navigateBack).toHaveBeenCalledTimes(1);
});