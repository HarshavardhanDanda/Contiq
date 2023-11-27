import HomePage from ".";
import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "../../test-setup";

jest.mock("../../services/FileService", () => ({
  getAllFilesByUserId: jest.fn().mockResolvedValue([
    {
      id: 1,
      name: "Company profile.pdf",
      type: "pdf",
      createdAt: "2023-11-14 11:10:00",
      updatedAt: "2023-11-14 11:50:00",
      uploadedBy: 1,
    },
    {
      id: 2,
      name: "Company profile2.pdf",
      type: "pdf",
      createdAt: "2023-11-14 11:10:00",
      updatedAt: "2023-11-14 11:50:00",
      uploadedBy: 1,
    },
  ]),
}));

jest
  .spyOn(Object.getPrototypeOf(window.localStorage), "getItem")
  .mockReturnValue(JSON.stringify({ id: 5, name: "name", email: "email" }));

jest.mock("../../services/NotificationService", () => ({
  getAllNotificationsByUserId: jest.fn().mockResolvedValue([
    {
      id: 1,
      file_id: 2,
      user_id: 5,
      isRead: false,
      uploadedBy: 5,
      createdAt: "2023-11-14 11:00:00",
      updatedAt: "2023-11-14 11:40:00",
      type: "upload",
    },
    {
      id: 2,
      file_id: 2,
      user_id: 5,
      isRead: false,
      uploadedBy: 5,
      createdAt: "2023-11-14 11:10:00",
      updatedAt: "2023-11-14 11:50:00",
      type: "upload",
    },
  ]),
}));

describe("HomePage", () => {
  beforeEach(() => {
    render(<HomePage />);
  });

  it("renders without crashing", () => {
    expect(screen.getByText("No files available")).toBeInTheDocument;
  });

  test("should open pdf viewer on double click on file card", async () => {
    await waitFor(() => {
      const firstFile = screen.getAllByAltText("PDF Icon")[0];
      expect(firstFile).toBeInTheDocument();
      fireEvent.doubleClick(firstFile);
    });
  });
});

