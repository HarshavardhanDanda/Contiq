import React from "react";
import { screen, fireEvent, waitFor } from "@testing-library/react";
import { FilesPage } from ".";
import { ThemeProvider } from "@emotion/react";
import theme from "../../theme/theme";
import "@testing-library/jest-dom";
import { render } from "../../test-setup";

jest
  .spyOn(Object.getPrototypeOf(window.localStorage), "getItem")
  .mockReturnValue(JSON.stringify({ id: 5, name: "name", email: "email" }));

jest.mock("../../services/NotificationService", () => ({
  getAllNotificationsByUserId: jest.fn().mockResolvedValue([
    {
      id: 1,
      file_id: 2,
      user_id: 5,
      is_read: false,
      uploaded_by: 5,
      created_at: "2023-10-25 11:00:00",
      updated_at: "2023-10-25 11:40:00",
      type: "upload",
    },
    {
      id: 2,
      file_id: 2,
      user_id: 5,
      is_read: false,
      uploaded_by: 5,
      created_at: "2023-10-25 11:10:00",
      updated_at: "2023-10-25 11:50:00",
      type: "upload",
    },
  ]),
}));

beforeEach(() => {
  render(
    <ThemeProvider theme={theme}>
      <FilesPage />
    </ThemeProvider>
  );
});

jest.mock("../../services/FileService", () => ({
  getAllFiles: jest.fn().mockResolvedValue([
    {
      id: 1,
      name: "Company profile.pdf",
      type: "pdf",
      created_at: "2023-10-20 11:10:00",
      updated_at: "2023-10-20 11:50:00",
      uploaded_by: 1,
    },
    {
      id: 2,
      name: "Company profile2.pdf",
      type: "pdf",
      created_at: "2023-10-20 11:10:00",
      updated_at: "2023-10-20 11:50:00",
      uploaded_by: 1,
    },
  ]),
}));

describe("FilesPage", () => {
  test('should open UploadFiles modal when "Add files" button is clicked', () => {
    const addFilesButton = screen.getByText("Add files");
    expect(addFilesButton).toBeInTheDocument();
    fireEvent.click(addFilesButton);
    const uploadFilesModal = screen.getByText("Upload Files");
    expect(uploadFilesModal).toBeInTheDocument();
    const closeIcon = screen.getByTestId("closeIcon");
    expect(closeIcon).toBeInTheDocument();
    fireEvent.click(closeIcon);
  });

  test("should select a fileType from a dropdown", () => {
    const fileTypeDropDown = screen.getByText("File type");
    expect(fileTypeDropDown).toBeInTheDocument();
    fireEvent.mouseDown(fileTypeDropDown);
    const specificFileTypeOption = screen.getByText(/IMAGE/i);
    expect(specificFileTypeOption).toBeInTheDocument();
    fireEvent.click(specificFileTypeOption);
    const closeDropDown = screen.getByTestId("closeDropDown");
    fireEvent.click(closeDropDown);
  });
  test("should select a publish setting from a dropdown", () => {
    const PublishSettingDropDown = screen.getByText("Publish setting");
    expect(PublishSettingDropDown).toBeInTheDocument();
    fireEvent.mouseDown(PublishSettingDropDown);
    const specificPublishOption = screen.getByText(/Published by me/i);
    expect(specificPublishOption).toBeInTheDocument();
    fireEvent.click(specificPublishOption);
    const closeDropDown = screen.getByTestId("closeDropDown");
    fireEvent.click(closeDropDown);
  });
  test("should select a publish setting from a dropdown", () => {
    const PublishSettingDropDown = screen.getByText("Publish setting");
    expect(PublishSettingDropDown).toBeInTheDocument();
    fireEvent.mouseDown(PublishSettingDropDown);
    const specificPublishOption = screen.getByText(/Published by others/i);
    expect(specificPublishOption).toBeInTheDocument();
    fireEvent.click(specificPublishOption);
    const closeDropDown = screen.getByTestId("closeDropDown");
    fireEvent.click(closeDropDown);
  });

  test("should open pdf viewer on double click on file card", async () => {
    await waitFor(() => {
      const firstFile = screen.getAllByAltText("PDF Icon")[0];
      expect(firstFile).toBeInTheDocument();
      fireEvent.doubleClick(firstFile);
    });
  });
  test("should show the files when dates are chosen", () => {
    const downIcons = screen.getAllByAltText("chevron-down");
    fireEvent.click(downIcons[0]);
    const date = screen.getAllByText("1")[0];
    expect(date).toBeDefined();
    fireEvent.click(date);
    fireEvent.click(downIcons[1]);
    const date2 = screen.getAllByText("2")[0];
    expect(date2).toBeDefined();
    fireEvent.click(date2);
  });
  test("should show the files when dates are chosen", () => {
    const downIcons = screen.getAllByAltText("chevron-down");
    fireEvent.click(downIcons[1]);
    const date = screen.getAllByText("1")[0];
    expect(date).toBeDefined();
    fireEvent.click(date);
  });
});
