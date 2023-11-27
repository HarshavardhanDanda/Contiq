import { fireEvent, screen, waitFor } from "@testing-library/react";
import HeaderComponent from ".";
import { render } from "../../../test-setup";

jest.mock("../../../utils/functions", () => ({
  getUserData: jest.fn().mockResolvedValue(5)
}));

jest
  .spyOn(Object.getPrototypeOf(window.localStorage), "getItem")
  .mockReturnValue(JSON.stringify({ id: 5, name: "name", email: "email" }));

jest.mock("../../../services/NotificationService", () => ({
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

jest.mock("../../../services/FileService", () => ({
  getAllSearchResults: jest.fn().mockResolvedValue([{id: 1, name: "sample.pdf"}]),
}));

describe("HeaderComponent", () => {
  it("calls handleHelpIconClick when Help icon is clicked", () => {
    const { getByAltText } = render(<HeaderComponent />);
    const helpIcon = getByAltText("help");
    fireEvent.click(helpIcon);
  });

  it("should open notification panel when Notification icon is clicked", async () => {
    const { getByAltText } = render(<HeaderComponent />);
    await waitFor(() => {
      const notificationIcon = getByAltText("notification");
      fireEvent.click(notificationIcon);
      expect(screen.getByText("Notifications")).toBeInTheDocument;
      const closeIcon = getByAltText("close-icon");
      fireEvent.click(closeIcon);
      expect(screen.queryByText("Notifications")).toBeInTheDocument;
    })
  });

  it("should open Profile panel when profile icon is clicked", () => {
    const { getByAltText } = render(<HeaderComponent />);
    const profileIcon = getByAltText("avatar");
    fireEvent.click(profileIcon);
    expect(screen.getByText("Logout")).toBeInTheDocument;
    expect(screen.getByText("Settings")).toBeInTheDocument;
    expect(screen.getByText("Profile")).toBeInTheDocument;
  });

  it("should show search results when input field value changes", async () => {
    const { getByPlaceholderText } = render(<HeaderComponent />);
    const inputField = getByPlaceholderText("Search");
    fireEvent.change(inputField, { target: { value: "example search" } });
    await waitFor(() => {
      expect(screen.getByText("Search results")).toBeInTheDocument;
      expect(screen.getByText("sample.pdf")).toBeInTheDocument;
      fireEvent.click(screen.getByText("sample.pdf"));
    })
  });

  it("renders the CONTIQ title", () => {
    const { getByText } = render(<HeaderComponent />);
    const title = getByText("CONTIQ");
    expect(title).toBeInTheDocument;
  });
});
