import { screen, waitFor } from "@testing-library/react";
import { NotificationCard } from ".";
import "@testing-library/jest-dom";
import { render } from "../../../test-setup";

jest.useFakeTimers();
jest.mock("axios");

jest
  .spyOn(Object.getPrototypeOf(window.localStorage), "getItem")
  .mockReturnValue(JSON.stringify({ id: 5, name: "name", email: "email" }));

jest.mock("../../../services/UserService", () => ({
  getUserById: jest.fn().mockResolvedValue({
    username: "Harsha",
    email: "harsha@gmail.com",
    password: "Harsha@1234",
    id: 5,
  }),
}));

jest.mock("../../../services/FileService", () => ({
  getFileById: jest.fn().mockResolvedValue({
    id: 2,
    name: "Company profile.pdf",
    type: "pdf",
    created_at: "2023-10-20 11:10:00",
    updated_at: "2023-10-20 11:50:00",
    uploaded_by: 1,
  }),
}));

jest.mock("../../../services/NotificationService", () => ({
  getAllNotificationsByUserId: jest.fn().mockResolvedValue([
    {
      id: 1,
      file_id: 2,
      user_id: 5,
      is_read: true,
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
  patchNotificationsById: jest.fn()
}));

const mockHandleClose = jest.fn();
describe("NotificationCard", () => {
  test("should render Ntification Card without errors", () => {
    render(<NotificationCard handleClose={mockHandleClose} />);

    const headingElement = screen.getByText(/Notification/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("should display loader initially", () => {
    render(<NotificationCard handleClose={mockHandleClose} />);
    const loaderElement = screen.getByAltText("loader-gif");
    expect(loaderElement).toBeInTheDocument();
  });

  test("should render notifications", async () => {
    render(<NotificationCard handleClose={mockHandleClose} />);
    await waitFor(() => {
      expect(screen.getAllByText('Notifications')).toBeInTheDocument
    });
  });

  test("should give log if user details not found in local storage", async () => {
    const consolelogSpy = jest.spyOn(console, "log");
    jest
      .spyOn(Object.getPrototypeOf(window.localStorage), "getItem")
      .mockReturnValue(undefined);
    render(<NotificationCard handleClose={mockHandleClose} />);
    await waitFor(() => {
      expect(consolelogSpy).toHaveBeenCalledWith(
        "User details not found in localStorage"
      );
    });
  });
});
