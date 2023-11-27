import { screen } from "@testing-library/react";
import { render } from "../../../test-setup";
import HomeTemplate from ".";
import TypographyComponent from "../../atoms/Typography";
import "@testing-library/jest-dom";

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

describe("Home Template", () => {
  test("renders all the props", () => {
    render(
      <HomeTemplate
        sidebar={<TypographyComponent>{"Sidebar"}</TypographyComponent>}
        content={<TypographyComponent>{"Content"}</TypographyComponent>}
      />
    );
    expect(screen.getByText("Sidebar")).toBeInTheDocument;
    expect(screen.getByText("Content")).toBeInTheDocument;    
  })
});
